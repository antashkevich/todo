import React, { FC } from "react";
import { FilterValuesType } from "./App";
import { AddItemForm } from "./AddItemForm";
import { EditableValue } from "./EditableValue";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  id: string;
  title: string;
  tasks: Array<TaskType>;
  filter: FilterValuesType;
  removeTask: (id: string, todoListId: string) => void;
  changeFilter: (value: FilterValuesType, todoListId: string) => void;
  addTask: (title: string, todoListId: string) => void;
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void;
  removeTodolist: (todoListId: string) => void;
  changeTitle: (id: string, title: string, todoListId: string) => void;
  changeTodoTitle: (title: string, todoListId: string) => void;
};

export const TodoList: FC<PropsType> = ({
  id,
  title,
  tasks,
  filter,
  removeTask,
  changeFilter,
  addTask,
  changeStatus,
  removeTodolist,
  changeTitle,
  changeTodoTitle
}) => {
  const onChangeStatusHandler = (id: string, isDone: boolean, idTodo: string) => {
    changeStatus(id, isDone, idTodo);
  };

  const onChangeFilter = (value: FilterValuesType, id: string) =>
    changeFilter(value, id);

  const removeTodo = () => removeTodolist(id);

  const addNewTask = (title: string) => {
    addTask(title, id)
  };

  const onChangeTodoTitle = (title: string) => {
    changeTodoTitle(title, id);
  };

  return (
    <div>
      <h2>
        <EditableValue
          value={title}
          onChange={onChangeTodoTitle}
         />
        <button onClick={() => removeTodo()}>X</button>
      </h2>

      <AddItemForm addItem={addNewTask} />

      <ul>
        {tasks.map(item => {
          const onEditValue = (title: string) => {
            changeTitle(item.id, title, id);
          };
    
          return <li className={item.isDone ? "isDone" : ""} key={item.id}>
            <label>
              <input
                type="checkbox"
                onChange={() => onChangeStatusHandler(item.id, item.isDone, id)}
                checked={item.isDone}
              />
              <EditableValue 
                value={item.title}
                onChange={onEditValue}
                 />
            </label>
            <button onClick={() => removeTask(item.id, id)}>X</button>
          </li>
        })}
      </ul>

      <div>
        <button
          className={filter === "all" ? "active" : ""}
          onClick={() => onChangeFilter("all", id)}
        >
          All
        </button>
        <button
          className={filter === "active" ? "active" : ""}
          onClick={() => onChangeFilter("active", id)}
        >
          Active
        </button>
        <button
          className={filter === "completed" ? "active" : ""}
          onClick={() => onChangeFilter("completed", id)}
        >
          Completed
        </button>
      </div>
    </div>
  );
};
