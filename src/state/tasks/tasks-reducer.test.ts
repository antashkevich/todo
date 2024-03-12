import { v1 } from "uuid";
import { TaskDomainType, TaskPriorities, TaskStatuses } from "../../api/todolist-api";
import {
  addTaskAC,
  removeTaskAC,
  tasksReducer,
  setTaskAC,
  updateTaskAC,
} from "./tasks-reducer";
import {
  addTodolistAC,
  removeTodolistAC,
  setTodolistsAC,
} from "../todolists/todolists-reducer";

let todoListId1: string;
let todoListId2: string;
let startState: {};
let tasks: TaskDomainType[];

beforeEach(() => {
  todoListId1 = v1();
  todoListId2 = v1();
  startState = {
    todoListId1: [
      {
        id: "1",
        title: "HTML",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
        removeTaskStatus: "idle"
      },
      {
        id: "2",
        title: "JS",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
        removeTaskStatus: "idle"
      },
      {
        id: "3",
        title: "React",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        todoListId: "todoListId1",
        order: 0,
        addedDate: "",
        removeTaskStatus: "idle"
      },
    ],
    todoListId2: [
      {
        id: "1",
        title: "Book",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
        removeTaskStatus: "idle"
      },
      {
        id: "2",
        title: "Milk",
        description: "",
        status: TaskStatuses.Completed,
        priority: TaskPriorities.Hi,
        startDate: "",
        deadline: "",
        todoListId: "todoListId2",
        order: 0,
        addedDate: "",
        removeTaskStatus: "idle"
      },
    ],
  };
});

test("correct task should be deleted from correct array", () => {
  const endState = tasksReducer(startState, removeTaskAC("todoListId2", "2"));

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(1);
  expect(endState["todoListId2"].every(t => t.id !== "2")).toBeTruthy();
});

test("correct task should be added to correct array", () => {
  const endState = tasksReducer(
    startState,
    addTaskAC({
      todoListId: "todoListId2",
      title: "Bread",
      description: "",
      status: TaskStatuses.New,
      priority: TaskPriorities.Hi,
      startDate: "",
      deadline: "",
      order: 0,
      addedDate: "",
      id: "id exists",
    })
  );

  expect(endState["todoListId1"].length).toBe(3);
  expect(endState["todoListId2"].length).toBe(3);
  expect(endState["todoListId2"][0].id).toBeDefined();
  expect(endState["todoListId2"][0].title).toBe("Bread");
  expect(endState["todoListId2"][0].status).toBe(TaskStatuses.New);
});

test("status of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC("todoListId2", "2", { status: TaskStatuses.New })
  );

  expect(endState["todoListId1"][1].status).toBe(TaskStatuses.Completed);
  expect(endState["todoListId2"][1].status).toBe(TaskStatuses.New);
});

test("title of specified task should be changed", () => {
  const endState = tasksReducer(
    startState,
    updateTaskAC("todoListId2", "2", { title: "Milkaway" })
  );

  expect(endState["todoListId1"][1].title).toBe("JS");
  expect(endState["todoListId2"][1].title).toBe("Milkaway");
});

test("new array should be added when new todolist is added", () => {
  const endState = tasksReducer(
    startState,
    addTodolistAC({
      id: "1233edfasf",
      title: "id todolist",
      addedDate: "",
      order: 0,
    })
  );

  const keys = Object.keys(endState);
  const newkey = keys.find(k => k !== "todoListId1" && k !== "todoListId2");
  if (!newkey) {
    throw new Error("new key should be added");
  }

  expect(keys.length).toBe(3);
  expect(endState[newkey]).toEqual([]);
});

test("propperty with todolist should be deleted", () => {
  const endState = tasksReducer(startState, removeTodolistAC("todoListId2"));

  const keys = Object.keys(endState);

  expect(keys.length).toBe(1);
  expect(endState["todoListId2"]).toBeUndefined();
});

test("empry arrays should be added when set todolist", () => {
  const action = setTodolistsAC([
    {
      id: "1",
      title: "HTML",
      order: 0,
      addedDate: "",
    },
    {
      id: "2",
      title: "JS",
      order: 0,
      addedDate: "",
    },
  ]);

  const endState = tasksReducer({}, action);

  const keys = Object.keys(endState);

  expect(keys.length).toBe(2);
  expect(endState["1"]).toStrictEqual([]);
  expect(endState["2"]).toStrictEqual([]);
});

test("tasks should be added for todolist", () => {
  tasks = [
    {
      id: "1",
      title: "HTML",
      description: "",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Hi,
      startDate: "",
      deadline: "",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
      removeTaskStatus: "idle"
    },
    {
      id: "2",
      title: "JS",
      description: "",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Hi,
      startDate: "",
      deadline: "",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
      removeTaskStatus: "idle"
    },
    {
      id: "3",
      title: "JS",
      description: "",
      status: TaskStatuses.Completed,
      priority: TaskPriorities.Hi,
      startDate: "",
      deadline: "",
      todoListId: "todoListId1",
      order: 0,
      addedDate: "",
      removeTaskStatus: "idle"
    },
  ];
  const action = setTaskAC(tasks, todoListId1);

  const endState = tasksReducer({ todoListId1: [] }, action);

  expect(endState[todoListId1].length).toBe(3);
});
