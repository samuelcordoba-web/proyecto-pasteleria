
// ========== DARK MODE TOGGLE ========== //
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

// Initialize dark mode from saved preference
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
let currentProductMinDays = 7; // mínimo de días para el modal de producto.
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

// Devuelve el total convertido a la moneda que necesita PayPal.me (ej. USD)
function getCartTotalForPayPalMe() {
    let total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (PRICES_IN === 'COP') {
        total = total / COP_TO_AUD;
    }

    return Number(total).toFixed(2);
}

// Lógica para ocultar/mostrar el encabezado al hacer scroll
let lastScrollY = window.scrollY;
const header = document.querySelector('.header');
const scrollThreshold = 10; // Sensibilidad al scroll

window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    // Si el scroll es menor al threshold, no hacer nada (prevenir parpadeos)
    if (Math.abs(currentScrollY - lastScrollY) < scrollThreshold) {
        return;
    }

    if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling hacia abajo - ocultar header
        header.classList.add('header-hidden');
    } else {
        // Scrolling hacia arriba - mostrar header
        header.classList.remove('header-hidden');
    }

    lastScrollY = currentScrollY;
});


// Actualiza el href y texto del enlace PayPal.me
function updatePayPalMeLink() {
    const link = document.getElementById('paypalme-link');
    const warn = document.getElementById('paypalme-warning');
    if (!link) return;

    const amount = getCartTotalForPayPalMe();

    // Construye el URL (PayPal.me admite números con decimales, e.g. /25.50)
    link.href = `https://paypal.me/${PAYPAL_ME_USER}/${amount}`;
    link.textContent = `Pay ${amount} AUD with PayPal.me`;


    // Mensaje auxiliar (opcional): si carrito vacío muestra aviso
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

        // Validar que tenemos una API key
        if (!IMGBB_API_KEY || IMGBB_API_KEY === '0b369f41c7edd5d9d48c44376b8c58e2') {
            console.warn('⚠️ Using example API key. Please configure your own API key.');
            alert('⚠️ IMPORTANT: You need to configure your ImgBB API Key in scripts.js for images to upload.');
        }

        // Extraer la parte base64 de la data URL
        const base64Data = dataUrl.split(',')[1];

        if (!base64Data) {
            console.error('Error: No se pudo extraer datos base64 de la imagen');
            return null;
        }

        // Crear el FormData para ImgBB
        const formData = new FormData();
        formData.append('key', IMGBB_API_KEY);
        formData.append('image', base64Data);
        formData.append('expiration', 15552000); // 180 días (6 meses)

        console.log('Subiendo imagen a ImgBB... (esto puede tomar unos segundos)');

        // Hacer la petición a ImgBB con timeout
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


// FUNCIONES AUXILIARES //

// Función para mostrar notificaciones
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

// Función para actualizar el botón del carrito
function updateCartButton() {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    document.querySelector('.cart-btn').innerHTML = `🛒 Cart (${totalItems})`;
}

// Función para cambiar cantidad
function changeQuantity(change) {
    currentQuantity = Math.max(1, currentQuantity + change);
    document.getElementById('quantity').textContent = currentQuantity;
    updateAddToCartPrice();
}

// Función para seleccionar opciones principales
function selectOption(button, type) {
    const buttons = button.parentElement.querySelectorAll('.option-btn');
    buttons.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');

    selectedOptions[type] = button.textContent;
    updateAddToCartPrice();
}

// ========== FUNCIONES PRINCIPALES ========== //

// Función para alternar el menú móvil
function toggleMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.toggle('active');

    // Cambiar el icono del botón
    const btn = document.querySelector('.mobile-menu-btn');
    if (menu.classList.contains('active')) {
        btn.textContent = '✕'; // Icono de cerrar
    } else {
        btn.textContent = '☰'; // Icono de menú
    }
}

// Función para cerrar el menú al seleccionar una opción
function closeMobileMenu() {
    const menu = document.querySelector('.nav-menu');
    menu.classList.remove('active');
    document.querySelector('.mobile-menu-btn').textContent = '☰';
}


// Cerrar menú al hacer clic fuera de él
document.addEventListener('click', function (event) {
    const menu = document.querySelector('.nav-menu');
    const btn = document.querySelector('.mobile-menu-btn');

    if (!menu.contains(event.target) && event.target !== btn) {
        menu.classList.remove('active');
        btn.textContent = '☰';
    }
});

// Función para agregar al carrito (versión optimizada)
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
        image: selectedImageUrl // ✅ Ahora se usa la URL pública correcta
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
        // Cerrar el modal primero
        closeModal();
        // Mostrar notificación con el mínimo específico
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

// Función para enviar la solicitud de pastel personalizado
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

    // Crear objeto FormData para enviar la imagen
    const formData = new FormData();
    formData.append('description', description);
    formData.append('date', date);
    formData.append('name', name);
    formData.append('phone', phone);

    if (imageInput.files.length > 0) {
        formData.append('referenceImage', imageInput.files[0]);
    }

    // Por ahora solo mostraremos una notificación
    showNotification('✅ Your custom cake request has been sent! We will contact you soon.');

    // Cerrar el modal y limpiar los campos
    closeModal();
    document.getElementById('cakeDescription').value = '';
    document.getElementById('customCakeDate').value = '';
    document.getElementById('customerName').value = '';
    document.getElementById('customerPhone').value = '';
    document.getElementById('referenceImage').value = '';
    document.getElementById('imagePreview').style.display = 'none';
}

// Nuevas funciones para manejar pagos
let selectedPaymentMethod = null;

// Función para proceder al pago
function proceedToCheckout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty');
        return;
    }

    // Validar que cada ítem cumpla su mínimo (2 días solo para tortas rápidas, 7 para demás)
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

    // Resetear selección de pago
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


// Función para seleccionar método de pago
function selectPaymentMethod(method) {
    selectedPaymentMethod = method;

    document.querySelectorAll('.payment-option').forEach(option => {
        option.style.border = '2px solid #e9ecef';
    });

    event.currentTarget.style.border = '2px solid #00b894';

    // Ocultar todos los contenedores primero
    document.getElementById('paypal-button-container').style.display = 'none';
    document.getElementById('paypalme-info').style.display = 'none';

    const completeBtn = document.getElementById('completeOrderBtn');

    // Si selecciona PayPal.me
    if (method === 'paypalme') {
        document.getElementById('paypalme-info').style.display = 'block';
        updatePayPalMeLink();

        // Bloquear botón de completar pedido
        completeBtn.disabled = true;

        // Si no existe el checkbox, crearlo
        if (!document.getElementById('paypalme-confirm')) {
            const confirmBox = document.createElement('div');
            confirmBox.innerHTML = `
                <label style="display:flex;align-items:center;gap:5px;margin-top:10px;">
                    <input type="checkbox" id="paypalme-confirm"> I already paid via PayPal.me
                </label>
            `;
            document.getElementById('paypalme-info').appendChild(confirmBox);

            // Habilitar botón cuando marquen el checkbox
            document.getElementById('paypalme-confirm').addEventListener('change', function () {
                completeBtn.disabled = !this.checked;
            });
        }
    } else {
        // Otros métodos de pago → botón habilitado
        completeBtn.disabled = false;
    }

    // Mostrar siempre el botón "Completar pedido"
    completeBtn.style.display = 'block';
}

// Función para renderizar el botón de PayPal
function renderPayPalButton() {
    try {
        // Limpiar contenedor previo
        const container = document.getElementById('paypal-button-container');
        container.innerHTML = '';

        // Mostrar loader mientras se carga
        container.innerHTML = '<div class="paypal-loading">Loading PayPal...</div>';

        const total = calculateCartTotal() / 100; // Convertir a dólares

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

// ========== FUNCIÓN MEJORADA PARA COMPLETAR EL PEDIDO ========== //
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

        // Verificar si hay pasteles personalizados con imágenes
        const customCakesWithImages = cart.filter(item =>
            item.custom && item.image && typeof item.image === 'string' && item.image.startsWith('data:')
        );

        if (customCakesWithImages.length > 0) {
            console.log(`📸 Detectados ${customCakesWithImages.length} pastel(es) personalizado(s) con imagen`);
            showNotification(`📸 Processing ${customCakesWithImages.length} image(s)...`);
        }



        // Usar la función mejorada que sube imágenes y formatea el correo
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

        // Log adicional para depuración
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


// Función para renderizar el botón de PayPal correctamente
function renderPayPalButton() {
    try {
        const container = document.getElementById('paypal-button-container');
        container.innerHTML = '<div class="paypal-loading">Loading PayPal...</div>';

        const total = calculateCartTotal() / 100; // Convertir a dólares

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
                    // Mostrar notificación de éxito
                    showNotification('✅ PayPal payment completed successfully!');
                    // Completar el pedido
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
            items: [...cart], // Copia del carrito actual
            total: calculateCartTotal()
        };
        storedOrders.push(newOrder);
        localStorage.setItem('pedidosMelissaCake', JSON.stringify(storedOrders));
    } catch (error) {
        console.error('Error saving order to history:', error);
    }
}

// Mostrar los pedidos guardados
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

// Función para calcular el total del carrito
function calculateCartTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}




function openCartModal() {
    // Verifica que el modal exista
    const modal = document.getElementById('cartModal');
    if (!modal) {
        console.error('No se encontró el modal del carrito');
        return;
    }

    // Actualiza el contenido antes de mostrar
    updateCartModalContent();

    // Muestra el modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    console.log('Modal abierto correctamente'); // Para depuración
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

    // Ajustes por tamaño
    if (selectedOptions.size.includes('8-10')) price *= 1.2;
    else if (selectedOptions.size.includes('12-15')) price *= 1.3;
    else if (selectedOptions.size.includes('20-25')) price *= 1.5;
    else if (selectedOptions.size.includes('30-35')) price *= 1.7;
    else if (selectedOptions.size.includes('40-45')) price *= 1.9;
    else if (selectedOptions.size.includes('50-60')) price *= 2.5;
    else if (selectedOptions.size.includes('70-80')) price *= 3.6;

    // Agregar $20 por domicilio
    if (deliveryOption === 'delivery') {
        price += 20;
    }

    // Asegurar precio mínimo
    price = Math.max(120, price * currentQuantity);

    // Actualizar botón
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

// En scripts.js, modifica la función openProductModal
window.openProductModal = function (productName) {
    document.getElementById('modalTitle').textContent = productName;
    document.getElementById('productModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    // 🔹 Guardar la URL absoluta de la imagen del producto
    const productCard = event.currentTarget;
    const bgImage = productCard.querySelector('.product-image').style.backgroundImage;
    const imageUrl = bgImage.slice(5, -2);
    selectedImageUrl = window.location.origin + '/' + imageUrl;

    // Detectar si este producto está en el carrusel de tortas rápidas y fijar min 2 días, si no 7
    const carouselEl = productCard.closest('.carousel');
    const isQuickCake = carouselEl && carouselEl.id === 'quick-cakes-carousel';
    currentProductMinDays = isQuickCake ? 2 : 7;

    // Configurar fecha mínima del input de fecha solo para este modal de producto
    const prodDateInput = document.querySelector('#productModal input[type="date"]');
    if (prodDateInput) {
        const minDateTmp = new Date();
        minDateTmp.setDate(minDateTmp.getDate() + currentProductMinDays);
        const minStr = minDateTmp.toISOString().split('T')[0];
        prodDateInput.min = minStr;
        prodDateInput.value = minStr;
    }

    // Reiniciar cantidad y opciones
    currentQuantity = 1;
    document.getElementById('quantity').textContent = currentQuantity;

    // Establecer opciones iniciales
    selectedOptions = {
        size: '8-10 people',
        decoration: 'vintage',
        flavor: 'Vanilla',
        basePrice: 100
    };



    // Actualizar botones activos
    document.querySelectorAll('.option-btn').forEach(btn => btn.classList.remove('active'));
    document.querySelectorAll('.option-btn').forEach(btn => {
        if (btn.textContent === selectedOptions.size ||
            btn.textContent === selectedOptions.decoration ||
            btn.textContent === selectedOptions.flavor) {
            btn.classList.add('active');
        }
    });

    // Actualizar precio inicial
    updateAddToCartPrice();
};

// Cambia esta función en scripts.js
// Configuración de todos los carruseles
function setupCarousels() {
    // Desactivamos el auto-scroll para control manual
    const carousels = document.querySelectorAll('.carousel');

    carousels.forEach(carousel => {
        const carouselId = carousel.id;
        const container = carousel.closest('.carousel-container');

        // Configurar botones de navegación
        const prevBtn = container.querySelector('.prev');
        const nextBtn = container.querySelector('.next');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => scrollCarousel(carouselId, -1));
        }

        if (nextBtn) {
            nextBtn.addEventListener('click', () => scrollCarousel(carouselId, 1));
        }

        // Opcional: Deshabilitar botones al llegar a los extremos
        updateNavButtons(carousel);

        // Escuchar eventos de scroll para actualizar botones
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

// Actualizar estado de los botones de navegación
function updateNavButtons(carousel) {
    const container = carousel.closest('.carousel-container');
    const prevBtn = container.querySelector('.prev');
    const nextBtn = container.querySelector('.next');

    if (!prevBtn || !nextBtn) return;

    // Habilitar/deshabilitar botones según posición
    prevBtn.disabled = carousel.scrollLeft <= 10;
    nextBtn.disabled = carousel.scrollLeft + carousel.offsetWidth >= carousel.scrollWidth - 10;
}

// Inicializar todos los carruseles al cargar la página
document.addEventListener('DOMContentLoaded', function () {
    setupCarousels();
});


/* ========== FUNCIONES PARA PASTELES PERSONALIZADOS ========== */

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

    // Precio por tamaño
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

    // Ajustes por ingredientes
    if (customCakeOptions.relleno === 'Fruit') price += 20;
    else if (customCakeOptions.relleno === 'Lemon Curd') price += 25;
    else if (customCakeOptions.relleno === 'Cream Cheese') price += 30;

    if (customCakeOptions.cobertura === 'Fondant') price += 50;
    else if (customCakeOptions.cobertura === 'Chocolate Ganache') price += 30;

    if (customCakeOptions.delivery === 'delivery') price += 20;

    document.getElementById('customCakePrice').textContent = `$${price.toLocaleString()}`;
}

// Helper para convertir rutas relativas a absolutas si hace falta
function ensureAbsoluteImageUrl(url) {
    if (!url) return '';
    // si ya es absoluta
    if (url.startsWith('http://') || url.startsWith('https://')) return url;
    // si viene con url("...") lo limpiamos
    if (url.startsWith('url(')) {
        url = url.slice(4).replace(/^["']|["']$/g, '');
    }
    // si empieza con '/', lo añadimos a origin; si no, añadimos '/'
    const prefix = url.startsWith('/') ? '' : '/';
    return window.location.origin + prefix + url;
}

// Sincroniza selectedOptions con lo que está activo en el UI del modal de producto
function syncSelectedOptionsFromUI() {
    const modal = document.getElementById('productModal');
    if (!modal) return;

    // Tamaño
    const activeSize = modal.querySelector('#sizeOptions .option-btn.active');
    if (activeSize) {
        if (typeof selectedOptions === 'undefined') selectedOptions = {};
        selectedOptions.size = activeSize.textContent.trim();
    }

    // Sub-opciones: Bizcocho, Relleno, Cobertura
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

// Tamaño máximo objetivo para adjuntos (≈1.9MB)
const MAX_ATTACHMENT_BYTES = 1900000;

function canvasToBlob(canvas, type, quality) {
    return new Promise(resolve => canvas.toBlob(b => resolve(b), type, quality));
}

async function compressImageDataUrl(dataUrl, opts) {
    const maxBytes = (opts && opts.maxBytes) || MAX_ATTACHMENT_BYTES;
    const maxDims = (opts && opts.maxDims) || [1280, 1024, 800, 640];
    const qualities = (opts && opts.qualities) || [0.8, 0.7, 0.6, 0.5, 0.4];

    // Cargar imagen en memoria
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
            bestBlob = blob; // guardar último intento válido
            if (blob.size <= maxBytes) {
                return blob; // éxito: bajo el máximo
            }
        }
    }

    // Si no se logró bajar del máximo, enviar el mejor esfuerzo (más pequeño probado)
    return bestBlob || dataURLtoBlob(dataUrl);
}

async function submitOrderWithAttachments(endpoint) {
    try {
        const fd = new FormData();

        // Obtener información del cliente
        const clientName = cart.length > 0 ? cart[0].customerName : 'Cliente';
        const clientPhone = cart.length > 0 ? cart[0].phone : '';
        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

        // 1. Construir contenido para el campo "Detalles del pedido" (formato compatible)
        // 1. Construir contenido para el campo "Detalles del pedido" (formato compatible)
        let orderDetails = `CUSTOM ORDER - MELISSA CAKES
========================================

📋 ORDER SUMMARY:
------------------------
👤 Client: ${clientName}
📞 Phone: ${clientPhone}
📅 Order Date: ${new Date().toLocaleDateString()}
💰 Total: $${total.toLocaleString()}

`;

        // 2. Construir lista de productos detallada
        let productsList = '';

        for (const [index, item] of cart.entries()) {
            // Determinar si es personalizado
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

            // Agregar descripción si es personalizado
            if (isCustom && item.description) {
                productsList += `• Detailed Description: ${item.description}\n`;
            }

            // Manejar imágenes
            // Manejar imágenes
            if (item.image && typeof item.image === 'string') {
                if (item.image.startsWith('data:')) {
                    // Es una imagen en base64 (pastel personalizado)

                    // 1. Intentar subir a ImgBB (MÉTODO PRINCIPAL)
                    // Formspree Free NO permite adjuntar archivos directamente, así que debemos usar un link.
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

                        // Si falla, AÚN ASÍ adjuntamos el blob por si acaso el cliente actualiza su plan de Formspree
                        // pero cambiamos el mensaje para no confundir.
                        try {
                            const blob = dataURLtoBlob(item.image);
                            if (index < 10) {
                                fd.append(`reference_image_${index + 1}`, blob, `referencia_${index + 1}.jpg`);
                            }
                        } catch (e) { }
                    }
                } else {
                    // Para URLs existentes (productos del catálogo)
                    productsList += `• Product Image: ${item.image}\n`;
                }
            }

            productsList += '\n';
        }

        // 3. Construir el campo principal de pedido (formato simple)
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

        // 4. Preparar campos para Formspree usando los nombres del formulario HTML
        fd.append('pedido', `Custom Order - ${clientName}`);
        fd.append('Order Details', orderDetails);
        fd.append('⚠ Notice', 'This is a custom order that requires special attention');

        // Campos adicionales para Formspree
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

        // 5. Enviar a Formspree
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

            // Intentar enviar una versión de solo texto con todos los detalles si falla la subida de archivos
            return await sendSimpleOrder(endpoint, clientName, clientPhone, total, orderDetails);
        }

        const result = await response.json();
        console.log('✅ Formspree respondió:', result);

        // Mostrar confirmación específica para pedidos personalizados
        showNotification(`✅ Custom order sent! We will contact you in 24h to confirm details.`);

        return true;

    } catch (error) {
        console.error('Error completo en submitOrderWithAttachments:', error);

        // Intento de respaldo con EmailJS
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

// Función de respaldo para Formspree fallido (ahora con detalles completos)
async function sendSimpleOrder(endpoint, clientName, clientPhone, total, fullDetails) {
    const simpleFd = new FormData();

    // Solo campos esenciales
    simpleFd.append('pedido', `Custom Order (Text) - ${clientName}`);

    // Usar los detalles completos si están disponibles
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

// Respaldo con EmailJS (necesitas configurarlo)
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
            'service_your_service_id', // Reemplazar
            'template_your_template_id', // Reemplazar
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

        // Preparar imagen para mostrar - MEJORADO
        let imageHtml = '';
        if (item.image) {
            let imageSrc = item.image;

            // Para pasteles personalizados con imagen de referencia (data URL)
            if (item.custom && imageSrc.startsWith('data:')) {
                imageHtml = `
                    <div style="margin-top: 8px;">
                        <strong style="color: #636e72; font-size: 0.9rem;">Reference Image:</strong><br>
                        <img src="${imageSrc}" alt="Reference Image" style="max-width:120px; max-height:120px; margin-top:5px; border-radius:8px; border: 2px solid #e9ecef;">
                    </div>
                `;
            } else {
                // Para productos normales
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

// Función para seleccionar opciones en el modal personalizado
function selectCustomOption(button, optionType) {
    const siblings = button.parentElement.children;
    for (let sibling of siblings) sibling.classList.remove('active');
    button.classList.add('active');
    customCakeOptions[optionType] = button.textContent;
    updateCustomCakePrice();
}

// Función para actualizar el precio estimado
// Función para actualizar el precio estimado
function updateCustomCakePrice() {
    let price = 0;

    // Precio por tamaño
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

    // Ajustes por ingredientes
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

// Función para agregar pastel personalizado al carrito
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

    // Obtener imagen como data URL si existe y comprimirla
    let imageDataUrl = null;
    if (imageInput && imageInput.files && imageInput.files[0]) {
        try {
            showNotification('📸 Processing image...');

            // Leer el archivo
            const rawDataUrl = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = (e) => resolve(e.target.result);
                reader.onerror = reject;
                reader.readAsDataURL(imageInput.files[0]);
            });

            // Comprimir la imagen antes de guardarla
            const compressedBlob = await compressImageDataUrl(rawDataUrl, {
                maxBytes: 500000, // 500KB máximo
                maxDims: [800, 600, 400], // Dimensiones más pequeñas
                qualities: [0.7, 0.6, 0.5, 0.4, 0.3]
            });

            // Convertir blob comprimido a data URL
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
        image: imageDataUrl, // Guardar la imagen comprimida como data URL
        custom: true // Marcador para identificar pasteles personalizados
    };

    cart.push(newItem);
    updateCartButton();
    updatePayPalMeLink();
    closeModal();
    showNotification('Custom cake added to cart!');



    // Limpiar el formulario
    if (imageInput) imageInput.value = '';
    const preview = document.getElementById('customImagePreview');
    if (preview) preview.style.display = 'none';
}

// Resetear modal de pastel personalizado
function resetCustomCakeModal() {
    const modal = document.getElementById('customCakeModal');
    if (!modal) return;

    // Resetear opciones por defecto
    customCakeOptions = {
        size: 'Large (20-25)',
        bizcocho: 'Vanilla',
        relleno: 'Dark Chocolate Cream',
        cobertura: 'Buttercream',
        delivery: 'pickup'
    };

    // Limpiar campos de texto
    const inputs = ['customCustomerName', 'customCustomerPhone', 'customCakeDescription', 'customDeliveryAddress'];
    inputs.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.value = '';
    });

    // Limpiar imagen
    const imageInput = document.getElementById('customReferenceImage');
    if (imageInput) imageInput.value = '';
    const preview = document.getElementById('customImagePreview');
    if (preview) preview.style.display = 'none';

    // Reset todos los botones de opción
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

    // Ocultar info de entrega si es necesario
    const delInfo = modal.querySelector('#customDeliveryInfo');
    if (delInfo) delInfo.style.display = 'none';

    // Actualizar precio y estado de rellenos
    updateCustomCakePrice();
    if (typeof toggleRellenosForTiramizu === 'function') toggleRellenosForTiramizu();
}

// Actualizar la función openCustomCakeModal para inicializar el precio
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

    // Configurar fecha mínima
    const dateInput = document.getElementById('customCakeDeliveryDate');
    const today = new Date();
    const minDate = new Date();
    minDate.setDate(today.getDate() + 7);
    dateInput.min = minDate.toISOString().split('T')[0];
    dateInput.value = minDate.toISOString().split('T')[0];

    // Configurar preview de imagen
    const imgInput = document.getElementById('customReferenceImage');
    if (imgInput) {
        // Remover listeners anteriores para evitar duplicados
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

    // Mostrar modal
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    // Inicializar precio
    updateCustomCakePrice();

    // Escuchar cambios en tamaño personalizado
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

/* ---- PARCHE FIABLE: deshabilitar rellenos cuando el bizcocho seleccionado sea tiramizu ---- */
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

    // Lógica central (acotada al/los modal(es) visible(s))
    function disableOrEnableFillings() {
        try {
            const visibleModal = Array.from(document.querySelectorAll('.modal'))
                .find(m => m && m.style && m.style.display === 'block');

            if (!visibleModal) return; // Si no hay modal visible, no hacer nada.

            let isTiramisuSelected = false;

            // 1. Buscar si hay un bizcocho "Tiramisú" activo en el modal visible.
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

            // 2. Obtener todos los botones de relleno dentro del modal visible.
            const fillingButtons = [];
            visibleModal.querySelectorAll('.sub-option').forEach(sub => {
                const h4 = sub.querySelector('h4');
                if (!h4) return;
                const header = h4.textContent.trim().toLowerCase();
                if (header.includes('relleno') || header.includes('filling')) {
                    sub.querySelectorAll('.option-btn').forEach(b => fillingButtons.push(b));
                }
            });

            // 3. Deshabilitar o habilitar los botones de relleno.
            fillingButtons.forEach(btn => {
                btn.disabled = isTiramisuSelected;
                if (isTiramisuSelected) {
                    btn.classList.add('disabled-option');
                    btn.classList.remove('active');
                } else {
                    btn.classList.remove('disabled-option');
                }
            });

            // 4. Si es Tiramisú, limpiar la selección de relleno guardada.
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

    // Exponer aliases (compatibilidad con tus llamadas existentes)
    window.toggleRellenosForTiramizu = disableOrEnableFillings;
    window.toggleFillingsForTiramizu = disableOrEnableFillings;
    window.toggleFillingsByActiveFlavor = disableOrEnableFillings;

    // Ejecutar tras clicks en cualquier .option-btn (espera 0ms para que la clase .active se asigne)
    document.addEventListener('click', function (e) {
        if (e.target.closest && e.target.closest('.option-btn')) {
            setTimeout(disableOrEnableFillings, 0);
        }
    }, true);

    // Ejecutar al cargar la página (estado inicial)
    document.addEventListener('DOMContentLoaded', disableOrEnableFillings);

    // Llamar tras abrir modales - mejorado para no sobrescribir
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

    // Exponer para depuración en consola
    window._debugToggleFillings = disableOrEnableFillings;
})();

// 🔧 FIX PayPal.me: asegurar método de pago válido
const paypalMeCheckbox = document.getElementById('paypalme-confirm');

if (paypalMeCheckbox) {
    paypalMeCheckbox.addEventListener('change', function () {
        if (this.checked) {
            selectedPaymentMethod = 'paypalme';
            console.log('Método de pago fijado: PayPal.me');
        }
    });
}

