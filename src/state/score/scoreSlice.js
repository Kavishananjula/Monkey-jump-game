import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { saveUserScore, getTopScores } from "../../firestoreService";

export const fetchTopScores = createAsyncThunk("scores/fetchTopScores", async () => {
  const topScores = await getTopScores();
  return topScores;
});

export const saveScore = createAsyncThunk("scores/saveScore", async ({ userId, email, score }) => {
  console.log("score from slice: ", score);
  await saveUserScore(userId, email, score);
  return { userId, score };
});

const scoreSlice = createSlice({
  name: "scores",
  initialState: {
    topScores: [],
    loading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTopScores.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTopScores.fulfilled, (state, action) => {
        state.topScores = action.payload;
        state.loading = false;
      })
      .addCase(fetchTopScores.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default scoreSlice.reducer;
