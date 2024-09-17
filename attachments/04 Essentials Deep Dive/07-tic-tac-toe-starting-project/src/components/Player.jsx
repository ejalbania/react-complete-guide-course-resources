import { useState } from "react";

export default function Player({ data, savePlayerNameCallback }) {
  const [isEditing, toggleEditMode] = useState(false);
  const [playerName, updatePlayerName] = useState(data.name);

  const onClickAction = () => {
    if (isEditing) {
      savePlayerNameCallback(data.symbol, playerName);
    }

    toggleEditMode(!isEditing);
  };

  const nameTag = isEditing ? (
    <input
      type="text"
      required
      placeholder={data.name}
      defaultValue={data.name}
      onChange={(event) => {
        updatePlayerName(event.target.value);
      }}
    />
  ) : (
    <span className="player-name">{data.name}</span>
  );
  return (
    <li id="player" className={data.isTurnActive ? "active" : undefined}>
      {nameTag}
      <span className="player-symbol">{data.symbol}</span>
      <span>
        <button onClick={onClickAction}>{isEditing ? "SAVE" : "EDIT"}</button>
      </span>
    </li>
  );
}
