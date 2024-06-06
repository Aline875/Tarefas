// src/components/TaskForm.js

import { useState } from 'react';
import axios from 'axios';

const TaskForm = ({ onTaskCreated }) => {
  const [taskData, setTaskData] = useState({
    nome: '',
    descricao: '',
    prioridade: 'Baixa',
    finalizada: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/tasks', taskData);
      onTaskCreated(response.data);
    } catch (error) {
      console.error('Erro ao cadastrar tarefa:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome</label>
        <input
          type="text"
          name="nome"
          value={taskData.nome}
          onChange={handleChange}
          required
          minLength={5}
          maxLength={50}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Descrição</label>
        <textarea
          name="descricao"
          value={taskData.descricao}
          onChange={handleChange}
          maxLength={140}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700">Prioridade</label>
        <select
          name="prioridade"
          value={taskData.prioridade}
          onChange={handleChange}
          className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
        >
          <option value="Baixa">Baixa</option>
          <option value="Média">Média</option>
          <option value="Alta">Alta</option>
        </select>
      </div>
      <button
        type="submit"
        className="mt-4 p-2 bg-blue-500 text-white rounded-md shadow-sm hover:bg-blue-700"
      >
        Cadastrar Tarefa
      </button>
    </form>
  );
};

export default TaskForm;
