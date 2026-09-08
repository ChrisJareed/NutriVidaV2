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

