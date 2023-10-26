import { ButtonGroup, IconButton, Stack, TextField, Typography } from "@mui/material";
import { ChangeEvent, FocusEvent, FC, KeyboardEvent, useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from '@mui/icons-material/ModeEdit';

type PropsType = {
  value: string;
  id: string;
  isChecked?: boolean;
  onRemove: () => void;
  onChange: (newValue: string) => void;
};

export const EditableValue: FC<PropsType> = ({ id, value, isChecked, onRemove, onChange }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [title, setTitle] = useState(value);

  const onChangeEditMode = () => {
    if(!isChecked) {
      setIsEditMode(!isEditMode);
      if (isEditMode) {
        onChange(title) 
      }
    }
  }

  const activateViewMode = (e: FocusEvent<HTMLElement>) => {
    if (e.relatedTarget === null) {
      setIsEditMode(!isEditMode);
      onChange(title); 
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  }

  const onChangeTitleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditMode(!isEditMode);
      onChange(title);
    }
  };

  return <Stack
      justifyContent="space-between"
      alignItems="center"
      flexGrow="1"
      direction="row"
      sx={{ maxWidth: "100%" }}
    >
    {isEditMode ? (
      <TextField
        type="text"
        variant="outlined"
        size="small"
        value={title}
        onChange={onChangeTitle}
        onKeyDown={onChangeTitleKeyboard}
        onBlur={activateViewMode}
        autoFocus
      />
    ) : (
      <Typography className={isChecked ? "isDone" : ""} sx={{ pl: 1, pr: 1 }} flexGrow="1" noWrap>{value}</Typography>
    )}

    <ButtonGroup>
      <IconButton onClick={onChangeEditMode} disabled={isChecked}>
        <ModeEditIcon color={isEditMode ? "success" : isChecked ? "inherit" : "primary"}></ModeEditIcon>
      </IconButton>
      <IconButton onClick={onRemove}>
        <DeleteForeverIcon color="error" />
      </IconButton>
    </ButtonGroup>
  </Stack>
};
