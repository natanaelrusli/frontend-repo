export interface Progress {
  progressState: ProgressState;
}

export type ProgressState = "loading" | "error" | "success" | "";
