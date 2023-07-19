import React, { useState } from "react";
import { TaskType, TodoList } from "./Todolist";
import { v1 } from "uuid";
import { AddItemForm } from "./AddItemForm";
import { Box, Container, Paper } from "@mui/material";
import Grid from '@mui/material/Unstable_Grid2';

export type FilterValuesType = "all" | "active" | "completed";

type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

type TasksType = {
  [key: string]: TaskType[];
};

export const App = () => {
  let totdoListId1 = v1();
  let totdoListId2 = v1();

  let [totdoLists, setTodoLists] = useState<TodoListType[]>([
    {
      id: totdoListId1,
      title: "What to learn",
      filter: "all",
    },
    {
      id: totdoListId2,
      title: "What to buy",
      filter: "all",
    },
  ]);

  const [tasksObj, setTasksObj] = useState<TasksType>({
    [totdoListId1]: [
      {
        id: v1(),
        title: "HTML",
        isDone: true,
      },
      {
        id: v1(),
        title: "JS",
        isDone: true,
      },
      {
        id: v1(),
        title: "React",
        isDone: false,
      },
    ],
    [totdoListId2]: [
      {
        id: v1(),
        title: "Book",
        isDone: true,
      },
      {
        id: v1(),
        title: "Milk",
        isDone: true,
      },
    ],
  });

  const removeTask = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    let filteredTasks = tasks.filter(task => task.id !== id);
    tasksObj[todoListId] = filteredTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    let todoList = totdoLists.find(todo => todo.id === todoListId);
    if (todoList) {
      todoList.filter = value;
      setTodoLists([...totdoLists]);
    }
  };

  const addTask = (title: string, todoListId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false,
    };
    let tasks = tasksObj[todoListId];
    let newTasks = [newTask, ...tasks];
    tasksObj[todoListId] = newTasks;
    setTasksObj({ ...tasksObj });
  };

  const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId];
    const task = tasks.find(task => id === task.id);
    if (task) {
      task.isDone = !isDone;
      setTasksObj({ ...tasksObj });
    }
  };

  const removeTodolist = (id: string) => {
    let filterdTodolist = totdoLists.filter(todo => todo.id !== id);
    setTodoLists(filterdTodolist);
    delete tasksObj[id];
    setTasksObj({ ...tasksObj });
  };

  const addTodolist = (title: string) => {
    const totdoList: TodoListType = {
      id: v1(),
      title: title,
      filter: "all",
    };
    setTodoLists([totdoList, ...totdoLists]);
    setTasksObj({
      ...tasksObj,
      [totdoList.id]: [],
    });
  };

  const changeTitle = (
    id: string,
    newTaskValue: string,
    todoListId: string
  ) => {
    let tasks = tasksObj[todoListId];
    const task = tasks.find(task => id === task.id);
    if (task) {
      task.title = newTaskValue;
      setTasksObj({ ...tasksObj });
    }
  };

  const changeTodoTitle = (
    newTitleValue: string,
    todoListId: string
  ) => {
    const todo = totdoLists.find(todo => todoListId === todo.id);
    if (todo) {
      todo.title = newTitleValue;
      setTodoLists([...totdoLists]);
    }
  };

  return (
    <Container fixed sx={{p: 4}}>
      <Grid container spacing={4}>
        <Grid container justifyContent="center" xs={12}>
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container rowSpacing={4} columnSpacing={4} xs={12}>
          {totdoLists.map(todo => {
            let taskForTodolist = tasksObj[todo.id];

            if (todo.filter === "active") {
              taskForTodolist = taskForTodolist.filter(
                task => task.isDone === false
              );
            }

            if (todo.filter === "completed") {
              taskForTodolist = taskForTodolist.filter(
                task => task.isDone === true
              );
            }

            return (
              <Grid xs={4}>
                <Paper elevation={3}>
                  <Box sx={{p: 3}}>
                    <TodoList
                      key={todo.id}
                      id={todo.id}
                      title={todo.title}
                      tasks={taskForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeStatus={changeStatus}
                      removeTodolist={removeTodolist}
                      filter={todo.filter}
                      changeTitle={changeTitle}
                      changeTodoTitle={changeTodoTitle}
                    />
                  </Box>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Container>
  );
};
