export default function GameBoard({ board, isGameOver, didEndTurnCallback }) {
  return (
    <div id="game-board">
      {board.map((row, rowIndex) => {
        return (
          <ol key={rowIndex}>
            {row.map((col, colIndex) => {
              return (
                <li key={`${rowIndex}${colIndex}`}>
                  <button
                    disabled={col !== undefined || isGameOver}
                    onClick={() => {
                      didEndTurnCallback(rowIndex, colIndex);
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
