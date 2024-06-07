document.getElementById('taskForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    let isValid = true;

    const nome = document.getElementById('nome').value;
    const descricao = document.getElementById('descricao').value;
    const data_limite = document.getElementById('data_limite').value;

    // Validação do nome
    if (!nome || nome.length < 5 || nome.length > 50) {
        isValid = false;
        document.getElementById('nomeError').innerText = 'Nome deve ter entre 5 e 50 caracteres.';
    } else {
        document.getElementById('nomeError').innerText = '';
    }

    // Validação da descrição
    if (descricao.length > 140) {
        isValid = false;
        document.getElementById('descricaoError').innerText = 'Descrição não pode ter mais que 140 caracteres.';
    } else {
        document.getElementById('descricaoError').innerText = '';
    }

    if (isValid) {
        const data = {
            nome: nome,
            descricao: descricao,
            finalizada: document.getElementById('finalizada').value === 'true',
            prioridade: document.getElementById('prioridade').value,
            data_limite: data_limite
        };

        fetch('http://localhost:3000/api/tarefas', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                document.getElementById('message').innerText = 'Erro ao salvar a tarefa: ' + data.error;
                document.getElementById('message').className = 'error';
            } else {
                document.getElementById('message').innerText = 'Tarefa salva com sucesso!';
                document.getElementById('message').className = 'success';
                document.getElementById('taskForm').reset();
            }
        })
        .catch((error) => {
            document.getElementById('message').innerText = 'Erro ao salvar a tarefa: ' + error;
            document.getElementById('message').className = 'error';
        });
    }
});