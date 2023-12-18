import React, { useState, ChangeEvent, KeyboardEvent, FC } from "react";
import ControlPointIcon from "@mui/icons-material/ControlPoint";
import { Button, Stack, TextField } from "@mui/material";
import './AddItemForm.css';

type PropsType = {
  addNewItem: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = React.memo(({ addNewItem }) => {
  const [newTitle, setNewTitle] = useState("");
  const [errorMessage, setErrorMessage] = useState<null | string>(null);

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
    setErrorMessage(null);
  };

  const onFocus = () => {
    setErrorMessage(null);
  };

  const addTaskOnKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTitle.trim() === "") {
      return setErrorMessage("Title is required!");
    }
    if (e.key === "Enter") {
      addNewItem(newTitle);
      setNewTitle("");
    }
  };

  const addNewTask = () => {
    if (newTitle.trim() !== "") {
      addNewItem(newTitle.trim());
      setNewTitle("");
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
      value={newTitle}
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
