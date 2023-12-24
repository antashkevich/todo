import { v1 } from "uuid";
import { TodolistType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";

const initialState: TodolistDomainType[] = [];

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS":
      return action.todolists.map(todolist => ({ ...todolist, filter: "all" }));

    case "ADD-TODOLIST":
      return [{ ...action.todoList, filter: "all" }, ...state];

    case "REMOVE-TODOLIST":
      return state.filter(todolist => todolist.id !== action.id);

    case "CHANGE-TODOLIST-TITLE":
      return state.map(todolist =>
        todolist.id === action.id
          ? { ...todolist, title: action.title }
          : todolist
      );

    case "CHANGE-TODOLIST-FILTER":
      return state.map(todolist =>
        todolist.id === action.id
          ? { ...todolist, filter: action.filter }
          : todolist
      );

    default:
      return state;
  }
};

// actions
export const setTodolistsAC = (todolists: TodolistType[]) =>
  ({ type: "SET-TODOLISTS", todolists } as const);

export const addTodolistAC = (todoList: TodolistType) =>
  ({ type: "ADD-TODOLIST", todoList } as const);

export const removeTodolistAC = (todoListId: string) =>
  ({ type: "REMOVE-TODOLIST", id: todoListId } as const);

export const сhangeTodolistTitleAC = (id: string, title: string) =>
  ({ type: "CHANGE-TODOLIST-TITLE", id, title } as const);

export const сhangeTodolistFilterAC = (id: string, filter: FilterValuesType) =>
  ({ type: "CHANGE-TODOLIST-FILTER", id, filter } as const);

// thunks
export const fetchTodolists = () => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.getTodolists().then(res => {
    dispatch(setTodolistsAC(res.data));
  });
};

export const addTodolist = (title: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.createTodolist(title).then(res => {
    dispatch(addTodolistAC(res.data.data.item));
  });
};

export const removeTodolist = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.deleteTodolist(todoListId).then(res => {
    dispatch(removeTodolistAC(todoListId));
  });
};

export const сhangeTodolistTitle =
  (id: string, title: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.updateTodolist(id, title).then(res => {
      dispatch(сhangeTodolistTitleAC(id, title));
    });
  };

// types
export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType;
};

export type SetTodolistsActionType = ReturnType<typeof setTodolistsAC>;

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>;

export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>;

type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType
  | ReturnType<typeof сhangeTodolistTitleAC>
  | ReturnType<typeof сhangeTodolistFilterAC>;
