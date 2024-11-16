// import { useEffect, useState } from 'react';
import './Bricks.css';
import { useSelector } from "react-redux";

export const Bricks = () => {
  // const [isReady, setIsReady] = useState(false);
  const isPlay = useSelector((state) => state.engine.play);

  // Check if document is loaded before animating clouds
  // useEffect(() => {
  //   const setLoad = () => setIsReady(true);

  //   if (document.readyState === 'complete') {
  //     setLoad();
  //   } else {
  //     window.addEventListener('load', setLoad);

  //     // return cleanup function
  //     return () => window.removeEventListener('load', setLoad);
  //   }
  // }, []);

  return (
    <div className="bricks-container">
      <div className={isPlay ? 'brick brick-animate' : 'brick'} />
    </div>
  );
};

