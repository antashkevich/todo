import React, { useEffect, useState } from 'react';
import { todolistAPI } from '../api/ todolist-api';

export default {
  title: 'API',
};

const settings = {
  withCredentials: true,
  headers: {
    'API-KEY': '5e5b1cc6-18a5-4abc-93ba-f62481261c8a'
  }
};

export const GetTodolists = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.getTodolists()
      .then(res => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.createTodolist('NewTodolist')
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTodolist = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.deleteTodolist('6caeb473-a04e-4ca6-9b0b-6a39f0c25b50')
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTodolistTitle = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    todolistAPI.updateTodolist('6caeb473-a04e-4ca6-9b0b-6a39f0c25b50', 'New Todolist')
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const GetTasks = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '3c18379e-d175-47f7-bfd1-ca1c70fb65fa';
    todolistAPI.getTasks(todolistId)
      .then(res => {
        setState(res.data);
      });
  }, []);
  return <div>{JSON.stringify(state)}</div>;
};

export const CreateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '3c18379e-d175-47f7-bfd1-ca1c70fb65fa';
    const title = "New asd"
    todolistAPI.createTask(todolistId, title)
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const UpdateTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '3c18379e-d175-47f7-bfd1-ca1c70fb65fa';
    const taskId = '92faac2a-f365-46c9-8626-19e64d09c97d';
    const title = "New Title Task";
    const description = "New Task description";
    const completed = false;
    const status = 0;
    const priority = 1;
    todolistAPI.updateTask(todolistId, taskId, {
      title: title,
      description: description,
      completed: completed,
      status: status,
      priority: priority,
      startDate: "2023-12-14T10:14:45.3",
      deadline: "2023-12-14T10:14:45.3",
      id: '92faac2a-f365-46c9-8626-19e64d09c97d',
      todoListId: '3c18379e-d175-47f7-bfd1-ca1c70fb65fa',
      order: 12,
      addedDate: "2023-12-14T10:14:45.3"
    })
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};

export const DeleteTask = () => {
  const [state, setState] = useState<any>(null);
  useEffect(() => {
    const todolistId = '3c18379e-d175-47f7-bfd1-ca1c70fb65fa';
    const taskId = '3c18379e-d175-47f7-bfd1-ca1c70fb65fa';
    todolistAPI.deleteTask(todolistId, taskId)
      .then(res => {
        setState(res.data);
      });
  }, []);

  return <div>{JSON.stringify(state)}</div>;
};
