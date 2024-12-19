import { createReducer } from "@reduxjs/toolkit";
import { setAuthState } from "./actions";
import { Progress } from "./types";

const initialState: Progress = {
  progressState: "",
  message: ""
};

export const progressReducer = createReducer(initialState, (builder) => {
  builder.addCase(setAuthState, (state, action) => {
    state.progressState = action.payload.progressState;
    state.message = action.payload.message
  });
});
