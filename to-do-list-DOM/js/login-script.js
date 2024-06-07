document.addEventListener('DOMContentLoaded', function () {
    async function getUserName() {
        try {
            const response = await fetch('http://localhost:3000/api/login', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
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
    async function updateUserName() {
        console.log('Atualizando nome do usuário...');
        const userName = await getUserName();
        if (userName) {
            document.getElementById('nomeUsuario').textContent = userName;
        }
    }
    updateUserName();
});
