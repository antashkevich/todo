import { TasksType } from "../Todolist";
import {
  addTaskAC,
  changeTitleTaskAC,
  changeStatusTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

let startState: TasksType;

beforeEach(() => {
  startState = {
    todolistId1: [
      {
        id: "1",
        title: "HTML",
        isDone: true,
      },
      {
        id: "2",
        title: "JS",
        isDone: true,
      },
      {
        id: "3",
        title: "React",
        isDone: false,
      },
    ],
    todolistId2: [
      {
        id: "1",
        title: "Book",
        isDone: true,
      },
      {
        id: "2",
        title: "Milk",
        isDone: true,
      },
    ],
  };
})

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC("todolistId2", "2"));

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(startState, addTaskAC("todolistId2", "Bread"));

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Bread");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const endState = tasksReducer(startState, changeStatusTaskAC("todolistId2", "2", false));

  expect(endState["todolistId1"][1].isDone).toBeTruthy();
  expect(endState["todolistId2"][1].isDone).toBeFalsy();
});

test("title of specified task should be changed", () => {
  const endState = tasksReducer(startState, changeTitleTaskAC("todolistId2", "2", "Milkaway"));

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("Milkaway");
});

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(startState, addTodolistAC("new Todolist"));

  const keys = Object.keys(endState);
  const newkey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newkey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newkey]).toEqual([]);
});

test("propperty with todolist should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC("todolistId2"));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
