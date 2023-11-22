import React, { useState, ChangeEvent, KeyboardEvent, FC } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Button, Stack, TextField } from "@mui/material";
import './AddItemForm.css';

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = React.memo(({ addItem }) => {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
    setErrorMessage(null);
  };

  const onFocus = () => {
    setErrorMessage(null);
  };

  const addTaskOnKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() === "") {
      return setErrorMessage("Title is required!");
    }
    if (e.key === "Enter") {
      addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  const addNewTask = () => {
    if (newTaskTitle.trim() !== "") {
      addItem(newTaskTitle.trim());
      setNewTaskTitle("");
      return;
    }

    setErrorMessage("Title is required!");
  };

  return <Stack direction="row" alignItems="center" className="addItemForm">
    <TextField
      className="addItemForm-input"
      type="text"
      label="Todolist name"
      variant="outlined"
      size="small"
      value={newTaskTitle}
      onChange={onNewTitleChangeHandler}
      onKeyDown={addTaskOnKeyboard}
      onFocus={onFocus}
      error={!!errorMessage}
      helperText={errorMessage}
      fullWidth
    />
    <Button
      className="addItemForm-btn"
      variant="contained"
      size="large"
      onClick={addNewTask}
    >
      <ControlPointIcon />
    </Button>
  </Stack>;
});