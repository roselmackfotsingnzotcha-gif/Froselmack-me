/* ================================
   EXTERNAL PRODUCT INTEGRATION
   Product Fetcher from Multiple Sources
   ================================ */

// Configuration for external product sources
const PRODUCT_SOURCES = {
    aliexpress: {
        name: 'AliExpress',
        enabled: true,
        category: 'electronics',
        minPrice: 5,
        maxPrice: 500
    },
    amazon: {
        name: 'Amazon',
        enabled: true,
        category: 'fashion',
        minPrice: 10,
        maxPrice: 1000
    },
    ebay: {
        name: 'eBay',
        enabled: true,
        category: 'jewelry',
        minPrice: 20,
        maxPrice: 2000
    },
    etsy: {
        name: 'Etsy',
        enabled: true,
        category: 'fashion',
        minPrice: 15,
        maxPrice: 800
    }
};

// Mock products from various sources (since direct API calls require authentication)
// In production, replace these with actual API calls
const EXTERNAL_PRODUCTS = [
    // AliExpress Products (Electronics & Gadgets)
    {
        id: 101,
        name: "Wireless Bluetooth Earbuds Pro Max",
        category: "tech",
        price: 45.99,
        originalPrice: 79.99,
        image: "🎧",
        rating: 4.5,
        reviews: 2847,
        description: "High-quality wireless Bluetooth earbuds with active noise cancellation and 24-hour battery life.",
        details: ["Bluetooth 5.0", "ANC Technology", "24hr Battery", "Water Resistant"],
        sizes: ["One Size"],
        colors: ["Black", "White", "Blue"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 102,
        name: "Smart LED Ring Light Kit",
        category: "tech",
        price: 34.50,
        originalPrice: 59.99,
        image: "💡",
        rating: 4.6,
        reviews: 1523,
        description: "Professional smart LED ring light with adjustable color temperature and brightness for content creation.",
        details: ["RGB Colors", "App Control", "Phone Holder", "USB Powered"],
        sizes: ["10 inch", "12 inch"],
        colors: ["Black"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 103,
        name: "Portable Mini Projector 4K",
        category: "tech",
        price: 89.99,
        originalPrice: 149.99,
        image: "📽️",
        rating: 4.7,
        reviews: 1204,
        description: "Compact 4K portable projector with 200 ANSI lumens brightness and smart OS integration.",
        details: ["4K Resolution", "200 ANSI Lumens", "Smart OS", "Keystone Correction"],
        sizes: ["Standard"],
        colors: ["Black"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 104,
        name: "USB-C Fast Charging Cable Pack",
        category: "tech",
        price: 12.99,
        originalPrice: 24.99,
        image: "🔌",
        rating: 4.4,
        reviews: 5432,
        description: "High-speed USB-C charging cables with reinforced connectors. Pack of 3 meters.",
        details: ["100W PD Charging", "Durable Design", "3-Pack", "Fast Data Transfer"],
        sizes: ["3 Meters"],
        colors: ["Black", "White"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 105,
        name: "Wireless Phone Charger Pad",
        category: "tech",
        price: 18.75,
        originalPrice: 35.99,
        image: "⚡",
        rating: 4.5,
        reviews: 3421,
        description: "Fast wireless charging pad supporting all QI-enabled devices with LED indicator.",
        details: ["15W Fast Charge", "QI Certified", "LED Indicator", "Anti-Slip Pad"],
        sizes: ["Standard"],
        colors: ["Black", "White", "Gradient"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 106,
        name: "HD Webcam 1080P with Microphone",
        category: "tech",
        price: 25.50,
        originalPrice: 49.99,
        image: "📹",
        rating: 4.6,
        reviews: 2156,
        description: "Professional HD webcam with built-in microphone and automatic focus for streaming.",
        details: ["1080P HD", "Built-in Mic", "Auto Focus", "USB Plug & Play"],
        sizes: ["Standard"],
        colors: ["Black"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 107,
        name: "Mechanical Gaming Keyboard RGB",
        category: "tech",
        price: 55.99,
        originalPrice: 99.99,
        image: "⌨️",
        rating: 4.7,
        reviews: 2834,
        description: "High-performance mechanical keyboard with customizable RGB lighting for gaming.",
        details: ["Blue Switches", "RGB Lighting", "Aluminum Frame", "USB Cable"],
        sizes: ["Full Size"],
        colors: ["Black"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },
    {
        id: 108,
        name: "Ergonomic Gaming Mouse",
        category: "tech",
        price: 22.40,
        originalPrice: 44.99,
        image: "🖱️",
        rating: 4.5,
        reviews: 3456,
        description: "Professional gaming mouse with adjustable DPI and ergonomic design.",
        details: ["16000 DPI", "7 Buttons", "Ergonomic", "USB Wired"],
        sizes: ["Standard"],
        colors: ["Black", "Red"],
        source: "AliExpress",
        sourceUrl: "https://www.aliexpress.com",
        originalUrl: "#"
    },

    // Amazon Fashion & Accessories
    {
        id: 201,
        name: "Premium Leather Crossbody Bag",
        category: "fashion",
        price: 85.00,
        originalPrice: 145.00,
        image: "👜",
        rating: 4.8,
        reviews: 3245,
        description: "Genuine leather crossbody bag with multiple compartments and adjustable strap.",
        details: ["Genuine Leather", "Multiple Pockets", "Adjustable Strap", "RFID Protection"],
        sizes: ["One Size"],
        colors: ["Brown", "Black", "Tan"],
        source: "Amazon",
        sourceUrl: "https://www.amazon.com",
        originalUrl: "#"
    },
    {
        id: 202,
        name: "Stainless Steel Water Bottle",
        category: "fashion",
        price: 35.99,
        originalPrice: 59.99,
        image: "🧊",
        rating: 4.6,
        reviews: 5678,
        description: "Insulated water bottle keeps drinks hot for 12 hours and cold for 24 hours.",
        details: ["Double Wall Insulated", "Stainless Steel", "Keeps Hot/Cold", "Eco-Friendly"],
        sizes: ["16oz", "24oz", "32oz"],
        colors: ["Silver", "Black", "Rose Gold"],
        source: "Amazon",
        sourceUrl: "https://www.amazon.com",
        originalUrl: "#"
    },
    {
        id: 203,
        name: "Cotton Blend Polo Shirt",
        category: "fashion",
        price: 28.50,
        originalPrice: 49.99,
        image: "👕",
        rating: 4.5,
        reviews: 2341,
        description: "Comfortable cotton blend polo shirt perfect for casual and professional settings.",
        details: ["Cotton Blend", "Breathable", "Wrinkle Resistant", "Machine Washable"],
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        colors: ["Navy", "White", "Gray", "Black"],
        source: "Amazon",
        sourceUrl: "https://www.amazon.com",
        originalUrl: "#"
    },
    {
        id: 204,
        name: "Designer Sunglasses UV Protection",
        category: "fashion",
        price: 65.00,
        originalPrice: 119.99,
        image: "🕶️",
        rating: 4.7,
        reviews: 1876,
        description: "Stylish sunglasses with 100% UV protection and polarized lenses.",
        details: ["UV 400 Protection", "Polarized Lens", "Metal Frame", "Case Included"],
        sizes: ["One Size"],
        colors: ["Black", "Brown", "Rose Gold"],
        source: "Amazon",
        sourceUrl: "https://www.amazon.com",
        originalUrl: "#"
    },
    {
        id: 205,
        name: "Wool Winter Beanie Hat",
        category: "fashion",
        price: 22.50,
        originalPrice: 39.99,
        image: "🧢",
        rating: 4.6,
        reviews: 1543,
        description: "Warm wool beanie with soft lining and flexible fit.",
        details: ["100% Wool", "Soft Lining", "One Size Fits All", "Multiple Colors"],
        sizes: ["One Size"],
        colors: ["Black", "Gray", "Navy", "Burgundy", "White"],
        source: "Amazon",
        sourceUrl: "https://www.amazon.com",
        originalUrl: "#"
    },

    // eBay Jewelry & Watches
    {
        id: 301,
        name: "Vintage Sterling Silver Ring",
        category: "jewelry",
        price: 45.99,
        originalPrice: 85.99,
        image: "💍",
        rating: 4.8,
        reviews: 456,
        description: "Vintage-style sterling silver ring with intricate detailing.",
        details: ["Sterling Silver", "Vintage Design", "Adjustable", "Certificate"],
        sizes: ["5", "6", "7", "8", "9", "10"],
        colors: ["Silver"],
        source: "eBay",
        sourceUrl: "https://www.ebay.com",
        originalUrl: "#"
    },
    {
        id: 302,
        name: "Gold Plated Bracelet Set",
        category: "jewelry",
        price: 38.50,
        originalPrice: 72.99,
        image: "✨",
        rating: 4.7,
        reviews: 678,
        description: "Elegant gold plated bracelet set with multiple designs included.",
        details: ["Gold Plated", "Set of 3", "Adjustable", "Tarnish Resistant"],
        sizes: ["Fits Most"],
        colors: ["Gold"],
        source: "eBay",
        sourceUrl: "https://www.ebay.com",
        originalUrl: "#"
    },
    {
        id: 303,
        name: "Moonstone Crystal Necklace",
        category: "jewelry",
        price: 52.99,
        originalPrice: 99.99,
        image: "🌙",
        rating: 4.9,
        reviews: 234,
        description: "Beautiful moonstone crystal pendant necklace with healing properties.",
        details: ["Natural Moonstone", "Sterling Silver", "Healing Crystal", "Gift Box"],
        sizes: ["18 inch", "20 inch"],
        colors: ["Silver"],
        source: "eBay",
        sourceUrl: "https://www.ebay.com",
        originalUrl: "#"
    },
    {
        id: 304,
        name: "Quartz Analog Wristwatch",
        category: "watches",
        price: 42.75,
        originalPrice: 79.99,
        image: "⌚",
        rating: 4.6,
        reviews: 823,
        description: "Classic quartz wristwatch with leather strap and water resistance.",
        details: ["Quartz Movement", "Leather Strap", "Water Resistant", "Date Display"],
        sizes: ["Standard"],
        colors: ["Black", "Brown"],
        source: "eBay",
        sourceUrl: "https://www.ebay.com",
        originalUrl: "#"
    },
    {
        id: 305,
        name: "Pearl Drop Earrings",
        category: "jewelry",
        price: 38.00,
        originalPrice: 74.99,
        image: "👂",
        rating: 4.8,
        reviews: 567,
        description: "Elegant pearl drop earrings with sterling silver hooks.",
        details: ["Cultured Pearls", "Sterling Silver", "Hypoallergenic", "Elegant"],
        sizes: ["One Size"],
        colors: ["White", "Black"],
        source: "eBay",
        sourceUrl: "https://www.ebay.com",
        originalUrl: "#"
    },

    // Etsy Handmade & Unique Items
    {
        id: 401,
        name: "Handmade Ceramic Coffee Mug",
        category: "fashion",
        price: 24.99,
        originalPrice: 44.99,
        image: "☕",
        rating: 4.9,
        reviews: 876,
        description: "Beautifully handcrafted ceramic mug with unique glaze pattern.",
        details: ["Handmade", "Ceramic", "Food Safe", "Microwave Safe"],
        sizes: ["12oz", "16oz"],
        colors: ["Blue", "Green", "Red"],
        source: "Etsy",
        sourceUrl: "https://www.etsy.com",
        originalUrl: "#"
    },
    {
        id: 402,
        name: "Knitted Wool Scarf",
        category: "fashion",
        price: 35.50,
        originalPrice: 64.99,
        image: "🧣",
        rating: 4.7,
        reviews: 543,
        description: "Hand-knitted wool scarf with beautiful color patterns.",
        details: ["Hand-Knitted", "100% Wool", "Warm", "One of a Kind"],
        sizes: ["One Size"],
        colors: ["Multicolor"],
        source: "Etsy",
        sourceUrl: "https://www.etsy.com",
        originalUrl: "#"
    },
    {
        id: 403,
        name: "Personalized Leather Journal",
        category: "fashion",
        price: 32.00,
        originalPrice: 59.99,
        image: "📔",
        rating: 4.8,
        reviews: 734,
        description: "Premium leather journal with personalized monogram engraving.",
        details: ["Genuine Leather", "Personalized", "Blank Pages", "Ribbon Bookmark"],
        sizes: ["A5", "A4"],
        colors: ["Brown", "Black"],
        source: "Etsy",
        sourceUrl: "https://www.etsy.com",
        originalUrl: "#"
    },
    {
        id: 404,
        name: "Wooden Artisan Cutting Board",
        category: "fashion",
        price: 48.50,
        originalPrice: 89.99,
        image: "🪵",
        rating: 4.6,
        reviews: 612,
        description: "Beautiful handcrafted wooden cutting board with natural patterns.",
        details: ["Hardwood", "Artisan Made", "Large Size", "Food Safe"],
        sizes: ["Large", "Extra Large"],
        colors: ["Natural"],
        source: "Etsy",
        sourceUrl: "https://www.etsy.com",
        originalUrl: "#"
    },
    {
        id: 405,
        name: "Organic Cotton T-Shirt",
        category: "fashion",
        price: 26.99,
        originalPrice: 49.99,
        image: "👕",
        rating: 4.7,
        reviews: 892,
        description: "Sustainable organic cotton t-shirt with eco-friendly printing.",
        details: ["Organic Cotton", "Eco-Friendly", "Soft", "Durable"],
        sizes: ["XS", "S", "M", "L", "XL"],
        colors: ["Natural", "Black", "Gray"],
        source: "Etsy",
        sourceUrl: "https://www.etsy.com",
        originalUrl: "#"
    }
];

/* ================================
   PRODUCT INTEGRATION FUNCTIONS
   ================================ */

/**
 * Initialize external product loading
 */
async function initializeExternalProducts() {
    console.log('🌐 Loading external products from multiple sources...');
    
    // Load all external products into the database
    EXTERNAL_PRODUCTS.forEach(product => {
        // Check for duplicates
        const exists = productsDatabase.find(p => p.id === product.id);
        if (!exists) {
            productsDatabase.push(product);
        }
    });
    
    console.log(`✅ Successfully loaded ${EXTERNAL_PRODUCTS.length} external products`);
    console.log(`📊 Total products in system: ${productsDatabase.length}`);
    
    return true;
}

/**
 * Fetch products from AliExpress API
 * Note: In production, use actual AliExpress API with authentication
 */
async function fetchAliExpressProducts() {
    console.log('🔄 Fetching AliExpress products...');
    
    try {
        // In production, replace with actual API endpoint:
        // const response = await fetch('https://api.aliexpress.com/v1/products', {
        //     headers: { 'Authorization': 'Bearer YOUR_API_KEY' }
        // });
        
        // For now, we're using mock data that simulates AliExpress products
        const aliProducts = EXTERNAL_PRODUCTS.filter(p => p.source === 'AliExpress');
        
        console.log(`✅ Loaded ${aliProducts.length} AliExpress products`);
        return aliProducts;
    } catch (error) {
        console.error('❌ Error fetching AliExpress products:', error);
        return [];
    }
}

/**
 * Fetch products from Amazon API
 * Note: In production, use actual Amazon Product Advertising API
 */
async function fetchAmazonProducts() {
    console.log('🔄 Fetching Amazon products...');
    
    try {
        // In production, use Amazon Product Advertising API:
        // const response = await fetch('https://api.amazon.com/products', {
        //     headers: { 'Authorization': 'AWS4-HMAC-SHA256...' }
        // });
        
        const amazonProducts = EXTERNAL_PRODUCTS.filter(p => p.source === 'Amazon');
        
        console.log(`✅ Loaded ${amazonProducts.length} Amazon products`);
        return amazonProducts;
    } catch (error) {
        console.error('❌ Error fetching Amazon products:', error);
        return [];
    }
}

/**
 * Fetch products from eBay API
 * Note: In production, use actual eBay API
 */
async function fetchEbayProducts() {
    console.log('🔄 Fetching eBay products...');
    
    try {
        // In production, use eBay Trading API:
        // const response = await fetch('https://api.ebay.com/browse/item_summary/search', {
        //     headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
        // });
        
        const ebayProducts = EXTERNAL_PRODUCTS.filter(p => p.source === 'eBay');
        
        console.log(`✅ Loaded ${ebayProducts.length} eBay products`);
        return ebayProducts;
    } catch (error) {
        console.error('❌ Error fetching eBay products:', error);
        return [];
    }
}

/**
 * Fetch products from Etsy API
 * Note: In production, use actual Etsy API
 */
async function fetchEtsyProducts() {
    console.log('🔄 Fetching Etsy products...');
    
    try {
        // In production, use Etsy API:
        // const response = await fetch('https://api.etsy.com/v3/application/shops/listings/active', {
        //     headers: { 'x-api-key': 'YOUR_API_KEY' }
        // });
        
        const etsyProducts = EXTERNAL_PRODUCTS.filter(p => p.source === 'Etsy');
        
        console.log(`✅ Loaded ${etsyProducts.length} Etsy products`);
        return etsyProducts;
    } catch (error) {
        console.error('❌ Error fetching Etsy products:', error);
        return [];
    }
}

/**
 * Search products by source
 */
function searchProductsBySource(source) {
    return productsDatabase.filter(p => p.source === source.charAt(0).toUpperCase() + source.slice(1));
}

/**
 * Get products from multiple sources
 */
function getProductsFromSources(sources = ['AliExpress', 'Amazon', 'eBay', 'Etsy']) {
    return productsDatabase.filter(p => sources.includes(p.source));
}

/**
 * Filter products by price range
 */
function filterProductsByPrice(minPrice, maxPrice) {
    return productsDatabase.filter(p => p.price >= minPrice && p.price <= maxPrice);
}

/**
 * Get products by category and source
 */
function getProductsByCategoryAndSource(category, source) {
    return productsDatabase.filter(p => 
        p.category === category && p.source === source
    );
}

/**
 * Display source information badge
 */
function getSourceBadge(source) {
    const colors = {
        'AliExpress': '#E82100',
        'Amazon': '#FF9900',
        'eBay': '#E53238',
        'Etsy': '#F1641E'
    };
    
    return `
        <div style="
            display: inline-block;
            background: ${colors[source] || '#999'};
            color: white;
            padding: 4px 8px;
            border-radius: 4px;
            font-size: 11px;
            font-weight: 700;
            margin-top: 5px;
        ">
            🔗 ${source}
        </div>
    `;
}

/**
 * Get product statistics
 */
function getProductStatistics() {
    const stats = {
        totalProducts: productsDatabase.length,
        bySource: {},
        byCategory: {},
        priceRange: {
            min: Math.min(...productsDatabase.map(p => p.price)),
            max: Math.max(...productsDatabase.map(p => p.price)),
            average: (productsDatabase.reduce((sum, p) => sum + p.price, 0) / productsDatabase.length).toFixed(2)
        }
    };
    
    // Count by source
    productsDatabase.forEach(p => {
        stats.bySource[p.source] = (stats.bySource[p.source] || 0) + 1;
    });
    
    // Count by category
    productsDatabase.forEach(p => {
        stats.byCategory[p.category] = (stats.byCategory[p.category] || 0) + 1;
    });
    
    return stats;
}

/**
 * Render products with source information
 */
function renderProductsWithSource(filter = 'all', source = null) {
    const productsGrid = document.getElementById('productsGrid');
    productsGrid.innerHTML = '';

    let filteredProducts = [];
    
    if (source) {
        filteredProducts = filter === 'all' 
            ? searchProductsBySource(source)
            : productsDatabase.filter(p => 
                (filter === 'all' || p.category === filter) && 
                p.source === source.charAt(0).toUpperCase() + source.slice(1)
            );
    } else {
        filteredProducts = filter === 'all' 
            ? productsDatabase
            : productsDatabase.filter(p => p.category === filter);
    }

    filteredProducts.forEach((product, index) => {
        const productCard = createProductCardWithSource(product);
        productsGrid.appendChild(productCard);
        
        setTimeout(() => {
            productCard.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }, index * 50);
    });

    if (filteredProducts.length === 0) {
        productsGrid.innerHTML = '<p style="grid-column: 1/-1; text-align: center; padding: 40px; color: #999;">No products found</p>';
    }
}

/**
 * Create product card with source badge
 */
function createProductCardWithSource(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);
    
    card.innerHTML = `
        <div class="product-image-wrapper">
            <div style="font-size: 100px; display: flex; align-items: center; justify-content: center; height: 100%; background: linear-gradient(135deg, #f5f5f5, #e0e0e0);">
                ${product.image}
            </div>
            ${discount > 0 ? `<div class="product-badge">-${discount}%</div>` : ''}
            <div style="position: absolute; bottom: 10px; left: 10px; background: rgba(0,0,0,0.6); color: white; padding: 6px 10px; border-radius: 4px; font-size: 11px; font-weight: 700;">
                🔗 ${product.source}
            </div>
        </div>
        <div class="product-body">
            <p class="product-category">${product.category}</p>
            <h3 class="product-name">${product.name}</h3>
            <div class="product-rating">
                <div class="stars">
                    ${generateStars(product.rating)}
                </div>
                <span style="font-size: 12px;">(${product.reviews})</span>
            </div>
            <div class="product-price-section">
                <div>
                    <div class="product-price">$${product.price.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                    <div class="product-original-price">$${product.originalPrice.toLocaleString('en-US', {minimumFractionDigits: 2})}</div>
                </div>
            </div>
            <div class="product-actions">
                <button class="product-action-btn" onclick="openProductDetail(${product.id})" title="View Details">
                    <i class="fas fa-shopping-bag"></i>
                </button>
                <button class="product-action-btn" onclick="toggleWishlist(${product.id}, '${product.name}')" title="Add to Wishlist">
                    <i class="far fa-heart"></i>
                </button>
            </div>
        </div>
    `;
    
    return card;
}

/**
 * Display product statistics on the page
 */
function displayProductStats() {
    const stats = getProductStatistics();
    
    let statsHtml = `
        <div style="background: linear-gradient(135deg, var(--primary-color), #c19a1b); color: var(--secondary-color); padding: 20px; border-radius: 8px; margin: 20px 0; font-weight: 600;">
            <h3 style="margin: 0 0 10px 0;">📊 Product Catalog Statistics</h3>
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 15px;">
                <div>
                    <div style="font-size: 24px; font-weight: 700;">📦 ${stats.totalProducts}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Total Products</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: 700;">💰 $${stats.priceRange.min.toFixed(2)}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Lowest Price</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: 700;">💵 $${stats.priceRange.max.toFixed(2)}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Highest Price</div>
                </div>
                <div>
                    <div style="font-size: 24px; font-weight: 700;">📈 $${stats.priceRange.average}</div>
                    <div style="font-size: 12px; opacity: 0.9;">Average Price</div>
                </div>
            </div>
            <div style="margin-top: 15px;">
                <strong>By Source:</strong> ${Object.entries(stats.bySource).map(([source, count]) => `${source} (${count})`).join(', ')}
            </div>
        </div>
    `;
    
    console.table(stats);
    return statsHtml;
}

/**
 * Export products to CSV format
 */
function exportProductsToCSV() {
    let csv = 'ID,Name,Category,Price,Original Price,Rating,Reviews,Source\n';
    
    productsDatabase.forEach(product => {
        csv += `${product.id},"${product.name}","${product.category}",${product.price},${product.originalPrice},${product.rating},${product.reviews},"${product.source}"\n`;
    });
    
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'luxeventure_products.csv';
    a.click();
    
    showToast('Products exported to CSV!', 'success');
}

/**
 * Sync products with external APIs (Scheduled)
 */
async function syncExternalProducts() {
    console.log('🔄 Starting product synchronization...');
    
    try {
        const startTime = Date.now();
        
        await Promise.all([
            fetchAliExpressProducts(),
            fetchAmazonProducts(),
            fetchEbayProducts(),
            fetchEtsyProducts()
        ]);
        
        const duration = ((Date.now() - startTime) / 1000).toFixed(2);
        console.log(`✅ Product synchronization completed in ${duration}s`);
        
        showToast(`✅ Products updated! (${duration}s)`, 'success');
        return true;
    } catch (error) {
        console.error('❌ Sync error:', error);
        showToast('Error syncing products', 'error');
        return false;
    }
}

/**
 * Add custom filter for multi-source products
 */
function addSourceFilter() {
    const filterContainer = document.querySelector('.filters');
    
    // Remove old source filters if they exist
    document.querySelectorAll('.source-filter').forEach(el => el.remove());
    
    const sources = ['All Sources', 'AliExpress', 'Amazon', 'eBay', 'Etsy'];
    const filterDiv = document.createElement('div');
    filterDiv.className = 'source-filter';
    filterDiv.style.cssText = 'width: 100%; padding: 15px 0; border-top: 1px solid var(--border-color); margin-top: 15px;';
    
    filterDiv.innerHTML = '<strong style="display: block; margin-bottom: 10px;">Filter by Source:</strong>';
    
    const buttonGroup = document.createElement('div');
    buttonGroup.style.cssText = 'display: flex; gap: 10px; flex-wrap: wrap;';
    
    sources.forEach(source => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn ' + (source === 'All Sources' ? 'active' : '');
        btn.textContent = source;
        btn.onclick = () => {
            document.querySelectorAll('.source-filter .filter-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            if (source === 'All Sources') {
                renderProductsWithSource(state.currentFilter);
            } else {
                renderProductsWithSource(state.currentFilter, source);
            }
        };
        buttonGroup.appendChild(btn);
    });
    
    filterDiv.appendChild(buttonGroup);
    filterContainer.parentElement.insertBefore(filterDiv, filterContainer.nextSibling);
}

console.log('✅ External Product Integration Module Loaded');
