/* Multiplayer: Setting Player Names in Session Storage */

let submitBtn = document.getElementById("submitBtn");
let singlesubmitBtn = document.getElementById("single-submitBtn");
let player1Name = document.getElementById("P1");
let player1S = document.getElementById("P1S");
let player2Name = document.getElementById("P2");

let multiplayerForm = document.getElementById("multiplayer-form");
let singlePlayerForm = document.getElementById("single-player-form");
let gameType = sessionStorage.getItem("GameType");

function showGameForm() {
    if (gameType == "SinglePlayer") {
        singlePlayerForm.style.display = "block";
    } else {
        multiplayerForm.style.display = "block";
    }
}

singlesubmitBtn.addEventListener("click", () => {
    console.log("true_");
    sessionStorage.setItem("player1", player1S.value);
    sessionStorage.setItem("player2", "AI");
});

submitBtn.addEventListener("click", () => {
    /* Add the item to session storage */
        sessionStorage.setItem("player1", player1Name.value);
        sessionStorage.setItem("player2", player2Name.value); 
});

showGameForm();