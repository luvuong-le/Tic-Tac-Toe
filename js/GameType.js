/* Decide the Game Board to show depending on the game type */

let singleCont = document.getElementById("singleplayer-cont");
let multiCont = document.getElementById("multiplayer-cont");

function showGameBoard() {
    if (gameType == "SinglePlayer") {
        singleCont.style.display = "block";
    } else {
        multiCont.style.display = "block";
    }
}