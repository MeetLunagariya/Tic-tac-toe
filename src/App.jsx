import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";

const deriveActivePlayer = (gameTurns) => {
  let currentPlayer = "X";

  if (gameTurns.length > 0 && gameTurns[0].player === "X") {
    currentPlayer = "O";
  }
};

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const activePlayer = deriveActivePlayer(gameTurns);
  console.log("Active Player : "+ activePlayer)
  
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
          <GameBoard onSelectSquare={handleSelectSquare} turns={gameTurns} />
        </div>
        <Log turns={gameTurns} />
      </main>
    </>
  );
}

export default App;
