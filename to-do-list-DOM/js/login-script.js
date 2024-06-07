document.addEventListener('DOMContentLoaded', function () {
    // Função para obter o nome do usuário
    async function getUserName() {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    // Adicione o token de autenticação se necessário
                    // 'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Erro ao obter o nome do usuário');
            }

            const data = await response.json();
            return data.nome;
        } catch (error) {
            console.error('Erro:', error.message);
            return null;
        }
    }

    // Função para atualizar o nome do usuário na página
    async function updateUserName() {
        console.log('Atualizando nome do usuário...');
        const userName = await getUserName();
        if (userName) {
            document.getElementById('nomeUsuario').textContent = userName;
        }
    }

    // Chamar a função para atualizar o nome do usuário ao carregar a página
    updateUserName();
});
