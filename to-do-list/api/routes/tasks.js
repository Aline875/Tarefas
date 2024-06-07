// api/routes/tasks.js

const express = require('express');
const router = express.Router();
const mysql = require('mysql2');

// Configuração do banco de dados
const dbConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
};

const connection = mysql.createConnection(dbConfig);

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL.');
});

// Criar uma nova tarefa
router.post('/', (req, res) => {
  const { nome, descricao, prioridade, finalizada } = req.body;

  // Validações
  if (!nome || nome.length < 5 || nome.length > 50) {
    return res.status(400).json({ message: 'O nome deve ter entre 5 e 50 caracteres.' });
  }

  const query = `INSERT INTO tarefas (nome, descricao, prioridade, finalizada) VALUES (?, ?, ?, ?)`;
  connection.query(query, [nome, descricao, prioridade, finalizada], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao cadastrar tarefa.', error: err });
    }
    res.status(201).json({ message: 'Tarefa cadastrada com sucesso!', id: result.insertId });
  });
});

// Listar todas as tarefas
router.get('/', (req, res) => {
  const query = 'SELECT * FROM tarefas';
  connection.query(query, (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao buscar tarefas.', error: err });
    }
    res.status(200).json(results);
  });
});

// Atualizar uma tarefa
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { nome, descricao, prioridade, finalizada } = req.body;

  // Validações
  if (!nome || nome.length < 5 || nome.length > 50) {
    return res.status(400).json({ message: 'O nome deve ter entre 5 e 50 caracteres.' });
  }

  const query = `UPDATE tarefas SET nome = ?, descricao = ?, prioridade = ?, finalizada = ? WHERE id = ?`;
  connection.query(query, [nome, descricao, prioridade, finalizada, id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao atualizar tarefa.', error: err });
    }
    res.status(200).json({ message: 'Tarefa atualizada com sucesso.' });
  });
});

// Excluir uma tarefa
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  const query = `DELETE FROM tarefas WHERE id = ?`;
  connection.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: 'Erro ao excluir tarefa.', error: err });
    }
    res.status(200).json({ message: 'Tarefa excluída com sucesso.' });
  });
});

module.exports = router;
