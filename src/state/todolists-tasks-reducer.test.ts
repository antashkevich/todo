import { v1 } from "uuid";
import { tasksReducer } from "./tasks-reducer";
import { TodolistDomainType, addTodolistAC, removeTodolistAC, setTodolistsAC, todolistsReducer } from "./todolists-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[] = [];

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();

  startState = [
    {
      id: todoListId1,
      title: "HTML",
      filter: "all",
      addedDate: '',
      order: 0
    },
    {
      id: todoListId2,
      title: "JS",
      filter: "all",
      addedDate: '',
      order: 0
    },
  ];
})

test("todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todoListId2)
})

test("todolist should be added", () => {
  let newTodolistTitle = "New Todolist"

  const endState = todolistsReducer(startState, addTodolistAC({
    id: "1233edfasf",
    title: newTodolistTitle,
    addedDate: "",
    order: 0
  }));

  expect(endState.length).toBe(3)
  expect(endState[0].title).toBe(newTodolistTitle)
})

test("ids should be equals", () => {
  const startTasksState = {};
  const startTodolistsState: TodolistDomainType[] = [];

  const action = addTodolistAC({
    id: "1233edfasf",
    title: "new Todolist",
    addedDate: "",
    order: 0
  });

  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);

  const keys = Object.keys(endTasksState);
  const idFormTasks = keys[0]
  const idFormTodolists = endTodolistsState[0].id

  expect(idFormTasks).toBe(action.todoList.id);
  expect(idFormTodolists).toBe(action.todoList.id);
});

test("todolists should be set to the state", () => {
  const action = setTodolistsAC(startState);

  const endState = todolistsReducer([], action);

  expect(endState.length).toBe(2);
});
