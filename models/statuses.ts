export type BasicStatus =
  | InitialStatus
  | LoadingStatus
  | SuccessStatus
  | ErrorStatus;

export interface InitialStatus {
  type: "initial";
}

export interface LoadingStatus {
  type: "loading";
}

export interface SuccessStatus {
  type: "success";
}

export interface ErrorStatus {
  type: "error";
  message: string;
}
