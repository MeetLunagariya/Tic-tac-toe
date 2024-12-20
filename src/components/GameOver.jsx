import React from "react";

function GameOver({ winner ,restart}) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner} won!</p>}
      {!winner && <p>It's a draw guys!</p>}
      <p>
        <button onClick={restart}>Rematch!</button>
      </p>
    </div>
  );
}

export default GameOver;
