// Array de experiencias
const experiencias = [
    {
        id: 1,
        nombre: "Capillas de Mármol",
        categoria: "Navegación",
        lugar: "Puerto Río Tranquilo",
        precio: 35000,
        cuposDisponibles: 8,
        descripcion: "Navegación por el Lago General Carrera para admirar las icónicas Capillas de Mármol. Una experiencia única en cuevas de mármol talladas por el agua durante miles de años.",
        icono: "⛵"
    },
    {
        id: 2,
        nombre: "Trekking Cerro Castillo",
        categoria: "Trekking",
        lugar: "Villa Santa Lucía",
        precio: 25000,
        cuposDisponibles: 12,
        descripcion: "Ascenso a través de formaciones geológicas impresionantes. Caminar entre torres de granito y disfrutar de vistas panorámicas de la estepa patagónica.",
        icono: "🥾"
    },
    {
        id: 3,
        nombre: "Pesca con Mosca",
        categoria: "Pesca",
        lugar: "Río Aysén",
        precio: 40000,
        cuposDisponibles: 6,
        descripcion: "Pesca deportiva en aguas cristalinas del río Aysén. Instrucción incluida para principiantes. Experiencia de bajo impacto ambiental.",
        icono: "🎣"
    },
    {
        id: 4,
        nombre: "Laguna San Rafael",
        categoria: "Navegación",
        lugar: "Caleta Tortel",
        precio: 60000,
        cuposDisponibles: 10,
        descripcion: "Navegación hasta la Laguna San Rafael para observar glaciares milenarios. Experiencia única en la Reserva Nacional que protege este ecosistema.",
        icono: "❄️"
    },
    {
        id: 5,
        nombre: "Cultura Local",
        categoria: "Cultura",
        lugar: "Coyhaique",
        precio: 15000,
        cuposDisponibles: 20,
        descripcion: "Tour por la ciudad conociendo la historia, tradiciones y artesanía local de Aysén. Incluye visita a museos y tiendas de artesanos tradicionales.",
        icono: "🏛️"
    },
    {
        id: 6,
        nombre: "Kayak en Fiordos",
        categoria: "Navegación",
        lugar: "Puerto Aysén",
        precio: 32000,
        cuposDisponibles: 14,
        descripcion: "Aventura en kayak explorando los hermosos fiordos de Aysén. Observa fauna silvestre y paisajes de ensueño desde el agua.",
        icono: "🛶"
    },
    {
        id: 7,
        nombre: "Carretera Austral",
        categoria: "Trekking",
        lugar: "Ruta 7",
        precio: 28000,
        cuposDisponibles: 9,
        descripcion: "Recorrido por tramos emblemáticos de la Carretera Austral. Bosques, ríos y montañas en una de las rutas más hermosas de América del Sur.",
        icono: "🛣️"
    }
];

// Estado
let experienciasFiltradas = [...experiencias];
let categoriaActual = "Todos";

// Inicializar
document.addEventListener('DOMContentLoaded', function() {
    renderizarExperiencias(experienciasFiltradas);
    llenarSelectExperiencias();
    configurarFiltros();
    configurarFormulario();
});

// Renderizar experiencias en el DOM
function renderizarExperiencias(lista) {
    const contenedor = document.getElementById('experiencias');
    contenedor.innerHTML = '';

    lista.forEach(exp => {
        const tarjeta = document.createElement('div');
        tarjeta.className = 'tarjeta';
        tarjeta.innerHTML = `
            <div class="tarjeta-encabezado">${exp.icono}</div>
            <div class="tarjeta-contenido">
                <h3 class="tarjeta-titulo">${exp.nombre}</h3>
                <p class="tarjeta-lugar">📍 ${exp.lugar}</p>
                
                <div class="tarjeta-info">
                    <div class="info-item">
                        <div class="info-label">Categoría</div>
                        <div class="info-valor">${exp.categoria}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Precio</div>
                        <div class="info-valor">$${exp.precio.toLocaleString()}</div>
                    </div>
                    <div class="info-item">
                        <div class="info-label">Cupos</div>
                        <div class="info-valor" id="cupos-${exp.id}">${exp.cuposDisponibles}</div>
                    </div>
                </div>

                <div class="tarjeta-descripcion" id="desc-${exp.id}">
                    ${exp.descripcion}
                </div>

                <div class="botones-tarjeta">
                    <button class="boton-tarjeta boton-ver" onclick="toggleDescripcion(${exp.id})">
                        Ver más
                    </button>
                </div>
            </div>
        `;
        contenedor.appendChild(tarjeta);
    });
}

// Toggle de descripción
function toggleDescripcion(id) {
    const desc = document.getElementById(`desc-${id}`);
    const boton = event.target;
    desc.classList.toggle('visible');
    boton.textContent = desc.classList.contains('visible') ? 'Ver menos' : 'Ver más';
}

// Configurar filtros
function configurarFiltros() {
    const botones = document.querySelectorAll('.filtro');
    botones.forEach(boton => {
        boton.addEventListener('click', function() {
            botones.forEach(b => b.classList.remove('activo'));
            this.classList.add('activo');
            
            categoriaActual = this.dataset.categoria;
            filtrarPorCategoria(categoriaActual);
        });
    });
}

// Filtrar por categoría
function filtrarPorCategoria(categoria) {
    if (categoria === 'Todos') {
        experienciasFiltradas = [...experiencias];
    } else {
        experienciasFiltradas = experiencias.filter(exp => exp.categoria === categoria);
    }
    renderizarExperiencias(experienciasFiltradas);
}

// Llenar select del formulario
function llenarSelectExperiencias() {
    const select = document.getElementById('experiencia');
    experiencias.forEach(exp => {
        const option = document.createElement('option');
        option.value = exp.id;
        option.textContent = `${exp.nombre} - $${exp.precio.toLocaleString()} (${exp.cuposDisponibles} cupos)`;
        select.appendChild(option);
    });
}

// Configurar formulario
function configurarFormulario() {
    const formulario = document.getElementById('formularioReserva');
    formulario.addEventListener('submit', function(e) {
        e.preventDefault();
        if (validarFormulario()) {
            procesarReserva();
        }
    });
}

// Validar formulario
function validarFormulario() {
    const nombre = document.getElementById('nombre').value.trim();
    const email = document.getElementById('email').value.trim();
    const experiencia = document.getElementById('experiencia').value;
    const personas = document.getElementById('personas').value;
    const fecha = document.getElementById('fecha').value;

    limpiarErrores();

    let esValido = true;

    // Validar nombre
    if (nombre.length === 0) {
        mostrarError('nombre', 'El nombre es obligatorio');
        esValido = false;
    } else if (nombre.length < 3) {
        mostrarError('nombre', 'El nombre debe tener al menos 3 caracteres');
        esValido = false;
    }

    // Validar email
    if (email.length === 0) {
        mostrarError('email', 'El email es obligatorio');
        esValido = false;
    } else if (!validarFormatoEmail(email)) {
        mostrarError('email', 'El email no es válido');
        esValido = false;
    }

    // Validar experiencia
    if (experiencia.length === 0) {
        mostrarError('experiencia', 'Debes seleccionar una experiencia');
        esValido = false;
    }

    // Validar personas
    if (personas.length === 0) {
        mostrarError('personas', 'El número de personas es obligatorio');
        esValido = false;
    } else {
        const exp = experiencias.find(e => e.id == experiencia);
        const numPersonas = parseInt(personas);
        if (numPersonas > exp.cuposDisponibles) {
            mostrarError('personas', `Solo hay ${exp.cuposDisponibles} cupos disponibles`);
            esValido = false;
        }
        if (numPersonas < 1) {
            mostrarError('personas', 'Debe haber al menos 1 persona');
            esValido = false;
        }
    }

    // Validar fecha
    if (fecha.length === 0) {
        mostrarError('fecha', 'La fecha es obligatoria');
        esValido = false;
    } else {
        const fechaSeleccionada = new Date(fecha);
        const hoy = new Date();
        if (fechaSeleccionada < hoy) {
            mostrarError('fecha', 'La fecha debe ser futura');
            esValido = false;
        }
    }

    return esValido;
}

// Validar formato de email
function validarFormatoEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Mostrar error
function mostrarError(campo, mensaje) {
    const elemento = document.getElementById(`error${campo.charAt(0).toUpperCase() + campo.slice(1)}`);
    elemento.textContent = mensaje;
    elemento.classList.add('visible');
}

// Limpiar errores
function limpiarErrores() {
    const errores = document.querySelectorAll('.error');
    errores.forEach(error => {
        error.textContent = '';
        error.classList.remove('visible');
    });
}

// Procesar reserva
function procesarReserva() {
    const experienciaId = document.getElementById('experiencia').value;
    const personas = parseInt(document.getElementById('personas').value);
    const experiencia = experiencias.find(e => e.id == experienciaId);

    // Descontar cupos
    experiencia.cuposDisponibles -= personas;

    // Actualizar DOM
    document.getElementById(`cupos-${experienciaId}`).textContent = experiencia.cuposDisponibles;
    
    // Actualizar select
    llenarSelectExperiencias();

    // Mostrar mensaje de éxito
    const nombre = document.getElementById('nombre').value;
    const mensajeExito = document.getElementById('mensajeExito');
    mensajeExito.textContent = `¡Gracias ${nombre}! Tu reserva para "${experiencia.nombre}" ha sido confirmada. Te enviaremos un correo de confirmación pronto.`;
    mensajeExito.classList.add('visible');

    // Limpiar formulario
    document.getElementById('formularioReserva').reset();

    // Desaparecer mensaje en 5 segundos
    setTimeout(() => {
        mensajeExito.classList.remove('visible');
        mensajeExito.textContent = '';
    }, 5000);
}
