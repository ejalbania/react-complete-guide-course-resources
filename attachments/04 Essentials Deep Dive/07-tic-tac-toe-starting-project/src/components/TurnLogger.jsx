export default function TurnLogger({ logs }) {
  return (
    <ol id="log">
      {logs.map(({ player, square }, index) => {
        let logMessage = `Waiting for ${player.name}'s turn...`;

        if (square !== null) {
          const { row, col } = square;
          logMessage = `${player.name} selected box at [${row},${col}]`;
        }
        return <li key={index}>{logMessage}</li>;
      })}
    </ol>
  );
}
