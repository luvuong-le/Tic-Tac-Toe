/* Menu JS: Used for getting menu clicks such as single and multiplayer. */

/* Menu Option Clicks: Event Listeners for menu choices */
let singlePlayerOption = document.getElementById("singlePlayerBtn");
let multiplayerOption = document.getElementById("multiplayerBtn");
let backBtn = document.getElementById("backBtn");

singlePlayerOption.addEventListener("click", () => {
    sessionStorage.setItem("GameType", "SinglePlayer");
    window.location.href = "players.html";
});

multiplayerOption.addEventListener("click", () => {
    sessionStorage.setItem("GameType", "Multiplayer");
    window.location.href = "players.html";
});

backBtn.addEventListener("click", () => {
    console.log("Back");
});