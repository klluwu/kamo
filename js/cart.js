document.addEventListener('DOMContentLoaded', function () {
    const cartList = document.getElementById('cartList');
    const cartCount = document.getElementById('cartCount');
    const cartTotal = document.getElementById('cartTotal');

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function getPriceNumber(priceText) {
        return Number(priceText.replace(/[^\d]/g, ''));
    }

    function renderCart() {
        cartList.innerHTML = '';

        cartCount.textContent = cart.length;

        if (cart.length === 0) {
            cartList.innerHTML = '<p>Cart is empty :(</p>';
            cartTotal.textContent = '0₽';
            return;
        }

        let total = 0;

        cart.forEach(function (product, index) {
            total += getPriceNumber(product.price);

            const item = document.createElement('article');
            item.className = 'cart-item';

            item.innerHTML = `
                <img src="${product.image}" alt="">
                <div class="cart-item__info">
                    <h3>${product.title}</h3>
                    <p>${product.description}</p>
                </div>
                <div class="cart-item__price">${product.price}</div>
                <button class="cart-item__remove" data-index="${index}"><img src="images/trash.png"></button>
            `;

            cartList.appendChild(item);
        });

        cartTotal.textContent = total.toLocaleString('ru-RU') + '₽';

        document.querySelectorAll('.cart-item__remove').forEach(function (button) {
            button.addEventListener('click', function () {
                const index = Number(button.dataset.index);

                cart.splice(index, 1);
                localStorage.setItem('cart', JSON.stringify(cart));

                renderCart();
            });
        });
    }

    renderCart();
});