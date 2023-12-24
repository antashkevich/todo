import React, { FC, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppRootState } from "../../state/store";
import {
  FilterValuesType,
  TodolistDomainType,
  fetchTodolists,
  removeTodolist,
  сhangeTodolistFilterAC,
  сhangeTodolistTitle,
  addTodolist
} from "../../state/todolists-reducer";
import { Todolist } from "../../components/Todolist";
import { AddItemForm } from "../../components/AddItemForm";
import { Box, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

export const Todolists = () => {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchTodolists());
  }, []);

  const todoListsFromState = useSelector<AppRootState, TodolistDomainType[]>(
    state => state.todolists
  );

  const addNewTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch]
  );

  const changeFilter = useCallback(
    (todoListId: string, value: FilterValuesType) => {
      dispatch(сhangeTodolistFilterAC(todoListId, value));
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
      dispatch(сhangeTodolistTitle(todoListId, newTitleValue));
    },
    [dispatch]
  );

  return <Grid container spacing={4}>
      <Grid container justifyContent="center" xs={12}>
        <AddItemForm addNewItem={addNewTodolist} />
      </Grid>
      <Grid container rowSpacing={4} columnSpacing={4} xs={12}>
        {todoListsFromState?.map(todo => {
          return (
            <Grid xs={4} key={todo.id}>
              <Paper elevation={3}>
                <Box sx={{ p: 3 }}>
                  <Todolist
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    changeFilter={changeFilter}
                    removeTodolist={deleteTodolist}
                    filter={todo.filter}
                    changeTodoTitle={changeTodoListTitle}
                  />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
};
