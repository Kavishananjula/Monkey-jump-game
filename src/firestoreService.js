// firestoreService.js
import { doc, setDoc, getDoc, collection, getDocs, query, orderBy, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

// Function to add or update user score
export const saveUserScore = async (userId, email, score) => {
  const userScoreRef = doc(db, "scores", userId);
  const userScoreDoc = await getDoc(userScoreRef);
  console.log("come Hear");
  if (userScoreDoc.exists()) {
    // If user score exists, update it if the new score is higher
    const existingScore = userScoreDoc.data().score;
    if (score > existingScore) {
      await updateDoc(userScoreRef, { score, email });
    }
  } else {
    // If no score exists, create a new document with email and score
    await setDoc(userScoreRef, { email, score });
  }
};

// Function to get top scores from the Firestore database
export const getTopScores = async () => {
  const scoresRef = collection(db, "scores");
  const topScoresQuery = query(scoresRef, orderBy("score", "desc"));
  const querySnapshot = await getDocs(topScoresQuery);

  const topScores = [];
  querySnapshot.forEach((doc) => {
    const { email, score } = doc.data();
    topScores.push({ id: doc.id, email, score });
  });

  return topScores;
};
