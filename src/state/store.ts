import { AnyAction, applyMiddleware, combineReducers, createStore } from "redux";
import { todolistsReducer } from "./todolists/todolists-reducer";
import { tasksReducer } from "./tasks/tasks-reducer";
import { ThunkDispatch, thunk } from "redux-thunk";
import { useDispatch } from "react-redux";
import { appReducer } from "./app/app-reducer";

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
});

export const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(thunk)
);

export type AppRootState = ReturnType<typeof rootReducer>

export type AppDispatch = ThunkDispatch<AppRootState, unknown, AnyAction>

export const useAppDispatch = () => useDispatch<AppDispatch>()

// @ts-ignore
window.store = store;
