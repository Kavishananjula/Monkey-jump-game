import { configureStore } from '@reduxjs/toolkit';
import monkeyReducer from './monkey/monkeySlice';
import obstacleReducer from './obstacle/obstacleSlice';
import engineReducer from './engine/engineSlice'
import authReducer from './auth/authSlice'
import scoreReducer from "./score/scoreSlice"

export const store = configureStore({
  reducer: {
    mario: monkeyReducer,
    obstacle: obstacleReducer,
    engine: engineReducer,
    auth: authReducer,
    scores: scoreReducer,
  },
});
