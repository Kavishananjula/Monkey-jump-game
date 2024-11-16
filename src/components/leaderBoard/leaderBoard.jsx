import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTopScores } from "../../state/score/scoreSlice";
import cardBackgroundImage from "../../assets/img/leaderboard.png";
import { useNavigate } from "react-router-dom";

const Leaderboard = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { topScores, loading } = useSelector((state) => state.scores);

    useEffect(() => {
        dispatch(fetchTopScores());
    }, [dispatch]);

    const goHome = async () => {
        try {
          navigate('/');
        } catch (error) {
          console.error('Logout failed:', error);
        }
      };

    return (
        <div className="flex items-center justify-center h-screen">
            <div
                className="shadow-lg rounded-lg p-6 max-w-md w-full h-[500px]"
                style={{
                    backgroundImage: `url(${cardBackgroundImage})`,
                    backgroundSize: "cover",
                    backgroundBlendMode: "overlay",
                    boxShadow: "0 8px 24px rgba(0, 0, 0, 0.2)",
                }}
            >
                <h1 className="text-3xl font-bold text-center mb-4 text-black">
                    🏆 Leader Board 🏆
                </h1>

                {loading ? (
                    <div className="text-center text-xl font-bold">Loading...</div>
                ) : topScores && topScores.length > 0 ? (
                    <div className="overflow-y-auto max-h-80">
                        {topScores.map((user, index) => (
                            <div
                                key={index}
                                className="flex justify-between p-3 mb-2 bg-gray-100 opacity-75 rounded-md shadow-sm"
                            >
                                <span className="font-semibold">{user.email || "No Email"}</span>
                                <span className="text-blue-600">{user.score}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center text-gray-600 font-semibold">
                        No leaderboard available
                    </div>
                )}

                <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded mt-4 mx-auto block shadow-md transition duration-300 ease-in-out transform hover:scale-105"
                onClick={goHome}>
                    Play Again
                </button>
            </div>
        </div>
    );
};

export default Leaderboard;
