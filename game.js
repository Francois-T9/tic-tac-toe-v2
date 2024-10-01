const startButton=document.querySelector("#play")

startButton.addEventListener("click", ()=> {
    gameController.startGame();
}, {once : true});

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
        for(let i=0;i<(rows*columns);i++) {

            const cell=document.createElement("div");
            cell.className="cell";
            cell.setAttribute("id",`${i}`)
            boardElement.appendChild(cell);
            
        }
        const cells=document.querySelectorAll(".cell");
        
        cells.forEach((cell) => {
            cell.addEventListener("click",(gameController.handleClick))
        });


    }
    return {
        board,
        render,
    }
})();


const gameController=(() => {
    let gameOver;
    let playerIndex;

    let board=gameBoard.board;
    console.log(board);
    
    const player= (name,token) => {
        return  {name, token};
    };
    let playerOne=player(document.querySelector("#player-one").value,"X")
    let playerTwo=player(document.querySelector("#player-two").value,"O")

    const startGame=() => {
        // console.log(document.querySelector("#player-one").value);

        gameBoard.render();
    };

    const handleClick=(event) => {

        event.target.textContent = playerOne.token;  // Set the text content to "test"
        let numCell=event.target.id;
        let row=Math.floor(numCell/3);
        let col=numCell%3;
        
        
        console.log("row : ",row,"col : ",col)
        
    };

    return {
        startGame,
        handleClick,
    };

})();