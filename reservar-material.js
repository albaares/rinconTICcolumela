// La carga de Phosphor Icons se realiza ahora directamente en reservar-material.html.


// --- 1. DATOS DE LOS RECURSOS (Escalable) ---
// Se puede expandir este array con nuevos materiales y categorías
const resources = [
    // DATOS DE CARRITOS (Todos Portátiles con EducaAndOS)
    {
        id: 'carrito0',
        type: 'portatiles',
        name: 'Carrito 0 (15 Portátiles)',      
        location: 'Primera planta, habitación de al lado de las escaleras del fondo (entre aulas 15 y 16).',
        notes: 'Todos los equipos usan **EducaAndOS**. Llave disponible en el corcho de la Sala de Profesorado.',
        icon: 'ph-truck',
        color: 'text-green-600',
        available: true,
        reservationLink: 'https://intranet.iescolumela.es/reservas/reservar/index.php?servicio=Carro%20Port%C3%A1tiles%200' // Enlace de reserva de Intranet
    },
    {
        id: 'carrito1',
        type: 'portatiles',
        name: 'Carrito 1 (15 Portátiles)',
        location: 'Primera planta, habitación de al lado de las escaleras del fondo (entre aulas 15 y 16).',
        notes: 'Todos los equipos usan **EducaAndOS**. Llave disponible en el corcho de la Sala de Profesorado.',
        icon: 'ph-truck',
        color: 'text-green-600',
        available: true,
        reservationLink: 'https://intranet.iescolumela.es/reservas/reservar/index.php?servicio=Carro%20Port%C3%A1tiles%201'
    },
    {
        id: 'carrito2',
        type: 'portatiles',
        name: 'Carrito 2 (16 Portátiles)',      
        location: 'Segunda planta, aula 20bis.',
        notes: 'Todos los equipos usan **EducaAndOS**. Llave azul (maestra).',
        icon: 'ph-truck',
        color: 'text-green-600',
        available: true,
        reservationLink: 'https://intranet.iescolumela.es/reservas/reservar/index.php?servicio=Carro%20Port%C3%A1tiles%202'
    },
    {
        id: 'carrito3',
        type: 'portatiles',
        name: 'Carrito 3 (14 Portátiles)',
        location: 'Tercera planta, aula 34.',
        notes: 'Todos los equipos usan **EducaAndOS**. Llave azul (maestra).',
        icon: 'ph-truck',
        color: 'text-green-600',
        available: true,
        reservationLink: 'https://intranet.iescolumela.es/reservas/reservar/index.php?servicio=Carro%20Port%C3%A1tiles%203'
    },
    
    // GAFAS DE REALIDAD VIRTUAL (Meta Quest 2)
    {
        id: 'vr_quest2_kit',
        type: 'vr',
        name: 'Meta Quest 2 (9 Unidades)',
        location: 'Segunda planta, aula ATECA.',
        // Notas fusionadas
        notes: 'Material en proceso de despliegue y configuración. Contactar con la coordinadora TDE para uso específico. Requiere formación previa. No disponibles actualmente para reserva en Intranet.',
        icon: 'ph-virtual-reality',
        color: 'text-purple-600',
        available: false,
        reservationLink: null
    },
    
    // KITS DE ROBÓTICA (mBot)
    {
        id: 'robotica_kit_microbit',
        type: 'robotica',
        name: 'Kits Robótica Básica (15 Unidades)',
        location: 'Segunda planta, aula ATECA.',
        // Notas fusionadas
        notes: 'Material en proceso de despliegue y configuración. Contactar con la coordinadora TDE para uso específico. Requiere formación previa. No disponibles actualmente para reserva en Intranet.',
        icon: 'ph-robot',
        color: 'text-orange-600',
        available: false, // Cambiado a no disponible para mostrar el mensaje
        reservationLink: null
    },

    // IMPRESORAS 3D (Ender Pro)
    {
        id: 'impresora_ender',
        type: 'impresoras',
        name: 'Impresoras 3D (3 Unidades)',
        location: 'Segunda planta, aula ATECA.',
        // Notas fusionadas
        notes: 'Material en proceso de despliegue y configuración. Contactar con la coordinadora TDE para uso específico. Requiere formación previa. No disponibles actualmente para reserva en Intranet.',      
        icon: 'ph-printer',
        color: 'text-gray-600',
        available: false,
        reservationLink: null
    },
];

// --- 2. LÓGICA DE VISUALIZACIÓN ---

/**
 * Renderiza las tarjetas de material para la categoría seleccionada.
 * @param {string} category - El tipo de material ('portatiles', 'vr', etc.).
 */
function renderContent(category) {
    const container = document.getElementById('content-container');
    container.innerHTML = ''; // Limpiar contenido anterior

    // Asegurar que el contenedor abarque las 3 columnas en caso de mensaje de error
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';
    
    const items = resources.filter(item => item.type === category);

    if (items.length === 0) {
        container.innerHTML = `
            <div class="md:col-span-3 lg:col-span-3 p-8 text-center bg-columela-light rounded-xl text-columela-text shadow-inner">
                <i class="ph ph-package text-5xl mb-3 block text-columela-dark"></i>
                <p class="text-xl font-medium">No hay recursos de esta categoría configurados todavía.</p>
                <p class="text-sm mt-1">Estamos trabajando para añadir más material reservable pronto.</p>
            </div>
        `;
        return;
    }

    // Restaurar la cuadrícula normal
    container.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))';

    items.forEach(item => {
        const card = document.createElement('div');
        // item-card es una clase de styles.css
        card.className = 'item-card p-6 bg-white rounded-xl shadow-md hover:shadow-lg transition duration-200 border border-gray-100';

        let footerContent;
        if (item.available && item.reservationLink) {
            footerContent = `
                <a href="${item.reservationLink}" target="_blank" class="block mt-2 text-center text-sm font-medium text-columela-blue hover:text-blue-700 transition duration-150">
                    Reservar en Intranet <i class="ph ph-arrow-square-out text-base align-middle ml-1"></i>
                </a>
            `;
        } else {
            // Se añaden clases de Tailwind para dar estilo al mensaje de no disponible
            footerContent = `
                <span class="block text-center text-xs font-semibold text-red-600 bg-red-50 border border-red-300 rounded px-2 py-1">RESERVA AÚN NO DISPONIBLE O RESTRINGIDA</span>
            `;
        }
        
        // Procesar la nota para aplicar negrita al texto entre **
        const processedNotes = item.notes.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        card.innerHTML = `
            <div class="flex items-start mb-3">
                <i class="ph ${item.icon} text-3xl ${item.color} mr-3 mt-1 flex-shrink-0"></i>
                <h3 class="text-xl font-bold text-columela-dark">${item.name}</h3>
            </div>
            
            <p class="text-sm font-semibold text-gray-700 mt-2">Ubicación:</p>
            <p class="text-gray-600 text-sm">${item.location}</p>

            <p class="text-sm font-semibold text-gray-700 mt-4">Notas:</p>
            <p class="text-sm text-gray-600">${processedNotes}</p>
            
            <div class="mt-4 border-t pt-3 flex justify-center">
                ${footerContent}
            </div>
        `;
        container.appendChild(card);
    });
}

/**
 * Cambia la categoría activa, actualiza el contenido y la URL.
 * @param {string} category - La categoría a mostrar.
 */
function showCategory(category) {
    // 1. Actualizar botones
    document.querySelectorAll('.tab-button').forEach(btn => {
        btn.classList.remove('active');
    });

    // Se usa el atributo data-category para encontrar el botón
    const activeTab = document.querySelector(`.tab-button[data-category="${category}"]`);
    if (activeTab) {
        activeTab.classList.add('active');
    }
    
    // 2. Renderizar contenido
    renderContent(category);

    // 3. Actualizar el hash de la URL sin recargar
    window.history.pushState(null, '', `#${category}`);
}

/**
 * Función de inicialización que se ejecuta al cargar la página.
 * Adjunta los listeners de clic a los botones de categoría.
 */
function initPage() {
    // 1. Obtener todas las pestañas y configurar los listeners
    const tabButtons = document.querySelectorAll('.tab-button');
    const validCategories = [];

    tabButtons.forEach(btn => {
        // Obtenemos la categoría del nuevo atributo data-category
        const category = btn.getAttribute('data-category');
        validCategories.push(category);

        // Agregamos el listener de evento, eliminando el error de onclick
        btn.addEventListener('click', () => showCategory(category));
    });

    // 2. Determinar qué categoría mostrar
    const hash = window.location.hash.substring(1); // Quitar el '#'
    const defaultCategory = 'portatiles';
    let categoryToShow = defaultCategory;
    
    // Verificar si el hash es una categoría válida
    if (validCategories.includes(hash)) {
        categoryToShow = hash;
    }

    // 3. Mostrar la categoría inicial
    showCategory(categoryToShow);

    // 4. Manejar el evento de retroceso del navegador (cambio de hash)
    window.addEventListener('popstate', () => {
        const popCategory = window.location.hash.substring(1) || defaultCategory;
        showCategory(popCategory);
    });
}

// Asegurarse de que el script se ejecute después de la carga inicial del DOM
window.addEventListener('DOMContentLoaded', initPage);