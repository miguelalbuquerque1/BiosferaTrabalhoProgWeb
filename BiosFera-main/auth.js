// Função para carregar usuários do localStorage
function getAccounts() {
    const accounts = localStorage.getItem('userAccounts');
    return accounts ? JSON.parse(accounts) : [];
}

// Função para salvar usuários no localStorage
function saveAccounts(accounts) {
    localStorage.setItem('userAccounts', JSON.stringify(accounts));
}

// Lógica para a página de CADASTRO
if (document.getElementById('registerForm')) {
    document.getElementById('registerForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('regUsername').value;
        const password = document.getElementById('regPassword').value;
        const confirmPassword = document.getElementById('confirmPassword').value;
        const successMessage = document.getElementById('successMessage');
        const errorMessage = document.getElementById('regErrorMessage');

        successMessage.style.display = 'none';
        errorMessage.style.display = 'none';

        if (password !== confirmPassword) {
            errorMessage.textContent = 'As senhas não coincidem!';
            errorMessage.style.display = 'block';
            return;
        }

        let accounts = getAccounts();

        // Verifica se o usuário já existe
        if (accounts.some(account => account.username === username)) {
            errorMessage.textContent = 'Nome de usuário já existe. Escolha outro.';
            errorMessage.style.display = 'block';
            return;
        }

        // Adiciona a nova conta (senha sem criptografia para fins de demonstração)
        accounts.push({ username: username, password: password });
        saveAccounts(accounts);

        successMessage.textContent = 'Conta cadastrada com sucesso! Redirecionando para o login...';
        successMessage.style.display = 'block';

        // Opcional: Limpar formulário após sucesso
        document.getElementById('registerForm').reset();

        // Redireciona para a página de login após um pequeno atraso
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    });
}

// Lógica para a página de LOGIN
if (document.getElementById('loginForm')) {
    document.getElementById('loginForm').addEventListener('submit', function(event) {
        event.preventDefault();

        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const errorMessage = document.getElementById('errorMessage');

        errorMessage.style.display = 'none';

        let accounts = getAccounts();

        // Verifica se o usuário e senha correspondem a uma conta existente
        const userFound = accounts.find(account => account.username === username && account.password === password);

        if (userFound) {
            alert('Login bem-sucedido! Redirecionando para a página principal.');
            // Simula o estado de login
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('currentUser', username); // Guarda o nome do usuário logado
            updateLoginLink(); // Atualiza o link de login na barra de navegação
            window.location.href = 'index.html';
        } else {
            errorMessage.textContent = 'Usuário ou senha inválidos.';
            errorMessage.style.display = 'block';
        }
    });
}

// Função para atualizar o link de login na barra de navegação (Chamada no index.html e após login)
function updateLoginLink() {
    const userGreetingLink = document.getElementById('userGreetingLink');
    const userGreetingText = document.getElementById('userGreetingText');
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const currentUser = localStorage.getItem('currentUser');

    if (userGreetingLink && userGreetingText) { // Garante que os elementos existem na página atual
        if (isLoggedIn && currentUser) {
            userGreetingText.textContent = `Olá, ${currentUser}`;
            userGreetingLink.href = '#'; // Pode ser alterado para uma página de perfil ou para fazer logout
            // Remova o event listener antigo antes de adicionar um novo para evitar múltiplos.
            // Isso é importante se você for adicionar funcionalidade de logout no clique.
            // Por simplicidade, para demonstração, não adicionaremos uma funcionalidade de logout aqui,
            // mas você pode fazer um alert e depois um localStorage.clear() e window.location.reload()
            // para simular o logout.
            userGreetingLink.onclick = function(e) {
                e.preventDefault(); // Impede o comportamento padrão do link
                const confirmLogout = confirm("Deseja sair da sua conta?");
                if (confirmLogout) {
                    localStorage.removeItem('isLoggedIn');
                    localStorage.removeItem('currentUser');
                    window.location.href = 'index.html'; // Redireciona para recarregar e mostrar "Login"
                }
            };
        } else {
            userGreetingText.textContent = 'Login';
            userGreetingLink.href = 'login.html';
            userGreetingLink.onclick = null; // Remove a função de clique se não estiver logado
        }
    }
}

// Chama a função para atualizar o link quando a página principal carregar
// O 'DOMContentLoaded' garante que o HTML está pronto antes de tentar manipular os elementos.
document.addEventListener('DOMContentLoaded', updateLoginLink);