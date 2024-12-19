import { createAction } from "@reduxjs/toolkit";
import { Progress } from "./types";

export const setAuthState = createAction<Progress>("progressState/setAuthState");
