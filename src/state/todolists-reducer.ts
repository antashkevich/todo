import { v1 } from "uuid";
import { TodolistType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";

export type SetTodolistsACtionType = {
  type: "SET-TODOLISTS";
  todolists: TodolistType[]
};

export type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  todoList: TodolistType
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
  | ChangeTodolistFilterActionType
  | SetTodolistsACtionType;

const initialState: TodolistDomainType[] = []

export type FilterValuesType = "all" | "active" | "completed";

export type TodolistDomainType = TodolistType & {
  filter: FilterValuesType
}

export const todolistsReducer = (
  state: TodolistDomainType[] = initialState,
  action: ActionsType
): TodolistDomainType[] => {
  switch (action.type) {
    case "SET-TODOLISTS": {
      return action.todolists.map(todo => {
        return {
          ...todo,
          filter: "all"
        }
      });
    }
    case "ADD-TODOLIST": {
      const newTodoList: TodolistDomainType = {...action.todoList, filter: 'all'};
      return [ newTodoList, ...state];
    }
    case "REMOVE-TODOLIST": {
      return state.filter(todo => todo.id !== action.id);
    }
    case "CHANGE-TODOLIST-TITLE": {
      const todolist = state.find(todo => todo.id === action.id);
      if (todolist) {
        todolist.title = action.title;
      }
      return [...state];
    }
    case "CHANGE-TODOLIST-FILTER": {
      const todolist = state.find(todo => todo.id === action.id);
      if (todolist) {
        todolist.filter = action.filter;
      }
      return [...state];
    }
    default:
      return state;
  }
};

export const setTodolistsAC = (
  todolists: TodolistType[]
): SetTodolistsACtionType => {
  return { type: "SET-TODOLISTS", todolists };
};

export const addTodolistAC = (todoList: TodolistType): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", todoList };
};

export const removeTodolistAC = (
  todoListId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", id: todoListId };
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

export const fetchTodolists = () => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTodolists()
      .then(res => {
        dispatch(setTodolistsAC(res.data))
      })
  }
};

export const addTodolist = (title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTodolist(title)
      .then(res => {
        dispatch(addTodolistAC(res.data.data.item))
      })
  }
};

export const removeTodolist = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTodolist(todoListId)
      .then(res => {
        dispatch(removeTodolistAC(todoListId))
      })
  }
};

export const сhangeTodolistTitle = (id: string, title: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.updateTodolist(id, title)
      .then(res => {
        dispatch(сhangeTodolistTitleAC(id, title))
      })
  }
};
