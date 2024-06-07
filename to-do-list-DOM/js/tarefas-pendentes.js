// checkTasks.js
const mongoose = require('mongoose');
const Tarefa = require('./tarefaModel'); 

mongoose.connect('mongodb://127.0.0.1:27017/gerenciamento-tarefas', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const verificarTarefasPendentes = async () => {
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
    } finally {
        mongoose.connection.close();
    }
};

verificarTarefasPendentes();
