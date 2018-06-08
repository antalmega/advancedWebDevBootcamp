export const GET_TODOS = 'GET_TODOS';
export const ADD_TODO = 'ADD_TODO';
export const REMOVE_TODO = 'REMOVE_TODO';
export const UPDATE_TODO = 'UPDATE_TODO';

function handleTodos(data) {
  return {
    type: GET_TODOS,
    data
  };
}

function handleAdd(todo) {
  return {
    type: ADD_TODO,
    todo
  };
}

function HanddleRemove(id) {
  return {
    type: REMOVE_TODO,
    id
  };
}

export function handleUpdate(todo) {
  return {
    type: UPDATE_TODO,
    todo
  };
}

export function getTodos() {
  return dispatch => {
    return fetch('http://localhost:3001/api/todos')
      .then(res => res.json())
      .then(data => dispatch(handleTodos(data)))
      .catch(err => console.log('SOMETHINT WENT WRONG!', err));
  };
}

export function addTodo(task) {
  return dispatch => {
    return fetch('http://localhost:3001/api/todos', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ task })
    })
      .then(res => res.json())
      .then(data => dispatch(handleAdd(data)))
      .catch(err => console.log('SOMETHING WENT WRONG!', err));
  };
}

export function updateTodo(todo) {
  return dispatch => {
    return fetch(`http://localhost:3001/api/todos/${todo._id}`, {
      method: 'PUT',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify({ completed: !todo.completed })
    })
      .then(res => res.json())
      .then(data => dispatch(handleUpdate(data)))
      .catch(err => console.log('SOMETHING WENT WRONG!', err));
  };
}

export function removeTodo(id) {
  return dispatch => {
    return fetch(`http://localhost:3001/api/todos/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(data => dispatch(HanddleRemove(id)))
      .catch(err => console.log('SOMETHING WENT WRONG!', err));
  };
}
