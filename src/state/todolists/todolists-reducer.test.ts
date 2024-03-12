import { RequestStatusType } from "../app/app-reducer";
import {
  todolistsReducer,
  removeTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  TodolistDomainType,
  FilterValuesType,
  addTodolistAC,
  changeTodolistEntityStatusAC,
} from "./todolists-reducer";
import { v1 } from "uuid";

let todoListId1: string;
let todoListId2: string;
let startState: TodolistDomainType[];

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();
  startState = [
    { id: todoListId1, title: "What to learn", filter: "all", addedDate: "", order: 0, entityStatus: "idle", entityStatusAddTask: "idle" },
    { id: todoListId2, title: "What to buy", filter: "all", addedDate: "", order: 0, entityStatus: "idle", entityStatusAddTask: "idle" },
  ];
})

test("correct todolist should be removed", () => {
  const endState = todolistsReducer(startState, removeTodolistAC(todoListId1));

  expect(endState.length).toBe(1);
  expect(endState[0].id).toBe(todoListId2);
});

test("correct todolist should be added", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, addTodolistAC({
    id: "1233edfasf",
    title: newTodolistTitle,
    addedDate: "",
    order: 0
  }));

  expect(endState.length).toBe(3);
  expect(endState[0].title).toBe(newTodolistTitle);
});

test("correct todolist should change its name", () => {
  let newTodolistTitle = "New Todolist";

  const endState = todolistsReducer(startState, changeTodolistTitleAC(todoListId2, newTodolistTitle));

  expect(endState[0].title).toBe("What to learn");
  expect(endState[1].title).toBe(newTodolistTitle);
});

test("correct filter of todolist should be changed", () => {
  let newFilter: FilterValuesType = "completed";

  const endState = todolistsReducer(startState, changeTodolistFilterAC(todoListId2, newFilter));

  expect(endState[0].filter).toBe("all");
  expect(endState[1].filter).toBe(newFilter);
});

test("correct entity status of todolist should be changed", () => {
  let newStatus: RequestStatusType = "loading";

  const endState = todolistsReducer(startState, changeTodolistEntityStatusAC(todoListId2, newStatus));

  expect(endState[0].entityStatus).toBe("idle");
  expect(endState[1].entityStatus).toBe(newStatus);
});
