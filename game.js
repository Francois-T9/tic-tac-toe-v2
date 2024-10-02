const startButton=document.querySelector("#play")

startButton.addEventListener("click", ()=> {
    gameController.startGame();
});

const resetButton=document.querySelector("#restart")

    resetButton.addEventListener("click", ()=> {
    gameController.resetDisplay();
    gameBoard.resetBoard(gameBoard.getBoard());
    document.querySelector("#player-one").value="";
    document.querySelector("#player-two").value=""
});

const gameBoard =(() => {
    let rows=3;
    let columns=3;
    let board=[];

    for(let i=0;i<rows;i++){
        board[i]=[];
        for (let j=0;j<columns;j++) {
            board[i][j]="";
        }
    }

    const render = () => {
        const boardElement = document.querySelector(".board");
    
        let boardHTML = "";
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < columns; j++) {
                const index = i * rows + j;
                const token = board[i][j];
    
                // Add token as a class and let CSS handle the color
                let tokenClass = "";
                if (token === players[0].token) {
                    tokenClass = "player-one"; // Player 1's token class
                } else if (token === players[1].token) {
                    tokenClass = "player-two"; // Player 2's token class
                }
    
                // Each cell has a dynamic class based on the token
                boardHTML += `<div class="cell ${tokenClass}" id="cell-${index}"></div>`;
            }
        }
        boardElement.innerHTML = boardHTML;
    
        // Add event listeners to cells again after rendering
        const cells = document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click", gameController.handleClick);
        });
    }
    
    

    const updateBoard=(row,col,value) => {
        board[row][col]=value;
        render();
        
    }
    const getBoard=() =>board;

    const resetBoard =(board) => {
        for(let i=0;i<rows;i++){
            
            for (let j=0;j<columns;j++) {
                board[i][j]="";
            }
        }
        render();
    };

    const isTie=(board) => {
        board1D=board.flat();
        return board1D.every(val=>val!=="");
    }

    
    // const cellColor (cell) => {
    //     let colorOne=

    //     return {}
    // }
    

    return {
        getBoard,
        render,
        updateBoard,
        resetBoard,
        isTie
        
    }
})();


const gameController=(() => {
    let gameOver;
    let playerIndex;

    let board=gameBoard.getBoard();
    // console.log(board);
    
    
   
  
    const startGame=() => {
        const player= (name,token,className) => {
            return  {name, token, className};
        };

        
        

        let playerOne=player(document.querySelector("#player-one").value,"X","player-one-message")
        let playerTwo=player(document.querySelector("#player-two").value,"O","player-two-message")
        
        players=[playerOne, playerTwo];
       
        playerIndex=0;

        
        
        gameOver=false;
        gameBoard.render();
        
    };
    const playerDiv=document.querySelector(".displayMessages h2");
    const winnerDiv=document.querySelector(".displayMessages h1");

    const resetDisplay =() => {
        playerDiv.textContent="";
        winnerDiv.textContent="";
    }
    const displayPlayerTurn=(player)=> {
        
        playerTurnHTML = `<h2 class="${player.className}">It's ${player.name}'s turn</h2>`;
        playerDiv.innerHTML=playerTurnHTML;
        console.log(playerDiv);
        
    }

    const displayWinner=(playerName)=> {
        winnerDiv.textContent=`${playerName}'s won, congratulations!`;
        
    }

    const displayTie=()=> {
        winnerDiv.textContent=`It's a tie, play again!`;
        
    }


    const isWin = (board,player) => {
         // check diagonal lines
    if (
        (board[0][0] == player.token && board[1][1] == player.token && board[2][2] == player.token) ||
        (board[0][2] == player.token && board[1][1] == player.token && board[2][0] == player.token)
    ) {
        displayWinner(player.name);
        
    }
    // Check horizontal lines
    if (
        (board[0][0] == player.token && board[0][1] == player.token && board[0][2] == player.token) ||
        (board[1][0] == player.token && board[1][1] == player.token && board[1][2] == player.token) ||
        (board[2][0] == player.token && board[2][1] == player.token && board[2][2] == player.token)
    ) {
        displayWinner(player.name);
        return 1;
    }

    // Check vertical lines
    if (
        (board[0][0] == player.token && board[1][0] == player.token && board[2][0] == player.token) ||
        (board[0][1] == player.token && board[1][1] == player.token && board[2][1] == player.token) ||
        (board[0][2] == player.token && board[1][2] == player.token && board[2][2] == player.token)
    ) {
        displayWinner(player.name);
        return 1;
    }

    }
    const handleClick=(event) => {

        
        let numCell=event.target.id.split("-")[1];
        
        let row=Math.floor(numCell/3);
        let col=numCell%3;
        
        if(gameBoard.getBoard()[row][col]!=="") 
            return;
        gameBoard.updateBoard(row,col,players[playerIndex].token);
        
        event.target.style.color=players[playerIndex].tokenColor;
        // console.log(event.target.style.color);
        
        playerIndex=playerIndex===0 ? 1:0;
        
        if(gameBoard.isTie(board)) {
            // alert("It's a tie!")
            displayTie();
        }
        
        displayPlayerTurn(players[playerIndex]);
        
        isWin(board,players[0]);
        isWin(board,players[1]);
        
        
    };

    return {
        startGame,
        handleClick,
        resetDisplay
        
    };

})();