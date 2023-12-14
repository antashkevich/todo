import React from "react";
import { Provider } from "react-redux";
import { combineReducers, legacy_createStore } from "redux";
import { v1 } from "uuid";
import { AppRootState } from "../../state/store";
import { todolistsReducer } from "../../state/todolists-reducer";
import { tasksReducer } from "../../state/tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../../api/ todolist-api";

const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolists: todolistsReducer,
});

const todolistId1 = v1();
const todolistId2 = v1();

const initialGlobalState: AppRootState = {
  todolists: [
    { id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0 },
    { id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0 }
  ],
  tasks: {
    "todolistId1": [
      {   
        description: '',
        title: "HTML&CSS",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todolistId1,
        order: 0,
        addedDate: ''
      },
      {
        description: '',
        title: "JS",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todolistId1,
        order: 0,
        addedDate: ''
      },
    ],
    "todolistId2": [
      {
        description: '',
        title: "React",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todolistId2,
        order: 0,
        addedDate: ''
      },
      {
        description: '',
        title: "React Book",
        status: TaskStatuses.New,
        priority: TaskPriorities.Hi,
        startDate: '',
        deadline: '',
        id: v1(),
        todoListId: todolistId2,
        order: 0,
        addedDate: ''
      },
    ],
  },
};

export const storyBookStore = legacy_createStore(
  rootReducer,
  initialGlobalState
);

export const ReduxStoreProviderDecorator = (storyFn: () => React.ReactNode) => {
  return <Provider store={storyBookStore}>{storyFn()}</Provider>;
};
