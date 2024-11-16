import { BrowserRouter, Route, Routes, Navigate, useNavigate } from 'react-router-dom';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import {
  Mario,
  LoadingScreen,
  Score,
  MobileControls,
  Footer,
  BananaGame,
} from './components';
import {
  KeyMessages,
  Bricks,
  Sun,
  Clouds,
  Birds,
  Obstacles,
} from './components/gameBackground';
import { setPause, setReady } from './state/engine/engineSlice';
import { useEffect, useState, useMemo } from 'react';
import SignUp from './components/signup/signup';
import Signin from './components/signin/signin';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';
import { setUser } from './state/auth/authSlice';
import Header from './components/header/header';
import backgroundMusic from "./assets/audio/bgMusic.mp3";
import Leaderboard from './components/leaderBoard/leaderboard';

let count = 1;



function Home() {
  const dispatch = useDispatch();
  const isPlay = useSelector((state) => state.engine.play);
  const isPause = useSelector((state) => state.engine.pause);
  const score = useSelector((state) => state.engine.score);

  const isLoading = useSelector((state) => state.engine.loadingScreen);

  const bgMusic = useMemo(() => {
    const audio = new Audio(backgroundMusic);
    audio.loop = true;  // Enable looping
    return audio;
  }, []);

  const navigate = useNavigate();

  // Move state update logic to useEffect
  useEffect(() => {
    console.log(count);
    if (score > 100 * count) {
      count++;
      dispatch(setReady(false));
      dispatch(setPause(true));
      // navigate("/banana-game")
    }


    // bgMusic.play()  




  }, [score, dispatch, bgMusic]); // Dependencies to trigger the effect when score changes

  return (
    <>
      {isLoading && <LoadingScreen />}
      {isPause && <BananaGame />}
      <div className={!isPause ? "App" : ""}>
        {!isPlay && score === 0 && <KeyMessages />}
        {!isPause && <Bricks />}
        {!isPause && <Sun />}
        {<Mario />}
        {!isPause && <Clouds />}
        {!isPause && <Birds />}
        {<Obstacles />}
        <Score />
      </div>
      <MobileControls />
      <Footer />
    </>
  );
}

function App() {

  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  //   console.log(user);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        dispatch(setUser(
          {
            uid: currentUser.uid,
            email: currentUser.email,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          }
        ));
      } else {
        // If no user is logged in, clear the state
        dispatch(setUser(null));
      }
      setLoading(false);
    });
    // Cleanup subscription on component unmount
    return () => unsubscribe();
  }, [dispatch]);

  if (loading) {
    // Show a loading indicator while checking auth state
    return <div>Loading...</div>;
  }

  console.log(user != null ? true : false);
  return (
    <BrowserRouter>
      {(user != null) && <Header />}
      <Routes>
        <Route path="/" element={(user != null) ? <Home /> : <Signin />} />
        {/* <Route path="/signin" element={<Signin />} /> */}
        <Route path="/signup" element={<SignUp />} />
        {/* <Route path="/banana-game" element={<BananaGame />} /> */}
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="*" element={<Navigate to="/signin" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
