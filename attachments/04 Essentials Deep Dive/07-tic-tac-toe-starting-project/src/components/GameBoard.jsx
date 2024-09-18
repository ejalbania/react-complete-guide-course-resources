export default function GameBoard({ board, didEndTurnCallback }) {
  return (
    <div id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <ol key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <li key={`${rowIndex}${colIndex}`}>
                  <button
                    disabled={col !== undefined}
                    onClick={() => {
                      didEndTurnCallback(row, col);
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
