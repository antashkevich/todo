import { TextField } from "@mui/material";
import { ChangeEvent, FC, KeyboardEvent, useState } from "react";

type PropsType = {
  value: string;
  onChange: (newvalue: string) => void;
};

export const EditableValue: FC<PropsType> = ({ value, onChange }) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState("");

  const activateEditMode = () => {
    setEditMode(true);
    setTitle(value);
  };

  const activateViewMode = () => {
    setEditMode(false);
    onChange(title);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) =>
    setTitle(e.currentTarget.value);

  const onChangeTitleKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChange(title);
      setEditMode(false);
    }
  };

  return editMode ? (
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
    <span onDoubleClick={activateEditMode}>{value}</span>
  );
};
