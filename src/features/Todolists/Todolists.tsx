import React, { FC, useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../state/store";
import {
  TodolistDomainType,
  fetchTodolists,
  addTodolist,
} from "../../state/todolists/todolists-reducer";
import { Todolist } from "../../components/Todolist";
import { AddItemForm } from "../../components/AddItemForm";
import { Button, Paper } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import LogoutIcon from "@mui/icons-material/Logout";
import { RequestStatusType } from "../../state/app/app-reducer";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Navigate } from "react-router-dom";
import { logout, setIsLoggedInAC } from "../../state/auth/auth-reducer";

type PropsType = {
  demo?: boolean;
};

export const Todolists: FC<PropsType> = ({ demo = false }) => {
  const dispatch = useAppDispatch();

  const todoListsFromState = useAppSelector<TodolistDomainType[]>(
    state => state.todolists
  );

  const todoListAddStatus = useAppSelector<RequestStatusType>(
    state => state.app.status
  );

  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);

  useEffect(() => {
    if (demo || !isLoggedIn) return;

    dispatch(fetchTodolists());
  }, []);

  const addNewTodolist = useCallback(
    (title: string) => {
      dispatch(addTodolist(title));
    },
    [dispatch]
  );

  const handlerLogout = useCallback(() => {
    dispatch(logout())
  }, [])

  if (!isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return (
    <Grid container spacing={4} mt={0}>
      <Grid
        container
        justifyContent="center"
        xs={12}
        sx={{ position: "relative" }}
      >
        <AddItemForm
          addNewItem={addNewTodolist}
          entityStatus={todoListAddStatus}
        />
        {isLoggedIn &&
          <Button
            onClick={handlerLogout}
            variant="outlined"
            color="error"
            endIcon={<LogoutIcon />}
            sx={{ position: "absolute", right: "0" }}
          >
            Log out
          </Button>
        }
      </Grid>
      <Grid container rowSpacing={4} columnSpacing={4} xs={12}>
        {todoListsFromState?.map(todo => {
          return (
            <DndProvider backend={HTML5Backend} key={todo.id}>
              <Grid xs={12} sm={6} md={4}>
                <Paper
                  elevation={3}
                  sx={{ overflow: "hidden", borderRadius: "24px" }}
                >
                  <Todolist
                    id={todo.id}
                    title={todo.title}
                    demo={demo}
                    entityStatus={todo.entityStatus}
                    entityStatusAddTask={todo.entityStatusAddTask}
                    filter={todo.filter}
                  />
                </Paper>
              </Grid>
            </DndProvider>
          );
        })}
      </Grid>
    </Grid>
  );
};
