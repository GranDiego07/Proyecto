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