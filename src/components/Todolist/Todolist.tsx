import React, { FC, useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppRootState, useAppDispatch } from "../../state/store";
import { addTask, fetchTasks } from "../../state/tasks/tasks-reducer";
import { AddItemForm } from "../AddItemForm";
import { TaskItem } from "../TaskItem";
import { TodolistTitle } from "../TodolistTitle";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import { TaskType } from "../../api/todolist-api";
import { FilterValuesType } from "../../state/todolists/todolists-reducer";
import "./Todolist.css";

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: string;
  demo?: boolean;
  changeFilter: (todoListId: string, value: FilterValuesType) => void;
  removeTodolist: (todoListId: string) => void;
  changeTodoTitle: (todoListId: string, title: string) => void;
};

export const Todolist: FC<PropsType> = React.memo(
  ({
    id,
    title,
    filter,
    entityStatus,
    demo = false,
    changeFilter,
    removeTodolist,
    changeTodoTitle,
  }) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (demo) return;

      dispatch(fetchTasks(id));
    }, []);

    const tasks = useSelector<AppRootState, TaskType[]>(
      state => state.tasks[id]
    );

    const addNewTask = useCallback(
      (newTitle: string) => {
        dispatch(addTask(newTitle, id));
      },
      [dispatch, id]
    );

    const onChangeFilter = (value: FilterValuesType, id: string) =>
      changeFilter(id, value);

    let taskForTodolist = tasks;

    if (filter === "active") {
      taskForTodolist = taskForTodolist.filter(task => task.status === 0);
    }

    if (filter === "completed") {
      taskForTodolist = taskForTodolist.filter(task => task.status === 2);
    }

    return (
      <Stack
        className={`todolist ${(entityStatus === "loading") && "disabled"}`}
      >
        <Box sx={{ p: 3 }}>
          <TodolistTitle
            id={id}
            value={title}
            onChangeTodoTitle={changeTodoTitle}
            removeTodo={removeTodolist}
          />

          <AddItemForm addNewItem={addNewTask} />

          <List sx={{ pt: 2, pb: 2 }}>
            {taskForTodolist?.map(item => (
              <ListItem sx={{ pt: 0.5, pb: 0.5 }} disableGutters key={item.id}>
                <TaskItem
                  id={id}
                  itemId={item.id}
                  isChecked={item.status}
                  value={item.title}
                />
              </ListItem>
            ))}
          </List>

          <ButtonGroup fullWidth>
            <Button
              onClick={() => onChangeFilter("all", id)}
              variant={filter === "all" ? "contained" : "outlined"}
              size="small"
            >
              All
            </Button>
            <Button
              onClick={() => onChangeFilter("active", id)}
              variant={filter === "active" ? "contained" : "outlined"}
              size="small"
            >
              Active
            </Button>
            <Button
              onClick={() => onChangeFilter("completed", id)}
              variant={filter === "completed" ? "contained" : "outlined"}
              size="small"
            >
              Completed
            </Button>
          </ButtonGroup>
        </Box>
      </Stack>
    );
  }
);
