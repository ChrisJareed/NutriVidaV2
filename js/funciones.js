/* Validaciones de Contacto, Solicitar hora y los formularios de Acceso. Los formularios llaman a estas funciones
   mientras se completan y al revisarlos; los avisos aparecen en la página, sin enviar ni guardar datos. */

/* Revisa que nombres y mensajes contengan texto útil.
   Si solo hay espacios o saltos de línea, el formulario los considera vacíos. */
function tieneTexto(texto) {
    for (var i = 0; i < texto.length; i++) {
        if (texto[i] != " " && texto[i] != "\t" && texto[i] != "\n" && texto[i] != "\r") {
            return true;
        }
    }
    return false;
}
/* Comprueba que el nombre tenga solamente letras, espacios o guiones.
   También acepta tildes y la letra ñ. */
function nombreValido(nombre) {
    var letras = "abcdefghijklmnñopqrstuvwxyzáéíóúü -";

    if (!tieneTexto(nombre)) {
        return false;
    }

    for (var i = 0; i < nombre.length; i++) {
        var caracter = nombre[i].toLowerCase();
        var permitido = false;

        for (var j = 0; j < letras.length; j++) {
            if (caracter == letras[j]) {
                permitido = true;
            }
        }

        if (!permitido) {
            return false;
        }
    }

    return true;
}

/* Comprueba el formato del correo, el máximo de 100 caracteres y los dominios admitidos:
   duoc.cl, profesor.duoc.cl o gmail.com. No comprueba si la dirección existe. */
function correoValido(correo) {
    var arrobas = 0;
    var posicionArroba = -1;
    var dominio = "";
    correo = correo.toLowerCase();
    if (correo.length > 100) {
        return false;
    }
    for (var i = 0; i < correo.length; i++) {
        if (correo[i] == " " || correo[i] == "\t" || correo[i] == "\n" || correo[i] == "\r") {
            return false;
        }
        if (correo[i] == "@") {
            arrobas = arrobas + 1;
            posicionArroba = i;
        }
        if (correo[i] == "." && correo[i + 1] == ".") {
            return false;
        }
    }
    if (arrobas != 1 || posicionArroba < 1) {
        return false;
    }
    if (correo[0] == "." || correo[posicionArroba - 1] == ".") {
        return false;
    }
    var caracteres = "abcdefghijklmnopqrstuvwxyz0123456789.!#$%&'*+-/=?^_`{|}~";
    for (var k = 0; k < posicionArroba; k++) {
        var permitido = false;
        for (var l = 0; l < caracteres.length; l++) {
            if (correo[k] == caracteres[l]) {
                permitido = true;
            }
        }
        if (!permitido) {
            return false;
        }
    }
    for (var j = posicionArroba + 1; j < correo.length; j++) {
        dominio = dominio + correo[j];
    }
    if (dominio == "duoc.cl" || dominio == "profesor.duoc.cl" || dominio == "gmail.com") {
        return true;
    }
    return false;
}

/* Comprueba que el teléfono tenga nueve dígitos, sin espacios ni +56.
   Contacto utiliza esta revisión solo cuando se completa el campo opcional de teléfono. */
function telefonoValido(telefono) {
    if (telefono.length != 9) {
        return false;
    }
    for (var i = 0; i < telefono.length; i++) {
        if (telefono[i] < "0" || telefono[i] > "9") {
            return false;
        }
    }
    return true;
}

/* Revisa el campo de Contacto que se está editando y muestra su error debajo.
   Exige nombre y correo válidos, motivo y mensaje de hasta 500 caracteres; el teléfono es opcional.
   Al editar, también borra el resultado anterior para que no quede una confirmación desactualizada. */
function validarCampoContacto(campo) {
    var valido = true;
    document.getElementById("resultadoContacto").innerHTML = "";
    if (campo == "nombre") {
        var nombre = document.getElementById("nombreContacto").value;
        document.getElementById("errorNombreContacto").innerHTML = "";
        if (!nombreValido(nombre) || nombre.length > 100) {
            document.getElementById("errorNombreContacto").innerHTML =
    "Escribe un nombre usando solo letras, espacios o guiones (máximo 100 caracteres).";

            valido = false;
        }
    }
    if (campo == "correo") {
        var correo = document.getElementById("correoContacto").value;
        document.getElementById("errorCorreoContacto").innerHTML = "";
        if (!correoValido(correo)) {
            document.getElementById("errorCorreoContacto").innerHTML = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).";
            valido = false;
        }
    }
    if (campo == "telefono") {
        var telefono = document.getElementById("telefonoContacto").value;
        document.getElementById("errorTelefonoContacto").innerHTML = "";
        if (telefono != "" && !telefonoValido(telefono)) {
            document.getElementById("errorTelefonoContacto").innerHTML = "Usa 9 dígitos o deja el teléfono vacío.";
            valido = false;
        }
    }
    if (campo == "motivo") {
        var motivo = document.getElementById("motivoContacto").value;
        document.getElementById("errorMotivoContacto").innerHTML = "";
        if (motivo == "") {
            document.getElementById("errorMotivoContacto").innerHTML = "Selecciona un motivo.";
            valido = false;
        }
    }
    if (campo == "mensaje") {
        var mensaje = document.getElementById("mensajeContacto").value;
        document.getElementById("errorMensajeContacto").innerHTML = "";
        if (!tieneTexto(mensaje) || mensaje.length > 500) {
            document.getElementById("errorMensajeContacto").innerHTML = "Escribe un mensaje (máximo 500 caracteres).";
            valido = false;
        }
    }
    return valido;
}

/* Al pulsar el botón o Enter en Contacto, revisa todos los campos y muestra sus errores juntos.
   Si todo cumple las reglas, escribe el resultado al final del formulario sin enviar el mensaje. */
function validarContacto() {
    var valido = true;
    document.getElementById("resultadoContacto").innerHTML = "";
    if (!validarCampoContacto("nombre")) { valido = false; }
    if (!validarCampoContacto("correo")) { valido = false; }
    if (!validarCampoContacto("telefono")) { valido = false; }
    if (!validarCampoContacto("motivo")) { valido = false; }
    if (!validarCampoContacto("mensaje")) { valido = false; }
    if (valido) {
        document.getElementById("resultadoContacto").innerHTML = "Datos correctos. El mensaje no se ha enviado ni guardado.";
    }
    return valido;
}

/* Revisa el campo de Solicitar hora que se está editando y actualiza su aviso debajo.
   Exige nombre, correo, servicio, fecha y jornada; la fecha se comprueba como elegida, sin consultar disponibilidad.
   También borra el resultado anterior cuando la persona modifica los datos. */
function validarCampoHora(campo) {
    var valido = true;
    document.getElementById("resultadoHora").innerHTML = "";
    if (campo == "nombre") {
        var nombre = document.getElementById("nombreHora").value;
        document.getElementById("errorNombreHora").innerHTML = "";
        if (!nombreValido(nombre) || nombre.length > 100) {
            document.getElementById("errorNombreHora").innerHTML = "Escribe un nombre usando solo letras, espacios o guiones (máximo 100 caracteres).";

            valido = false;
        }
    }
    if (campo == "correo") {
        var correo = document.getElementById("correoHora").value;
        document.getElementById("errorCorreoHora").innerHTML = "";
        if (!correoValido(correo)) {
            document.getElementById("errorCorreoHora").innerHTML = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).";
            valido = false;
        }
    }
    if (campo == "servicio") {
        var servicio = document.getElementById("servicioHora").value;
        document.getElementById("errorServicioHora").innerHTML = "";
        if (servicio == "") {
            document.getElementById("errorServicioHora").innerHTML = "Selecciona un servicio nutricional.";
            valido = false;
        }
    }
    if (campo == "fecha") {
        var fecha = document.getElementById("fechaHora").value;
        document.getElementById("errorFechaHora").innerHTML = "";
        if (fecha == "") {
            document.getElementById("errorFechaHora").innerHTML = "Selecciona una fecha preferida.";
            valido = false;
        }
    }
    if (campo == "jornada") {
        var jornada = document.getElementById("jornadaHora").value;
        document.getElementById("errorJornadaHora").innerHTML = "";
        if (jornada == "") {
            document.getElementById("errorJornadaHora").innerHTML = "Selecciona una jornada.";
            valido = false;
        }
    }
    return valido;
}

/* Al pulsar el botón o Enter en Solicitar hora, revisa todos los campos aunque alguno tenga errores.
   El resultado final confirma los datos de la demostración; no reserva una atención. */
function validarHora() {
    var valido = true;
    document.getElementById("resultadoHora").innerHTML = "";
    if (!validarCampoHora("nombre")) { valido = false; }
    if (!validarCampoHora("correo")) { valido = false; }
    if (!validarCampoHora("servicio")) { valido = false; }
    if (!validarCampoHora("fecha")) { valido = false; }
    if (!validarCampoHora("jornada")) { valido = false; }
    if (valido) {
        document.getElementById("resultadoHora").innerHTML = "Datos correctos. La solicitud no se ha enviado ni guardado; no hay una hora reservada.";
    }
    return valido;
}


/* Formulario de administracion.html.
   Esta validación revisa un producto en tiempo real, pero no lo guarda ni modifica la tabla.
   Se usan los id de los campos para leer los datos y los id de error para escribir cada mensaje.
   isFinite comprueba que un valor sea numérico y finito; stock % 1 detecta una parte decimal. */
function validarCampoProducto(campo) {
    if (rolActual != "Administrador") { return false; }
    var valido = true;
    document.getElementById("resultadoProducto").innerHTML = "";

    if (campo == "codigo") {
        var codigo = document.getElementById("codigoProducto").value;
        document.getElementById("errorCodigoProducto").innerHTML = "";
        if (!tieneTexto(codigo) || codigo.length < 3) {
            document.getElementById("errorCodigoProducto").innerHTML = "Escribe un código de al menos 3 caracteres.";
            valido = false;
        }
    }

    if (campo == "nombre") {
        var nombre = document.getElementById("nombreProducto").value;
        document.getElementById("errorNombreProducto").innerHTML = "";
        if (!tieneTexto(nombre) || nombre.length > 100) {
            document.getElementById("errorNombreProducto").innerHTML = "Escribe un nombre de hasta 100 caracteres.";
            valido = false;
        }
    }

    if (campo == "precio") {
        var precio = document.getElementById("precioProducto").value;
        document.getElementById("errorPrecioProducto").innerHTML = "";
        if (!tieneTexto(precio) || !isFinite(precio) || precio < 0) {
            document.getElementById("errorPrecioProducto").innerHTML = "Escribe un precio igual o mayor que 0.";
            valido = false;
        }
    }

    if (campo == "stock") {
        var stock = document.getElementById("stockProducto").value;
        document.getElementById("errorStockProducto").innerHTML = "";
        if (!tieneTexto(stock) || !isFinite(stock) || stock < 0 || stock % 1 != 0) {
            document.getElementById("errorStockProducto").innerHTML = "Escribe un stock entero igual o mayor que 0.";
            valido = false;
        }
    }

    if (campo == "categoria") {
        var categoria = document.getElementById("categoriaProducto").value;
        document.getElementById("errorCategoriaProducto").innerHTML = "";
        if (categoria == "") {
            document.getElementById("errorCategoriaProducto").innerHTML = "Selecciona una categoría.";
            valido = false;
        }
    }

    return valido;
}

/* Al presionar Revisar cambio se comprueban todos los campos.
   Si son correctos, se muestra una confirmación que explica que el cambio es simulado. */
function validarProducto() {
    if (rolActual != "Administrador") { return false; }
    var valido = true;
    document.getElementById("resultadoProducto").innerHTML = "";

    if (!validarCampoProducto("codigo")) { valido = false; }
    if (!validarCampoProducto("nombre")) { valido = false; }
    if (!validarCampoProducto("precio")) { valido = false; }
    if (!validarCampoProducto("stock")) { valido = false; }
    if (!validarCampoProducto("categoria")) { valido = false; }

    if (valido) {
        document.getElementById("resultadoProducto").innerHTML = "Datos correctos. El cambio fue revisado, pero no se ha guardado.";
    }
    return valido;
}

/* ACCESO POR ROLES: las tres cuentas son ejemplos públicos, no credenciales reales.
   rolActual existe solo en esta página: al recargar vuelve a quedar vacío.
   Cambiar la vista con JavaScript no reemplaza una protección de servidor. */
var rolActual = "";

function validarCampoAcceso(campo) {
    var valido = true;
    document.getElementById("errorAcceso").innerHTML = "";
    if (campo == "correo") {
        var correo = document.getElementById("correoAcceso").value;
        document.getElementById("errorCorreoAcceso").innerHTML = "";
        if (!correoValido(correo)) {
            document.getElementById("errorCorreoAcceso").innerHTML = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).";
            valido = false;
        }
    }
    if (campo == "clave") {
        var clave = document.getElementById("claveAcceso").value;
        document.getElementById("errorClaveAcceso").innerHTML = "";
        if (!tieneTexto(clave) || clave.length < 4 || clave.length > 10) {
            document.getElementById("errorClaveAcceso").innerHTML = "Escribe una contraseña de entre 4 y 10 caracteres.";
            valido = false;
        }
    }
    return valido;
}

/* Primero revisa el formato. Después compara el correo y la contraseña de prueba.
   El rol se asigna con if; no se toma de un selector de perfil. */
function validarAcceso() {
    if (rolActual != "") { return false; }
    var valido = true;
    if (!validarCampoAcceso("correo")) { valido = false; }
    if (!validarCampoAcceso("clave")) { valido = false; }
    if (!valido) { return false; }
var correo = document.getElementById("correoAcceso").value.toLowerCase();
    var clave = document.getElementById("claveAcceso").value;
    if (clave == "nutrivida") {
        if (correo == "admin@duoc.cl") { rolActual = "Administrador"; }
        else if (correo == "vendedor@duoc.cl") { rolActual = "Vendedor"; }
        else if (correo == "cliente@gmail.com") { rolActual = "Cliente"; }
    }
    if (rolActual == "") {
        document.getElementById("errorAcceso").innerHTML = "Correo o contraseña incorrectos. Revisa las cuentas de prueba.";
        return false;
    }

    document.getElementById("claveAcceso").value = "";
    document.getElementById("panelAcceso").style.display = "none";
    document.getElementById("zonaAcceso").style.display = "block";
    document.getElementById("resultadoAcceso").innerHTML = "Perfil: " + rolActual + " · Acceso de demostración.";

    if (rolActual == "Administrador" || rolActual == "Vendedor") {
        document.getElementById("menuProductos").style.display = "inline-block";
        document.getElementById("menuSolicitudes").style.display = "inline-block";
        mostrarPanel("productos");
    } else {
        mostrarPanel("cliente");
    }
    if (rolActual == "Administrador") {
        document.getElementById("menuUsuarios").style.display = "inline-block";
        document.getElementById("accionesProductos").style.display = "block";
    }
    return true;
}

/* NAVEGACIÓN INTERNA: oculta las secciones antes de mostrar la elegida.
   Se comprueba el rol también en las funciones, no solo en la visibilidad de los botones.
   Esto ordena la simulación, pero no impide que alguien altere el código en su navegador. */
function ocultarPaneles() {
    document.getElementById("panelProductos").style.display = "none";
    document.getElementById("panelUsuarios").style.display = "none";
    document.getElementById("panelSolicitudes").style.display = "none";
    document.getElementById("panelEditorProducto").style.display = "none";
    document.getElementById("panelEditorUsuario").style.display = "none";
    document.getElementById("panelCliente").style.display = "none";
}

function mostrarPanel(panel) {
    if (rolActual == "") { return false; }
    if (panel == "usuarios" && rolActual == "Administrador") {
        ocultarPaneles();
        document.getElementById("panelUsuarios").style.display = "block";
        return true;
    }
    if (rolActual == "Administrador" || rolActual == "Vendedor") {
        if (panel == "productos") {
            ocultarPaneles();
            document.getElementById("panelProductos").style.display = "block";
            return true;
        }
        if (panel == "solicitudes") {
            ocultarPaneles();
            document.getElementById("panelSolicitudes").style.display = "block";
            return true;
        }
    }
    if (panel == "cliente" && rolActual == "Cliente") {
        ocultarPaneles();
        document.getElementById("panelCliente").style.display = "block";
        return true;
    }
    return false;
}

/* SALIR: oculta todas las herramientas y vacía el rol. La recarga vuelve a leer el HTML
   inicial, por eso también limpia formularios, mensajes y opciones de la cuenta anterior. */
function cerrarAcceso() {
    rolActual = "";
    ocultarPaneles();
    document.getElementById("zonaAcceso").style.display = "none";
    document.getElementById("panelAcceso").style.display = "block";
    window.location.reload();
}

/* EDICIÓN DE PRODUCTOS: reset deja los campos vacíos y limpia la selección anterior.
   Para editar, se cargan ejemplos fijos. Los valores de stock también son ficticios.
   Revisar datos usa validarProducto; nunca escribe en una base de datos ni en el catálogo. */
function prepararProducto(codigo) {
    if (rolActual != "Administrador") { return false; }
    document.getElementById("formProducto").reset();
    document.getElementById("errorCodigoProducto").innerHTML = "";
    document.getElementById("errorNombreProducto").innerHTML = "";
    document.getElementById("errorPrecioProducto").innerHTML = "";
    document.getElementById("errorStockProducto").innerHTML = "";
    document.getElementById("errorCategoriaProducto").innerHTML = "";
    document.getElementById("resultadoProducto").innerHTML = "";
    document.getElementById("tituloEditorProducto").innerHTML = "Nuevo producto";

    if (codigo == "CN001") {
        document.getElementById("nombreProducto").value = "Primera consulta nutricional";
        document.getElementById("precioProducto").value = "35000";
        document.getElementById("stockProducto").value = "10";
        document.getElementById("categoriaProducto").value = "Consulta";
    } else if (codigo == "PL001") {
        document.getElementById("nombreProducto").value = "Plan pérdida de peso (1 mes)";
        document.getElementById("precioProducto").value = "65000";
        document.getElementById("stockProducto").value = "5";
        document.getElementById("categoriaProducto").value = "Plan";
    } else if (codigo == "EV001") {
        document.getElementById("nombreProducto").value = "Antropometría completa";
        document.getElementById("precioProducto").value = "18000";
        document.getElementById("stockProducto").value = "8";
        document.getElementById("categoriaProducto").value = "Evaluación";
    } else if (codigo != "nuevo") {
        return false;
    }
    if (codigo != "nuevo") {
        document.getElementById("codigoProducto").value = codigo;
        document.getElementById("tituloEditorProducto").innerHTML = "Editar producto " + codigo;
    }
    ocultarPaneles();
    document.getElementById("panelEditorProducto").style.display = "block";
    return true;
}

/* USUARIOS DE EJEMPLO: reutiliza un único formulario para crear y editar.
   Los cambios se revisan, pero no modifican las tres cuentas que permiten ingresar. */
function prepararUsuario(cuenta) {
    if (rolActual != "Administrador") { return false; }
    document.getElementById("formUsuario").reset();
    document.getElementById("errorNombreUsuario").innerHTML = "";
    document.getElementById("errorApellidosUsuario").innerHTML = "";
    document.getElementById("errorCorreoUsuario").innerHTML = "";
    document.getElementById("errorPerfilUsuario").innerHTML = "";
    document.getElementById("resultadoUsuario").innerHTML = "";
    document.getElementById("tituloEditorUsuario").innerHTML = "Nuevo usuario";

    if (cuenta == "admin") {
        document.getElementById("nombreUsuario").value = "Camila";
        document.getElementById("apellidosUsuario").value = "Soto";
        document.getElementById("correoUsuario").value = "admin@duoc.cl";
        document.getElementById("perfilUsuario").value = "Administrador";
    } else if (cuenta == "vendedor") {
        document.getElementById("nombreUsuario").value = "Diego";
        document.getElementById("apellidosUsuario").value = "Rojas";
        document.getElementById("correoUsuario").value = "vendedor@duoc.cl";
        document.getElementById("perfilUsuario").value = "Vendedor";
    } else if (cuenta == "cliente") {
        document.getElementById("nombreUsuario").value = "Andrea";
        document.getElementById("apellidosUsuario").value = "Muñoz";
        document.getElementById("correoUsuario").value = "cliente@gmail.com";
        document.getElementById("perfilUsuario").value = "Cliente";
    } else if (cuenta != "nuevo") {
        return false;
    }
if (cuenta != "nuevo") {
        document.getElementById("tituloEditorUsuario").innerHTML = "Editar usuario";
    }
    ocultarPaneles();
    document.getElementById("panelEditorUsuario").style.display = "block";
    return true;
}

/* VALIDACIÓN DE USUARIOS: exige nombre, apellidos, correo admitido y uno de los tres perfiles.
   Cada campo se revisa al escribir o salir; el botón revisa todos antes de dar el resultado. */
function validarCampoUsuario(campo) {
    if (rolActual != "Administrador") { return false; }
    var valido = true;
    document.getElementById("resultadoUsuario").innerHTML = "";
    if (campo == "nombre") {
        var nombre = document.getElementById("nombreUsuario").value;
        document.getElementById("errorNombreUsuario").innerHTML =
    "Escribe un nombre usando solo letras (máximo 50 caracteres).";

        if (!nombreValido(nombre) || nombre.length > 50) {
            document.getElementById("errorNombreUsuario").innerHTML = "Escribe un nombre de hasta 50 caracteres.";
            valido = false;
        }
    }
    if (campo == "apellidos") {
        var apellidos = document.getElementById("apellidosUsuario").value;
        document.getElementById("errorApellidosUsuario").innerHTML =
    "Escribe apellidos usando solo letras (máximo 100 caracteres).";

        if (!nombreValido(apellidos) || apellidos.length > 100) {
            document.getElementById("errorApellidosUsuario").innerHTML = "Escribe los apellidos (máximo 100 caracteres).";
            valido = false;
        }
    }
    if (campo == "correo") {
        var correo = document.getElementById("correoUsuario").value;
        document.getElementById("errorCorreoUsuario").innerHTML = "";
        if (!correoValido(correo)) {
            document.getElementById("errorCorreoUsuario").innerHTML = "Usa @duoc.cl, @profesor.duoc.cl o @gmail.com (máx. 100).";
            valido = false;
        }
    }
    if (campo == "perfil") {
        var perfil = document.getElementById("perfilUsuario").value;
        document.getElementById("errorPerfilUsuario").innerHTML = "";
        if (perfil != "Administrador" && perfil != "Vendedor" && perfil != "Cliente") {
            document.getElementById("errorPerfilUsuario").innerHTML = "Selecciona uno de los tres perfiles.";
            valido = false;
        }
    }
    return valido;
}

function validarUsuario() {
    if (rolActual != "Administrador") { return false; }
    var valido = true;
    if (!validarCampoUsuario("nombre")) { valido = false; }
    if (!validarCampoUsuario("apellidos")) { valido = false; }
    if (!validarCampoUsuario("correo")) { valido = false; }
    if (!validarCampoUsuario("perfil")) { valido = false; }
    if (valido) {
        document.getElementById("resultadoUsuario").innerHTML = "Datos correctos. No se ha creado ni modificado una cuenta; los accesos de prueba siguen iguales.";
    }
    return valido;
}
