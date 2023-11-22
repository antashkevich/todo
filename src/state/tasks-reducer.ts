import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { TasksType } from "../components/Todolist/Todolist";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todoListId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  title: string;
  todoListId: string;
};

export type ChangeStatusTaskActionType = {
  type: "CHANGE-STATUS-TASK";
  taskId: string;
  todoListId: string;
  isDone: boolean;
};

export type ChangeTitleTaskActionType = {
  type: "CHANGE-TITLE-TASK";
  taskId: string;
  todoListId: string;
  title: string;
};

type ActionsType =
  | RemoveTaskActionType
  | AddTaskActionType
  | ChangeStatusTaskActionType
  | ChangeTitleTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType;

const initialState: TasksType = {};

export const tasksReducer = (
  state: TasksType = initialState,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case "ADD-TASK": {
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      let tasks = state[action.todoListId];
      let newTasks = [newTask, ...tasks];
      state[action.todoListId] = newTasks;
      return ({...state});
    }
    case "REMOVE-TASK": {
      const tasks = state[action.todoListId];
      let newTasks = tasks.filter(
        task => task.id !== action.taskId
      );
      state[action.todoListId] = newTasks
      return ({...state});
    }
    case "CHANGE-STATUS-TASK": {
      let tasks = state[action.todoListId];
      let newTasks = tasks.map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
      state[action.todoListId] = newTasks
      return ({...state});
    }
    case "CHANGE-TITLE-TASK": {
      let tasks = state[action.todoListId];
      let newTasks = tasks.map(task => task.id === action.taskId ? {...task, title: action.title} : task)
      state[action.todoListId] = newTasks
      return ({...state});
    }
    case "ADD-TODOLIST": {
      state[action.id] = [];
      return ({...state});
    }
    case "REMOVE-TODOLIST": {
      delete state[action.id];
      return ({...state});
    }
    default:
      return state;
  }
};

export const removeTaskAC = (
  todoListId: string,
  taskId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", todoListId, taskId };
};

export const addTaskAC = (
  todoListId: string,
  title: string
): AddTaskActionType => {
  return { type: "ADD-TASK", todoListId, title };
};

export const changeStatusTaskAC = (
  todoListId: string,
  taskId: string,
  isDone: boolean
): ChangeStatusTaskActionType => {
  return { type: "CHANGE-STATUS-TASK", todoListId, taskId, isDone };
};

export const changeTitleTaskAC = (
  todoListId: string,
  taskId: string,
  title: string,
): ChangeTitleTaskActionType => {
  return { type: "CHANGE-TITLE-TASK", todoListId, taskId, title };
};
