import React, { useCallback } from "react";
import { TodoList } from "./components/Todolist";
import { AddItemForm } from "./components/AddItemForm";
import { Box, Container, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import { addTodolistAC, removeTodolistAC, сhangeTodolistFilterAC, сhangeTodolistTitleAC } from "./state/todolists-reducer";
import { useSelector, useDispatch } from "react-redux";
import { AppRootState } from "./state/store";

export type FilterValuesType = "all" | "active" | "completed";

export type TodoListType = {
  id: string;
  title: string;
  filter: FilterValuesType;
};

export const AppRedux = () => {
  const dispatch = useDispatch()

  const totdoLists = useSelector<AppRootState, TodoListType[]>(state => state.todolists)

  const changeFilter = useCallback((todoListId: string, value: FilterValuesType) => {
    dispatch(сhangeTodolistFilterAC(todoListId, value));
  }, [dispatch]);

  const removeTodolist = useCallback((id: string) => {
    const action = removeTodolistAC(id);
    dispatch(action);
  }, [dispatch]);

  const addTodolist = useCallback((title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  }, [dispatch]);

  const changeTodoTitle = useCallback((todoListId: string, newTitleValue: string) => {
    dispatch(сhangeTodolistTitleAC(todoListId, newTitleValue));
  }, [dispatch]);

  return <Container fixed sx={{ p: 4 }}>
    <Grid container spacing={4}>
      <Grid container justifyContent="center" xs={12}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Grid container rowSpacing={4} columnSpacing={4} xs={12}>
        {totdoLists.map(todo => {
          return (
            <Grid xs={4} key={todo.id}>
              <Paper elevation={3}>
                <Box sx={{ p: 3 }}>
                  <TodoList
                    key={todo.id}
                    id={todo.id}
                    title={todo.title}
                    changeFilter={changeFilter}
                    removeTodolist={removeTodolist}
                    filter={todo.filter}
                    changeTodoTitle={changeTodoTitle}
                  />
                </Box>
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </Grid>
  </Container>;
};
