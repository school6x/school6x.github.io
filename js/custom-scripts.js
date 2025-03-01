// let currentGameIndex = 0;
// const gamesPerPage = 55;

// document.addEventListener("DOMContentLoaded", function () {
//   const urlParams = new URLSearchParams(window.location.search);
//   currentGameIndex = parseInt(urlParams.get("gameIndex")) || 0;

//   fetch("data/games.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const games = data.games;
//       const selectedGame = games[currentGameIndex];
//       displayGameDetails(selectedGame);
//       displayRelatedGames(games, currentGameIndex);
//     })
//     .catch((error) => console.error("Error loading games:", error));
// });

// function displayGameDetails(game) {
//   document.getElementById("game-title").textContent = game.name;
//   document.getElementById("game-category").textContent =
//     game.category || "Uncategorized";
//   document.getElementById("game-iframe").src = game.link;
// }

// function displayRelatedGames(games, startIndex) {
//   const relatedGamesContainer = document.getElementById("related-games");
//   relatedGamesContainer.innerHTML = ""; // Clear existing content

//   // Append games starting from startIndex
//   for (
//     let i = startIndex + 1;
//     i < games.length && i < startIndex + 1 + gamesPerPage;
//     i++
//   ) {
//     const game = games[i];
//     const gameElement = document.createElement("div");
//     gameElement.className = "related-game";
//     gameElement.innerHTML = `
//       <img src="${game.thumb}" alt="${game.name}" style="width: 100px; height: auto;">
//       <h4>${game.name}</h4>
//       <a href="game-details.html?${game.slug}" class="btn btn-style-two">Play</a>
//     `;
//     relatedGamesContainer.appendChild(gameElement);
//   }

//   // Remove existing Load More button
//   const existingLoadMoreButton = document.querySelector(".load-more");
//   if (existingLoadMoreButton) {
//     existingLoadMoreButton.remove();
//   }

//   // Add Load More button if there are more games
//   if (startIndex + gamesPerPage < games.length) {
//     const loadMoreButton = document.createElement("button");
//     loadMoreButton.textContent = "Load More";
//     loadMoreButton.className = "btn btn-style-two load-more";
//     loadMoreButton.onclick = function () {
//       displayRelatedGames(games, startIndex + gamesPerPage);
//     };
//     relatedGamesContainer.appendChild(loadMoreButton);
//   }
// }

// function startGame() {
//   const iframe = document.getElementById("game-iframe");
//   iframe.src = iframe.src; // Reload the iframe to start the game
// }

// function restartGame() {
//   startGame();
// }

// document.addEventListener("DOMContentLoaded", function () {
//   fetch("data/hot-games.json")
//     .then((response) => response.json())
//     .then((data) => {
//       const hotGame = data.games[0];
//       displayHotGame(hotGame);
//     })
//     .catch((error) => console.error("Error loading hot game:", error));
// });

// function displayHotGame(game) {
//   const hotGameContainer = document.getElementById("hot-game");
//   hotGameContainer.innerHTML = `
//     <div class="hot-game-item" onclick="window.open('${game.link}', '_blank')">
//       <img src="${game.thumb}" alt="${game.name}" style="width: 100px; height: auto;">
//       <button class="hot-game-close m-0 p-0">&times;</button>
//     </div>
//   `;
// }

function loadGame(gameLink) {
  const iframe = document.getElementById("game-iframe");
  iframe.src = gameLink;
  const playButton = document.querySelector(".play-game-button");
  playButton.style.display = "none";
  const backgroundBlur = document.querySelector(".background-blur");
  backgroundBlur.style.display = "none";
}
