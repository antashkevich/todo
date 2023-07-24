import { TasksType } from "../App";
import {
  addTaskAC,
  changeTitleTaskAC,
  changeStatusTaskAC,
  removeTaskAC,
  tasksReducer,
} from "./tasks-reducer";
import { addTodolistAC, removeTodolistAC } from "./todolists-reducer";

test("correct task should be deleted from correct array", () => {
  const startState: TasksType = {
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

  const action = removeTaskAC("2", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(1);
  expect(endState["todolistId2"].every(t => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const startState: TasksType = {
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

  const action = addTaskAC("Bread", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"].length).toBe(3);
  expect(endState["todolistId2"].length).toBe(3);
  expect(endState["todolistId2"][0].id).toBeDefined();
  expect(endState["todolistId2"][0].title).toBe("Bread");
  expect(endState["todolistId2"][0].isDone).toBe(false);
});

test("status of specified task should be changed", () => {
  const startState: TasksType = {
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

  const action = changeStatusTaskAC("2", false, "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].isDone).toBeTruthy();
  expect(endState["todolistId2"][1].isDone).toBeFalsy();
});

test("title of specified task should be changed", () => {
  const startState: TasksType = {
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

  const action = changeTitleTaskAC("2", "Milkaway", "todolistId2");

  const endState = tasksReducer(startState, action);

  expect(endState["todolistId1"][1].title).toBe("JS");
  expect(endState["todolistId2"][1].title).toBe("Milkaway");
});

test("new array should be added when new todolist is added", () => {
  const startState: TasksType = {
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

  const action = addTodolistAC("new Todolist");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);
  const newkey = keys.find(k => k !== "todolistId1" && k !== "todolistId2");
  if (!newkey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newkey]).toEqual([]);
});

test("propperty with todolist should be deleted", () => {
  const startState: TasksType = {
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

  const action = removeTodolistAC("todolistId2");

  const endState = tasksReducer(startState, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todolistId2"]).toBeUndefined();
});
