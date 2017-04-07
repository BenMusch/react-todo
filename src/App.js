import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {TodoForm, TodoList} from './components/todo'
import {addTodo, generateId, findById, toggleTodo, updateTodo} from './lib/todoHelpers'

class App extends Component {
  state = {
    todos: [
      { id: 1, name: 'Lean JSX', isComplete: true },
      { id: 2, name: 'Learn Node', isComplete: false },
      { id: 3, name: 'Hack the mainframe', isComplete: false }
    ],
    currentTodo: ''
  }

  handleSubmit = (event) => {
    event.preventDefault()
    const newId = generateId()
    const newTodo = { id: newId, name: this.state.currentTodo, isComplete: false }
    const updatedTodos = addTodo(this.state.todos, newTodo)
    this.setState({
      todos: updatedTodos,
      currentTodo: '',
      errorMessage: ''
    })
  }

  handleToggle = (id) => {
    const todo = findById(id, this.state.todos)
    const toggled = toggleTodo(todo)
    const updatedTodos = updateTodo(this.state.todos, toggled)
    this.setState({
      todos: updatedTodos
    })
  }

  handleEmptySubmit = (event) => {
    event.preventDefault();
    this.setState({
      errorMessage: 'Please supply a todo name'
    })
  }

  handleInputChange = (event) => {
    this.setState({
      currentTodo: event.target.value
    })
  }

  render() {
    const submitHandler = this.state.currentTodo ? this.handleSubmit : this.handleEmptySubmit
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Todos</h2>
        </div>
        <div className="Todo-App">
          {this.state.errorMessage && <span className='error'>{this.state.errorMessage}</span>}
          <TodoForm handleInputChange={this.handleInputChange}
             currentTodo={this.state.currentTodo}
             handleSubmit={submitHandler} />
          <TodoList todos={this.state.todos} handleToggle={this.handleToggle} />
        </div>
      </div>
    );
  }
}

export default App;
