export default function GameOver({ winner, onSelectRematch }) {
  return (
    <div id="game-over">
      <h2>Game Over!</h2>
      {winner && <p>{winner.name} won!</p>}
      {!winner && <p>It&apos;s a draw!</p>}
      <button onClick={onSelectRematch}>Rematch</button>
    </div>
  );
}
