import React, { useState, ChangeEvent, KeyboardEvent } from 'react';
import { FilterValuesType } from './App';

export type TaskType = {
  id: string,
  title: string,
  isDone: boolean
}

type PropsType = {
  id: string,
  title: string,
  tasks: Array<TaskType>,
  filter: FilterValuesType,
  removeTask: (id: string, todoListId: string) => void,
  changeFilter: (value: FilterValuesType, todoListId: string) => void,
  addTask: (title: string, todoListId: string) => void,
  changeStatus: (id: string, isDone: boolean, todoListId: string) => void,
  removeTodolist: (todoListId: string) => void
}

function TodoList(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("")
  const [errorMessage, setErrorMessage] = useState<null | string>(null)

  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value)
    setErrorMessage(null)
  }

  const onFocus = () => {
    setErrorMessage(null)
  }

  const onCheckHandler = (id: string, isDone: boolean, idTodo: string) => {
    props.changeStatus(id, isDone, idTodo)
  }

  const addTaskOnKeyboard = (e: KeyboardEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() === "") {
      return setErrorMessage("Title is required!")
    }
    if(e.key === "Enter") {
      props.addTask(newTaskTitle, props.id)
      setNewTaskTitle("")
    }
  }

  const addTask = () => {
    if (newTaskTitle.trim() !== "") {
      props.addTask(newTaskTitle.trim(), props.id)
      setNewTaskTitle("")
      return
    }

    setErrorMessage("Title is required!")
  }

  const onChangeFilter = (value: FilterValuesType, id: string) => props.changeFilter(value, id)

  const removeTodolist = (() => props.removeTodolist(props.id))

  return (
    <div>
      <h2>
        {props.title}
        <button onClick={() => removeTodolist()}>X</button>
      </h2>

      <div>
        <input 
          type="text" 
          value={newTaskTitle}
          onChange={onNewTitleChangeHandler}
          onKeyPress={addTaskOnKeyboard}
          onFocus={onFocus} />
        <button onClick={addTask}>+</button>
        {errorMessage}
      </div>

      <ul>
        {
          props.tasks.map(item => <li className={item.isDone ? "isDone" : ""} key={item.id}>
            <label>
              <input 
                type="checkbox"
                onChange={() => onCheckHandler(item.id, item.isDone, props.id)}
                checked={item.isDone} />
              <span>{item.title}</span>
            </label>
            <button onClick={() => props.removeTask(item.id, props.id)}>X</button>
          </li>)
        }
      </ul>

      <div>
        <button className={props.filter === "all" ? "active" : ""} onClick={() => onChangeFilter("all", props.id)}>All</button>
        <button className={props.filter === "active" ? "active" : ""} onClick={() => onChangeFilter("active", props.id)}>Active</button>
        <button className={props.filter === "completed" ? "active" : ""} onClick={() => onChangeFilter("completed", props.id)}>Completed</button>
      </div>
    </div>
  )
}

export default TodoList;
