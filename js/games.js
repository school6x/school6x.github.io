document.addEventListener("DOMContentLoaded", () => {
  fetch("data/games.json")
    .then((response) => response.json())
    .then((data) => {
      const gameList = document.getElementById("game-list");
      data.games.forEach((game) => {
        const gameItem = document.createElement("div");
        gameItem.className = "game-item";
        gameItem.innerHTML = `
                    <img src="${game.thumb}" alt="${game.name}" />
                    <h2>${game.name}</h2>
                    <a href="game-single.html?game=${encodeURIComponent(
                      game.name
                    )}">Play Now</a>
                `;
        gameList.appendChild(gameItem);
      });
    })
    .catch((error) => console.error("Error loading games:", error));
});
