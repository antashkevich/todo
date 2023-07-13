import React, { useState, ChangeEvent, KeyboardEvent, FC } from "react";

type PropsType = {
  addItem: (title: string) => void;
};

export const AddItemForm: FC<PropsType> = ({ addItem }) => {
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

  return (
    <div className="addForm">
      <input
        type="text"
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyDown={addTaskOnKeyboard}
        onFocus={onFocus}
      />
      <button onClick={addNewTask}>+</button>
      <span>{errorMessage}</span>
    </div>
  );
};
