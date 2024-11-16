import "./Monkey.css";
import MonkeyCharacter from "../../assets/img/gif/monkey.gif";
import MonkeyReady from "../../assets/img/monkey_ready.png"
import MonkeyDie from "../../assets/img/monkey_die.png"
import { useEffect, useRef, useCallback, useMemo } from "react";
import jumpAudio from "../../assets/audio/mario-jump.mp3";
// redux
import { useDispatch, useSelector } from "react-redux";
import {
  monkeyJumping,
  monkeyHeight,
  monkeyLeft,
  monkeyTop,
  monkeyWidth,
} from "../../state/monkey/monkeySlice";
import { setReady, setDie, setScore } from "../../state/engine/engineSlice";
import { saveScore } from "../../state/score/scoreSlice"


import dieAudio from "../../assets/audio/mario-died.mp3";

export const Mario = () => {
  const marioRef = useRef();
  const dispatch = useDispatch();
  const die = useSelector((state) => state.engine.die);
  const loadingScreen = useSelector((state) => state.engine.loadingScreen);

  const isPlay = useSelector((state) => state.engine.play);
  // const isPause = useSelector((state) => state.engine.pause);
  // Mario positions & jump
  const mario_jump = useSelector((state) => state.mario.jumping);
  const mario_height = useSelector((state) => state.mario.height);
  const mario_left = useSelector((state) => state.mario.left);
  const mario_top = useSelector((state) => state.mario.top);
  const mario_width = useSelector((state) => state.mario.width);
  // Obstacle1 positions
  const obs1_height = useSelector((state) => state.obstacle.obs1Height);
  const obs1_left = useSelector((state) => state.obstacle.obs1Left);
  const obs1_top = useSelector((state) => state.obstacle.obs1Top);
  const obs1_width = useSelector((state) => state.obstacle.obs1Width);
  // Obstacle2 positions
  const obs2_height = useSelector((state) => state.obstacle.obs2Height);
  const obs2_left = useSelector((state) => state.obstacle.obs2Left);
  const obs2_top = useSelector((state) => state.obstacle.obs2Top);
  const obs2_width = useSelector((state) => state.obstacle.obs2Width);

  const isPause = useSelector((state) => state.engine.pause);

  const score = useSelector(state => state.engine.score);

  const { user } = useSelector((state) => state.auth);

  // Jump audio
  const jump = useMemo(() => {
    return new Audio(jumpAudio);
  }, []);

  // Die
  const marioDie = useMemo(() => {
    return new Audio(dieAudio);
  }, []);

  // Handling key press event.
  const handleKey = useCallback(
    (e) => {
      if (e.code === "Enter" && !isPlay && !die && !loadingScreen) {
        dispatch(setReady(true));
      }

      if (mario_jump === false && e.code === "Space" && isPlay && !die && !loadingScreen) {
        // dispatch(setReady(false));
        dispatch(monkeyJumping(true));
        jump.play();
        setTimeout(() => {
          dispatch(monkeyJumping(false));
          jump.pause();
          jump.currentTime = 0;
        }, 400);
      }
    },
    [mario_jump, jump, dispatch, isPlay, die, loadingScreen]
  );

  useEffect(() => {
    if (
      mario_left < obs1_left + obs1_width &&
      mario_left + mario_width > obs1_left &&
      mario_top < obs1_top + obs1_height &&
      mario_top + mario_height > obs1_top
    ) {
      dispatch(setDie(true));
      console.log(" I have died ", die);
      dispatch(saveScore({ userId: user.uid, email: user.email, score }));
      marioDie.play();
      dispatch(setReady(false));
      setTimeout(() => {
        dispatch(setDie(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setScore(0));
      }, 100);
    }

    if (
      mario_left < obs2_left + obs2_width &&
      mario_left + mario_width > obs2_left &&
      mario_top < obs2_top + obs2_height &&
      mario_top + mario_height > obs2_top
    ) {
      dispatch(setDie(true));
      marioDie.play();
      dispatch(setReady(false));
      setTimeout(() => {
        dispatch(setDie(false));
      }, 2000);
      setTimeout(() => {
        dispatch(setScore(0));
      }, 100);
    }
  }, [
    mario_left,
    obs1_left,
    obs1_width,
    mario_width,
    mario_top,
    obs1_top,
    obs1_height,
    mario_height,
    dispatch,
    marioDie,
    obs2_left,
    obs2_width,
    obs2_top,
    obs2_height,
  ]);

  useEffect(() => {
    document.addEventListener("keydown", handleKey);
    dispatch(monkeyHeight(marioRef.current.getBoundingClientRect().height));
    dispatch(monkeyLeft(marioRef.current.getBoundingClientRect().left));
    dispatch(monkeyTop(marioRef.current.getBoundingClientRect().top));
    dispatch(monkeyWidth(marioRef.current.getBoundingClientRect().width));

    // if (isPlay && !isPause && !bgMusicPlaying) {
    //   // Play bgMusic only if it's not already playing
    //   bgMusic.play().then(() => {
    //     // setBgMusicPlaying(true); // Set the flag to true once it starts
    //   }).catch((error) => {
    //     if (error.name !== "AbortError") {
    //       console.error("Error playing audio:", error);
    //     }
    //   });
    // } else if (!isPlay || isPause) {
    //   if (bgMusicPlaying) {
    //     bgMusic.pause();
    //     bgMusic.currentTime = 0; // Reset only when stopping
    //     setBgMusicPlaying(false); // Reset the flag
    //   }
    // }

    // Cleanup function to pause the music when the component unmounts

  }, [handleKey, dispatch]);

  return (
    <div className="monkey-container">
      {!die && (
        <img
          src={isPlay ? MonkeyCharacter : MonkeyReady}
          alt=""
          className={`monkey ${mario_jump && isPlay ? "jump" : isPause ? "hidden" : "block"}`}
          ref={marioRef}
        />
      )}
      {die && (
        <img
          src={MonkeyDie}
          alt=""
          className={`monkey ${die ? "die" : ""}`}
          ref={marioRef}
        />
      )}
    </div>
  );
};

