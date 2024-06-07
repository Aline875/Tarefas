document.getElementById('formCadastroMembro').addEventListener('submit', async function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const confirmarSenha = document.getElementById('confirmarSenha').value;

    if (senha !== confirmarSenha) {
        alert('As senhas não coincidem');
        return;
    }

    const membro = { nome, email, senha };

    try {
        const response = await fetch('http://localhost:3000/api/membros', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(membro)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error);
        }

        window.location.href = '../html/login.html';
        alert('Membro cadastrado com sucesso!');
    } catch (error) {
        console.error('Erro ao cadastrar o membro:', error);
        alert(`Erro ao cadastrar o membro: ${error.message}`);
    }
});
