import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setScore, setLastScore } from "../../state/engine/engineSlice";
import "./Score.css";

export const Score = () => {
  const score = useSelector((state) => state.engine.score);
  const lastScore = useSelector((state) => state.engine.lastScore);
  const play = useSelector((state) => state.engine.play);
  const die = useSelector((state) => state.engine.die);
  const level = useSelector((state) => state.engine.level); // Assuming level is in your state
  const dispatch = useDispatch();

  useEffect(() => {
    if (play && !die) {
      const timer = setTimeout(() => {
        dispatch(setScore(score + 1));
      }, 100);
      return () => clearTimeout(timer);
    }
    if (score && !play) {
      dispatch(setLastScore(score));
    }
  }, [dispatch, play, score, lastScore, die]);

  const handlePauseResume = () => {
    // Toggle play state
    dispatch({ type: "engine/togglePlay" });
  };

  const handleRestart = () => {
    // Reset score and restart game
    dispatch({ type: "engine/resetGame" });
  };

  return (
    <div className="score-container">
      {/* Score Display */}
      {play && <p className="score text-black">Score: {score}</p>}
      {!play && <p className="score text-black">Score: {lastScore}</p>}

      {/* Start/Pause Button */}
      <button
        className={`action-button ${play ? "pause" : "restart"}`}
        onClick={handlePauseResume}
      >
        {play ? "Pause" : "Start"}
      </button>

      {/* Restart Button */}
      <button className="action-button restart" onClick={handleRestart}>
        Restart
      </button>

      {/* Level Display */}
      <div className="level">Level: {level || 1}</div>
    </div>
  );
};
