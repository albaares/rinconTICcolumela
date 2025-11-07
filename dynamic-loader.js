// Archivo: dynamic-loader.js
// Centraliza la función de inclusión dinámica de header y footer
// y la lógica para activar el enlace de navegación correcto.

/**
 * Función que carga un archivo HTML externo (componente) e inyecta
 * su contenido en un elemento específico de la página.
 * @param {string} file - Ruta del archivo HTML a cargar (e.g., 'header.html').
 * @param {string} targetId - ID del elemento contenedor donde se inyectará el contenido (e.g., 'header-container').
 */
async function includeHTML(file, targetId) {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) {
        console.error(`Error: Elemento objetivo con ID '${targetId}' no encontrado.`);
        return;
    }

    try {
        // Intenta cargar el archivo de forma asíncrona
        const response = await fetch(file);

        if (!response.ok) {
            // Si la respuesta HTTP no es exitosa (e.g., 404 Not Found), lanza un error
            throw new Error(`Error al cargar ${file}. Estado: ${response.status}`);
        }

        // Obtiene el texto del archivo e inyéctalo en el elemento objetivo
        const htmlText = await response.text();
        targetElement.innerHTML = htmlText;

    } catch (error) {
        // Captura errores de red (CORS en local) o los errores lanzados arriba
        console.error(`Fallo en la inclusión dinámica de ${file}:`, error);
        targetElement.innerHTML = `<p class="text-center text-red-500 p-4">Error: No se pudo cargar el componente ${file}.</p>`;
    }
}

/**
 * Activa el enlace de navegación correspondiente a la página actual.
 * Utiliza los atributos 'data-nav-id' definidos en header.html.
 */
function setActiveNav() {
    // 1. Obtener el nombre del archivo de la página actual
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    // 2. Lógica para determinar el ID de navegación activo.
    // Usamos startsWith() para agrupar páginas (ej. 'hardware-pdi.html' y 'hardware-wifi.html')
    let activeNavId = 'inicio'; // Por defecto

    if (currentPage.startsWith('hardware')) {
        activeNavId = 'hardware';
    } else if (currentPage.startsWith('normas')) { // 'normativa.html', 'normativa-lopd.html', etc.
        activeNavId = 'normas';
    } else if (currentPage.startsWith('plataformas')) { // 'plataformas.html', 'plataformas-moodle.html', etc.
        activeNavId = 'plataformas';
    } else if (currentPage.startsWith('guia-')) { // 'reportar-incidencia.html'
        activeNavId = 'guia';
    } else if (currentPage === 'index.html' || currentPage === '') {
        activeNavId = 'inicio';
    }

    // 3. Aplicar la clase 'active' a los enlaces correctos
    // Buscamos en *todo* el documento (escritorio y móvil)
    const activeLinks = document.querySelectorAll(`[data-nav-id="${activeNavId}"]`);
    
    activeLinks.forEach(link => {
        link.classList.add('active');
        
        // Lógica adicional para el menú móvil (abrir desplegable si está activo)
        // Si el ID activo es 'hardware' y estamos en un enlace móvil...
        if (activeNavId === 'hardware' && link.classList.contains('nav-link-item-mobile')) {
             // ...Buscamos el submenú de hardware...
             const submenu = document.getElementById('mobile-submenu-hardware');
             // ...y si existe y está cerrado, lo abrimos.
             if (submenu && submenu.classList.contains('max-h-0')) {
                 submenu.classList.remove('max-h-0');
                 submenu.classList.add('max-h-96'); // Ábrelo
             }
        }
        // Puedes añadir lógica similar para 'plataformas' si tuviera submenú
    });
}


// Ejecutar la carga del header y footer automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', async () => {
    // 1. Usamos 'await' para asegurar que el header se carga COMPLETAMENTE
    await includeHTML('header.html', 'header-container');
    
    // 2. Cargamos el footer (no necesitamos esperar por él para el 'active')
    includeHTML('footer.html', 'footer-container');

    // 3. AHORA, con el header ya en el DOM, ejecutamos la función
    //    para activar el enlace de navegación correcto.
    setActiveNav();
});