import {
  AddTodolistActionType,
  RemoveTodolistActionType,
  SetTodolistsActionType,
} from "../todolists/todolists-reducer";
import {
  TaskPriorities,
  TaskStatuses,
  TaskType,
  TaskUpdateType,
  todolistAPI,
} from "../../api/todolist-api";
import { Dispatch } from "redux";
import { AppRootState } from "../store";
import { setErrorAC, SetErrorActionType, setStatusAC, SetStatusActionType } from "../app/app-reducer";
import { handleServerAppError, handleServerNetworkError } from "../../utils/error-utils";

const initialState: TasksStateType = {};

export const tasksReducer = (
  state: TasksStateType = initialState,
  action: ActionsType
): TasksStateType => {
  switch (action.type) {
    case "TASKS/ADD-TASK":
      return {
        ...state,
        [action.task.todoListId]: [
          action.task,
          ...state[action.task.todoListId],
        ],
      };

    case "TASKS/REMOVE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].filter(
          task => task.id !== action.taskId
        ),
      };

    case "TASKS/UPDATE-TASK":
      return {
        ...state,
        [action.todoListId]: state[action.todoListId].map(task =>
          task.id === action.taskId ? { ...task, ...action.model } : task
        ),
      };

    case "TASKS/SET-TASKS":
      return { ...state, [action.todoListId]: action.tasks };

    case "TODOLISTS/SET-TODOLISTS": {
      const copyState = { ...state };
      action.todolists.forEach(todolist => {
        copyState[todolist.id] = [];
      });
      return copyState;
    }

    case "TODOLISTS/ADD-TODOLIST":
      return { ...state, [action.todoList.id]: [] };

    case "TODOLISTS/REMOVE-TODOLIST": {
      const copyState = { ...state };
      delete copyState[action.id];
      return copyState;
    }

    default:
      return state;
  }
};

// actions
export const removeTaskAC = (todoListId: string, taskId: string) =>
  ({ type: "TASKS/REMOVE-TASK", todoListId, taskId } as const);

export const addTaskAC = (task: TaskType) =>
  ({ type: "TASKS/ADD-TASK", task } as const);

export const updateTaskAC = (
  todoListId: string,
  taskId: string,
  model: TaskUpdateModelType
) => ({ type: "TASKS/UPDATE-TASK", todoListId, taskId, model } as const);

export const setTaskAC = (tasks: TaskType[], todoListId: string) =>
  ({ type: "TASKS/SET-TASKS", tasks, todoListId } as const);

// thunks
export const fetchTasks =
  (todoListId: string) => (dispatch: Dispatch<ActionsType | SetStatusActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.getTasks(todoListId).then(res => {
      dispatch(setTaskAC(res.data.items, todoListId));
      dispatch(setStatusAC("succeeded"));
    });
  };

export const removeTask =
  (todoListId: string, taskId: string) => (dispatch: Dispatch<ActionsType>) => {
    todolistAPI.deleteTask(todoListId, taskId).then(res => {
      dispatch(removeTaskAC(todoListId, taskId));
    });
  };

export const addTask =
  (title: string, todoListId: string) => (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>) => {
    dispatch(setStatusAC("loading"))
    todolistAPI.createTask(title, todoListId)
      .then(res => {
        if(res.data.resultCode === 0) {
          dispatch(addTaskAC(res.data.data.item));
          dispatch(setStatusAC("succeeded"));
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
  };

export const updateTask =
  (todoListId: string, taskId: string, model: TaskUpdateModelType) =>
  (dispatch: Dispatch<ActionsType | SetErrorActionType | SetStatusActionType>, getState: () => AppRootState) => {
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
    todolistAPI.updateTask(todoListId, taskId, apiModel)
      .then(res => {
        if(res.data.resultCode === 0) {
          dispatch(updateTaskAC(todoListId, taskId, model));
        } else {
          handleServerAppError(res.data, dispatch)
        }
      })
      .catch(error => {
        handleServerNetworkError(error, dispatch)
      })
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
