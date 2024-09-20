import { useState } from "react";
import Player from "./components/Player";
import GameBoard from "./components/GameBoard";
import TurnLogger from "./components/TurnLogger";
import WINNING_COMBINATIONS from "./winning-combinations";
import GameOver from "./components/GameOver";

class PlayerModel {
  constructor(name, symbol, active = false) {
    this.name = name;
    this.symbol = symbol;
    this.isTurnActive = active;
    this.isWinner = false;
  }

  toggleTurn() {
    this.isTurnActive = !this.isTurnActive;
  }

  setAsWinner() {
    this.isTurnActive = false;
    this.isWinner = true;
  }

  reset() {
    this.isTurnActive = false;
    this.isWinner = false;
  }
}

const defaultPlayers = () => {
  return [
    new PlayerModel("Player 1", "X", true),
    new PlayerModel("Player 2", "O"),
  ];
};

const defaultBoardState = () => {
  return [
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
    [undefined, undefined, undefined],
  ];
};

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
  let board = [...defaultBoardState()];

  turnLogs.forEach(({ player, square }) => {
    if (square !== null) {
      const { row, col } = square;
      board[row][col] = player.symbol;
    }
  });

  return board;
}

function getWinner(players) {
  return players.filter((player) => player.isWinner)[0];
}

function checkIfWinningTurn(turnLogs) {
  if (turnLogs.length < 5) {
    return false;
  }
  const playerSquares = turnLogs
    .filter(({ player }) => player.isTurnActive)
    .map(({ square }) => square);

  for (const winningSet of WINNING_COMBINATIONS) {
    if (comparePlayer(playerSquares, winningSet)) {
      return true;
    }
  }

  return false;
}

function comparePlayer(playerSquares, winningSet) {
  for (const winningItem of winningSet.map(({ row, col }) => `${row}${col}`)) {
    const isInPlayerSquares = !playerSquares
      .map(({ row, col }) => `${row}${col}`)
      .includes(winningItem);

    if (isInPlayerSquares) return false;
    else continue;
  }
  return true;
}

function App() {
  const [players, updatePlayers] = useState(defaultPlayers);
  const [turnLogs, updateTurnLogs] = useState([queueNextPlayer(players)]);
  const isGameOver = turnLogs.length > 9 || getWinner(players) !== undefined;

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

    turnLogsState[0].square = { row: row, col: col };
    const isWinningTurn = checkIfWinningTurn(turnLogs);

    updatePlayers(() => {
      const playersState = [...players];

      if (isWinningTurn) {
        getActivePlayer(playersState).setAsWinner();
        updateTurnLogs([...turnLogsState]);
      } else {
        playersState.forEach((player) => {
          player.toggleTurn();
        });
        updateTurnLogs([queueNextPlayer(playersState), ...turnLogsState]);
      }

      return playersState;
    });
  }

  const resetGame = () => {
    updatePlayers(() => {
      const playersState = [...players];
      playersState.forEach((player) => player.reset());
      playersState[0].toggleTurn();
      updateTurnLogs([queueNextPlayer(playersState)]);
      return playersState;
    });
  };
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
          isGameOver={isGameOver && true}
          didEndTurnCallback={didEndTurnAction}
        />
      </div>
      <TurnLogger logs={turnLogs} />
      {isGameOver && (
        <GameOver winner={getWinner(players)} onSelectRematch={resetGame} />
      )}
    </>
  );
}

export default App;
