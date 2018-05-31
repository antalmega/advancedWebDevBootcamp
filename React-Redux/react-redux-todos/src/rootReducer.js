import { ADD_TODO, REMOVE_TODO, UPDATE_TODO } from './actionCreators';

const initialState = {
  todos: [],
  id: 0,
}

export default function rootReducer(state = initialState, action) {
  switch(action.type) {
    case ADD_TODO:
      let newState = { ...state };
      newState.id++;
      return {
        ...newState,
        todos: [...newState.todos, {task: action.task, id: newState.id, completed: false}]
      };
    case REMOVE_TODO:
      let todos = state.todos.filter(todo => todo.id !== action.id);
      return { ...state, todos };
    case UPDATE_TODO:
      let updatedTodos = state.todos.map(
        todo => (
         todo.id === action.id ?
           { ...todo, completed: !todo.completed} :
           { ...todo }
        )
      );
      return { ...state, todos: updatedTodos}
    default:
      return state;
  }
}