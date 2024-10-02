const startButton=document.querySelector("#play")

startButton.addEventListener("click", ()=> {
    gameController.startGame();
}, {once : true});

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

    const render =() => {
        const boardElement=document.querySelector(".board");

        let boardHTML="";
        for(let i=0;i<rows;i++){
            
            for (let j=0;j<columns;j++) {
                index=i*rows+j;
                boardHTML+=`<div class="cell" id="cell-${index}">${board[i][j]}</div>`;
               
        }
        }
        boardElement.innerHTML=boardHTML;
        cells=document.querySelectorAll(".cell");
        cells.forEach((cell) => {
            cell.addEventListener("click",(gameController.handleClick))
            
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
        const player= (name,token) => {
            return  {name, token};
        };
        let playerOne=player(document.querySelector("#player-one").value,"X")
        let playerTwo=player(document.querySelector("#player-two").value,"O")
        
        players=[playerOne, playerTwo];
        console.log(players);
        playerIndex=0;

        
        
        gameOver=false;
        gameBoard.render();
        
    };
    const playerDiv=document.querySelector(".displayMessages h1");
    const winnerDiv=document.querySelector(".displayMessages h2");

    const resetDisplay =() => {
        playerDiv.textContent="";
        winnerDiv.textContent="";
    }
    const displayPlayerTurn=(playerName)=> {
        playerDiv.textContent=`It's ${playerName}'s turn`;
        
    }

    const displayWinner=(playerName)=> {
        winnerDiv.textContent=`${playerName}'s won, congratulations!`;
        
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

        
        playerIndex=playerIndex===0 ? 1:0;
        
        if(gameBoard.isTie(board)) {
            alert("It's a tie!")
        }

        displayPlayerTurn(players[playerIndex].name);
        
        isWin(board,players[0]);
        isWin(board,players[1]);
        
        
    };

    return {
        startGame,
        handleClick,
        resetDisplay
        
    };

})();