import React from "react";
import { Provider } from "react-redux";
import { applyMiddleware, combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { AppRootState } from "../../state/store";
import { todolistsReducer } from "../../state/todolists/todolists-reducer";
import { tasksReducer } from "../../state/tasks/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../../api/todolist-api";
import { appReducer } from "../../state/app/app-reducer";
import { thunk } from "redux-thunk";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
  app: appReducer
});

const todoListId1 = v1();
const todoListId2 = v1();

const initialGlobalState: AppRootState = {
  todolists: [
    { id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle", entityStatusAddTask: "idle" },
    { id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle", entityStatusAddTask: "idle" }
  ],
  tasks: {
    "todoListId1": [
      {   
        description: '',
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todoListId1,
        order: 0,
        addedDate: '',
        removeTaskStatus: "idle"
      },
      {
        description: '',
        title: "JS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todoListId1,
        order: 0,
        addedDate: '',
        removeTaskStatus: "idle"
      },
    ],
    "todoListId2": [
      {
        description: '',
        title: "React",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todoListId2,
        order: 0,
        addedDate: '',
        removeTaskStatus: "idle"
      },
      {
        description: '',
        title: "React Book",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todoListId2,
        order: 0,
        addedDate: '',
        removeTaskStatus: "idle"
      },
    ],
  },
  app: {
    status: "idle",
    error: null,
    isInitialized: false
  },
  auth: {
    isLoggedIn: false
  }
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState,
  applyMiddleware(thunk)
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
