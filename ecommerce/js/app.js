// Sample Products Database
const products = [
    {
        id: 1,
        name: 'Premium Watch',
        price: 299.99,
        description: 'Luxury timepiece with Swiss movement',
        icon: '⌚',
        rating: 5
    },
    {
        id: 2,
        name: 'Designer Sunglasses',
        price: 199.99,
        description: 'UV protected premium sunglasses',
        icon: '😎',
        rating: 4.8
    },
    {
        id: 3,
        name: 'Leather Wallet',
        price: 149.99,
        description: 'Genuine Italian leather wallet',
        icon: '👜',
        rating: 4.9
    },
    {
        id: 4,
        name: 'Gold Ring',
        price: 499.99,
        description: '18k gold engagement ring',
        icon: '💍',
        rating: 5
    },
    {
        id: 5,
        name: 'Silk Tie',
        price: 89.99,
        description: 'Premium Italian silk tie',
        icon: '👔',
        rating: 4.7
    },
    {
        id: 6,
        name: 'Perfume',
        price: 129.99,
        description: 'Exclusive fragrance collection',
        icon: '💐',
        rating: 4.8
    }
];

// Shopping Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// AI Chat Responses
const aiResponses = {
    greeting: [
        "Hello! How can I assist you today?",
        "Hi there! 👋 What can I help you with?",
        "Welcome! What brings you here?"
    ],
    products: [
        "We have a great selection of luxury products! Would you like to know more about any specific item?",
        "Our products are all premium quality. Is there something specific you're looking for?"
    ],
    shipping: [
        "We offer free shipping on orders over $100! Standard delivery takes 5-7 business days.",
        "Shipping is available worldwide. Express delivery is available for an additional fee."
    ],
    returns: [
        "We offer a 30-day return policy for all items in original condition.",
        "If you're not satisfied, we accept returns within 30 days of purchase."
    ],
    payment: [
        "We accept all major credit cards, PayPal, and Apple Pay for your convenience.",
        "We support various payment methods for your security and convenience."
    ],
    default: [
        "That's a great question! Is there anything specific I can help you with?",
        "I'm here to help! Feel free to ask me about our products, shipping, or returns.",
        "I'm not sure I understood that. Can you rephrase your question?"
    ]
};

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    updateCart();
    setupEventListeners();
});

// Load Products
function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card">
            <div class="product-image">${product.icon}</div>
            <div class="product-content">
                <h3 class="product-name">${product.name}</h3>
                <p class="product-description">${product.description}</p>
                <p class="product-price">$${product.price.toFixed(2)}</p>
                <div class="product-rating">
                    ${'⭐'.repeat(Math.floor(product.rating))} (${product.rating})
                </div>
                <button class="product-btn" onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Add to Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    saveCart();
    updateCart();
    showNotification(`${product.name} added to cart!`);
}

// Remove from Cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCart();
    updateCart();
}

// Update Quantity
function updateQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId);
        } else {
            saveCart();
            updateCart();
        }
    }
}

// Save Cart to LocalStorage
function saveCart() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Update Cart Display
function updateCart() {
    const cartCount = document.getElementById('cart-count');
    const cartItems = document.getElementById('cart-items');
    const subtotal = document.getElementById('subtotal');
    const tax = document.getElementById('tax');
    const total = document.getElementById('total');

    // Update cart count
    const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCount.textContent = itemCount;

    // Update cart items
    if (cart.length === 0) {
        cartItems.innerHTML = '<div style="text-align: center; padding: 2rem; color: #999;">Your cart is empty</div>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-name">${item.name}</div>
                <div class="cart-item-price">$${item.price.toFixed(2)}</div>
                <div class="cart-item-controls">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">−</button>
                    <span class="quantity">${item.quantity}</span>
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    <button class="remove-btn" onclick="removeFromCart(${item.id})">Remove</button>
                </div>
            </div>
        `).join('');
    }

    // Calculate totals
    const subtotalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const taxAmount = subtotalAmount * 0.1; // 10% tax
    const totalAmount = subtotalAmount + taxAmount;

    subtotal.textContent = `$${subtotalAmount.toFixed(2)}`;
    tax.textContent = `$${taxAmount.toFixed(2)}`;
    total.textContent = `$${totalAmount.toFixed(2)}`;
}

// Toggle Cart
function toggleCart() {
    const cartModal = document.getElementById('cart-modal');
    cartModal.classList.toggle('active');
}

// Toggle AI Chat
function toggleAiChat() {
    const aiChat = document.getElementById('ai-chat');
    aiChat.classList.toggle('active');
}

// Send Chat Message
function sendChatMessage() {
    const chatInput = document.getElementById('chat-input');
    const chatMessages = document.getElementById('chat-messages');
    const message = chatInput.value.trim();

    if (!message) return;

    // Add user message
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'message user-message';
    userMessageDiv.textContent = message;
    chatMessages.appendChild(userMessageDiv);

    // Clear input
    chatInput.value = '';

    // Get AI response
    const aiResponse = getAiResponse(message);
    setTimeout(() => {
        const aiMessageDiv = document.createElement('div');
        aiMessageDiv.className = 'message ai-message';
        aiMessageDiv.textContent = aiResponse;
        chatMessages.appendChild(aiMessageDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 500);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Get AI Response
function getAiResponse(userMessage) {
    const message = userMessage.toLowerCase();

    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
        return getRandomResponse(aiResponses.greeting);
    } else if (message.includes('product') || message.includes('item') || message.includes('buy')) {
        return getRandomResponse(aiResponses.products);
    } else if (message.includes('shipping') || message.includes('delivery')) {
        return getRandomResponse(aiResponses.shipping);
    } else if (message.includes('return') || message.includes('refund')) {
        return getRandomResponse(aiResponses.returns);
    } else if (message.includes('payment') || message.includes('pay')) {
        return getRandomResponse(aiResponses.payment);
    } else {
        return getRandomResponse(aiResponses.default);
    }
}

// Get Random Response
function getRandomResponse(responses) {
    return responses[Math.floor(Math.random() * responses.length)];
}

// Handle Chat Enter Key
function handleChatEnter(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Setup Event Listeners
function setupEventListeners() {
    // Cart icon click
    document.getElementById('cart-icon').addEventListener('click', (e) => {
        e.preventDefault();
        toggleCart();
    });

    // AI toggle click
    document.getElementById('ai-toggle').addEventListener('click', (e) => {
        e.preventDefault();
        toggleAiChat();
    });

    // Contact form submission
    document.getElementById('contact-form').addEventListener('submit', (e) => {
        e.preventDefault();
        handleContactForm();
    });

    // Close modals on outside click
    document.addEventListener('click', (e) => {
        const cartModal = document.getElementById('cart-modal');
        const aiChat = document.getElementById('ai-chat');

        if (cartModal.classList.contains('active') && !cartModal.contains(e.target) && !document.getElementById('cart-icon').contains(e.target)) {
            cartModal.classList.remove('active');
        }
    });
}

// Handle Contact Form
function handleContactForm() {
    const form = document.getElementById('contact-form');
    const formData = new FormData(form);

    showNotification('Message sent successfully! We will get back to you soon.');
    form.reset();
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: linear-gradient(135deg, #d4af37, #e6c200);
        color: #1a1a1a;
        padding: 1rem 1.5rem;
        border-radius: 12px;
        box-shadow: 0 8px 25px rgba(212, 175, 55, 0.3);
        z-index: 5000;
        animation: slideInRight 0.3s ease-out, slideOutRight 0.3s ease-out 2.7s forwards;
        font-weight: bold;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Add slide out animation
const style = document.createElement('style');
style.textContent = `
    @keyframes slideOutRight {
        to {
            opacity: 0;
            transform: translateX(400px);
        }
    }
`;
document.head.appendChild(style);

// Start initial AI message
window.addEventListener('load', () => {
    const chatMessages = document.getElementById('chat-messages');
    // AI greeting is already in HTML
});
