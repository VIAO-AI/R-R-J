# Configuración del Servidor de Correo con Nodemailer

## Problema Resuelto
Se ha solucionado el error de autenticación con Gmail que impedía el envío de correos electrónicos desde la aplicación. El error `535-5.7.8 Username and Password not accepted` ocurre porque Gmail requiere una contraseña de aplicación cuando la verificación en dos pasos está habilitada.

Este error específicamente aparecía en el servidor porque se estaba utilizando una contraseña normal de Gmail en lugar de una contraseña de aplicación.

## Pasos para configurar correctamente Gmail con Nodemailer

1. **Activar la verificación en dos pasos en tu cuenta de Google**
   - Ve a [https://myaccount.google.com/security](https://myaccount.google.com/security)
   - Activa la verificación en dos pasos si no está activada

2. **Crear una contraseña de aplicación**
   - Ve a [https://myaccount.google.com/apppasswords](https://myaccount.google.com/apppasswords)
   - Selecciona "Otra" como aplicación y ponle un nombre (ej. "Nodemailer")
   - Haz clic en "Generar"
   - Google te mostrará una contraseña de 16 caracteres. Cópiala.

3. **Actualizar el archivo .env**
   - Abre el archivo `.env` en la raíz del proyecto
   - Actualiza las siguientes líneas con tus datos:
     ```
     EMAIL_USER=restaurantdejorgitoadm@gmail.com
     EMAIL_PASS=tu_contraseña_de_aplicación
     ```
   - La dirección de correo ya está configurada como `restaurantdejorgitoadm@gmail.com`
   - Reemplaza `tu_contraseña_de_aplicación` con la contraseña de 16 caracteres que generaste

4. **Reiniciar el servidor**
   - Detén el servidor si está en ejecución (Ctrl+C en la terminal)
   - Inicia el servidor nuevamente con `npm start` o `npm run dev`

## Notas importantes

- La contraseña de aplicación es diferente de tu contraseña normal de Gmail
- No compartas ni expongas esta contraseña de aplicación
- Si cambias tu contraseña de Gmail, es posible que necesites generar una nueva contraseña de aplicación
- Esta configuración permite que Nodemailer envíe correos a través de tu cuenta de Gmail de forma segura