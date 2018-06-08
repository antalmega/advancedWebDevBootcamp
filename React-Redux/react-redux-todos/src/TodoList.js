import React, { Component } from 'react';
import Todo from './Todo';
import NewTodoForm from './NewTodoForm';
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { getTodos, addTodo, removeTodo, updateTodo } from './actionCreators';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.handleAdd = this.handleAdd.bind(this);
  }
  componentDidMount() {
    this.props.getTodos();
  }
  handleAdd(val) {
    this.props.addTodo(val);
  }
  removeTodo(id) {
    this.props.removeTodo(id);
  }
  updateTodo(todo) {
    this.props.updateTodo(todo);
  }

  render() {
    let todos = this.props.todos.map(todo => (
      <Todo
        removeTodo={this.removeTodo.bind(this, todo._id)}
        onToggle={this.updateTodo.bind(this, todo)}
        task={todo.task}
        completed={todo.completed}
        key={todo._id}
      />
    ));
    return (
      <div>
        <Route
          path="/todos/new"
          component={props => (
            <NewTodoForm {...props} handleSubmit={this.handleAdd} />
          )}
        />
        <Route exact path="/todos" component={() => <div>{todos}</div>} />
      </div>
    );
  }
}

function mapStateToProps(reduxState) {
  return {
    todos: reduxState.todos
  };
}

export default connect(
  mapStateToProps,
  { getTodos, addTodo, removeTodo, updateTodo }
)(TodoList);
