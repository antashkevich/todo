import { TasksType, TodoListType } from "../api/ todolist-api";
import { tasksReducer } from "./tasks-reducer";
import { TodoListDomainType, addTodolistAC, todolistsReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState = {};
  const startTodolistsState: TodoListDomainType[] = [];

  const action = addTodolistAC("new Todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0]
  const idFormTodolists = endTodolistsState[0].id

  expect(idFormTasks).toBe(action.id);
  expect(idFormTodolists).toBe(action.id);
});
