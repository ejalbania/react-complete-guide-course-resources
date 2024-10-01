import { useRef, useState } from "react";

export default function Player() {
  const [playerName, updatePlayerName] = useState("");
  const inputNameElement = useRef();

  function setNameClicked() {
    updatePlayerName(inputNameElement.current.value.toUpperCase());
    inputNameElement.current.value = "";
  }

  return (
    <section id="player">
      <h2>{`Welcome ${
        !playerName.length ? "unknown entity" : playerName
      }!`}</h2>
      <p>
        <input ref={inputNameElement} type="text" />
        <button onClick={setNameClicked}>Set Name</button>
      </p>
    </section>
  );
}
