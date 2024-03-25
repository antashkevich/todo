import React, { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { addTask, fetchTasks } from "../../state/tasks/tasks-reducer";
import { AddItemForm } from "../AddItemForm";
import { TodolistTitle } from "../TodolistTitle";
import { Box, Stack } from "@mui/material";
import LinearProgress from "@mui/joy/LinearProgress";
import { TaskDomainType } from "../../api/todolist-api";
import { FilterValuesType, changeTodolistFilterAC, changeTodolistTitle, removeTodolist } from "../../state/todolists/todolists-reducer";
import "./Todolist.css";
import { RequestStatusType } from "../../state/app/app-reducer";
import { TasksItemsDragContainer } from "../TasksItemsDragContainer/TasksItemsDragContainer";
import { FilterButtonGroup } from "../FilterButtonGroup";

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  entityStatus: RequestStatusType;
  entityStatusAddTask: RequestStatusType;
  demo?: boolean;
};

export const Todolist: FC<PropsType> = React.memo(
  ({
    id,
    title,
    filter,
    entityStatus,
    entityStatusAddTask,
    demo = false
  }) => {
    const dispatch = useAppDispatch();

    const tasks = useAppSelector<TaskDomainType[]>(state => state.tasks[id]);

    const deleteTodolist = useCallback(
      (id: string) => {
        dispatch(removeTodolist(id));
      },
      [dispatch]
    );
  
    const changeTodoListTitle = useCallback(
      (todoListId: string, newTitleValue: string) => {
        dispatch(changeTodolistTitle(todoListId, newTitleValue));
      },
      [dispatch]
    );

    const addNewTask = useCallback(
      (newTitle: string) => {
        dispatch(addTask(newTitle, id));
      },
      [dispatch, id]
    );

    let tasksForTodolist = tasks;

    if (filter === "active") {
      tasksForTodolist = tasksForTodolist.filter(task => (task.status === 1 ||  task.status === 0));
    }

    if (filter === "completed") {
      tasksForTodolist = tasksForTodolist.filter(task => task.status === 2);
    }

    return (
      <Stack className={`todolist ${entityStatus === "loading" && "disabled"}`}>
        <Box sx={{ p: 3 }}>
          {entityStatusAddTask === "loading" && (
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
            onChangeTodoTitle={changeTodoListTitle}
            removeTodo={deleteTodolist}
          />

          <AddItemForm
            addNewItem={addNewTask}
            entityStatus={entityStatusAddTask}
          />

          <TasksItemsDragContainer 
            tasks={tasksForTodolist}
            todoListId={id} />

          <FilterButtonGroup 
            todoListId={id} 
            filter={filter}
            size="small"
          />
        </Box>
      </Stack>
    );
  }
);
