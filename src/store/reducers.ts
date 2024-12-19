import { createReducer } from "@reduxjs/toolkit";
import { setAuthState } from "./actions";
import { Progress } from "./types";

// Define the initial state
const initialState: Progress = {
  progressState: "",
};

// Define the reducer
export const progressReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuthState, (state, action) => {
    state.progressState = action.payload;
  });
});
