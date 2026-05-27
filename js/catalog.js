document.addEventListener('DOMContentLoaded', function () {
    const products = document.querySelectorAll('.product-card');
    const checkboxes = document.querySelectorAll('.filters input[type="checkbox"]');
    const priceRange = document.getElementById('priceRange');
    const priceValue = document.getElementById('priceValue');

    function getCheckedValues(name) {
        return Array.from(document.querySelectorAll(`input[name="${name}"]:checked`))
            .map(input => input.value);
    }

    function updatePriceText() {
        priceValue.textContent = Number(priceRange.value).toLocaleString('ru-RU') + '₽';
    }

    function filterProducts() {
        const selectedColors = getCheckedValues('color');
        const selectedKinds = getCheckedValues('kind');
        const maxPrice = Number(priceRange.value);

        products.forEach(function (product) {
            const productColor = product.dataset.color;
            const productKind = product.dataset.kind;
            const productPrice = Number(product.dataset.price);

            const colorMatch = selectedColors.length === 0 || selectedColors.includes(productColor);
            const kindMatch = selectedKinds.length === 0 || selectedKinds.includes(productKind);
            const priceMatch = productPrice <= maxPrice;

            if (colorMatch && kindMatch && priceMatch) {
                product.classList.remove('hidden');
            } else {
                product.classList.add('hidden');
            }
        });
    }

    checkboxes.forEach(function (checkbox) {
        checkbox.addEventListener('change', filterProducts);
    });

    priceRange.addEventListener('input', function () {
        updatePriceText();
        filterProducts();
    });

    updatePriceText();
    filterProducts();

    const productModal = document.getElementById('productModal');
    const closeProductModal = document.getElementById('closeProductModal');
    const modalProductImage = document.getElementById('modalProductImage');
    const modalProductTitle = document.getElementById('modalProductTitle');
    const modalProductDescription = document.getElementById('modalProductDescription');
    const modalProductPrice = document.getElementById('modalProductPrice');
    const openProductButtons = document.querySelectorAll('.open-product-modal');
    const sizeButtons = document.querySelectorAll('.size-list button');

    openProductButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            const productCard = button.closest('.product-card');
            const productImage = productCard.querySelector('img').getAttribute('src');
            const productTitle = productCard.querySelector('h3').textContent;
            const productDescription = productCard.querySelector('p').textContent;
            const productPrice = productCard.querySelector('b').textContent;

            modalProductImage.src = productImage;
            modalProductTitle.textContent = productTitle;
            modalProductDescription.textContent = productDescription;
            modalProductPrice.textContent = productPrice;

            productModal.classList.add('active');
            document.body.classList.add('modal-open');
        });
    });

    closeProductModal.addEventListener('click', function () {
        productModal.classList.remove('active');
        document.body.classList.remove('modal-open');
    });

    productModal.addEventListener('click', function (e) {
        if (e.target === productModal) {
            productModal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    });

    sizeButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            sizeButtons.forEach(function (item) {
                item.classList.remove('active');
            });

            button.classList.add('active');
        });
    });

    const addToCartBtn = document.querySelector('.product-modal__cart');

    addToCartBtn.addEventListener('click', function () {
        const product = {
            title: modalProductTitle.textContent,
            description: modalProductDescription.textContent,
            price: modalProductPrice.textContent,
            image: modalProductImage.src,
            size: document.querySelector('.size-list button.active').textContent
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        cart.push(product);

        localStorage.setItem('cart', JSON.stringify(cart));

        productModal.classList.remove('active');
        document.body.classList.remove('modal-open');

        window.location.href = 'cart.html';
    });
});