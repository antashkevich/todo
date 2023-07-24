import { v1 } from "uuid";
import { TasksType } from "../App";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";

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

export const tasksReducer = (
  state: TasksType,
  action: ActionsType
): TasksType => {
  switch (action.type) {
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      stateCopy[action.todoListId] = tasks.filter(
        task => task.id !== action.taskId
      );
      return stateCopy;
    }
    case "ADD-TASK": {
      const stateCopy = { ...state };
      const newTask = {
        id: v1(),
        title: action.title,
        isDone: false,
      };
      let tasks = state[action.todoListId];
      let newTasks = [newTask, ...tasks];
      stateCopy[action.todoListId] = newTasks;
      return stateCopy;
    }
    case "CHANGE-STATUS-TASK": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      const task = tasks.find(task => task.id === action.taskId);
      if (task) {
        task.isDone = action.isDone;
      }
      return stateCopy;
    }
    case "CHANGE-TITLE-TASK": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      const task = tasks.find(task => task.id === action.taskId);
      if (task) {
        task.title = action.title;
      }
      return stateCopy;
    }
    case "ADD-TODOLIST": {
      const stateCopy = { ...state };
      stateCopy[action.id] = [];
      return stateCopy;
    }
    case "REMOVE-TODOLIST": {
      const stateCopy = { ...state };
      delete stateCopy[action.id];
      return stateCopy;
    }
    default:
      throw new Error("unknown action type");
  }
};

export const removeTaskAC = (
  taskId: string,
  todoListId: string
): RemoveTaskActionType => {
  return { type: "REMOVE-TASK", taskId, todoListId };
};

export const addTaskAC = (
  title: string,
  todoListId: string
): AddTaskActionType => {
  return { type: "ADD-TASK", title, todoListId };
};

export const changeStatusTaskAC = (
  taskId: string,
  isDone: boolean,
  todoListId: string
): ChangeStatusTaskActionType => {
  return { type: "CHANGE-STATUS-TASK", taskId, isDone, todoListId };
};

export const changeTitleTaskAC = (
  taskId: string,
  title: string,
  todoListId: string
): ChangeTitleTaskActionType => {
  return { type: "CHANGE-TITLE-TASK", taskId, title, todoListId };
};
