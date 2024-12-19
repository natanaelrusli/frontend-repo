import { createAction } from "@reduxjs/toolkit";
import { ProgressState } from "./types";

// Define the action to set the progress state
export const setAuthState = createAction<ProgressState>("progressState/setAuthState");
