import { act, useRef, useState } from "react";
import ResultModal from "./ResultModal.jsx";

function convertToTime(remainingTime) {
  let computedTime = [];
  const milliseconds = [3600000, 60000, 1000].reduce(
    getTimeUnit,
    remainingTime
  );

  computedTime.push(milliseconds / 10);

  function getTimeUnit(millisecsLeft, baseMillisecs) {
    let remainder = millisecsLeft % baseMillisecs;
    const time = (millisecsLeft - remainder) / baseMillisecs;
    computedTime.push(time);
    return remainder;
  }

  return computedTime.map(convertTimeToString).join(":");
}

function convertTimeToString(time) {
  let timeString = "00";

  if (time > 0) {
    timeString = `${time < 10 ? "0" : ""}${time}`;
  }

  return timeString;
}

export default function TimeChallenge({ title, targetTime }) {
  let timer = useRef();
  const modal = useRef();

  const targetMillisecs = targetTime * 1000;

  const [elapsedMilliseconds, updateElapsedMilliseconds] = useState(0);
  const remainingTime = targetMillisecs - elapsedMilliseconds;
  const timerExpired = remainingTime <= 0 || remainingTime > targetMillisecs;
  const timerIsActive = timer.current !== undefined;

  function handleStart() {
    timer.current = setInterval(() => {
      updateElapsedMilliseconds((totalElapsedTime) => totalElapsedTime + 10);
    }, 10);
  }

  function invalidateTimer() {
    clearInterval(timer.current);
    timer.current = undefined;
    modal.current.open();
  }

  function resetTimer() {
    updateElapsedMilliseconds(0);
  }

  if (timerExpired) {
    invalidateTimer();
  }

  return (
    <>
      <ResultModal
        ref={modal}
        targetTime={targetTime}
        remainingTime={remainingTime}
        result={timerExpired ? "lost" : "won"}
        onClose={resetTimer}
      />
      <div className="challenge">
        <h2>{title}</h2>
        <p className="challenge-time">
          {targetTime} second{targetTime >= 1 ? "s" : ""}
        </p>
        {timerIsActive && (
          <p className={"active"}>{`${convertToTime(remainingTime)}`}</p>
        )}
        <p>
          <button onClick={timerIsActive ? invalidateTimer : handleStart}>
            {`${timerIsActive ? "Stop" : "Start"} Challenge`}
          </button>
        </p>
        <p className={timerIsActive ? "active" : undefined}>
          {`Time${timerIsActive ? " is running" : "r is inactive"}.`}
        </p>
      </div>
    </>
  );
}
