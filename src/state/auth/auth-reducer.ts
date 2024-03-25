import { Dispatch } from "redux";
import {
  SetErrorActionType,
  SetStatusActionType,
  setStatusAC,
} from "../app/app-reducer";
import { LoginParamsType, authAPI } from "../../api/todolist-api";
import {
  handleServerAppError,
  handleServerNetworkError,
} from "../../utils/error-utils";
import { ClearTodolistDataActionType, clearTodolistDataAC } from "../todolists/todolists-reducer";

const initialState = {
  isLoggedIn: false,
};
type InitialStateType = typeof initialState;

export const authReducer = (
  state: InitialStateType = initialState,
  action: ActionsType
): InitialStateType => {
  switch (action.type) {
    case "LOGIN/SET-IS-LOGGED-IN":
      return { ...state, isLoggedIn: action.value };
    default:
      return state;
  }
};
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({ type: "LOGIN/SET-IS-LOGGED-IN", value } as const);

// thunks
export const login =
  (data: LoginParamsType) => (dispatch: Dispatch<ActionsType>) => {
    dispatch(setStatusAC("loading"));
    authAPI
      .login(data)
      .then(res => {
        if (res.data.resultCode === 0) {
          dispatch(setIsLoggedInAC(true));
          dispatch(setStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch);
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch);
      });
  };

export const logout = () => (dispatch: Dispatch<ActionsType>) => {
  dispatch(setStatusAC("loading"));
  authAPI
    .logout()
    .then(res => {
      if (res.data.resultCode === 0) {
        dispatch(setIsLoggedInAC(false));
        dispatch(clearTodolistDataAC())
        dispatch(setStatusAC("succeeded"));
      } else {
        handleServerAppError(res.data, dispatch);
      }
    })
    .catch(error => {
      handleServerNetworkError(error, dispatch);
    });
};

// types
export type SetIsLoggedInActionType = ReturnType<typeof setIsLoggedInAC>;

type ActionsType =
  | SetIsLoggedInActionType
  | SetStatusActionType
  | SetErrorActionType
  | ClearTodolistDataActionType;
