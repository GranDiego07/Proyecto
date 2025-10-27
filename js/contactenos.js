// 1. REFERENCIAS AL DOM: Obtenemos los elementos HTML que vamos a manipular
const form = document.getElementById('contactForm');
const modal = document.getElementById('modal');
const spinner = document.getElementById('spinner');
const btnSubmit = document.getElementById('btnSubmit');

// Obtenemos todos los inputs, selects y textareas del formulario para la validación
const inputs = form.querySelectorAll('input, select, textarea');

// Iteramos sobre todos los campos para agregarles escuchadores de eventos
inputs.forEach(input => {
    input.addEventListener('blur', function() {
        validarCampo(this);
    });

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
    const errorElement = document.getElementById(`error-${campo.id}`);
    
    if (!campo.checkValidity()) {
        campo.classList.add('error');
        if (errorElement) errorElement.classList.add('show');
        return false;
    } else {
        campo.classList.remove('error');
        if (errorElement) errorElement.classList.remove('show');
        return true;
    }
}

// Escucha el evento 'submit' (envío) del formulario
form.addEventListener('submit', async function(e) {
    e.preventDefault();

    let formularioValido = true;

    // 4.1. VALIDACIÓN COMPLETA DE TODOS LOS CAMPOS
    inputs.forEach(input => {
        if (input.hasAttribute('required')) {
            const formGroup = input.closest('.form-group');
            const isVisible = !formGroup || formGroup.style.display !== 'none';
            
            if (isVisible && !validarCampo(input)) {
                formularioValido = false;
            }
        }
    });

    // 4.2. VALIDACIÓN ESPECIAL PARA RADIO BUTTONS (Preferencia de contacto)
    const preferencia = document.querySelector('input[name="preferencia"]:checked');
    const errorPreferencia = document.getElementById('error-preferencia');
    
    if (!preferencia) {
        if (errorPreferencia) errorPreferencia.classList.add('show');
        formularioValido = false;
    } else {
        if (errorPreferencia) errorPreferencia.classList.remove('show');
    }

    // 4.3. SI EL FORMULARIO NO ES VÁLIDO
    if (!formularioValido) {
        mostrarModal(
            'error',
            '❌',
            'Error en el Formulario',
            'Por favor, completa todos los campos requeridos correctamente.'
        );
        const primerError = document.querySelector('.error');
        if (primerError) primerError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        return;
    }

    // 4.4. INICIO DEL PROCESO DE ENVÍO
    btnSubmit.disabled = true;
    btnSubmit.textContent = 'Enviando...';
    spinner.classList.add('show');

    try {
        // 4.5. RECOLECCIÓN DE DATOS
        const formData = new FormData(form);
        const datos = {};
        
        formData.forEach((value, key) => {
            if (key === 'servicios[]') {
                if (!datos.servicios) datos.servicios = [];
                datos.servicios.push(value);
            } else {
                datos[key] = value;
            }
        });

        console.log('Datos a enviar:', datos);

        // 4.6. SIMULACIÓN DE LLAMADA AL SERVIDOR
        await new Promise(resolve => setTimeout(resolve, 2000));

        // 4.7. ÉXITO
        spinner.classList.remove('show');
        mostrarModal(
            'success',
            '✓',
            '¡Mensaje Enviado Exitosamente!',
            `Gracias ${datos.nombre}, hemos recibido tu mensaje. Nos contactaremos por ${datos.preferencia} pronto.`
        );

        // Limpia el formulario
        form.reset();

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
        btnSubmit.disabled = false;
        btnSubmit.textContent = 'Enviar Mensaje';
    }
});

/**
 * Muestra el modal de confirmación/error con contenido dinámico.
 */
function mostrarModal(tipo, icono, titulo, mensaje) {
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalMessage = document.getElementById('modalMessage');

    if (modalIcon) modalIcon.textContent = icono;
    if (modalIcon) modalIcon.className = `modal-icon ${tipo}`;
    if (modalTitle) modalTitle.textContent = titulo;
    if (modalMessage) modalMessage.textContent = mensaje;

    modal.classList.add('show');
}

/**
 * Oculta el modal de respuesta.
 */
function cerrarModal() {
    modal.classList.remove('show');
}

// Escucha el clic en el fondo oscuro del modal para cerrarlo
if (modal) {
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            cerrarModal();
        }
    });
}