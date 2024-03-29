import axios from 'axios';
import { RequestStatusType } from '../state/app/app-reducer';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
      'API-KEY': '5e5b1cc6-18a5-4abc-93ba-f62481261c8a',
  },
})


// api
export const todolistAPI = {
  getTodolists() {
    return instance.get<TodolistType []>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodolistType }>>(`todo-lists`, {title});
  },

  deleteTodolist(todoListId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}`);
  },

  updateTodolist(todoListId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todoListId}`, { title });
  },

  getTasks(todoListId: string) {
    return instance.get<TasksType>(`todo-lists/${todoListId}/tasks`);
  },

  createTask(title: string, todoListId: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks`, {title});
  },

  updateTask(todoListId: string, taskId: string, model: TaskUpdateType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todoListId}/tasks/${taskId}`, model);
  },

  deleteTask(todoListId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todoListId}/tasks/${taskId}`);
  },

  reorderTask(todoListId: string, taskId: string, putAfterItemId: string) {
    return instance.put<ResponseType<{ items: TaskDomainType[] }>>(`todo-lists/${todoListId}/tasks/${taskId}/reorder`, { putAfterItemId });
  },
};

export const authAPI = {
  login(data: LoginParamsType) {
    return instance.post<ResponseType<{ userId?: number }>>(`auth/login`, data);
  },

  logout() {
    return instance.delete<ResponseType<{ userId?: number }>>(`auth/login`);
  },

  me() {
    return instance.get<ResponseType<{id: number, email: string, login: string}>>(`auth/me`);
  }
}

// types
export type TodolistType = {
  id: string,
  title: string,
  addedDate: string,
  order: number
}

export type ResponseType<D = {}> = {
  resultCode: number,
  messages: string[],
  data: D
}

export enum TaskStatuses {
  New = 0,
  inProgress = 1,
  Completed = 2,
  Draft = 3
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  Hi = 2,
  Urgently = 3,
  Later = 4
}

export type TaskType = {
  description: string,
  title: string,
  status: TaskStatuses,
  priority: TaskPriorities,
  startDate: string,
  deadline: string,
  id: string,
  todoListId: string,
  order: number,
  addedDate: string,
}

export type TaskDomainType = TaskType & {
  removeTaskStatus: RequestStatusType
};

export type TasksType = {
  error: string | null,
  totalCount: number,
  items: TaskDomainType[]
}

export type TaskUpdateType = {
  title: string,
  description: string,
  status: TaskStatuses,
  priority: TaskPriorities,
  startDate: string,
  deadline: string,
  id: string,
  todoListId: string,
  order: number,
  addedDate: string
}

export type LoginParamsType = {
  email: string,
  password: string,
  rememberMe: boolean,
  captcha?: boolean
}
