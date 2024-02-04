import { TodolistType, todolistAPI } from "../../api/todolist-api";
import { Dispatch } from "redux";
import {
  RequestStatusType,
  SetStatusActionType,
  setStatusAC,
} from "../app/app-reducer";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case "TODOLISTS/SET-TODOLISTS":
      return action.todolists.map(todolist => ({
        ...todolist,
        filter: "all",
        entityStatus: "idle",
      }));

    case "TODOLISTS/ADD-TODOLIST":
      return [
        { ...action.todoList, filter: "all", entityStatus: "idle" },
        ...state,
      ];

    case "TODOLISTS/REMOVE-TODOLIST":
      return state.filter(todolist => todolist.id !== action.id);

    case "TODOLISTS/CHANGE-TODOLIST-TITLE":
      return state.map(todolist =>
        todolist.id === action.id
          ? { ...todolist, title: action.title }
          : todolist
      );

    case "TODOLISTS/CHANGE-TODOLIST-FILTER":
      return state.map(todolist =>
        todolist.id === action.id
          ? { ...todolist, filter: action.filter }
          : todolist
      );

    case "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS":
      return state.map(todolist =>
        todolist.id === action.id
          ? { ...todolist, entityStatus: action.status }
          : todolist
      );

    default:
      return state;
  }
};

// actions
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: "TODOLISTS/SET-TODOLISTS", todolists } as const);

export const addTodolistAC = (todoList: TodolistType) =>
  ({ type: "TODOLISTS/ADD-TODOLIST", todoList } as const);

export const removeTodolistAC = (todoListId: string) =>
  ({ type: "TODOLISTS/REMOVE-TODOLIST", id: todoListId } as const);

export const changeTodolistTitleAC = (id: string, title: string) =>
  ({ type: "TODOLISTS/CHANGE-TODOLIST-TITLE", id, title } as const);

export const changeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: "TODOLISTS/CHANGE-TODOLIST-FILTER", id, filter } as const);

export const changeTodolistEntityStatusAC = (id: string, status: RequestStatusType) =>
  ({ type: "TODOLISTS/CHANGE-TODOLIST-ENTITY-STATUS", id, status } as const);

// thunks
export const fetchTodolists =
  () => (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC("loading"));
    todolistAPI.getTodolists().then(res => {
      dispatch(setTodolistsAC(res.data));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const addTodolist =
  (title: string) =>
  (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC("loading"));
    todolistAPI.createTodolist(title).then(res => {
      dispatch(addTodolistAC(res.data.data.item));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const removeTodolist =
  (todoListId: string) =>
  (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC("loading"));
    dispatch(changeTodolistEntityStatusAC(todoListId, "loading"));
    todolistAPI.deleteTodolist(todoListId).then(res => {
      dispatch(removeTodolistAC(todoListId));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const changeTodolistTitle =
  (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(id, title).then(res => {
      dispatch(changeTodolistTitleAC(id, title));
    });
  };

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
};

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof changeTodolistTitleAC>
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistEntityStatusAC>;
