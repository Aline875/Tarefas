const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conectar ao MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/gerenciamento-tarefas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const membroSchema = new mongoose.Schema({
    nome: { type: String, required: true, minlength: 5 },
    email: { type: String, required: true, unique: true },
    senha: { type: String, required: true, minlength: 6 }
});

const Membro = mongoose.model('Membro', membroSchema);

// Endpoint para login
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

app.listen(3000, () => {
    console.log('Server rodando na porta 3000');
});


