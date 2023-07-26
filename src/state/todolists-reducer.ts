import { v1 } from "uuid";
import { FilterValuesType, TodoListType } from "../AppRedux";

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  id: string;
  title: string;
};

export type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  id: string;
};

export type ChangeTodolistTitleActionType = {
  type: "CHANGE-TODOLIST-TITLE";
  id: string;
  title: string;
};

export type ChangeTodolistFilterActionType = {
  type: "CHANGE-TODOLIST-FILTER";
  id: string;
  filter: FilterValuesType;
};

type ActionsType =
  | AddTodolistActionType
  | RemoveTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType;

const initialState: TodoListType[] = []

export const todolistsReducer = (
  state: TodoListType[] = initialState,
  action: ActionsType
): TodoListType[] => {
  switch (action.type) {
    case "ADD-TODOLIST": {
      return [
        {
          id: action.id,
          title: action.title,
          filter: "all",
        },
        ...state
      ];
    }
    case "REMOVE-TODOLIST": {
      return state.filter(todo => todo.id !== action.id);
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todoList = state.find(todo => todo.id === action.id);
      if (todoList) {
        todoList.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todoList = state.find(todo => todo.id === action.id);
      if (todoList) {
        todoList.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title, id: v1() };
};

export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todolistId };
};

export const сhangeTodolistTitleAC = (
  id: string,
  title: string
): ChangeTodolistTitleActionType => {
  return { type: "CHANGE-TODOLIST-TITLE", id, title };
};

export const сhangeTodolistFilterAC = (
  id: string,
  filter: FilterValuesType
): ChangeTodolistFilterActionType => {
  return { type: "CHANGE-TODOLIST-FILTER", id, filter };
};
