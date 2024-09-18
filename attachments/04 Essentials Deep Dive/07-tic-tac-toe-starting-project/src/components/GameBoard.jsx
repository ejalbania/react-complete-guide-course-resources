import { useState } from "react";

const defaultBoardState = [
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
  [undefined, undefined, undefined],
];

export default function GameBoard({ activePlayer, didEndTurnCallback }) {
  const [gameBoard, updateBoard] = useState(defaultBoardState);

  const onClickAction = (row, col) => {
    updateBoard(() => {
      const boardState = [...gameBoard];
      boardState[row][col] = activePlayer.symbol;
      return boardState;
    });
    didEndTurnCallback();
  };
  return (
    <div id="game-board">
      {gameBoard.map((row, rowIndex) => {
        return (
          <ol key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <li key={`${rowIndex}${colIndex}`}>
                  <button
                    disabled={col !== undefined}
                    onClick={() => {
                      onClickAction(rowIndex, colIndex);
                    }}
                  >
                    {col}
                  </button>
                </li>
              );
            })}
          </ol>
        );
      })}
    </div>
  );
}
