import React, { FC, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../state/store";
import { addTaskAC } from "../../state/tasks-reducer";
import { AddItemForm } from "../AddItemForm";
import { TaskItem } from "../TaskItem";
import { TodolistTitle } from "../TodolistTitle";
import {
  Button,
  ButtonGroup,
  List,
  ListItem
} from "@mui/material";
import { TaskType } from "../../api/ todolist-api";
import { FilterValuesType } from "../../state/todolists-reducer";

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  changeFilter: (todoListId: string, value: FilterValuesType) => void;
  removeTodolist: (todoListId: string) => void;
  changeTodoTitle: (todoListId: string, title: string) => void;
};

export const TodoList: FC<PropsType> = React.memo(({
  id,
  title,
  filter,
  changeFilter,
  removeTodolist,
  changeTodoTitle,
}) => {
  const dispatch = useDispatch()

  const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])

  const addTask = useCallback((title: string) => dispatch(addTaskAC(id, title)), [dispatch, id])

  const onChangeFilter = (value: FilterValuesType, id: string) =>
    changeFilter(id, value);

  let taskForTodolist = tasks;

  if (filter === "active") {
    taskForTodolist = taskForTodolist.filter(
      task => task.status === 1
    );
  }

  if (filter === "completed") {
    taskForTodolist = taskForTodolist.filter(
      task => task.status === 2
    );
  }

  return <>
    <TodolistTitle
      id={id}
      value={title}
      onChangeTodoTitle={changeTodoTitle}
      removeTodo={removeTodolist}
    />

    <AddItemForm addItem={addTask} />

    <List sx={{ pt: 2, pb: 2 }} >
      {taskForTodolist?.map(item => {
        return (
          <ListItem sx={{ pt: 0.5, pb: 0.5 }} disableGutters key={item.id}>
            <TaskItem
              id={id}
              itemId={item.id}
              isChecked={item.status === 2}
              value={item.title}
            />
          </ListItem>
        );
      })}
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
  </>;
});
