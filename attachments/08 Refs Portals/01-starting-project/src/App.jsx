import Player from "./components/Player.jsx";
import TimeChallenge from "./components/TimeChallenge.jsx";

function App() {
  return (
    <>
      <Player />
      <div id="challenges">
        <TimeChallenge title="EASY" targetTime={1} />
        <TimeChallenge title="MEDIUM" targetTime={5} />
        <TimeChallenge title="HARD" targetTime={10} />
        <TimeChallenge title="IMPOSSIBLE" targetTime={30} />
      </div>
    </>
  );
}

export default App;
