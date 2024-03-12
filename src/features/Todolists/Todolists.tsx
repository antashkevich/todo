import React, { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  FilterValuesType,
  TodolistDomainType,
  fetchTodolists,
  removeTodolist,
  changeTodolistFilterAC,
  changeTodolistTitle,
  addTodolist,
} from "../../state/todolists/todolists-reducer";
import { Todolist } from "../../components/Todolist";
import { AddItemForm } from "../../components/AddItemForm";
import { Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { RequestStatusType } from "../../state/app/app-reducer";

type PropsType = {
  demo?: boolean;
};

export const Todolists: FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (demo) return;

    dispatch(fetchTodolists());
  }, []);

  const todoListsFromState = useAppSelector<TodolistDomainType[]>(
    state => state.todolists
  );

  const todoListAddStatus = useAppSelector<RequestStatusType>(
    state => state.app.status
  );

  const addNewTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todoListId: string, value: FilterValuesType) => {
      dispatch(changeTodolistFilterAC(todoListId, value));
    },
    [dispatch]
  );

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

  return (
    <Grid container spacing={4} mt={0}>
      <Grid container justifyContent="center" xs={12}>
        <AddItemForm
          addNewItem={addNewTodolist}
          entityStatus={todoListAddStatus}
        />
      </Grid>
      <Grid container rowSpacing={4} columnSpacing={4} xs={12}>
        {todoListsFromState?.map(todo => {
          return (
            <Grid xs={4} key={todo.id}>
              <Paper elevation={3} sx={{ overflow: "hidden", borderRadius: "24px" }}>
                <Todolist
                  key={todo.id}
                  id={todo.id}
                  title={todo.title}
                  demo={demo}
                  changeFilter={changeFilter}
                  entityStatus={todo.entityStatus}
                  entityStatusAddTask={todo.entityStatusAddTask}
                  removeTodolist={deleteTodolist}
                  filter={todo.filter}
                  changeTodoTitle={changeTodoListTitle}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  );
};
