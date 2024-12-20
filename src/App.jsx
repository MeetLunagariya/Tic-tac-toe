import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import { WINNING_COMBINATIONS } from "./Winning_Combinations.js";
import GameOver from "./components/GameOver.jsx";

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(gameTurns) {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
  return currentPlayer;
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  console.log("Active Player : " + activePlayer);

  let gameBoard = [...initialGameBoard.map(arr=>[...arr])];

  for (let turn of gameTurns) {
    const { square, player } = turn;
    const { row, col } = square;
    gameBoard[row][col] = player;
  }

  let winner = null;

  for (const combination of WINNING_COMBINATIONS) {
    // console.log("Checking combination1 : ", combination[0].row + ", " + combination[0].col)
    // console.log("Checking combination2 : ", gameBoard[combination[1].row][combination[1].col])
    // console.log("Checking combination3 : ", gameBoard[combination[2].row][combination[2].col])
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].col];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].col];
      const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].col];
      // console.log("Combinations : "+firstSquareSymbol, secondSquareSymbol, thirdSquareSymbol)
    if (
      firstSquareSymbol &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = firstSquareSymbol;
      console.log("Winner : " + firstSquareSymbol);
    }
  }

  let draw = gameTurns.length === 9 && !winner  ;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      const updateTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updateTurns;
    });
  }

  function handleRestart(){
    setGameTurns([]);
    // gameBoard = initialGameBoard;
    // winner = null;
    // draw = false;
  }

  return (
    <>
      <main>
        <div id="game-container">
          <ol id="players" className="highlight-player">
            <Player
              initialName={"Player 1"}
              symbol={"X"}
              isActive={activePlayer === "X"}
            />
            <Player
              initialName={"Player 2"}
              symbol={"O"}
              isActive={activePlayer === "O"}
            />
          </ol>
          {(winner || draw ) && <GameOver winner={winner} restart={handleRestart}/>}
          <GameBoard onSelectSquare={handleSelectSquare} board={gameBoard}  />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
