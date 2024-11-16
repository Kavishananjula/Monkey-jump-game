import { useEffect, useState } from 'react';
import './BananaGame.css';
import { useDispatch, useSelector } from 'react-redux';
import { setScore, setReady, setPause } from '../../state/engine/engineSlice';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const BananaGame = () => {
  const score = useSelector((state) => state.engine.score);
  // const play = useSelector(state => state.engine.play);
  const dispatch = useDispatch();
  const [data, setData] = useState();

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const result = await fetch('/uob/banana/api.php?out=json');
    const data = await result.json();
    setData(data);
    console.log(data);
  };

  const [answer, setAnswer] = useState(0);
  // Function to handle changes in the input field
  const handleInputChange = (event) => {
    const value = event.target.value;
    setAnswer(value);
  };

  const navigate = useNavigate();

  const handleCheck = () => {
    console.log(answer);
    console.log(data.solution);

    if (data.solution == answer) {
      // Show a toast immediately to inform the user the answer is correct
      toast.success('Answer is correct!');

      // Add a 2-second delay before dispatching the actions
      setTimeout(() => {
        console.log('correct');
        dispatch(setScore(score + 10));
        dispatch(setReady(true));
        dispatch(setPause(false));
        // navigate("/");
      }, 500);
    } else {
      toast.error('Answer is incorrect!');
    }
    
  };

  return (
    <div className="banana-game pb-36  bg-neutral-300">
      {data && <img className="banana-game-image mx-auto mt-36 z-50" src={data.question} alt="" />}
      <div className=' flex flex-row justify-center z-50'>
        <h2 className='font-bold text-black text-3xl'>Enter the number should be at Banana</h2>
        <input
          className=" ms-5 border-black border-2"
          autoFocus
          type="number"
          min="0"
          max="9"
          onChange={handleInputChange}
        />
      </div>
      <button className=' z-50' onClick={handleCheck}>check</button>
    </div>
  );
};
