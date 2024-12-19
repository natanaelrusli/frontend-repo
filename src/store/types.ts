export interface Progress {
  progressState: ProgressState;
  message?: string;
}

export type ProgressState = "loading" | "error" | "success" | "";
