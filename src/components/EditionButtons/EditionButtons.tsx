import React, { FC } from "react";
import {
  ButtonGroup,
  IconButton
} from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import EditNoteIcon from '@mui/icons-material/EditNote';

type PropsType = {
  id: string;
  isChecked?: boolean;
  isEditMode: boolean;
  onChangeEditMode: () => void;
  removeItem: (id: string) => void;
};

export const EditionButtons: FC<PropsType> = React.memo(({ id, isChecked, isEditMode, removeItem, onChangeEditMode }) => {
  return <ButtonGroup>
    <IconButton onClick={onChangeEditMode} disabled={isChecked}>
      {isEditMode ? 
        <EditNoteIcon color={isChecked ? "inherit" : "primary"} />
        : 
        <ModeEditIcon color={isChecked ? "inherit" : "primary"} />
      }
    </IconButton>
    <IconButton onClick={() => removeItem(id)}>
      <DeleteForeverIcon color="error" />
    </IconButton>
  </ButtonGroup>;
});
