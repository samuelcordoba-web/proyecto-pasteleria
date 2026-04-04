function toggleDarkMode() {
    const body = document.body;
    const btn = document.getElementById('darkModeToggle');
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        btn.textContent = '☀️';
        btn.title = 'Switch to Light Mode';
        localStorage.setItem('darkMode', 'enabled');
    } else {
        btn.textContent = '🌙';
        btn.title = 'Switch to Dark Mode';
        localStorage.setItem('darkMode', 'disabled');
    }
}

document.addEventListener('DOMContentLoaded', function () {
    const darkModePref = localStorage.getItem('darkMode');
    if (darkModePref === 'enabled') {
        document.body.classList.add('dark-mode');
        const btn = document.getElementById('darkModeToggle');
        if (btn) {
            btn.textContent = '☀️';
            btn.title = 'Switch to Light Mode';
        }
    }
});

// Variables globales para el carrito
let cart = [];
let selectedImageUrl = "";
let currentQuantity = 1;
let currentProductMinDays = 7;
let customCakeOptions = {
    size: 'Large (20-25)',
    bizcocho: 'Vanilla',
    relleno: 'Dark Chocolate Cream',
    cobertura: 'Buttercream',
    delivery: 'pickup'
};
let deliveryOption = 'pickup';
let selectedOptions = {
    size: '20-25 people',
    bizcocho: 'Vanilla',
    relleno: 'Dark Chocolate Cream',
    cobertura: 'Buttercream',
    basePrice: 100
};

const PAYPAL_ME_USER = 'paycakesmellisacakes';
const PRICES_IN = 'AUD';
const IMGBB_API_KEY = 'b8f77766253714bfef01474a8970e7ed';

function getCartTotalForPayPalMe() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (PRICES_IN === 'COP') {
        total = total / COP_TO_AUD;
    }

    return Number(total).toFixed(2);
}

let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const scrollThreshold = 10;

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        header.classList.add('header-hidden');
    } else {
        header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
});


function updatePayPalMeLink() {
    const link = document.getElementById('paypalme-link');
    const warn = document.getElementById('paypalme-warning');
    if (!link) return;

    const amount = getCartTotalForPayPalMe();

    link.href = `https://paypal.me/${PAYPAL_ME_USER}/${amount}`;
    link.textContent = `Pay ${amount} AUD with PayPal.me`;


    if (Number(amount) === 0) {
        if (warn) warn.textContent = 'Your cart is empty — add products before paying.';
        link.style.opacity = '0.6';
        link.style.pointerEvents = 'none';
    } else {
        if (warn) warn.textContent = '';
        link.style.opacity = '1';
        link.style.pointerEvents = 'auto';
    }
}

//  FUNCIÓN PARA SUBIR IMÁGENES A IMGBB  //
async function uploadImageToImgBB(dataUrl) {
    try {
        console.log('Iniciando subida a ImgBB...');


        if (!IMGBB_API_KEY || IMGBB_API_KEY === '0b369f41c7edd5d9d48c44376b8c58e2') {
            console.warn('⚠️ Using example API key. Please configure your own API key.');
            alert('⚠️ IMPORTANT: You need to configure your ImgBB API Key in scripts.js for images to upload.');
        }

        const base64Data = dataUrl.split(',')[1];

        if (!base64Data) {
            console.error('Error: No se pudo extraer datos base64 de la imagen');
            return null;
        }

        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Data);
        formData.append('expiration', 15552000);

        console.log('Subiendo imagen a ImgBB... (esto puede tomar unos segundos)');

        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 segundos timeout

        const response = await fetch('https://api.imgbb.com/1/upload', {
            method: 'POST',
            body: formData,
            signal: controller.signal
        });

        clearTimeout(timeoutId);

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error en la respuesta de ImgBB:', response.status, errorText);
            return null;
        }

        const result = await response.json();

        if (result.success && result.data && result.data.url) {
            console.log('✅ Imagen subida exitosamente a ImgBB:', result.data.url);
            return result.data.url;
        } else {
            console.error('ImgBB no devolvió una URL válida:', result);
            return null;
        }
    } catch (error) {
        if (error.name === 'AbortError') {
            console.error('Timeout: La subida de imagen tardó demasiado');
        } else {
            console.error('Error al subir imagen a ImgBB:', error);
        }
        return null;
    }
}



function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.classList.add('fade-out');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

function updateCartButton() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-btn').innerHTML = `🛒 Cart (${totalItems})`;
}

function changeQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('quantity').textContent = currentQuantity;
    updateAddToCartPrice();
}

function selectOption(button, type) {
    const buttons = button.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    selectedOptions[type] = button.textContent;
    updateAddToCartPrice();
}


function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');

    const btn = document.querySelector('.mobile-menu-btn');
    if (menu.classList.contains('active')) {
        btn.textContent = '✕';
    } else {
        btn.textContent = '☰';
    }
}

function closeMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.remove('active');
    document.querySelector('.mobile-menu-btn').textContent = '☰';
}


document.addEventListener('click', function (event) {
    const menu = document.querySelector('.nav-menu');
    const btn = document.querySelector('.mobile-menu-btn');

    if (!menu.contains(event.target) && event.target !== btn) {
        menu.classList.remove('active');
        btn.textContent = '☰';
    }
});

function addToCart() {
    if (!validateDate(document.querySelector('#productModal input[type="date"]').value)) {
        return;
    }
    if (typeof syncSelectedOptionsFromUI === 'function') syncSelectedOptionsFromUI();

    // Validar nombre y teléfono
    const name = document.getElementById('customerName').value.trim();
    const phone = document.getElementById('customerPhone').value.trim();

    if (!name || !phone) {
        showNotification('⚠️ You must enter your name and phone number.');
        return;
    }

    const price = parseInt(document.querySelector('.add-to-cart').textContent.match(/\d+/)[0]);

    const newItem = {
        name: document.getElementById('modalTitle').textContent,
        size: selectedOptions.size,
        bizcocho: selectedOptions.bizcocho,
        relleno: selectedOptions.relleno,
        cobertura: selectedOptions.cobertura,
        quantity: currentQuantity,
        price: price,
        date: document.querySelector('#productModal input[type="date"]').value,
        minDays: currentProductMinDays,
        message: document.querySelector('input[type="text"]').value || 'No message',
        delivery: deliveryOption,
        address: deliveryOption === 'delivery'
            ? document.getElementById('deliveryAddress').value
            : 'Pick Up',
        phone: phone,
        customerName: name,
        image: selectedImageUrl
    };

    cart.push(newItem);
    updateCartButton();
    updatePayPalMeLink();
    closeModal();
    showNotification('Product added to cart!');
}


function getBase64Image(url, callback) {
    fetch(url)
        .then(res => res.blob())
        .then(blob => {
            const reader = new FileReader();
            reader.onloadend = () => callback(reader.result);
            reader.readAsDataURL(blob);
        });
}

// Función para eliminar items del carrito
function removeFromCart(index) {
    cart.splice(index, 1);
    updateCartModalContent();
    updateCartButton();
    updatePayPalMeLink();
    showNotification('Product removed from cart');
}

// Función para validar fecha
function validateDate(selectedDate) {
    const today = new Date();
    const minDate = new Date();
    const days = typeof currentProductMinDays === 'number' ? currentProductMinDays : 7;
    minDate.setDate(today.getDate() + days);

    if (new Date(selectedDate) < minDate) {
        closeModal();
        setTimeout(() => {
            showNotification(`⚠️ Orders require at least ${days} days notice`);
        }, 100);
        return false;
    }
    return true;
}

function closeModal() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

function submitCustomCakeRequest() {
    const description = document.getElementById('cakeDescription').value;
    const date = document.getElementById('customCakeDate').value;
    const name = document.getElementById('customerName').value;
    const phone = document.getElementById('customerPhone').value;
    const imageInput = document.getElementById('referenceImage');

    if (!description || !date || !name || !phone) {
        showNotification('Please fill in all required fields');
        return;
    }

    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    formData.append('name', name);
    formData.append('phone', phone);

    if (imageInput.files.length > 0) {
        formData.append('referenceImage', imageInput.files[0]);
    }

    showNotification('✅ Your custom cake request has been sent! We will contact you soon.');

    closeModal();
    document.getElementById('cakeDescription').value = '';
    document.getElementById('customCakeDate').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('referenceImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
}

let selectedPaymentMethod = null;

function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }

    const today = new Date();
    for (const item of cart) {
        const requiredDays = typeof item.minDays === 'number' ? item.minDays : 7;
        const minDate = new Date();
        minDate.setDate(today.getDate() + requiredDays);
        if (new Date(item.date) < minDate) {
            showNotification(`⚠️ The product "${item.name}" requires at least ${requiredDays} days notice`);
            return;
        }
    }

    document.getElementById('paymentModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    selectedPaymentMethod = null;
    document.querySelectorAll('.payment-option').forEach(option => {
        option.style.border = '2px solid #e9ecef';
    });
    document.getElementById('paypal-button-container').style.display = 'none';
    document.getElementById('transfer-info').style.display = 'none';
    document.getElementById('completeOrderBtn').style.display = 'none';
}

function calculateCartTotalUSD() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    return total.toFixed(2);
}


function selectPaymentMethod(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll('.payment-option').forEach(option => {
        option.style.border = '2px solid #e9ecef';
    });

    event.currentTarget.style.border = '2px solid #00b894';

    document.getElementById('paypal-button-container').style.display = 'none';
    document.getElementById('paypalme-info').style.display = 'none';

    const completeBtn = document.getElementById('completeOrderBtn');

    if (method === 'paypalme') {
        document.getElementById('paypalme-info').style.display = 'block';
        updatePayPalMeLink();

        completeBtn.disabled = true;

        if (!document.getElementById('paypalme-confirm')) {
            const confirmBox = document.createElement('div');
            confirmBox.innerHTML = `
                <label style="display:flex;align-items:center;gap:5px;margin-top:10px;">
                    <input type="checkbox" id="paypalme-confirm"> I already paid via PayPal.me
                </label>
            `;
            document.getElementById('paypalme-info').appendChild(confirmBox);

            document.getElementById('paypalme-confirm').addEventListener('change', function () {
                completeBtn.disabled = !this.checked;
            });
        }
    } else {
        completeBtn.disabled = false;
    }

    completeBtn.style.display = 'block';
}

function renderPayPalButton() {
    try {
        const container = document.getElementById('paypal-button-container');
        container.innerHTML = '';

        container.innerHTML = '<div class="paypal-loading">Loading PayPal...</div>';

        const total = calculateCartTotal() / 100;

        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2),
                            currency_code: 'USD',
                            breakdown: {
                                item_total: {
                                    value: total.toFixed(2),
                                    currency_code: 'USD'
                                }
                            }
                        },
                        items: cart.map(item => ({
                            name: item.name.substring(0, 127),
                            unit_amount: {
                                value: (item.price / 100).toFixed(2),
                                currency_code: 'USD'
                            },
                            quantity: item.quantity.toString()
                        }))
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    console.log('Transaction completed:', details);
                    completeOrder(true);
                    showNotification('✅ Pago completado con PayPal. Gracias por tu compra!');
                });
            },
            onError: function (err) {
                console.error('PayPal Error:', err);
                showNotification('⚠️ PayPal payment error: ' + err.message);
                container.innerHTML = '<p class="paypal-error">Error loading PayPal. Please try again or choose another method.</p>';
                document.getElementById('completeOrderBtn').style.display = 'block';
            },
            onCancel: function (data) {
                console.log('Payment cancelled:', data);
                showNotification('⚠️ Payment cancelled by user');
            }
        }).render('#paypal-button-container');
    } catch (error) {
        console.error('Error rendering PayPal button:', error);
        showNotification('⚠️ Error loading PayPal. Please try later.');
        document.getElementById('completeOrderBtn').style.display = 'block';
    }
}

async function completeOrder() {
    if (!selectedPaymentMethod) {
        showNotification('Please select a payment method');
        return;
    }

    const form = document.getElementById('orderForm');
    const detailsInput = document.getElementById('orderDetailsInput');

    if (!form) {
        console.error('No se encontró el formulario con id="orderForm"');
        return;
    }
    if (!detailsInput) {
        console.error('No se encontró el input oculto con id="orderDetailsInput"');
        return;
    }

    try {
        const endpoint = form.action || 'https://formspree.io/f/mwpqwjaa';
        showNotification('Sending order…');

        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('📤 INICIANDO ENVÍO DEL PEDIDO');
        console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.log('Endpoint:', endpoint);
        console.log('Número de items en carrito:', cart.length);
        console.log('Método de pago:', selectedPaymentMethod);

        const customCakesWithImages = cart.filter(item =>
            item.custom && item.image && typeof item.image === 'string' && item.image.startsWith('data:')
        );

        if (customCakesWithImages.length > 0) {
            console.log(`📸 Detectados ${customCakesWithImages.length} pastel(es) personalizado(s) con imagen`);
            showNotification(`📸 Processing ${customCakesWithImages.length} image(s)...`);
        }



        await submitOrderWithAttachments(endpoint);

        console.log('✅ Pedido enviado exitosamente');
        showNotification('✅ Order sent successfully.');
        guardarPedidoEnHistorial();
        cart = [];
        updateCartButton();
        updateCartModalContent();
        closeModal();
    } catch (err) {
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('❌ ERROR AL ENVIAR PEDIDO');
        console.error('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
        console.error('Detalles del error:', err);
        console.error('Stack trace:', err.stack);

        // Mostrar error más específico
        let errorMessage = '⚠️ Error sending order.';
        if (err.message) {
            if (err.message.includes('413')) {
                errorMessage = '⚠️ Images are too large. Please use smaller images (under 1MB).';
            } else if (err.message.includes('400')) {
                errorMessage = '⚠️ Order data error. Verify all fields are complete.';
            } else if (err.message.includes('500')) {
                errorMessage = '⚠️ Server error. Please try again in a few minutes.';
            } else if (err.message.includes('network') || err.message.includes('fetch') || err.message.includes('Failed to fetch')) {
                errorMessage = '⚠️ Connection error. Check your internet and try again.';
            } else if (err.message.includes('timeout') || err.message.includes('AbortError')) {
                errorMessage = '⚠️ Operation timed out. Check your connection and try again.';
            } else {
                errorMessage = `⚠️ Error: ${err.message}`;
            }
        }

        showNotification(errorMessage);

        console.log('Contenido del carrito al fallar:');
        cart.forEach((item, index) => {
            console.log(`Item ${index + 1}:`, {
                nombre: item.name,
                custom: item.custom,
                tieneImagen: !!item.image,
                tipoImagen: item.image ? (item.image.startsWith('data:') ? 'data URL' : 'URL') : 'ninguna',
                tamañoImagen: item.image ? `${(item.image.length / 1024).toFixed(2)} KB` : '0 KB'
            });
        });
    }
}


function renderPayPalButton() {
    try {
        const container = document.getElementById('paypal-button-container');
        container.innerHTML = '<div class="paypal-loading">Loading PayPal...</div>';

        const total = calculateCartTotal() / 100;

        paypal.Buttons({
            style: {
                layout: 'vertical',
                color: 'gold',
                shape: 'rect',
                label: 'paypal'
            },
            createOrder: function (data, actions) {
                return actions.order.create({
                    purchase_units: [{
                        amount: {
                            value: total.toFixed(2),
                            currency_code: 'USD'
                        },
                        description: "Melissa Cakes Order"
                    }]
                });
            },
            onApprove: function (data, actions) {
                return actions.order.capture().then(function (details) {
                    console.log('Transaction completed:', details);
                    showNotification('✅ PayPal payment completed successfully!');
                    completeOrder(true);
                });
            },
            onError: function (err) {
                console.error('PayPal Error:', err);
                showNotification('⚠️ PayPal payment error: ' + err.message);
                container.innerHTML = '<p class="paypal-error">Error loading PayPal. Please try another method.</p>';
                document.getElementById('completeOrderBtn').style.display = 'block';
            },
            onCancel: function (data) {
                console.log('Payment cancelled by user:', data);
                showNotification('⚠️ PayPal payment was cancelled');
            }
        }).render('#paypal-button-container');
    } catch (error) {
        console.error('Error rendering PayPal button:', error);
        showNotification('⚠️ Error loading PayPal. Please try later.');
        document.getElementById('completeOrderBtn').style.display = 'block';
    }
}

// Función para guardar el pedido en el historial
function guardarPedidoEnHistorial() {
    try {
        const storedOrders = JSON.parse(localStorage.getItem('pedidosMelissaCake')) || [];
        const newOrder = {
            date: new Date().toISOString(),
            method: selectedPaymentMethod,
            items: [...cart],
            total: calculateCartTotal()
        };
        storedOrders.push(newOrder);
        localStorage.setItem('pedidosMelissaCake', JSON.stringify(storedOrders));
    } catch (error) {
        console.error('Error saving order to history:', error);
    }
}


function verPedidos() {
    const contenedor = document.getElementById('listaPedidos');
    const pedidos = JSON.parse(localStorage.getItem('pedidosMelissaCake')) || [];

    if (pedidos.length === 0) {
        contenedor.innerHTML = '<p>No orders yet.</p>';
    } else {
        let html = '';
        pedidos.forEach((pedido, i) => {
            html += `<div style="border-bottom: 1px solid #ccc; padding: 1rem 0;">
                <strong>Order #${i + 1}</strong><br>
                Date: ${new Date(pedido.date).toLocaleString()}<br>
                Payment Method: ${pedido.method}<br>
                <ul>`;
            pedido.items.forEach(item => {
                html += `<li>
                    <strong>${item.name}</strong> - ${item.size} - ${item.bizcocho} - ${item.relleno} - ${item.cobertura}<br>
                    Quantity: ${item.quantity} - Price: $${item.price}<br>
                    Delivery: ${item.delivery === 'delivery' ? `Home Delivery: ${item.address} - Phone: ${item.phone}` : 'Pick Up in Store'}<br>
                    Delivery Date: ${item.date}<br>
                    Message: ${item.message}
                </li>`;
            });
            html += '</ul></div>';
        });
        contenedor.innerHTML = html;
    }

    document.getElementById('ordersModal').style.display = 'block';
    document.body.style.overflow = 'hidden';
}


function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}




function openCartModal() {
    const modal = document.getElementById('cartModal');
    if (!modal) {
        console.error('No se encontró el modal del carrito');
        return;
    }

    updateCartModalContent();

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log('Modal abierto correctamente');
}
function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (modal) {
            modal.style.display = 'none';
        }
    });
    document.body.style.overflow = 'auto';
}

function selectDeliveryOption(button, option) {
    document.querySelectorAll('#deliveryOptions .option-btn').forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    deliveryOption = option;
    document.getElementById('deliveryInfo').style.display = option === 'delivery' ? 'block' : 'none';
    updateAddToCartPrice();
}

function updateAddToCartPrice() {
    let price = selectedOptions.basePrice || 120;

    if (selectedOptions.size.includes('8-10')) price *= 1.2;
    else if (selectedOptions.size.includes('12-15')) price *= 1.3;
    else if (selectedOptions.size.includes('20-25')) price *= 1.5;
    else if (selectedOptions.size.includes('30-35')) price *= 1.7;
    else if (selectedOptions.size.includes('40-45')) price *= 1.9;
    else if (selectedOptions.size.includes('50-60')) price *= 2.5;
    else if (selectedOptions.size.includes('70-80')) price *= 3.6;

    if (deliveryOption === 'delivery') {
        price += 20;
    }

    price = Math.max(120, price * currentQuantity);

    const addToCartBtn = document.querySelector('.add-to-cart');
    addToCartBtn.textContent = `🛒 Add to Cart - $${price.toLocaleString()}`;
}

function selectSubOption(button, type, value) {
    const buttons = button.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    selectedOptions[type] = value;
    updateAddToCartPrice();

}

window.openProductModal = function (productName) {
    document.getElementById('modalTitle').textContent = productName;
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    const productCard = event.currentTarget;
    const bgImage = productCard.querySelector('.product-image').style.backgroundImage;
    const imageUrl = bgImage.slice(5, -2);
    selectedImageUrl = window.location.origin + '/' + imageUrl;

    const carouselEl = productCard.closest('.carousel');
    const isQuickCake = carouselEl && carouselEl.id === 'quick-cakes-carousel';
    currentProductMinDays = isQuickCake ? 2 : 7;

    const prodDateInput = document.querySelector('#productModal input[type="date"]');
    if (prodDateInput) {
        const minDateTmp = new Date();
        minDateTmp.setDate(minDateTmp.getDate() + currentProductMinDays);
        const minStr = minDateTmp.toISOString().split('T')[0];
        prodDateInput.min = minStr;
        prodDateInput.value = minStr;
    }

    currentQuantity = 1;
    document.getElementById('quantity').textContent = currentQuantity;

    selectedOptions = {
        size: '8-10 people',
        decoration: 'vintage',
        flavor: 'Vanilla',
        basePrice: 100
    };



    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.textContent === selectedOptions.size ||
            btn.textContent === selectedOptions.decoration ||
            btn.textContent === selectedOptions.flavor) {
            btn.classList.add('active');
        }
    });

    updateAddToCartPrice();
};



function setupCarousels() {
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        const container = carousel.closest('.carousel-container');

        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => scrollCarousel(carouselId, -1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => scrollCarousel(carouselId, 1));
        }

        updateNavButtons(carousel);

        carousel.addEventListener('scroll', () => updateNavButtons(carousel));
    });
}

// Función para desplazar el carrusel
function scrollCarousel(carouselId, direction) {
    const carousel = document.getElementById(carouselId);
    if (!carousel) return;

    const itemWidth = carousel.querySelector('.product-card').offsetWidth;
    const scrollAmount = (itemWidth + 32) * direction; // 32px es el gap

    carousel.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
    });
}

function updateNavButtons(carousel) {
    const container = carousel.closest('.carousel-container');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    if (!prevBtn || !nextBtn) return;

    prevBtn.disabled = carousel.scrollLeft <= 10;
    nextBtn.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10;
}

document.addEventListener('DOMContentLoaded', function () {
    setupCarousels();
});



function selectCustomOption(button, optionType) {
    const siblings = button.parentElement.children;
    for (let sibling of siblings) sibling.classList.remove('active');
    button.classList.add('active');
    customCakeOptions[optionType] = button.textContent;
    customCakeOptions.customSize = null;
    updateCustomCakePrice();
}

function selectCustomSubOption(button, type, value) {
    const buttons = button.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    if (customCakeOptions) customCakeOptions[type] = value;
    updateCustomCakePrice();
}

function selectCustomDeliveryOption(button, option) {
    document.querySelectorAll('#customDeliveryOptions .option-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    button.classList.add('active');
    customCakeOptions.delivery = option;
    document.getElementById('customDeliveryInfo').style.display =
        option === 'delivery' ? 'block' : 'none';
    updateCustomCakePrice();
}

function updateCustomCakePrice() {
    let price = 0;

    const customSizeInput = document.getElementById('customSizeInput');
    if (customSizeInput.value && !isNaN(customSizeInput.value)) {
        const people = parseInt(customSizeInput.value);
        if (people > 0) {
            customCakeOptions.customSize = people;
            price = Math.max(100, people * 5);
        }
    } else {
        switch (customCakeOptions.size) {
            case 'Small (8-10)': price = 100; break;
            case 'Medium (12-15)': price = 150; break;
            case 'Large (20-25)': price = 200; break;
            case 'X-Large (30-35)': price = 250; break;
            case 'XX-Large (40-45)': price = 300; break;
            case 'XXX-Large (50-60)': price = 350; break;
            case 'Max (70)': price = 400; break;
            default: price = 200;
        }
    }

    if (customCakeOptions.relleno === 'Fruit') price += 20;
    else if (customCakeOptions.relleno === 'Lemon Curd') price += 25;
    else if (customCakeOptions.relleno === 'Cream Cheese') price += 30;

    if (customCakeOptions.cobertura === 'Fondant') price += 50;
    else if (customCakeOptions.cobertura === 'Chocolate Ganache') price += 30;

    if (customCakeOptions.delivery === 'delivery') price += 20;

    document.getElementById('customCakePrice').textContent = `$${price.toLocaleString()}`;
}

function ensureAbsoluteImageUrl(url) {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    if (url.startsWith('url(')) {
        url = url.slice(4).replace(/^["']|["']$/g, '');
    }
    const prefix = url.startsWith('/') ? '' : '/';
    return window.location.origin + prefix + url;
}

function syncSelectedOptionsFromUI() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    const activeSize = modal.querySelector('#sizeOptions .option-btn.active');
    if (activeSize) {
        if (typeof selectedOptions === 'undefined') selectedOptions = {};
        selectedOptions.size = activeSize.textContent.trim();
    }

    modal.querySelectorAll('.sub-option').forEach(sub => {
        const h = sub.querySelector('h4');
        if (!h) return;
        const title = (h.textContent || '').trim().toLowerCase();
        const active = sub.querySelector('.option-btn.active');
        if (!active) return;
        const val = active.textContent.trim();
        if (typeof selectedOptions === 'undefined') selectedOptions = {};
        if (title.includes('bizcocho') || title.includes('cake base') || title.includes('base')) {
            selectedOptions.bizcocho = val;
        } else if (title.includes('relleno') || title.includes('filling')) {
            selectedOptions.relleno = val;
        } else if (title.includes('cobertura') || title.includes('frosting')) {
            selectedOptions.cobertura = val;
        }
    });
}

function dataURLtoBlob(dataurl) {
    const arr = dataurl.split(',');
    const mime = (arr[0].match(/:(.*?);/) || [])[1] || 'image/png';
    const bstr = atob(arr[1] || '');
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new Blob([u8arr], { type: mime });
}

const MAX_ATTACHMENT_BYTES = 1900000;

function canvasToBlob(canvas, type, quality) {
    return new Promise(resolve => canvas.toBlob(b => resolve(b), type, quality));
}

async function compressImageDataUrl(dataUrl, opts) {
    const maxBytes = (opts && opts.maxBytes) || MAX_ATTACHMENT_BYTES;
    const maxDims = (opts && opts.maxDims) || [1280, 1024, 800, 640];
    const qualities = (opts && opts.qualities) || [0.8, 0.7, 0.6, 0.5, 0.4];

    const img = await new Promise((resolve, reject) => {
        const im = new Image();
        im.onload = () => resolve(im);
        im.onerror = reject;
        im.src = dataUrl;
    });

    let bestBlob = null;

    const naturalW = img.naturalWidth || img.width;
    const naturalH = img.naturalHeight || img.height;

    for (const dim of maxDims) {
        const scale = Math.min(1, dim / Math.max(naturalW, naturalH));
        const w = Math.max(1, Math.round(naturalW * scale));
        const h = Math.max(1, Math.round(naturalH * scale));
        const canvas = document.createElement('canvas');
        canvas.width = w; canvas.height = h;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, w, h);

        for (const q of qualities) {
            const blob = await canvasToBlob(canvas, 'image/jpeg', q);
            if (!blob) continue;
            bestBlob = blob;
            if (blob.size <= maxBytes) {
                return blob;
            }
        }
    }

    return bestBlob || dataURLtoBlob(dataUrl);
}

async function submitOrderWithAttachments(endpoint) {
    try {
        const fd = new FormData();

        const clientName = cart.length > 0 ? cart[0].customerName : 'Cliente';
        const clientPhone = cart.length > 0 ? cart[0].phone : '';
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        let orderDetails = `CUSTOM ORDER - MELISSA CAKES
========================================

📋 ORDER SUMMARY:
------------------------
👤 Client: ${clientName}
📞 Phone: ${clientPhone}
📅 Order Date: ${new Date().toLocaleDateString()}
💰 Total: $${total.toLocaleString()}

`;

        let productsList = '';

        for (const [index, item] of cart.entries()) {
            const isCustom = item.custom || item.description;

            productsList += `
🎂 PRODUCT ${index + 1}
------------------
• Name: ${item.name}
• Size: ${item.size}
• Cake Base: ${item.bizcocho || 'Not specified'}
• Filling: ${isCustom && item.bizcocho && item.bizcocho.toLowerCase().includes('tiramis') ? 'N/A (Tiramisu has no filling)' : item.relleno || 'Not specified'}
• Frosting: ${item.cobertura || 'Not specified'}
• Quantity: ${item.quantity}
• Price: $${item.price.toLocaleString()}
• Subtotal: $${(item.price * item.quantity).toLocaleString()}
• Delivery Date: ${item.date}
• Custom Message: ${item.message || 'None'}
• Delivery Type: ${item.delivery === 'delivery' ? 'Home Delivery' : 'Pick Up in Store'}
${item.delivery === 'delivery' ? `• Address: ${item.address || 'Not specified'}` : ''}
${item.phone ? `• Contact Phone: ${item.phone}` : ''}
`;

            if (isCustom && item.description) {
                productsList += `• Detailed Description: ${item.description}\n`;
            }

            if (item.image && typeof item.image === 'string') {
                if (item.image.startsWith('data:')) {

                    try {
                        const publicUrl = await uploadImageToImgBB(item.image);
                        if (publicUrl) {
                            productsList += `• 🖼️ Ver Imagen de Referencia: ${publicUrl}\n`;
                            if (index < 10) {
                                fd.append(`image_url_${index + 1}`, publicUrl);
                            }
                        } else {
                            throw new Error('No se obtuvo URL de ImgBB');
                        }
                    } catch (error) {
                        console.error('Fallo subida a ImgBB:', error);
                        productsList += `• ⚠️ La imagen no se pudo subir automáticamente. (Por favor pedir foto al cliente)\n`;

                        try {
                            const blob = dataURLtoBlob(item.image);
                            if (index < 10) {
                                fd.append(`reference_image_${index + 1}`, blob, `referencia_${index + 1}.jpg`);
                            }
                        } catch (e) { }
                    }
                } else {
                    productsList += `• Product Image: ${item.image}\n`;
                }
            }

            productsList += '\n';
        }

        orderDetails += productsList;

        orderDetails += `
⚠️ IMPORTANT INFORMATION:
------------------------
• Please verify that details are correct
• For Tiramisu cakes, no additional filling is included
• Orders require at least 7 days notice
• For changes or cancellations contact with 48h notice

---
🎂 Melissa Cakes
📍 [Your Address]
📧 [Your Email]
📞 [Your Phone]
`;

        fd.append('pedido', `Custom Order - ${clientName}`);
        fd.append('Order Details', orderDetails);
        fd.append('⚠ Notice', 'This is a custom order that requires special attention');

        fd.append('customerName', clientName);
        fd.append('customerPhone', clientPhone);
        fd.append('deliveryDate', cart.length > 0 ? cart[0].date : '');
        fd.append('description', 'Custom order - see details in corresponding field');
        fd.append('_replyto', 'notificaciones@tudominio.com'); // O un email real si tienes
        fd.append('_subject', `🎂 CUSTOM ORDER: ${clientName} - $${total}`);

        console.log('Sending data to Formspree...');
        console.log('Sent fields:', {
            pedido: `Custom Order - ${clientName}`,
            totalItems: cart.length,
            totalAmount: total
        });

        const response = await fetch(endpoint, {
            method: 'POST',
            body: fd,
            headers: {
                'Accept': 'application/json'
            }
        });

        if (!response.ok) {
            const errorText = await response.text();
            console.error('Error de Formspree:', {
                status: response.status,
                statusText: response.statusText,
                error: errorText
            });

            return await sendSimpleOrder(endpoint, clientName, clientPhone, total, orderDetails);
        }

        const result = await response.json();
        console.log('✅ Formspree respondió:', result);

        showNotification(`✅ Custom order sent! We will contact you in 24h to confirm details.`);

        return true;

    } catch (error) {
        console.error('Error completo en submitOrderWithAttachments:', error);

        try {
            await sendBackupEmail();
            showNotification('⚠️ Using backup system. Your order has been registered.');
            return true;
        } catch (backupError) {
            console.error('Error en respaldo:', backupError);
            throw error;
        }
    }
}

async function sendSimpleOrder(endpoint, clientName, clientPhone, total, fullDetails) {
    const simpleFd = new FormData();

    simpleFd.append('pedido', `Custom Order (Text) - ${clientName}`);

    const detailsToSend = fullDetails || `Client: ${clientName}\nPhone: ${clientPhone}\nTotal: $${total}\n\n*This is a custom order. Please check system for more details.*`;

    simpleFd.append('Order Details', detailsToSend);
    simpleFd.append('customerName', clientName);
    simpleFd.append('customerPhone', clientPhone);
    simpleFd.append('_subject', `URGENT: Custom Order - ${clientName}`);

    const simpleResponse = await fetch(endpoint, {
        method: 'POST',
        body: simpleFd,
        headers: { 'Accept': 'application/json' }
    });

    if (!simpleResponse.ok) {
        throw new Error(`Error simple: ${simpleResponse.status}`);
    }

    showNotification('✅ Order sent (without attached images due to error).');
    return await simpleResponse.json();
}

async function sendBackupEmail() {
    try {
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        const templateParams = {
            client_name: cart[0]?.customerName || 'Cliente',
            client_phone: cart[0]?.phone || '',
            order_total: total,
            order_date: new Date().toLocaleDateString(),
            message: 'Custom order registered. Check system for full details.'
        };

        await emailjs.send(
            'service_your_service_id',
            'template_your_template_id',
            templateParams
        );

        console.log('✅ Backup email sent');
    } catch (error) {
        console.error('Error enviando email de respaldo:', error);
        throw error;
    }
}

const customCakePrices = {
    size: {
        'Small (8-10)': 100,
        'Medium (12-15)': 150,
        'Large (20-25)': 200,
        'X-Large (30-35)': 250,
        'XX-Large (40-45)': 300,
        'XXX-Large (50-60)': 350,
        'Max (70)': 400
    },
};


function updateCartModalContent() {
    const cartContent = document.getElementById('cartContent');
    const cartTotal = document.getElementById('cartTotal');

    cartContent.innerHTML = '';

    if (cart.length === 0) {
        cartContent.innerHTML = '<p style="text-align: center; color: #636e72;">Your cart is empty</p>';
        cartTotal.textContent = '$0';
        document.getElementById('checkoutBtn').style.display = 'none';
        return;
    }

    let total = 0;
    let html = '';

    cart.forEach((item, index) => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;

        let imageHtml = '';
        if (item.image) {
            let imageSrc = item.image;

            if (item.custom && imageSrc.startsWith('data:')) {
                imageHtml = `
                    <div style="margin-top: 8px;">
                        <strong style="color: #636e72; font-size: 0.9rem;">Reference Image:</strong><br>
                        <img src="${imageSrc}" alt="Reference Image" style="max-width:120px; max-height:120px; margin-top:5px; border-radius:8px; border: 2px solid #e9ecef;">
                    </div>
                `;
            } else {
                if (imageSrc.includes('url("')) {
                    imageSrc = imageSrc.replace('url("', '').replace('")', '');
                }
                if (!imageSrc.startsWith('http') && !imageSrc.startsWith('data:')) {
                    imageSrc = window.location.origin + '/' + imageSrc;
                }
                imageHtml = `<img src="${imageSrc}" alt="Cake Image" style="max-width:100px; margin-top:5px; border-radius:8px;">`;
            }
        }

        html += `
            <div class="cart-item" style="display: flex; justify-content: space-between; align-items: flex-start; padding: 1rem; border-bottom: 1px solid #e9ecef; margin-bottom: 1rem;">
                <div style="flex: 2;">
                    <h4 style="color: #2d3436; margin-bottom: 0.5rem;">${item.name}</h4>
                    ${item.description ? `<p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Description:</strong> ${item.description}</p>` : ''}
                    ${item.message && item.message !== 'Sin mensaje' ? `<p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Custom Message:</strong> ${item.message}</p>` : ''}
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Size:</strong> ${item.size}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Cake:</strong> ${item.bizcocho}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Filling:</strong> ${item.relleno}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Frosting:</strong> ${item.cobertura}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Delivery:</strong> ${item.delivery === 'delivery' ? 'Home Delivery' : 'Pick Up'}</p>
                    ${item.delivery === 'delivery' ? `<p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Address:</strong> ${item.address}</p>` : ''}
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Date:</strong> ${item.date}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Customer:</strong> ${item.customerName}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.3rem;"><strong>Phone:</strong> ${item.phone}</p>
                    ${imageHtml}
                </div>
                <div style="text-align: right;">
                    <p style="color: #ff6b9d; font-weight: bold; margin-bottom: 0.5rem;">${itemTotal.toLocaleString()}</p>
                    <p style="color: #636e72; font-size: 0.9rem; margin-bottom: 0.5rem;">Quantity: ${item.quantity}</p>
                    <button onclick="removeFromCart(${index})" style="background: none; border: none; color: #ff6b9d; cursor: pointer; font-size: 0.9rem;">Remove</button>
                </div>
            </div>
        `;
    });

    cartContent.innerHTML = html;
    cartTotal.textContent = `${total.toLocaleString()}`;
    document.getElementById('checkoutBtn').style.display = 'block';
}

function selectCustomOption(button, optionType) {
    const siblings = button.parentElement.children;
    for (let sibling of siblings) sibling.classList.remove('active');
    button.classList.add('active');
    customCakeOptions[optionType] = button.textContent;
    updateCustomCakePrice();
}

function updateCustomCakePrice() {
    let price = 0;

    const customSizeInput = document.getElementById('customSizeInput');
    if (customSizeInput && customSizeInput.value && !isNaN(customSizeInput.value)) {
        const people = parseInt(customSizeInput.value);
        if (people > 0) {
            customCakeOptions.customSize = people;
            price = Math.max(100, people * 5);
        }
    } else {
        switch (customCakeOptions.size) {
            case 'Small (8-10)': price = 100; break;
            case 'Medium (12-15)': price = 150; break;
            case 'Large (20-25)': price = 200; break;
            case 'X-Large (30-35)': price = 250; break;
            case 'XX-Large (40-45)': price = 300; break;
            case 'XXX-Large (50-60)': price = 350; break;
            case 'Max (70)': price = 400; break;
            default: price = 200;
        }
    }

    if (customCakeOptions.relleno === 'Red Fruits') price += 20;
    else if (customCakeOptions.relleno === 'Lemon Curd') price += 25;
    else if (customCakeOptions.relleno === 'Cream Cheese Frosting') price += 30;

    if (customCakeOptions.cobertura === 'Fondant') price += 50;
    else if (customCakeOptions.cobertura === 'Chocolate Ganache') price += 30;

    if (customCakeOptions.delivery === 'delivery') price += 20;

    const priceElement = document.getElementById('customCakePrice');
    if (priceElement) {
        priceElement.textContent = `$${price.toLocaleString()}`;
    }
}

async function addCustomCakeToCart() {
    const name = document.getElementById('customCustomerName').value.trim();
    const phone = document.getElementById('customCustomerPhone').value.trim();
    const date = document.getElementById('customCakeDeliveryDate').value;
    const description = document.getElementById('customCakeDescription')?.value.trim() || '';
    const imageInput = document.getElementById('customReferenceImage');

    if (!name || !phone || !date) {
        showNotification('⚠️ You must complete all required fields');
        return;
    }

    // Validar fecha
    if (!validateDate(date)) {
        return;
    }

    const price = parseInt(document.getElementById('customCakePrice').textContent.replace(/[^0-9]/g, ''));

    let imageDataUrl = null;
    if (imageInput && imageInput.files && imageInput.files[0]) {
        try {
            showNotification('📸 Processing image...');

            const rawDataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(imageInput.files[0]);
            });

            const compressedBlob = await compressImageDataUrl(rawDataUrl, {
                maxBytes: 500000,
                maxDims: [800, 600, 400],
                qualities: [0.7, 0.6, 0.5, 0.4, 0.3]
            });

            imageDataUrl = await new Promise((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.readAsDataURL(compressedBlob);
            });

            console.log('Imagen comprimida para pastel personalizado');
        } catch (error) {
            console.error('Error procesando imagen:', error);
            showNotification('⚠️ Error processing image. Try a smaller image.');
            return;
        }
    }

    const newItem = {
        name: document.getElementById('customCakeTitle').textContent,
        size: customCakeOptions.customSize
            ? `${customCakeOptions.customSize} people`
            : customCakeOptions.size,
        bizcocho: customCakeOptions.bizcocho,
        relleno: customCakeOptions.relleno,
        cobertura: customCakeOptions.cobertura,
        quantity: 1,
        price: price,
        date: date,
        minDays: 7,
        message: description,
        delivery: customCakeOptions.delivery,
        address: customCakeOptions.delivery === 'delivery'
            ? document.getElementById('customDeliveryAddress')?.value || 'Pick Up in Store'
            : 'Pick Up in Store',
        phone: phone,
        customerName: name,
        description: description,
        image: imageDataUrl,
        custom: true
    };

    cart.push(newItem);
    updateCartButton();
    updatePayPalMeLink();
    closeModal();
    showNotification('Custom cake added to cart!');



    if (imageInput) imageInput.value = '';
    const preview = document.getElementById('customImagePreview');
    if (preview) preview.style.display = 'none';
}

function resetCustomCakeModal() {
    const modal = document.getElementById('customCakeModal');
    if (!modal) return;

    customCakeOptions = {
        size: 'Large (20-25)',
        bizcocho: 'Vanilla',
        relleno: 'Dark Chocolate Cream',
        cobertura: 'Buttercream',
        delivery: 'pickup'
    };

    const inputs = ['customCustomerName', 'customCustomerPhone', 'customCakeDescription', 'customDeliveryAddress'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    const imageInput = document.getElementById('customReferenceImage');
    if (imageInput) imageInput.value = '';
    const preview = document.getElementById('customImagePreview');
    if (preview) preview.style.display = 'none';

    modal.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    modal.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.textContent === 'Large (20-25)' ||
            btn.textContent === 'Vanilla' ||
            btn.textContent === 'Dark Chocolate Cream' ||
            btn.textContent === 'Buttercream' ||
            btn.textContent === 'Pick Up in Store') {
            btn.classList.add('active');
        }
    });

    const delInfo = modal.querySelector('#customDeliveryInfo');
    if (delInfo) delInfo.style.display = 'none';

    updateCustomCakePrice();
    if (typeof toggleRellenosForTiramizu === 'function') toggleRellenosForTiramizu();
}

window.openCustomCakeModal = function (type) {
    const modal = document.getElementById('customCakeModal');
    const title = document.getElementById('customCakeTitle');

    switch (type) {
        case 'birthday':
            title.textContent = 'Custom Birthday Cake';
            break;
        case 'wedding':
            title.textContent = 'Custom Wedding Cake';
            break;
        case 'graduation':
            title.textContent = 'Custom Graduation Cake';
            break;
        case 'sport':
            title.textContent = 'Custom Sports Cake';
            break;
        case 'children':
            title.textContent = "Custom Children's Cake";
            break;
        case 'travel':
            title.textContent = 'Custom Travel Cake';
            break;
        case 'cupcakes':
            title.textContent = 'Custom Cupcakes';
            break;
        case 'baby-shower':
            title.textContent = 'Custom Baby Shower Cake';
            break;
        default:
            title.textContent = 'Custom Cake';


    }

    const dateInput = document.getElementById('customCakeDeliveryDate');
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 7);
    dateInput.min = minDate.toISOString().split('T')[0];
    dateInput.value = minDate.toISOString().split('T')[0];

    const imgInput = document.getElementById('customReferenceImage');
    if (imgInput) {
        const newImgInput = imgInput.cloneNode(true);
        imgInput.parentNode.replaceChild(newImgInput, imgInput);

        newImgInput.addEventListener('change', function (event) {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    document.getElementById('customPreviewImage').src = e.target.result;
                    document.getElementById('customImagePreview').style.display = 'block';
                };
                reader.readAsDataURL(file);
            }
        });
    }

    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    updateCustomCakePrice();

    const customSizeInput = document.getElementById('customSizeInput');
    if (customSizeInput) {
        customSizeInput.addEventListener('input', function () {
            if (this.value && !isNaN(this.value)) {
                document.querySelectorAll('#customSizeOptions .option-btn').forEach(btn => {
                    btn.classList.remove('active');
                });
                updateCustomCakePrice();
            }
        });
    }
};

(function () {
    function isTiramisuText(t) {
        if (!t) return false;
        return t.toString().trim().toLowerCase().includes('tiramiz') ||
            t.toString().trim().toLowerCase().includes('tiramisu');
    }

    function getButtonsByHeaderKeywords(keywords) {
        const out = [];
        document.querySelectorAll('.sub-option').forEach(sub => {
            const h4 = sub.querySelector('h4');
            if (!h4) return;
            const header = h4.textContent.trim().toLowerCase();
            for (const kw of keywords) if (header.includes(kw)) {
                sub.querySelectorAll('.option-btn').forEach(b => out.push(b));
                break;
            }
        });
        return out;
    }

    function disableOrEnableFillings() {
        try {
            const visibleModal = Array.from(document.querySelectorAll('.modal'))
                .find(m => m && m.style && m.style.display === 'block');

            if (!visibleModal) return;

            let isTiramisuSelected = false;

            visibleModal.querySelectorAll('.sub-option').forEach(sub => {
                const h4 = sub.querySelector('h4');
                if (!h4) return;
                const header = h4.textContent.trim().toLowerCase();
                if (header.includes('bizcocho') || header.includes('cake base') || header.includes('base')) {
                    const active = sub.querySelector('.option-btn.active');
                    if (active && isTiramisuText(active.textContent)) {
                        isTiramisuSelected = true;
                    }
                }
            });

            const fillingButtons = [];
            visibleModal.querySelectorAll('.sub-option').forEach(sub => {
                const h4 = sub.querySelector('h4');
                if (!h4) return;
                const header = h4.textContent.trim().toLowerCase();
                if (header.includes('relleno') || header.includes('filling')) {
                    sub.querySelectorAll('.option-btn').forEach(b => fillingButtons.push(b));
                }
            });

            fillingButtons.forEach(btn => {
                btn.disabled = isTiramisuSelected;
                if (isTiramisuSelected) {
                    btn.classList.add('disabled-option');
                    btn.classList.remove('active');
                } else {
                    btn.classList.remove('disabled-option');
                }
            });

            if (isTiramisuSelected) {
                if (visibleModal.id === 'productModal' && typeof selectedOptions !== 'undefined') {
                    selectedOptions.relleno = '';
                } else if (visibleModal.id === 'customCakeModal' && typeof customCakeOptions !== 'undefined') {
                    customCakeOptions.relleno = '';
                }
            }
        } catch (err) {
            console.warn('disableOrEnableFillings error:', err);
        }
    }

    window.toggleRellenosForTiramizu = disableOrEnableFillings;
    window.toggleFillingsForTiramizu = disableOrEnableFillings;
    window.toggleFillingsByActiveFlavor = disableOrEnableFillings;

    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.option-btn')) {
            setTimeout(disableOrEnableFillings, 0);
        }
    }, true);

    document.addEventListener('DOMContentLoaded', disableOrEnableFillings);

    const originalOpenProductModal = window.openProductModal;
    const originalOpenCustomCakeModal = window.openCustomCakeModal;

    if (typeof originalOpenProductModal === 'function') {
        window.openProductModal = function (...args) {
            try {
                originalOpenProductModal.call(this, ...args);
            } catch (e) {
                console.error('openProductModal error:', e);
            }
            setTimeout(disableOrEnableFillings, 50);
        };
    }

    if (typeof originalOpenCustomCakeModal === 'function') {
        window.openCustomCakeModal = function (...args) {
            try {
                originalOpenCustomCakeModal.call(this, ...args);
            } catch (e) {
                console.error('openCustomCakeModal error:', e);
            }
            setTimeout(disableOrEnableFillings, 50);
        };
    }

    window._debugToggleFillings = disableOrEnableFillings;
})();

const paypalMeCheckbox = document.getElementById('paypalme-confirm');

if (paypalMeCheckbox) {
    paypalMeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            selectedPaymentMethod = 'paypalme';
            console.log('Método de pago fijado: PayPal.me');
        }
    });
}

