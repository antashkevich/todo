import { useDrop } from "react-dnd";
import React, { FC, useCallback, useEffect, useState } from "react";
import update from "immutability-helper";
import { TaskDomainType } from "../../api/todolist-api";
import { List } from "@mui/material";
import { TaskItem } from "../TaskItem";
import { useAppDispatch } from "../../state/store";
import { reorderTasks } from "../../state/tasks/tasks-reducer";

type PropsType = {
  todoListId: string;
  tasks: TaskDomainType[];
};

export const TasksItemsDragContainer: FC<PropsType> = React.memo(
  ({ todoListId, tasks }) => {
    const dispatch = useAppDispatch();

    const [sortTasks, setSortTasks] = useState<TaskDomainType[]>(tasks);
    const [droppedTaskId, setDroppedTaskId] = useState<string>("")
    
    useEffect(() => {
      setSortTasks(tasks)
    }, [tasks]);

    useEffect(() => {
      const droppedTaskIndex = sortTasks.findIndex(task => task.id === droppedTaskId);
     
      if (droppedTaskIndex >= 0) {
        const prevDroppedTask = sortTasks[droppedTaskIndex - 1];
        let reorderItemValue = "";
        if (prevDroppedTask) {
          reorderItemValue = prevDroppedTask.id
        }

        dispatch(reorderTasks(todoListId, droppedTaskId, reorderItemValue))
      }
    }, [droppedTaskId]);

    const findCard = useCallback(
      (id: string) => {
        const card = sortTasks.filter(c => `${c.id}` === id)[0];
        return {
          card,
          index: sortTasks.indexOf(card),
        };
      },
      [sortTasks]
    );

    const moveCard = useCallback(
      (id: string, atIndex: number) => {
        const { card, index } = findCard(id);
        setSortTasks(
          update(sortTasks, {
            $splice: [
              [index, 1],
              [atIndex, 0, card],
            ],
          })
        );
      },
      [findCard, sortTasks]
    );

    const [, drop] = useDrop(() => ({ accept: "card" }));
    return (
      <List ref={drop} sx={{ pt: 2, pb: 2 }}>
        {sortTasks?.map(item => {
          return <TaskItem
            id={todoListId}
            key={item.id}
            itemId={`${item.id}`}
            isChecked={item.status}
            value={item.title}
            removeTaskStatus={item.removeTaskStatus}
            moveCard={moveCard}
            findCard={findCard}
            setDroppedId={setDroppedTaskId}
          />
        })}
      </List>
    );
  }
);
