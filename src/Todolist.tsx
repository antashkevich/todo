import React, { FC } from "react";
import { FilterValuesType } from "./App";
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

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  removeTodolist: (todoListId: string) => void;
  changeTitle: (id: string, title: string, todoListId: string) => void;
  changeTodoTitle: (title: string, todoListId: string) => void;
};

export const TodoList: FC<PropsType> = ({
  id,
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  removeTodolist,
  changeTitle,
  changeTodoTitle,
}) => {
  const onChangeStatusHandler = (
    id: string,
    isDone: boolean,
    idTodo: string
  ) => {
    changeStatus(id, isDone, idTodo);
  };

  const onChangeFilter = (value: FilterValuesType, id: string) =>
    changeFilter(value, id);

  const removeTodo = () => removeTodolist(id);

  const addNewTask = (title: string) => {
    addTask(title, id);
  };

  const onChangeTodoTitle = (title: string) => {
    changeTodoTitle(title, id);
  };

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

      <AddItemForm addItem={addNewTask} />

      <List sx={{ pt: 2, pb: 2 }} >
        {tasks.map(item => {
          const onEditValue = (title: string) => {
            changeTitle(item.id, title, id);
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
                        onChange={() =>
                          onChangeStatusHandler(item.id, item.isDone, id)
                        }
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
                <IconButton onClick={() => removeTask(item.id, id)}>
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
