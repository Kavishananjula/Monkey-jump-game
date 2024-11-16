import { useEffect, useState } from "react";
import "./LoadingScreen.css";
import { setLoadingScreen } from "../../state/engine/engineSlice";
import { useDispatch } from "react-redux";

export const LoadingScreen = () => {
  const [isReady, setIsReady] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    setTimeout(() => {
      setIsReady(true);
    }, 5000);
  }, []);

  return (
    <div className="loading-screen-container ">
      
      {!isReady && <h1 className="loading-title shadow-2xl mt-[35rem] ">Loading...</h1>}
      {isReady && (
        <button
          className="enter-button shadow-2xl mt-[35rem]"
          onClick={() => dispatch(setLoadingScreen(false))}
        >
          ENTER
        </button>
      )}
    </div>
  );
};

