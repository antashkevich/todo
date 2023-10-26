import React, { FC } from "react";
import { EditableValue } from "./EditableValue";
import {
  Stack,
  Typography,
} from "@mui/material";

type PropsType = {
  value: string;
  id: string;
  removeTodo: (id: string) => void;
  onChangeTodoTitle: (id: string, title: string) => void;
};

export const TodolistTitle: FC<PropsType> = React.memo(({ id, value, onChangeTodoTitle, removeTodo }) => {
  const onChangeTitle = (value: string) => {
    onChangeTodoTitle(id, value);
  };


  return (
    <Stack
      className="todotitle"
      direction="row"
      spacing={1}
      alignItems="center"
      justifyContent="space-between"
    >
      <Stack flexGrow="1">
        <Typography variant="h6" noWrap>
          <EditableValue
            id={id}
            value={value} 
            onRemove={() => removeTodo(id)}
            onChange={onChangeTitle} />
        </Typography>
      </Stack>
    </Stack>
  );
});
