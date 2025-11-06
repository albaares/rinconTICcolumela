// Configuración de Tailwind CSS (Aseguramos la coherencia con las variables CSS)
// Este archivo se cargará en todas las páginas para centralizar la configuración.
tailwind.config = {
    theme: {
        extend: {
            colors: {
                // Usamos los valores exactos de las variables CSS de styles.css
                'columela-yellow': '#FBBA0E', 
                'columela-dark': '#111827',
                'columela-light': '#F9FAFB',
                'columela-blue': '#38A5DD',
                'columela-text': '#374151',
            },
        }
    }
}