import React, { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { addTask, fetchTasks } from "../../state/tasks/tasks-reducer";
import { AddItemForm } from "../AddItemForm";
import { TaskItem } from "../TaskItem";
import { TodolistTitle } from "../TodolistTitle";
import { Box, Button, ButtonGroup, List, ListItem, Stack } from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import { TaskDomainType } from "../../api/todolist-api";
import { FilterValuesType } from "../../state/todolists/todolists-reducer";
import "./Todolist.css";
import { RequestStatusType } from "../../state/app/app-reducer";
import { useDrop } from "react-dnd";

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
  entityStatusAddTask: RequestStatusType;
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
    entityStatusAddTask,
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

    const tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[id]);

    const addNewTask = useCallback(
      (newTitle: string) => {
        dispatch(addTask(newTitle, id));
      },
      [dispatch, id]
    );

    const onChangeFilter = (value: FilterValuesType, id: string) =>
      changeFilter(id, value);

    let tasksForTodolist = tasks;

    if (filter === "active") {
      tasksForTodolist = tasksForTodolist.filter(task => task.status === 0);
    }

    if (filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter(task => task.status === 2);
    }

    return (
      <Stack className={`todolist ${entityStatus === "loading" && "disabled"}`}>
        <Box sx={{ p: 3 }}>
          {entityStatusAddTask === "loading"  && (
              <LinearProgress
                variant="plain"
                size="sm"
                sx={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  width: "100%",
                }}
              />
            )}
          <TodolistTitle
            id={id}
            value={title}
            onChangeTodoTitle={changeTodoTitle}
            removeTodo={removeTodolist}
          />

          <AddItemForm
            addNewItem={addNewTask}
            entityStatus={entityStatusAddTask}
          />

          <List sx={{ pt: 2, pb: 2 }}>
            {tasksForTodolist?.map(item => (
              <ListItem sx={{ pt: 0.5, pb: 0.5 }} disableGutters key={item.id}>
                <TaskItem
                  id={id}
                  itemId={item.id}
                  isChecked={item.status}
                  value={item.title}
                  removeTaskStatus={item.removeTaskStatus}
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
