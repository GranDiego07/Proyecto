// =====================
// FUNCIÓN DE NAVEGACIÓN ENTRE PÁGINAS
// =====================
function cambiarPagina(nombrePagina) {
    // Ocultar todas las páginas
    const paginas = document.querySelectorAll('.page');
    paginas.forEach(pagina => {
        pagina.classList.remove('active');
    });

    // Remover clase active de todos los botones
    const botones = document.querySelectorAll('.nav-btn');
    botones.forEach(boton => {
        boton.classList.remove('active');
    });

    // Mostrar la página seleccionada
    const paginaSeleccionada = document.getElementById(nombrePagina);
    if (paginaSeleccionada) {
        paginaSeleccionada.classList.add('active');
    }

    // Marcar el botón como activo
    event.target.classList.add('active');

    // Scroll suave al inicio
    window.scrollTo({ top: 0, behavior: 'smooth' });
}


// =====================
// FUNCIÓN PARA FILTRAR CATEGORÍAS (BLOG)
// =====================
function filtrarCategoria(categoria) {
    // Remover clase activa de todas las categorías
    const categorias = document.querySelectorAll('.categoria');
    categorias.forEach(cat => cat.classList.remove('activa'));

    // Agregar clase activa a la categoría seleccionada
    event.target.classList.add('activa');

    const seccionArticulos = document.getElementById('seccion-articulos');
    const seccionRecetas = document.getElementById('seccion-recetas');

    if (categoria === 'todas') {
        // Mostrar ambas secciones
        seccionRecetas.classList.remove('seccion-oculta');
        seccionRecetas.classList.add('seccion-visible');
        seccionArticulos.classList.remove('seccion-oculta');
        seccionArticulos.classList.add('seccion-visible');
    } else if (categoria === 'recetas') {
        // Mostrar solo recetas
        seccionRecetas.classList.remove('seccion-oculta');
        seccionRecetas.classList.add('seccion-visible');
        seccionArticulos.classList.remove('seccion-visible');
        seccionArticulos.classList.add('seccion-oculta');
    } else if (categoria === 'articulos') {
        // Mostrar solo artículos
        seccionArticulos.classList.remove('seccion-oculta');
        seccionArticulos.classList.add('seccion-visible');
        seccionRecetas.classList.remove('seccion-visible');
        seccionRecetas.classList.add('seccion-oculta');
    }
}
