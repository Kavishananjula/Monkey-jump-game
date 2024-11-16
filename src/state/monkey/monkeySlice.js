import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jumping: false,
  bottom: null,
  height: null,
  left: null,
  right: null,
  top: null,
  width: null,
  x: null,
  y: null,
};

export const monkeySlice = createSlice({
  name: "monkey",
  initialState,
  reducers: {
    monkeyJumping: (state, action) => {
      state.jumping = action.payload;
    },
    monkeyBottom: (state, action) => {
      state.bottom = action.payload;
    },
    monkeyHeight: (state, action) => {
      state.height = action.payload;
    },
    monkeyLeft: (state, action) => {
      state.left = action.payload;
    },
    monkeyRight: (state, action) => {
      state.right = action.payload;
    },
    monkeyTop: (state, action) => {
      state.top = action.payload;
    },
    monkeyWidth: (state, action) => {
      state.width = action.payload;
    },
    monkeyX: (state, action) => {
      state.x = action.payload;
    },
    monkeyY: (state, action) => {
      state.y = action.payload;
    },
  },
});

export const {
  monkeyJumping,
  monkeyBottom,
  monkeyHeight,
  monkeyLeft,
  monkeyRight,
  monkeyTop,
  monkeyWidth,
  monkeyX,
  monkeyY,
} = monkeySlice.actions;
export default monkeySlice.reducer;
