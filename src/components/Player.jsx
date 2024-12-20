import React, { useState } from "react";

function Player({ initialName, symbol, isActive ,onChangeName}) {
  const [playerName, setPlayerName] = useState(initialName)
  const [isEditing, setIsEditing] = useState(false);
  const handleEdit = () => {
    setIsEditing(e=>!e);

    if(isEditing)
      onChangeName(symbol,playerName)
    // setIsEditing(e=>!e);
  };
  const handleSave = (e) => {
    console.log(playerName)
    setPlayerName(e.target.value)
  };
  return (
    <>
      <li className={isActive ? 'active' : undefined}>
        <span className="player">
          {isEditing ? (
            <input type="text" placeholder={initialName} value={playerName} onChange={handleSave} required />
          ) : (
            <span className="player-name">{playerName} </span>
          )}

          <span className="player-symbol">{symbol}</span>
        </span>
        <button onClick={handleEdit } >{isEditing ? "Save" : "Edit"}</button>
      </li>
    </>
  );
}

export default Player;
