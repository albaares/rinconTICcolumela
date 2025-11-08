// Archivo: dynamic-loader.js
// Centraliza la inclusión de header/footer, la activación del menú activo
// y la lógica de los botones del menú móvil.

/**
 * Función que carga un archivo HTML externo (componente) e inyecta
 * su contenido en un elemento específico de la página.
 */
async function includeHTML(file, targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.error(`Error: Elemento objetivo con ID '${targetId}' no encontrado.`);
        return;
    }

    try {
        const response = await fetch(file);
        if (!response.ok) {
            throw new Error(`Error al cargar ${file}. Estado: ${response.status}`);
        }
        const htmlText = await response.text();
        targetElement.innerHTML = htmlText;

    } catch (error) {
        console.error(`Fallo en la inclusión dinámica de ${file}:`, error);
        targetElement.innerHTML = `<p class="text-center text-red-500 p-4">Error: No se pudo cargar el componente ${file}.</p>`;
    }
}

/**
 * Función que activa el enlace de navegación correcto (escritorio y móvil)
 * basándose en la URL de la página actual.
 */
function setActiveNav() {
    // Obtenemos el nombre del archivo de la página actual (ej: "hardware-pdi.html")
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    let activeNavId = 'inicio'; // ID por defecto

    // Mapeo de páginas a IDs de navegación
    if (currentPage.startsWith('hardware')) { // hardware.html, hardware-pdi.html, etc.
        activeNavId = 'hardware';
    } else if (currentPage.startsWith('normativa')) {
        activeNavId = 'normativa';
    } else if (currentPage.startsWith('gestion') || currentPage.startsWith('reservar') || currentPage.startsWith('reportar')) {
        activeNavId = 'gestion';
    } else if (currentPage.startsWith('plataformas')) {
        activeNavId = 'plataformas';
    } else if (currentPage === 'index.html') {
        activeNavId = 'inicio';
    }
    
    // Encontrar TODOS los enlaces (escritorio y móvil) que coincidan
    const activeLinks = document.querySelectorAll(`[data-nav-id="${activeNavId}"]`);
    
    activeLinks.forEach(link => {
        link.classList.add('active');
    });
}

/**
 * *** AÑADIDO (MOVIDO DESDE HEADER.HTML) ***
 * Inicializa los listeners para el botón de hamburguesa y los submenús móviles.
 * Esta función DEBE llamarse DESPUÉS de que 'header.html' haya sido inyectado.
 */
function initializeMobileMenu() {
    const menuButton = document.getElementById('menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // Si no estamos en una página que haya cargado el header, salimos.
    if (!menuButton || !mobileMenu) {
        // console.log("Botones de menú móvil no encontrados.");
        return;
    }

    // 1. Toggle del menú principal (hamburguesa)
    menuButton.addEventListener('click', () => {
        const isExpanded = menuButton.getAttribute('aria-expanded') === 'true';
        menuButton.setAttribute('aria-expanded', !isExpanded);
        
        
        if (mobileMenu.classList.contains('max-h-0')) {            
            mobileMenu.classList.remove('max-h-0', 'overflow-hidden');
            mobileMenu.classList.add('max-h-screen'); // Usamos max-h-screen para una transición suave
        } else {            
            mobileMenu.classList.remove('max-h-screen');
            mobileMenu.classList.add('max-h-0', 'overflow-hidden');
        }
    });

    // 2. Toggle de los submenús (los botones con [data-target])
    // Esta es la lógica original de tu header.html
    document.querySelectorAll('[data-target]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = button.getAttribute('data-target');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement.classList.contains('max-h-0')) {
                // *** CORRECCIÓN ***: Quitamos 'overflow-hidden' al abrir
                targetElement.classList.remove('max-h-0', 'overflow-hidden');
                targetElement.classList.add('max-h-96'); // Suficiente altura para el submenú
            } else {
                // *** CORRECCIÓN ***: Añadimos 'overflow-hidden' al cerrar
                targetElement.classList.remove('max-h-96');
                targetElement.classList.add('max-h-0', 'overflow-hidden');
            }
        });
    });
}

// --- Listener Principal de Carga de la Página (MODIFICADO) ---
document.addEventListener('DOMContentLoaded', async () => {
    
    // 1. Esperamos (await) a que el HTML del header se cargue y se inyecte
    await includeHTML('header.html', 'header-container');
    
    // 2. Cargamos el footer (no necesitamos esperar por él)
    includeHTML('footer.html', 'footer-container');

    // 3. Activamos el enlace de navegación correcto (función de siempre)
    setActiveNav();

    // 4. *** PASO CLAVE ***
    // Ahora que el header ESTÁ en la página, llamamos a la función
    // que activa sus botones (hamburguesa y submenús)
    initializeMobileMenu(); 
});