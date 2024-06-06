// src/components/TaskList.js

import { useEffect, useState } from 'react';
import axios from 'axios';

const TaskList = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Erro ao carregar tarefas:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold mb-4">Tarefas</h1>
      <ul className="list-disc pl-5">
        {tasks.map((task) => (
          <li key={task.id} className="mb-2">
            <div className="flex justify-between items-center">
              <span className="text-lg">{task.nome}</span>
              <span className="text-sm text-gray-500">{task.prioridade}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
