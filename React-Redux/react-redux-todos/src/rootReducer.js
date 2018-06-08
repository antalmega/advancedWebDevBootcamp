import {
  GET_TODOS,
  ADD_TODO,
  REMOVE_TODO,
  UPDATE_TODO
} from './actionCreators';

const initialState = {
  todos: []
};

export default function rootReducer(state = initialState, action) {
  switch (action.type) {
    case GET_TODOS:
      return { ...state, todos: action.data };
    case ADD_TODO:
      return {
        ...state,
        todos: [...state.todos, action.todo]
      };
    case REMOVE_TODO:
      let todos = state.todos.filter(todo => todo._id !== action.id);
      return { ...state, todos };
    case UPDATE_TODO:
      let updatedTodos = state.todos.map(
        todo =>
          todo.id === action.id
            ? { ...todo, completed: !todo.completed }
            : { ...todo }
      );
      return { ...state, todos: updatedTodos };
    default:
      return state;
  }
}
