const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const cron = require('node-cron');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gerenciamento-tarefas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Conectado ao MongoDB');
}).catch((error) => {
    console.error('Erro ao conectar ao MongoDB', error);
});


const tarefaSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5, maxlength: 50 },
    descricao: { type: String, maxlength: 140 },
    finalizada: { type: Boolean, required: true, default: false },
    dataCriacao: { type: Date, default: Date.now },
    data_termino: Date,
    prioridade: { type: String, required: true, enum: ['Baixa', 'Média', 'Alta'], default: 'Baixa' },
    data_limite: { type: Date, required: true }
});


const membroSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 }
});

const Tarefa = mongoose.model('Tarefa', tarefaSchema);
const Membro = mongoose.model('Membro', membroSchema);


app.post('/api/tarefas', async (req, res) => {
    try {
        const { nome, descricao, finalizada, prioridade, data_limite } = req.body;
        const tarefa = new Tarefa({ nome, descricao, finalizada, prioridade, data_limite });
        await tarefa.save();
        res.status(201).json(tarefa);
    } catch (error) {
        console.error('Erro ao salvar a tarefa:', error);
        res.status(400).json({ error: error.message });
    }
});


app.post('/api/membros', async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        const membro = new Membro({ nome, email, senha });
        await membro.save();
        res.status(201).json(membro);
    } catch (error) {
        console.error('Erro ao salvar o membro:', error);
        res.status(400).json({ error: error.message });
    }
});


app.post('/api/login', async (req, res) => {
    try {
        const { email, senha } = req.body;
        const membro = await Membro.findOne({ email });

        if (!membro) {
            return res.status(400).json({ error: 'Email não encontrado' });
        }

        if (membro.senha !== senha) {
            return res.status(400).json({ error: 'Senha incorreta' });
        }

        res.status(200).json({ message: 'Login bem-sucedido', nome: membro.nome });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});


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
