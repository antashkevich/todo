import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { removeTask, updateTask } from "../../state/tasks/tasks-reducer";
import { EditableValue } from "../EditableValue";
import { EditionButtons } from "../EditionButtons";
import { Checkbox, FormControl, FormControlLabel, Stack } from "@mui/material";
import { TaskStatuses } from "../../api/todolist-api";
import { useAppDispatch } from "../../state/store";
import "./TaskItem.css";
import { RequestStatusType } from "../../state/app/app-reducer";

type PropsType = {
  id: string;
  itemId: string;
  isChecked: number;
  value: string;
  removeTaskStatus: RequestStatusType;
};

export const TaskItem: FC<PropsType> = React.memo(
  ({ id, itemId, isChecked, value, removeTaskStatus }) => {
    const dispatch = useAppDispatch();

    const deleteTask = useCallback((idTodolist: string, idItem: string) => {
      dispatch(removeTask(idTodolist, idItem));
    }, []);

    const [isEditMode, setIsEditMode] = useState(false);

    const onEditValue = useCallback(
      (title: string) => {
        dispatch(updateTask(id, itemId, { title }));
      },
      [id, itemId, dispatch]
    );

    const onChangeStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
      const isStatusValue = e.currentTarget.checked;
      dispatch(
        updateTask(id, itemId, {
          status: isStatusValue
            ? TaskStatuses.Completed
            : TaskStatuses.inProgress,
        })
      );
    };

    const onChangeEditMode = () => {
      setIsEditMode(!isEditMode);
    };

    return (
      <Stack
        justifyContent="space-between"
        alignItems="center"
        flexGrow="1"
        direction="row"
        spacing={1}
        sx={{ maxWidth: "100%" }}
        className={`item-container ${
          removeTaskStatus === "loading" && "disabled"
        }`}
      >
        <FormControl fullWidth>
          <FormControlLabel
            className="item-label"
            sx={{ m: 0 }}
            control={
              <Checkbox
                onChange={onChangeStatusHandler}
                checked={isChecked === 2 ? true : false}
                className="checkbox"
              />
            }
            label={
              <EditableValue
                value={value}
                isEditMode={isEditMode}
                isChecked={isChecked === 2 ? true : false}
                onChange={onEditValue}
                setIsEditMode={setIsEditMode}
              />
            }
          />
        </FormControl>

        <EditionButtons
          id={id}
          itemId={itemId}
          isEditMode={isEditMode}
          isChecked={isChecked === 2 ? true : false}
          removeItem={() => deleteTask(id, itemId)}
          onChangeEditMode={onChangeEditMode}
        />
      </Stack>
    );
  }
);
