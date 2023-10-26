import { v1 } from "uuid";
import { AddTodolistActionType, RemoveTodolistActionType } from "./todolists-reducer";
import { TasksType } from "../Todolist";

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
    case "REMOVE-TASK": {
      const stateCopy = { ...state };
      const tasks = stateCopy[action.todoListId];
      stateCopy[action.todoListId] = tasks.filter(
        task => task.id !== action.taskId
      );
      return stateCopy;
    }
    case "CHANGE-STATUS-TASK": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      stateCopy[action.todoListId] = tasks.map(task => task.id === action.taskId ? {...task, isDone: action.isDone} : task)
      return stateCopy;
    }
    case "CHANGE-TITLE-TASK": {
      const stateCopy = { ...state };
      let tasks = stateCopy[action.todoListId];
      stateCopy[action.todoListId] = tasks.map(task => task.id === action.taskId ? {...task, title: action.title} : task)
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
