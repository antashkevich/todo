import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsACtionType,
} from "./todolists-reducer";
import { TaskPriorities, TaskStatuses, TaskType, TaskUpdateType, todolistAPI } from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootState } from "./store";

export type RemoveTaskActionType = {
  type: "REMOVE-TASK";
  todoListId: string;
  taskId: string;
};

export type AddTaskActionType = {
  type: "ADD-TASK";
  task: TaskType;
};

export type UpdateTaskActionType = {
  type: "UPDATE-TASK";
  taskId: string;
  todoListId: string;
  model: TaskUpdateModelType;
};

export type SetTaskActionType = {
  type: "SET-TASKS";
  tasks: TaskType[];
  todoListId: string;
};

type ActionsType =
  | SetTaskActionType
  | AddTaskActionType
  | RemoveTaskActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsACtionType;

export type TasksStateType = {
  [key: string]: TaskType[];
};

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK": {
      const newTask: TaskType = action.task;
      let tasks = state[newTask.todoListId];
      let newTasks = [newTask, ...tasks];
      state[newTask.todoListId] = newTasks;
      return { ...state };
    }
    case "REMOVE-TASK": {
      const tasks = state[action.todoListId];
      let newTasks = tasks.filter(task => task.id !== action.taskId);
      state[action.todoListId] = newTasks;
      return { ...state };
    }
    case "UPDATE-TASK": {
      let tasks = state[action.todoListId];
      let newTasks = tasks.map(task =>
        task.id === action.taskId ? { ...task, ...action.model } : task
      );
      state[action.todoListId] = newTasks;
      return { ...state };
    }
    case "SET-TASKS": {
      state[action.todoListId] = action.tasks;
      return {...state}
    }
    case "SET-TODOLISTS": {
      action.todolists.forEach(todo => {
        state[todo.id] = []
      });
      return {...state}
    }
    case "ADD-TODOLIST": {
      state[action.todoList.id] = [];
      return { ...state };
    }
    case "REMOVE-TODOLIST": {
      delete state[action.id];
      return { ...state };
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

export const addTaskAC = (task: TaskType): AddTaskActionType => {
  return { type: "ADD-TASK", task };
};

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  model: TaskUpdateModelType
): UpdateTaskActionType => {
  return { type: "UPDATE-TASK", todoListId, taskId, model };
};

export const setTaskAC = (
  tasks: TaskType[],
  todoListId: string
): SetTaskActionType => {
  return { type: "SET-TASKS", tasks, todoListId }
}

export const fetchTasks = (todoListId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.getTasks(todoListId)
      .then(res => {
        dispatch(setTaskAC(res.data.items, todoListId))
      })
  }
};

export const removeTask = (todoListId: string, taskId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.deleteTask(todoListId, taskId)
      .then(res => {
        dispatch(removeTaskAC(todoListId, taskId))
      })
  }
};

export const addTask = (title: string, todoListId: string) => {
  return (dispatch: Dispatch) => {
    todolistAPI.createTask(title, todoListId)
      .then(res => {
        dispatch(addTaskAC(res.data.data.item))
      })
  }
};

export type TaskUpdateModelType = {
  title?: string,
  description?: string,
  status?: TaskStatuses,
  priority?: TaskPriorities,
  startDate?: string,
  deadline?: string,
  id?: string,
  todoListId?: string,
  order?: number,
  addedDate?: string
}

export const updateTask = (
  todoListId: string,
  taskId: string,
  model: TaskUpdateModelType) => {
  return (dispatch: Dispatch, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todoListId].find(task => task.id === taskId)
    if (!task) {
      throw new Error("task not found in thr state");
      console.log("task not found in thr state");
      return
    }

    const apiModel: TaskUpdateType = {
      title: task.title,
      description: task.description,
      status: task.status,
      priority: TaskPriorities.Low,
      startDate: task.startDate,
      deadline: task.deadline,
      id: task.id,
      todoListId: task.todoListId,
      order: task.order,
      addedDate: task.addedDate,
      ...model
    }
    todolistAPI.updateTask(todoListId, taskId, apiModel)
      .then(res => {
        dispatch(updateTaskAC(todoListId, taskId, model))
      })
  }
};
