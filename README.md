# NutriVida V2

Sitio web académico para la Clínica NutriVida de Temuco. Permite conocer la clínica, revisar servicios, consultar el catálogo, leer el blog, enviar un mensaje de contacto y completar una solicitud de hora.

## Estructura

- `HTML/`: páginas del sitio y formularios.
- `css/style.css`: estilos compartidos para mantener la misma identidad visual.
- `js/funciones.js`: validaciones de formularios y navegación de la demostración de perfiles.
- `imagenes/`: logotipo y fotografías utilizadas por las páginas.

## Formularios

Los formularios revisan los datos en el navegador. Se comprueban campos obligatorios, largo máximo, formato y dominio del correo, teléfono opcional, nombres con letras, selección de opciones y fechas futuras en la solicitud de hora. Los mensajes aparecen debajo del campo correspondiente.

## Acceso de demostración

La página `administracion.html` incluye perfiles ficticios para mostrar distintas vistas:

- Administrador: `admin@duoc.cl`
- Vendedor: `vendedor@duoc.cl`
- Cliente: `cliente@gmail.com`
- Contraseña de prueba: `nutrivida`

El acceso, la edición de productos y la edición de usuarios son demostraciones locales. No existe una base de datos, no se guardan cuentas ni se realizan reservas reales.

## Tecnologías

HTML, CSS y JavaScript en archivos separados. Las páginas utilizan rutas relativas para conectarse con la hoja de estilos, las funciones y las imágenes.
