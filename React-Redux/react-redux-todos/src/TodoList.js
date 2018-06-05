import React, { Component } from 'react';
import Todo from './Todo'
import NewTodoForm from './NewTodoForm'
import { connect } from 'react-redux';
import { Route } from 'react-router-dom';
import { addTodo, removeTodo, updateTodo } from './actionCreators';

class TodoList extends Component {
 constructor(props) {
   super(props);
   this.handleAdd = this.handleAdd.bind(this);
 }
 handleAdd(val) {
   this.props.addTodo(val);
 }
 removeTodo(id) {
   this.props.removeTodo(id);
 }
 updateTodo(id) {
   this.props.updateTodo(id);
 }

 render() {
  let todos = this.props.todos.map((val, index) => (
    <Todo
      removeTodo={this.removeTodo.bind(this, val.id)}
      onToggle={this.updateTodo.bind(this, val.id)}
      task={val.task}
      completed={val.completed}
      key={index}
    />
  ));
  return (
    <div>
      <Route
        path="/todos/new"
        component={props => (
          <NewTodoForm
            {...props}
            handleSubmit={this.handleAdd}
          />
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

export default connect(mapStateToProps, { addTodo, removeTodo, updateTodo })(TodoList);