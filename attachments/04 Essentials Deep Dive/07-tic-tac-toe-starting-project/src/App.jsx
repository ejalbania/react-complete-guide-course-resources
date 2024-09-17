import { useState } from "react";
import Player from "./components/Player";

class PlayerModel {
  constructor(name, symbol, active = false) {
    this.name = name;
    this.symbol = symbol;
    this.isTurnActive = active;
  }

  toggleTurn() {
    this.isTurnActive = !this.isTurnActive;
  }
}

const defaultPlayers = [
  new PlayerModel("Player 1", "X", true),
  new PlayerModel("Player 2", "O"),
];

function getPlayerIndexBy(symbol, players) {
  return players.map(({ symbol }) => symbol).indexOf(symbol);
}

function App() {
  const [players, updatePlayers] = useState(defaultPlayers);

  function updatePlayer(symbol, newName) {
    updatePlayers(() => {
      const playersState = [...players];
      const index = getPlayerIndexBy(symbol, playersState);
      if (index >= 0) {
        playersState[index].name = newName;
      }
      return playersState;
    });
  }

  return (
    <div id="game-container">
      <ul id="players" className="highlight-player">
        {players.map((player, index) => (
          <Player
            key={index}
            data={player}
            savePlayerNameCallback={updatePlayer}
          />
        ))}
      </ul>

      <div id="game-board"></div>
    </div>
  );
}

export default App;
