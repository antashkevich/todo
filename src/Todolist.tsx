import React, { ChangeEvent, FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "./state/store";
import { addTaskAC, changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "./state/tasks-reducer";
import { FilterValuesType } from "./AppRedux";
import { AddItemForm } from "./AddItemForm";
import { EditableValue } from "./EditableValue";
import {
  Button,
  ButtonGroup,
  Checkbox,
  FormControl,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";

export type TasksType = {
  [key: string]: TaskType[];
};

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  filter: FilterValuesType;
  changeFilter: (todoListId: string, value: FilterValuesType) => void;
  removeTodolist: (todoListId: string) => void;
  changeTodoTitle: (todoListId: string, title: string) => void;
};

export const TodoList: FC<PropsType> = ({
  id,
  title,
  filter,
  changeFilter,
  removeTodolist,
  changeTodoTitle,
}) => {
  const dispatch = useDispatch()

  const tasks = useSelector<AppRootState, TaskType[]>(state => state.tasks[id])

  const onChangeFilter = (value: FilterValuesType, id: string) =>
    changeFilter(id, value);

  const removeTodo = () => removeTodolist(id);

  const onChangeTodoTitle = (title: string) => {
    changeTodoTitle(id, title);
  };

  let taskForTodolist = tasks;

  if (filter === "active") {
    taskForTodolist = taskForTodolist.filter(
      task => task.isDone === false
    );
  }

  if (filter === "completed") {
    taskForTodolist = taskForTodolist.filter(
      task => task.isDone === true
    );
  }

  return (
    <div>
      <Stack
        className="todotitle"
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Typography variant="h6" noWrap>
          <EditableValue value={title} onChange={onChangeTodoTitle} />
        </Typography>

        <IconButton onClick={() => removeTodo()}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Stack>

      <AddItemForm addItem={(title: string) => dispatch(addTaskAC(id, title))} />

      <List sx={{ pt: 2, pb: 2 }} >
        {taskForTodolist.map(item => {
          const onEditValue = (title: string) => {
            dispatch(changeTitleTaskAC(id, item.id, title));
          };

          const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            const newisDoneValue = e.currentTarget.checked;
            dispatch(changeStatusTaskAC(id, item.id, newisDoneValue))
          };

          return (
            <ListItem className={item.isDone ? "isDone" : ""} sx={{ pt: 0.5, pb: 0.5 }} disableGutters key={item.id}>
              <Stack
                justifyContent="space-between"
                flexGrow="1"
                direction="row"
                spacing={1}
                alignItems="center"
                sx={{ maxWidth: "100%" }}
              >
                <FormControl fullWidth>
                  <FormControlLabel
                    control={
                      <Checkbox
                        onChange={onChangeStatusHandler}
                        checked={item.isDone}
                      />
                    }
                    label={
                      <Typography variant={"body1"} noWrap>
                        <EditableValue value={item.title} onChange={onEditValue} />
                      </Typography>
                    }
                  />
                </FormControl>
                <IconButton onClick={() => dispatch(removeTaskAC(id, item.id))}>
                  <DeleteForeverIcon color="error" />
                </IconButton>
              </Stack>
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
    </div>
  );
};
