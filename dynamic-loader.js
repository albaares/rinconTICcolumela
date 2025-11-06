// Archivo: dynamic-loader.js
// Centraliza la función de inclusión dinámica de header y footer
// para evitar repetir el código en cada página HTML.

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

// Ejecutar la carga del header y footer automáticamente al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Si necesitas que un script de página específico se ejecute DESPUÉS de la carga de componentes,
    // es mejor usar un script específico para esa página (como hacemos con reservar-material.js)
    
    // Carga del Header y Footer
    includeHTML('header.html', 'header-container');
    includeHTML('footer.html', 'footer-container');
});