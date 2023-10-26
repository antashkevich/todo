import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { EditableValue } from "./EditableValue";
import { changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "./state/tasks-reducer";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
  Typography,
} from "@mui/material";

type PropsType = {
  id: string;
  itemId: string;
  isChecked: boolean;
  value: string;
};

export const TaskItem: FC<PropsType> = React.memo(({ id, itemId, isChecked, value }) => {
  const dispatch = useDispatch()

  const onEditValue = (title: string) => {
    dispatch(changeTitleTaskAC(id, itemId, title));
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newisDoneValue = e.currentTarget.checked;
    dispatch(changeStatusTaskAC(id, itemId, newisDoneValue))
  };

  return (
    <Stack
      justifyContent="space-between"
      alignItems="center"
      flexGrow="1"
      direction="row"
      spacing={1}
      sx={{ maxWidth: "100%" }}
    >
      <FormControl fullWidth>
        <FormControlLabel
          sx={{ m: 0 }}
          control={
            <Checkbox
              onChange={onChangeStatusHandler}
              checked={isChecked}
              className={isChecked ? "isDone" : ""}
            />
          }
          label={
            <Typography variant={"body1"} flexGrow="1" noWrap>
              <EditableValue
                id={id}
                value={value}
                isChecked={isChecked}
                onRemove={() => dispatch(removeTaskAC(id, itemId))}
                onChange={onEditValue} />
            </Typography>
          }
        />
      </FormControl>
    </Stack>
  );
});
