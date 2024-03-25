import { Dispatch } from "redux";
import { authAPI } from "../../api/todolist-api";
import { setIsLoggedInAC } from "../auth/auth-reducer";

const initialState: InitialStateType = {
  status: "idle",
  error: null,
  isInitialized: false
};

export const appReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "APP/SET-STATUS":
      return { ...state, status: action.status };
    case "APP/SET-ERROR":
      return { ...state, error: action.error };
    case "APP/SET-IS-INITIALIZED":
      return { ...state, isInitialized: action.value };
    default:
      return { ...state };
  }
};

// actions
export const setErrorAC = (error: string | null) =>
  ({ type: "APP/SET-ERROR", error } as const);

export const setStatusAC = (status: RequestStatusType) =>
  ({ type: "APP/SET-STATUS", status } as const);

export const setIsInitializedAC = (value: boolean) =>
  ({ type: "APP/SET-IS-INITIALIZED", value } as const);
  
// thunks
export const initializeApp = () => (dispatch: Dispatch) => {
  authAPI.me().then(res => {
    if (res.data.resultCode === 0) {
      dispatch(setIsLoggedInAC(true));
    } else {

    }
    dispatch(setIsInitializedAC(true));
  })
}

// types
export type SetErrorActionType = ReturnType<typeof setErrorAC>
export type SetStatusActionType = ReturnType<typeof setStatusAC>
export type SetIsInitializedACActionType = ReturnType<typeof setIsInitializedAC>

type ActionsType = 
  | SetErrorActionType
  | SetStatusActionType
  | SetIsInitializedACActionType;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

export type InitialStateType = {
  status: RequestStatusType;
  error: string | null;
  isInitialized: boolean;
};
