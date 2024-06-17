import React, { useState } from 'react';
import './App.css';

function App() {
  const [pendingTodos, setPendingTodos] = useState([]);
  const [completedTodos, setCompletedTodos] = useState([]);
  const [todoInput, setTodoInput] = useState('');

  const handleInputChange = (e) => {
    setTodoInput(e.target.value);
  };

  const addTodo = () => {
    if (todoInput.trim()) {
      setPendingTodos([...pendingTodos, todoInput.trim()]);
      setTodoInput('');
    }
  };

  const completeTodo = (index) => {
    const newPendingTodos = [...pendingTodos];
    const [completedTodo] = newPendingTodos.splice(index, 1);
    setPendingTodos(newPendingTodos);
    setCompletedTodos([...completedTodos, completedTodo]);
  };

  const removeTodo = (index, isPending) => {
    if (isPending) {
      const newPendingTodos = [...pendingTodos];
      newPendingTodos.splice(index, 1);
      setPendingTodos(newPendingTodos);
    } else {
      const newCompletedTodos = [...completedTodos];
      newCompletedTodos.splice(index, 1);
      setCompletedTodos(newCompletedTodos);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="App">
      <h1>Todo App</h1>
      <input
        id="todoInput"
        type="text"
        value={todoInput}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
        placeholder="Enter a todo"
      />
      <h2>Pending Todos ({pendingTodos.length})</h2>
      <ul id="pendingList">
        {pendingTodos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button className="complete-btn" onClick={() => completeTodo(index)}>✓</button>
            <button onClick={() => removeTodo(index, true)}>✗</button>
          </li>
        ))}
      </ul>
      <h2>Completed Todos ({completedTodos.length})</h2>
      <ul id="completedList">
        {completedTodos.map((todo, index) => (
          <li key={index}>
            {todo}
            <button onClick={() => removeTodo(index, false)}>✗</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
