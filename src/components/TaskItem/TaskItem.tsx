import React, { ChangeEvent, FC, useState } from "react";
import { useDispatch } from "react-redux";
import { changeStatusTaskAC, changeTitleTaskAC, removeTaskAC } from "../../state/tasks-reducer";
import { EditableValue } from "../EditableValue";
import { EditionButtons } from "../EditionButtons";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  Stack,
} from "@mui/material";

type PropsType = {
  id: string;
  itemId: string;
  isChecked: boolean;
  value: string;
};

export const TaskItem: FC<PropsType> = React.memo(({ id, itemId, isChecked, value }) => {
  const dispatch = useDispatch()

  const [isEditMode, setIsEditMode] = useState(false);

  const onEditValue = (title: string) => {
    dispatch(changeTitleTaskAC(id, itemId, title));
  };

  const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newisDoneValue = e.currentTarget.checked;
    dispatch(changeStatusTaskAC(id, itemId, newisDoneValue))
  };

  const onChangeEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  return <Stack
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
          <EditableValue
            value={value}
            isEditMode={isEditMode}
            isChecked={isChecked}
            onChange={onEditValue}
            setIsEditMode={setIsEditMode} />
        }
      />
    </FormControl>

    <EditionButtons
      id={id}
      isEditMode={isEditMode}
      isChecked={isChecked}
      removeItem={() => dispatch(removeTaskAC(id, itemId))}
      onChangeEditMode={onChangeEditMode} />
  </Stack>;
});
