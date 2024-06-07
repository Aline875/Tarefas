document.getElementById('formLogin').addEventListener('submit', async function(event) {
    event.preventDefault();

    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;

    try {
        const response = await fetch('http://localhost:3000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, senha }),
        });

        if (!response.ok) {
            throw new Error('Erro ao fazer login');
        }

        const data = await response.json();
        alert(data.message);

        // Redirecionar para a página inicial ou outra página desejada
        window.location.href = '../index.html';

        // Ou você pode adicionar o link diretamente no DOM após o login bem-sucedido
        const linkPaginaInicial = document.createElement('a');
        linkPaginaInicial.href = '../index.html';
        linkPaginaInicial.textContent = 'Ir para a página inicial';
        document.body.appendChild(linkPaginaInicial);
    } catch (error) {
        document.getElementById('mensagemErro').textContent = error.message;
    }
    
});
