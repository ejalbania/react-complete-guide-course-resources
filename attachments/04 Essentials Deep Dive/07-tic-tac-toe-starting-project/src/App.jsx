import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import TurnLogger from "./components/TurnLogger";

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

const defaultBoardState = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

function getPlayerIndexBy(symbol, players) {
  return players.map(({ symbol }) => symbol).indexOf(symbol);
}

function getActivePlayer(players) {
  return players.filter((player) => player.isTurnActive)[0];
}

function queueNextPlayer(players) {
  return { player: getActivePlayer(players), square: null };
}

function getBoardStatus(turnLogs) {
  let board = defaultBoardState;

  turnLogs.forEach(({ player, square }) => {
    if (square !== null) {
      const { row, col } = square;
      board[row][col] = player.symbol;
    }
  });

  return board;
}

function App() {
  const [players, updatePlayers] = useState(defaultPlayers);
  const [turnLogs, updateTurnLogs] = useState([queueNextPlayer(players)]);

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

  function didEndTurnAction(row, col) {
    const turnLogsState = [...turnLogs];

    turnLogsState[0].square = { row: row, col, col };

    updatePlayers(() => {
      const playersState = [...players];
      playersState.forEach((player) => {
        player.toggleTurn();
      });

      updateTurnLogs([queueNextPlayer(playersState), ...turnLogsState]);
      return playersState;
    });
  }
  return (
    <>
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
        <GameBoard
          board={getBoardStatus(turnLogs)}
          activePlayer={getActivePlayer(players)}
          didEndTurnCallback={didEndTurnAction}
        />
      </div>
      <TurnLogger logs={turnLogs} />
    </>
  );
}

export default App;
