let gameType = sessionStorage.getItem("GameType");

class Game {
    constructor(currentTurn) {
        /* A game will have the following properties 

        Squares: This will be an array of 9 Squares 
        Squares filled: For each square that a move has been made on the squares filled will be decremented from 9.
        Player 1 Score and Name: Player 1 Details (Score is set to 0 by Default)
        Player 2 Score and Name: Same as above but for player 2. 
        Current Turn: Current Turn of Player.

        Player Info will be gathered by a form before starting the game (Menu Page).
        The data entered will be saved in SessionStorage and Deleted when the user exits or resets the game.

        */
        this.player1 = new Player(sessionStorage.getItem("player1"));
        this.player2 = new Player(sessionStorage.getItem("player2"));

        this.player1.symbol = currentTurn; 
        this.player2.symbol = Game.X;

        this.squares = new Array(9).fill().map(s => (new Square()));
        this.squaresFilled = 9;
        this.currentTurn = currentTurn;
        this.currentPlayer = this.player1;

        this.gameFinished = false;
        this.winner = null;

    }

    placeSymbol(i) {
        /* Only make a move if the game is still ongoing and the square doesnt already have a symbol */
       
        if (!this.gameFinished && !this.squares[i].symbol) {
            
            /* Change the square symbol */
            this.squares[i].symbol = this.currentTurn;
        
            this.squaresFilled--;
            
            /* Check for winner */
            this.checkForWinner();
    
            if (gameType == "SinglePlayer" && !this.gameFinished) {
                /* If the game is single player, Place a symbol at random place or use minimax and then swap players */
                this.swapPlayers();
                this.placeSymbolRandom();
                this.swapPlayers();
            } else {
                /* Swap Player Turn (Current Turn) If statement */
                this.swapPlayers();
            }
        }
    }

    placeSymbolRandom() {
        /* Get a list of all squares with no symbols */
        let unusedSquares = [];
        let sqauresWon = [];
        for (let s of this.squares) {
            if (s.symbol == null) {
                unusedSquares.push(s);
            }
        }

        /* Check winning combinations to see if there are any three with two symbols if there are place it at the third 
           This counts as the AI choosing to block a winning move, otherwise just place randomly */

        const possibleWins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        /* Get a random index of unused squares and set the symbol to the current turn */
        unusedSquares[Math.floor(Math.random() * unusedSquares.length)].symbol = this.currentTurn;

        this.squaresFilled--;

        this.checkForWinner();
    }

    swapPlayers() {
        if (gameType == "Multiplayer") {
            if (this.currentTurn == this.player1.symbol) {
                this.currentTurn = this.player2.symbol;
                this.currentPlayer = this.player2;
            } else {
                this.currentTurn = this.player1.symbol;
                this.currentPlayer = this.player1;
            } 
        } else {
            if (this.currentTurn == this.player1.symbol) {
                this.currentTurn = this.player2.symbol;
                this.currentPlayer = this.player2;
            } else {
                this.currentTurn = this.player1.symbol;
                this.currentPlayer = this.player1;
            } 
        }
    }

    checkForWinner() {
        /* Possible Wins */
        const possibleWins = [
            [0,1,2],
            [3,4,5],
            [6,7,8],
            [0,3,6],
            [1,4,7],
            [2,5,8],
            [0,4,8],
            [2,4,6]
        ];

        /* Loop through each winning combinations, and each array in the winning combinations and check
        to see if those three are equal to eachother (symbol) */
        possibleWins.forEach((combination) => {
            /* Destructure each array */
            let [s1,s2,s3] = combination; /* [s1 = 0, s2 = 1, s3 = 2] */
            if (this.squares[s1].symbol && this.squares[s1].symbol === this.squares[s2].symbol && this.squares[s2].symbol === this.squares[s3].symbol) {
                this.winner = this.currentPlayer.name;
                this.gameFinished = true;

                /* Set each square as highlighted to show the winning combination */
                this.squares[s1].highlightedSquare = this.squares[s2].highlightedSquare = this.squares[s3].highlightedSquare = true;

                /* Increment Players winning score total */
                this.currentPlayer.score++;
            }
        }, this);

        /* If the game is a draw, there is no winner and the game is deemed finished */
        if (this.squaresFilled == 0 && this.gameFinished == false) {
            this.winner = null;
            this.gameFinished = true;
        }
    }

    reset() {
        /* For each square, set the symbol to null */
        this.squares.forEach(function (square) {
            square.symbol = null;
            square.highlightedSquare = false;
        });

        this.gameFinished = false;
        this.squaresFilled = 9;
        this.winner = null;

        if (gameType == "SinglePlayer") { 
            this.currentPlayer = this.player1; 
            this.currentTurn = this.player1.symbol; 
        }
    }
}

Game.O = "O";
Game.X = "X";