import { Stack, TextField, Typography } from "@mui/material";
import React, {
  ChangeEvent,
  FocusEvent,
  FC,
  KeyboardEvent,
  useState,
  Dispatch,
  SetStateAction,
  useEffect,
} from "react";
import "./EditableValue.css";

type PropsType = {
  value: string;
  isEditMode: boolean;
  isChecked?: boolean;
  onChange: (newValue: string) => void;
  setIsEditMode: Dispatch<SetStateAction<boolean>>;
};

export const EditableValue: FC<PropsType> = React.memo(({ value, isChecked, isEditMode, onChange, setIsEditMode }) => {
  const [title, setTitle] = useState(value);

  useEffect(() => {
    if (!isEditMode) {
      onChange(title);
    }
  }, [isEditMode, title, onChange]);

  const activateViewMode = (e: FocusEvent<HTMLElement>) => {
    if (e.relatedTarget === null) {
      setIsEditMode(false);
      onChange(title);
    }
  };

  const onChangeTitleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      setIsEditMode(false);
      onChange(title);
    }
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.currentTarget.value);
  };

  return <Stack className="editableValue">
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
      <Typography
        className={isChecked ? "isDone" : ""}
        sx={{ pl: 1, pr: 1 }}
        flexGrow="1"
        noWrap
      >
        {value}
      </Typography>
    )}
  </Stack>;
});
