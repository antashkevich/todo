import React, { FC, useState } from "react";
import { EditableValue } from "../EditableValue";
import {
  Stack,
  Typography,
  ButtonGroup,
  IconButton
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { EditionButtons } from "../EditionButtons";

type PropsType = {
  value: string;
  id: string;
  removeTodo: (id: string) => void;
  onChangeTodoTitle: (id: string, title: string) => void;
};

export const TodolistTitle: FC<PropsType> = React.memo(({ id, value, onChangeTodoTitle, removeTodo }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const onChangeTitle = (value: string) => {
    onChangeTodoTitle(id, value);
  };

  const onChangeEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  return <Stack
    className="todotitle"
    direction="row"
    spacing={1}
    alignItems="center"
    justifyContent="space-between"
  >
    <Stack 
      flexGrow="1"
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      overflow="hidden">
      <EditableValue
        value={value}
        isEditMode={isEditMode}
        onChange={onChangeTitle}
        setIsEditMode={setIsEditMode}
        />
    </Stack>

    <EditionButtons 
      id={id}
      isEditMode={isEditMode}
      removeItem={() => removeTodo(id)}
      onChangeEditMode={onChangeEditMode} />
  </Stack>;
});
