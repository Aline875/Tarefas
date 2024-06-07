const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gerenciamento-tarefas');

const tarefaSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5, maxlength: 50 },
    descricao: { type: String, maxlength: 140 },
    finalizada: { type: Boolean, required: true, default: false },
    data_termino: Date,
    prioridade: { type: String, required: true, enum: ['Baixa', 'Média', 'Alta'], default: 'Baixa' },
    data_limite: { type: Date, required: true }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);

app.post('/api/tarefas', async (req, res) => {
    try {
        const { nome, descricao, finalizada, prioridade, data_limite } = req.body;
        const tarefa = new Tarefa({ nome, descricao, finalizada, prioridade, data_limite });
        await tarefa.save();
        res.status(201).json(tarefa);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Agendar uma tarefa cron para verificar e atualizar o status das tarefas diariamente à meia-noite
cron.schedule('0 0 * * *', async () => {
    const now = new Date();
    try {
        const tarefas = await Tarefa.find({ finalizada: false, data_limite: { $lt: now } });
        for (const tarefa of tarefas) {
            tarefa.finalizada = false;
            await tarefa.save();
        }
        console.log('Tarefas atualizadas.');
    } catch (error) {
        console.error('Erro ao atualizar tarefas:', error);
    }
});

app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
});
