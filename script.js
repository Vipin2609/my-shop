// --- MOCK DATA (Now lives in the browser) ---
const products = [
    { 
        id: 1, 
        name: "Sony WH-1000XM5", 
        price: 348.00, 
        image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?auto=format&fit=crop&w=500&q=80",
        category: "Electronics"
    },
    { 
        id: 2, 
        name: "Minimalist Watch", 
        price: 129.50, 
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=500&q=80",
        category: "Accessories"
    },
    { 
        id: 3, 
        name: "Nike Air Zoom", 
        price: 89.99, 
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=500&q=80",
        category: "Footwear"
    },
    { 
        id: 4, 
        name: "Herschel Backpack", 
        price: 45.00, 
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=500&q=80",
        category: "Fashion"
    },
    { 
        id: 5, 
        name: "Mechanical Keyboard", 
        price: 150.00, 
        image: "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=500&q=80",
        category: "Electronics"
    },
    { 
        id: 6, 
        name: "Polaroid Camera", 
        price: 99.00, 
        image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?auto=format&fit=crop&w=500&q=80",
        category: "Photography"
    }
];

let cart = [];

// 1. Initialize
document.addEventListener('DOMContentLoaded', () => {
    // Instead of fetching from server, we render the hardcoded list directly
    renderProducts(products);
});

// 2. Render Products
function renderProducts(productList) {
    const container = document.getElementById('product-list');
    container.innerHTML = productList.map(p => `
        <div class="product-card">
            <img src="${p.image}" alt="${p.name}">
            <div class="card-content">
                <span class="card-cat">${p.category}</span>
                <h3 class="card-title">${p.name}</h3>
                <p class="card-price">$${p.price.toFixed(2)}</p>
                <button class="add-btn" onclick="addToCart(${p.id})">
                    <i class="fa-solid fa-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// 3. Add to Cart
function addToCart(id) {
    const product = products.find(p => p.id === id);
    const existingItem = cart.find(item => item.id === id);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    updateCartUI();
    const modal = document.getElementById('cart-modal');
    if(modal.classList.contains('hidden')) toggleCart();
}

// 4. Update UI
function updateCartUI() {
    document.getElementById('cart-count').innerText = cart.reduce((sum, item) => sum + item.quantity, 0);
    const cartItemsContainer = document.getElementById('cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-msg">Your cart is empty.</p>';
    } else {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <img src="${item.image}" alt="${item.name}">
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <p>$${item.price} x ${item.quantity}</p>
                </div>
            </div>
        `).join('');
    }

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    document.getElementById('total-price').innerText = '$' + total.toFixed(2);
}

// 5. Checkout (Simulated in Browser)
function checkout() {
    if (cart.length === 0) return alert("Cart is empty!");

    const btn = document.getElementById('checkout-btn');
    const originalText = btn.innerText;
    btn.innerText = "Processing...";
    btn.disabled = true;

    // Simulate API delay
    setTimeout(() => {
        alert(`Payment Successful! Order ID: ${Math.floor(Math.random() * 10000)}`);
        cart = [];
        updateCartUI();
        toggleCart();
        btn.innerText = originalText;
        btn.disabled = false;
    }, 1500);
}

function toggleCart() {
    const modal = document.getElementById('cart-modal');
    modal.classList.toggle('hidden');
}