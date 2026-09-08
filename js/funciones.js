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
        if (!tieneTexto(nombre) || nombre.length > 100) {
            document.getElementById("errorNombreContacto").innerHTML = "Escribe tu nombre (máximo 100 caracteres).";
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
        if (!tieneTexto(nombre) || nombre.length > 100) {
            document.getElementById("errorNombreHora").innerHTML = "Escribe tu nombre (máximo 100 caracteres).";
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


