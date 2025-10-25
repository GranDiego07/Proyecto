// ===============================================
// LÓGICA DEL FORMULARIO DE CONTACTO (contactenos.js)
// ===============================================

// 1. REFERENCIAS AL DOM: Obtenemos los elementos HTML que vamos a manipular
const form = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const spinner = document.getElementById('spinner');
const btnSubmit = document.getElementById('btnSubmit');
const motivoSelect = document.getElementById('motivo');
const grupoPersonas = document.getElementById('grupo-personas');

// Obtenemos todos los inputs, selects y textareas del formulario para la validación
const inputs = form.querySelectorAll('input, select, textarea');

// ===============================================
// 2. LÓGICA CONDICIONAL: Mostrar/Ocultar campos
// ===============================================

// Escucha el evento 'change' (cambio de opción) en el selector de Motivo
motivoSelect.addEventListener('change', function() {
    // Si la opción seleccionada es 'reservacion'
    if (this.value === 'reservacion') {
        // Muestra el grupo de input para el número de personas
        grupoPersonas.style.display = 'block';
        // Hace que este campo sea requerido (obligatorio)
        document.getElementById('personas').required = true;
    } else {
        // Oculta el grupo de input y lo hace opcional
        grupoPersonas.style.display = 'none';
        document.getElementById('personas').required = false;
    }
});

// ===============================================
// 3. VALIDACIÓN EN TIEMPO REAL
// ===============================================

// Iteramos sobre todos los campos para agregarles escuchadores de eventos
inputs.forEach(input => {
    // Cuando el usuario sale del campo (pierde el foco)
    input.addEventListener('blur', function() {
        validarCampo(this);
    });

    // Mientras el usuario escribe, si el campo tiene un error visible, lo revalida
    input.addEventListener('input', function() {
        if (this.classList.contains('error')) {
            validarCampo(this);
        }
    });
});

/**
 * Función que valida un campo individual.
 * @param {HTMLElement} campo - El elemento input, select o textarea a validar.
 * @returns {boolean} True si es válido, False si no lo es.
 */
function validarCampo(campo) {
    // Obtiene el elemento donde se muestra el mensaje de error (por su ID, ej: error-nombre)
    const errorElement = document.getElementById(`error-${campo.id}`);
    
    // checkValidity() verifica las reglas HTML5 (required, pattern, minlength, etc.)
    if (!campo.checkValidity()) {
        campo.classList.add('error'); // Marca el input con la clase 'error' (borde rojo)
        if (errorElement) errorElement.classList.add('show'); // Muestra el mensaje de error
        return false;
    } else {
        campo.classList.remove('error'); // Quita la clase 'error'
        if (errorElement) errorElement.classList.remove('show'); // Oculta el mensaje de error
        return true;
    }
}

// ===============================================
// 4. MANEJO DEL ENVÍO (SUBMIT)
// ===============================================

// Escucha el evento 'submit' (envío) del formulario
form.addEventListener('submit', async function(e) {
    e.preventDefault(); // Detiene el envío por defecto del formulario (evita que la página se recargue)

    let formularioValido = true;

    // 4.1. VALIDACIÓN COMPLETA DE TODOS LOS CAMPOS
    inputs.forEach(input => {
        // Validamos solo campos requeridos y visibles
        if (input.hasAttribute('required') && input.closest('.form-group').style.display !== 'none') {
            if (!validarCampo(input)) {
                formularioValido = false;
            }
        }
    });

    // 4.2. VALIDACIÓN ESPECIAL PARA RADIO BUTTONS (Preferencia de contacto)
    const preferencia = document.querySelector('input[name="preferencia"]:checked');
    if (!preferencia) {
        document.getElementById('error-preferencia').classList.add('show');
        formularioValido = false;
    } else {
        document.getElementById('error-preferencia').classList.remove('show');
    }

    // 4.3. SI EL FORMULARIO NO ES VÁLIDO, MUESTRA ERROR Y DETIENE EL PROCESO
    if (!formularioValido) {
        mostrarModal(
            'error',
            '❌',
            'Error en el Formulario',
            'Por favor, completa todos los campos requeridos correctamente.'
        );
        // Desplaza la vista hacia el primer campo con error para ayudar al usuario
        const primerError = document.querySelector('.error.show, .error');
        if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // 4.4. INICIO DEL PROCESO DE ENVÍO (simulación)
    btnSubmit.disabled = true; // Deshabilita el botón para evitar doble click
    btnSubmit.textContent = 'Enviando...';
    spinner.classList.add('show'); // Muestra el spinner de carga

    try {
        // 4.5. RECOLECCIÓN DE DATOS
        const formData = new FormData(form);
        const datos = {};
        
        // Convertimos FormData a un objeto JavaScript simple para ver los datos
        formData.forEach((value, key) => {
            if (key === 'servicios[]') { // Maneja los checkboxes (múltiples valores)
                if (!datos.servicios) datos.servicios = [];
                datos.servicios.push(value);
            } else {
                datos[key] = value;
            }
        });

        console.log('Datos a enviar:', datos);

        // 4.6. SIMULACIÓN DE LLAMADA AL SERVIDOR (Aquí iría el código real de Fetch/Axios para enviar los datos)
        // Simulamos una espera de 2 segundos para representar la latencia de red
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 4.7. ÉXITO
        spinner.classList.remove('show'); // Oculta el spinner
        mostrarModal(
            'success',
            '✓',
            '¡Mensaje Enviado Exitosamente!',
            `Gracias ${datos.nombre}, hemos recibido tu mensaje. Nos contactaremos por ${datos.preferencia} pronto.`
        );

        // Limpia el formulario y oculta el campo condicional
        form.reset();
        grupoPersonas.style.display = 'none';

    } catch (error) {
        // 4.8. FALLO
        spinner.classList.remove('show');
        mostrarModal(
            'error',
            '❌',
            'Error al Enviar',
            'Hubo un problema al enviar tu mensaje. Por favor, intenta nuevamente.'
        );
        console.error('Error en el envío:', error);
    } finally {
        // Esto siempre se ejecuta después del try o catch
        btnSubmit.disabled = false; // Habilita el botón
        btnSubmit.textContent = 'Enviar Mensaje';
    }
});

// ===============================================
// 5. LÓGICA DEL MODAL
// ===============================================

/**
 * Muestra el modal de confirmación/error con contenido dinámico.
 */
function mostrarModal(tipo, icono, titulo, mensaje) {
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    modalIcon.textContent = icono; // Ej: '✓' o '❌'
    // Asigna la clase CSS 'success' o 'error' para dar el color correcto al icono
    modalIcon.className = `modal-icon ${tipo}`;
    modalTitle.textContent = titulo;
    modalMessage.textContent = mensaje;

    modal.classList.add('show'); // Muestra el modal aplicando la clase CSS
}

/**
 * Oculta el modal de respuesta.
 */
function cerrarModal() {
    modal.classList.remove('show');
}

// Escucha el clic en el fondo oscuro del modal para cerrarlo
modal.addEventListener('click', function(e) {
    if (e.target === modal) {
        cerrarModal();
    }
});

// Nota: Las funciones 'cerrarModal' y 'mostrarModal' son globales
// y deben ser accesibles desde los eventos 'onclick' en el HTML.