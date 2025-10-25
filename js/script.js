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
    
    // Función para filtrar por categorías
    function filtrarCategoria(categoria) {
        // Remover clase activa de todas las categorías
        const categorias = document.querySelectorAll('.categoria');
        categorias.forEach(cat => cat.classList.remove('activa'));
    // Agregar clase activa a la categoría seleccionada
    event.target.classList.add('activa');
    const seccionArticulos = document.getElementById('seccion-articulos');
    const seccionOpiniones = document.getElementById('seccion-opiniones');
        if (categoria === 'todas' || categoria === 'articulos') {
            seccionArticulos.classList.remove('seccion-oculta');
            seccionArticulos.classList.add('seccion-visible');
            seccionOpiniones.classList.remove('seccion-visible');
            seccionOpiniones.classList.add('seccion-oculta');
        } else {
                seccionArticulos.classList.remove('seccion-visible');
                seccionArticulos.classList.add('seccion-oculta');
                seccionOpiniones.classList.remove('seccion-oculta');
                seccionOpiniones.classList.add('seccion-visible');
            }
        }

        // Navegación de páginas
        function cambiarPagina(nombrePagina) {
        const paginas = document.querySelectorAll('.page');
        paginas.forEach(pagina => {
        pagina.classList.remove('active');
        });
            
        const botones = document.querySelectorAll('.nav-btn');
        botones.forEach(boton => {
            boton.classList.remove('active');
        });
            
        const paginaSeleccionada = document.getElementById(nombrePagina);
        if (paginaSeleccionada) {
            paginaSeleccionada.classList.add('active');
        }
            
        event.target.classList.add('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }
}