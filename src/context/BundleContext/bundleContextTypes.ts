export interface IBundleContextValues {
  state: IBundleState;
  onStartCodeTraspile: (cellId: string, input: string) => Promise<{ code: string, error: string } | undefined>;
  onCodeTraspilation: (res: { code: string, error: string } | undefined, cellId: string) => void;
}

export enum BundleActionTypes {
  BUNDLE_START,
  BUNDLE_COMPLETE,
  BUNDLE_RESET
}

export interface IBundleState {
  [key: string]: {
    loading: boolean;
    code: string,
    err: string
  } | undefined;
}

export type BundleAction = BundleStartAction | BundleCompleteAction;

export interface BundleReset {
  type: BundleActionTypes.BUNDLE_RESET
}

export interface BundleStartAction {
  type: BundleActionTypes.BUNDLE_START;
  payload: {
    cellId: string;
  };
}

export interface BundleCompleteAction {
  type: BundleActionTypes.BUNDLE_COMPLETE;
  payload: {
    cellId: string;
    bundle: {
      code: string;
      err: string;
    };
  };
}

interface IBundleResponse {
  code: string;
  error: string;
}

export type BundleResponse = IBundleResponse | undefined;