import { TodoListType } from "../AppRedux";
import { TasksType } from "../Todolist";
import { tasksReducer } from "./tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer";

test("ids should be equals", () => {
  const startTasksState: TasksType = {};
  const startTodolistsState: TodoListType[] = [];

  const action = addTodolistAC("new Todolist");

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0]
  const idFormTodolists = endTodolistsState[0].id

  expect(idFormTasks).toBe(action.id);
  expect(idFormTodolists).toBe(action.id);
});
