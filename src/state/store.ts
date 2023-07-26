import { combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { tasksReducer } from "./tasks-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
});

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
);

export type AppRootState = ReturnType<typeof rootReducer>

// @ts-ignore
window.store = store;
