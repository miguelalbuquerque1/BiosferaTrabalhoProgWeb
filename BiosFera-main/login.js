document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Impede o envio do formulário padrão

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');

    // Usuário e senha fixos para a demonstração.
    // Em um sistema real, você enviaria esses dados para um servidor para validação.
    if (username === 'admin' && password === '123') {
        alert('Login bem-sucedido! Redirecionando...');
        errorMessage.style.display = 'none';
        // Simula o armazenamento de que o usuário está logado
        localStorage.setItem('isLoggedIn', 'true'); 
        window.location.href = 'index.html'; // Redireciona para a página principal após o login
    } else {
        errorMessage.style.display = 'block';
    }
});