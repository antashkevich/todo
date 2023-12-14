import axios from 'axios';
import { type } from 'os';

const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  withCredentials: true,
  headers: {
      'API-KEY': '5e5b1cc6-18a5-4abc-93ba-f62481261c8a',
  },
})

export type TodoListType = {
  id: string,
  title: string,
  addedDate: string,
  order: number
}

type ResponseType<D = {}> = {
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
  addedDate: string
}

export type TasksType = {
  error: string | null,
  totalCount: number,
  items: TaskType[]
}

type TaskUpdateType = {
  title: string,
  description: string,
  completed: boolean,
  status: number,
  priority: number,
  startDate: string,
  deadline: string,
  id: string,
  todoListId: string,
  order: number,
  addedDate: string
}

export const todolistAPI = {
  getTodolists() {
    return instance.get<TodoListType []>(`todo-lists`);
  },

  createTodolist(title: string) {
    return instance.post<ResponseType<{ item: TodoListType }>>(`todo-lists`, {title});
  },

  deleteTodolist(todolistId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}`);
  },

  updateTodolist(todolistId: string, title: string) {
    return instance.put<ResponseType>(`todo-lists/${todolistId}`,{ title });
  },

  getTasks(todolistId: string) {
    return instance.get<TasksType>(`todo-lists/${todolistId}/tasks`);
  },

  createTask(todolistId: string, title: string) {
    return instance.post<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, {title});
  },

  updateTask(todolistId: string, taskId: string, model: TaskUpdateType) {
    return instance.put<ResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks/${taskId}`, model);
  },

  deleteTask(todolistId: string, taskId: string) {
    return instance.delete<ResponseType>(`todo-lists/${todolistId}/tasks/${taskId}`);
  },
};
