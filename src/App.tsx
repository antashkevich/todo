import React, { useState } from 'react';
import TodoList, { TaskType } from './Todolist';
import { v1 } from 'uuid'

export type FilterValuesType = "all" | "active" | "completed"

type TodoListType = {
  id: string,
  title: string,
  filter: FilterValuesType
}

function App() {
  let totdoListId1 = v1()
  let totdoListId2 = v1()

  let [totdoLists, setTodoLists] = useState<TodoListType[]>([
    {
      id: totdoListId1,
      title: "What to learn",
      filter: "active"
    },
    {
      id: totdoListId2,
      title: "What to buy",
      filter: "completed"
    }
  ])

  const [tasksObj, setTasksObj] = useState({
    [totdoListId1]: [{
      id: v1(),
      title: "HTML",
      isDone: true
    },
    {
      id: v1(),
      title: "JS",
      isDone: true
    },
    {
      id: v1(),
      title: "React",
      isDone: false
    }],
    [totdoListId2]: [{
      id: v1(),
      title: "Book",
      isDone: true
    },
    {
      id: v1(),
      title: "Milk",
      isDone: true
    }]
  })


  const removeTask = (id: string, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    let filteredTasks = tasks.filter(task => task.id !== id)
    tasksObj[todoListId] = filteredTasks
    setTasksObj({...tasksObj})
  }

  const changeFilter = (value: FilterValuesType, todoListId: string) => {
    let todoList = totdoLists.find(todo => todo.id === todoListId)
    if (todoList) {
      todoList.filter = value
      setTodoLists([...totdoLists])
    }
  }

  const addTask = (title: string, todoListId: string) => {
    const newTask = {
      id: v1(),
      title: title,
      isDone: false
    }
    let tasks = tasksObj[todoListId]
    let newTasks = [newTask, ...tasks]
    tasksObj[todoListId] = newTasks
    setTasksObj({...tasksObj})
  }

  const changeStatus = (id: string, isDone: boolean, todoListId: string) => {
    let tasks = tasksObj[todoListId]
    const task = tasks.find(task => id === task.id)
    if (task) {
      task.isDone = !isDone
      setTasksObj({...tasksObj})
    }
  }

  const removeTodolist = (id: string) => {
    let filterdTodolist = totdoLists.filter(todo => todo.id !== id)
    setTodoLists(filterdTodolist)
    delete tasksObj[id]
    setTasksObj({...tasksObj})
  }

  return (
    <div className="App">
      {
        totdoLists.map(todo => {
          let taskForTodolist = tasksObj[todo.id]

          if (todo.filter === "active") {
            taskForTodolist = taskForTodolist.filter(task => task.isDone === false )
          }
        
          if (todo.filter === "completed") {
            taskForTodolist = taskForTodolist.filter(task => task.isDone === true )
          }

          return <TodoList
            key={todo.id}
            id={todo.id}
            title={todo.title} 
            tasks={taskForTodolist}
            removeTask={removeTask}
            changeFilter={changeFilter}
            addTask={addTask}
            changeStatus={changeStatus}
            removeTodolist={removeTodolist}
            filter={todo.filter} />
        })
      }
    </div>
  );
}

export default App;
