// src/App.js

import React, { useState } from 'react';
import TaskForm from './components/form.js';
import TaskList from './components/lista.js';

function App() {
  const [tasks, setTasks] = useState([]);

  const handleTaskCreated = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  return (
    <div className="App container mx-auto p-4">
      <TaskForm onTaskCreated={handleTaskCreated} />
      <TaskList />
    </div>
  );
}

export default App;
