import React, { FC, useCallback } from "react";
import { useAppDispatch } from "../../state/store";
import { Button, ButtonGroup } from "@mui/material";
import {
  ALL_FILTER_VALUES,
  FilterValuesType,
  SizeFilterButtonType,
  changeTodolistFilterAC,
} from "../../state/todolists/todolists-reducer";

type PropsType = {
  todoListId: string;
  filter: FilterValuesType;
  size: SizeFilterButtonType;
};

export const FilterButtonGroup: FC<PropsType> = React.memo(
  ({ todoListId, filter, size }) => {
    const dispatch = useAppDispatch();

    const changeFilter = useCallback(
      (value: FilterValuesType, id: string) => {
        dispatch(changeTodolistFilterAC(id, value));
      },
      [dispatch]
    );

    return (
      <ButtonGroup fullWidth>
        {ALL_FILTER_VALUES.map((button, index) => {
          return (
            <Button
              onClick={() => changeFilter(button, todoListId)}
              variant={filter === button ? "contained" : "outlined"}
              size={size}
              key={index}
            >
              {button}
            </Button>
          );
        })}
      </ButtonGroup>
    );
  }
);
