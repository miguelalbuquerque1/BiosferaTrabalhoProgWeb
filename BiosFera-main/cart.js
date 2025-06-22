let cart = []; // Array para armazenar os itens do carrinho

// Função para carregar o carrinho do localStorage (se existir)
function loadCartFromLocalStorage() {
    const storedCart = localStorage.getItem('shoppingCart');
    if (storedCart) {
        cart = JSON.parse(storedCart);
    }
}

// Função para salvar o carrinho no localStorage
function saveCartToLocalStorage() {
    localStorage.setItem('shoppingCart', JSON.stringify(cart));
}

function updateCartDisplay() {
    const cartItemsList = document.getElementById('cartItemsList');
    const cartTotal = document.getElementById('cartTotal');
    const cartItemCount = document.getElementById('cartItemCount');

    cartItemsList.innerHTML = ''; // Limpa a lista antes de redesenhar
    let total = 0;

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li class="list-group-item text-center">Seu carrinho está vazio.</li>';
    } else {
        cart.forEach((item, index) => {
            const li = document.createElement('li');
            li.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
            li.innerHTML = `
                ${item.name} - R$ ${item.price.toFixed(2)}
                <button class="btn btn-danger btn-sm remove-from-cart-btn" data-index="${index}">Remover</button>
            `;
            cartItemsList.appendChild(li);
            total += item.price;
        });
    }

    cartTotal.textContent = total.toFixed(2);
    cartItemCount.textContent = cart.length; // Atualiza o contador no header
    saveCartToLocalStorage(); // Salva o carrinho após cada atualização
}

// Adiciona evento para os botões "Adicionar ao Carrinho"
document.querySelectorAll('.add-to-cart-btn').forEach(button => {
    button.addEventListener('click', function() {
        const productName = this.dataset.productName;
        const productPrice = parseFloat(this.dataset.productPrice);

        cart.push({ name: productName, price: productPrice });
        updateCartDisplay();
        // Feedback visual para o usuário
        const alertPlaceholder = document.createElement('div');
        alertPlaceholder.innerHTML = `<div class="alert alert-success alert-dismissible fade show fixed-top-alert" role="alert" style="position: fixed; top: 0; left: 50%; transform: translateX(-50%); z-index: 1060; width: fit-content; margin-top: 20px;">
            Item "${productName}" adicionado ao carrinho!
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>`;
        document.body.appendChild(alertPlaceholder);
        setTimeout(() => alertPlaceholder.remove(), 3000); // Remove o alerta após 3 segundos
    });
});

// Adiciona evento para os botões "Remover" dentro do modal do carrinho (delegação de evento)
document.getElementById('cartItemsList').addEventListener('click', function(event) {
    if (event.target.classList.contains('remove-from-cart-btn')) {
        const indexToRemove = parseInt(event.target.dataset.index);
        cart.splice(indexToRemove, 1); // Remove o item do array
        updateCartDisplay();
    }
});

// Carrega o carrinho e atualiza a exibição ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromLocalStorage();
    updateCartDisplay();
});