import React, { ChangeEvent, FC, useCallback, useState } from "react";
import { removeTask, updateTask } from "../../state/tasks/tasks-reducer";
import { EditableValue } from "../EditableValue";
import { EditionButtons } from "../EditionButtons";
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  ListItem,
  Stack,
} from "@mui/material";
import { TaskStatuses } from "../../api/todolist-api";
import { useAppDispatch } from "../../state/store";
import "./TaskItem.css";
import { RequestStatusType } from "../../state/app/app-reducer";
import { useDrag, useDrop } from "react-dnd";

type PropsType = {
  id: string;
  itemId: string;
  isChecked: number;
  value: string;
  removeTaskStatus: RequestStatusType;
  moveCard: (id: string, to: number) => void;
  findCard: (id: string) => { index: number };
  setDroppedId: (id: string) => void;
};

interface Item {
  itemId: string;
  originalIndex: number;
}

export const TaskItem: FC<PropsType> = React.memo(
  ({
    id,
    itemId,
    isChecked,
    value,
    removeTaskStatus,
    moveCard,
    findCard,
    setDroppedId,
  }) => {
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

    const originalIndex = findCard(itemId).index;

    const [{ opacity }, drag] = useDrag(
      () => ({
        type: "card",
        item: { itemId, originalIndex },
        collect: monitor => ({
          isDragging: monitor.isDragging(),
          opacity: monitor.isDragging() ? 0.1 : 1,
        }),
        end: (item, monitor) => {
          const { itemId: droppedId, originalIndex } = item;
          const didDrop = monitor.didDrop();
          if (!didDrop) {
            moveCard(droppedId, originalIndex);
          }
          setDroppedId(droppedId);
        },
      }),
      [itemId, originalIndex, moveCard]
    );

    const [, drop] = useDrop(
      () => ({
        accept: "card",
        hover({ itemId: draggedId }: Item) {
          if (draggedId !== itemId) {
            const { index: overIndex } = findCard(itemId);
            moveCard(draggedId, overIndex);
          }
        },
      }),
      [findCard, moveCard]
    );

    return (
      <ListItem
        sx={{ pt: 0.5, pb: 0.5 }}
        disableGutters
        ref={node => drag(drop(node))}
        style={{ opacity }}
      >
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
      </ListItem>
    );
  }
);
