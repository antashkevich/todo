import { v1 } from "uuid";
import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "./todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TaskUpdateType,
  todolistAPI,
} from "../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootState } from "./store";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "REMOVE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          task => task.id !== action.taskId
        ),
      };

    case "UPDATE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };

    case "SET-TASKS":
      return { ...state, [action.todoListId]: action.tasks };

    case "SET-TODOLISTS": {
      const copyState = {...state}
      action.todolists.forEach(todolist => {
        copyState[todolist.id] = [];
      });
      return copyState;
    }

    case "ADD-TODOLIST":
      return { ...state, [action.todoList.id]: [] };

    case "REMOVE-TODOLIST": {
      const copyState = {...state}
      delete copyState[action.id];
      return copyState;
    }

    default:
      return state;
  }
};

// actions
export const removeTaskAC = (todoListId: string, taskId: string) =>
  ({ type: "REMOVE-TASK", todoListId, taskId } as const);

export const addTaskAC = (task: TaskType) =>
  ({ type: "ADD-TASK", task } as const);

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  model: TaskUpdateModelType
) => ({ type: "UPDATE-TASK", todoListId, taskId, model } as const);

export const setTaskAC = (tasks: TaskType[], todoListId: string) =>
  ({ type: "SET-TASKS", tasks, todoListId } as const);

// thunks
export const fetchTasks = (todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
  todolistAPI.getTasks(todoListId).then(res => {
    dispatch(setTaskAC(res.data.items, todoListId));
  });
};

export const removeTask =
  (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todoListId, taskId).then(res => {
      dispatch(removeTaskAC(todoListId, taskId));
    });
  };

export const addTask =
  (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.createTask(title, todoListId).then(res => {
      dispatch(addTaskAC(res.data.data.item));
    });
  };

export const updateTask =
  (todoListId: string, taskId: string, model: TaskUpdateModelType) =>
  (dispatch: Dispatch<ActionsType>, getState: () => AppRootState) => {
    const state = getState();
    const task = state.tasks[todoListId].find(task => task.id === taskId);
    if (!task) {
      throw new Error("task not found in thr state");
      console.log("task not found in thr state");
      return;
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
      ...model,
    };
    todolistAPI.updateTask(todoListId, taskId, apiModel).then(res => {
      dispatch(updateTaskAC(todoListId, taskId, model));
    });
  };

// types
type ActionsType =
  | ReturnType<typeof setTaskAC>
  | ReturnType<typeof addTaskAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | AddTodolistActionType
  | RemoveTodolistActionType
  | SetTodolistsActionType;

type TasksStateType = {
  [key: string]: TaskType[];
};

type TaskUpdateModelType = {
  title?: string;
  description?: string;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
  id?: string;
  todoListId?: string;
  order?: number;
  addedDate?: string;
};
