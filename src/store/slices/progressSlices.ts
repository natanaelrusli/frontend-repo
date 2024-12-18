import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
export interface Progress {
  progressState: ProgressState;
}

type ProgressState = 'loading' | 'error' | 'success' | '';

const initialState: Progress = {
  progressState: 'loading',
};

export const progressSlice = createSlice({
  name: "progressState",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<ProgressState>) => {
      state.progressState = action.payload;
    },
  },
});

export const { setAuthState } = progressSlice.actions;
export const progressReducer = progressSlice.reducer;