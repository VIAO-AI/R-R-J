const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3002; // Cambiado de 3001 a 3002

// Configurar Nodemailer con Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // Configuración adicional para mejorar la conexión
  tls: {
    rejectUnauthorized: false // Ayuda con problemas de certificados
  },
  debug: true // Habilitar logs detallados para depuración
});

// Verificar la conexión al iniciar el servidor
transporter.verify(function(error, success) {
  if (error) {
    console.error('Error al verificar la configuración de correo:', error);
    if (error.code === 'EAUTH') {
      console.error('\n\nERROR DE AUTENTICACIÓN: Las credenciales de Gmail no son válidas.');
      console.error('Asegúrate de usar una contraseña de aplicación generada en https://myaccount.google.com/apppasswords');
      console.error('Revisa el archivo README.md para instrucciones detalladas.\n\n');
    }
  } else {
    console.log('Servidor de correo listo para enviar mensajes');
  }
});

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// API endpoint to handle reservation form submission
app.post('/api/reservation', async (req, res) => {
  try {
    const { name, email, phone, date, time, guests, message, reservationType, eventType, attendees, eventDescription } = req.body;
    
    // Validate required fields
    if (!name || !email || !date || !time || !guests) {
      return res.status(400).json({ error: 'Por favor complete todos los campos requeridos' });
    }

    // Preparar el contenido HTML del correo
    const subject = reservationType === 'event'
      ? `Nueva Reserva de Evento: ${eventType || 'No especificado'} - ${name}`
      : `Nueva Reserva de Mesa - ${name}`;

    const htmlContent = `
      <h2>Se ha recibido una nueva reserva</h2>
      <p><strong>Tipo de Reserva:</strong> ${reservationType === 'event' ? 'Evento' : 'Mesa'}</p>
      <p><strong>Nombre:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Teléfono:</strong> ${phone || 'No proporcionado'}</p>
      <p><strong>Fecha:</strong> ${date}</p>
      <p><strong>Hora:</strong> ${time}</p>
      <p><strong>Invitados:</strong> ${guests}</p>
      ${reservationType === 'event' ? 
        `<p><strong>Tipo de Evento:</strong> ${eventType || 'No especificado'}</p>
         <p><strong>Asistentes:</strong> ${attendees || 'No especificado'}</p>
         <p><strong>Detalles del Evento:</strong> ${eventDescription || 'No hay detalles'}</p>` 
        : ''}
      <p><strong>Mensaje:</strong> ${message || 'No hay mensaje'}</p>
      <p>Desde: <a href="https://restaurantrincondejorgito.com">restaurantrincondejorgito.com</a></p>
    `;

    // Enviar email usando Nodemailer
    try {
      const mailOptions = {
        from: `"Reservaciones Rincón de Jorgito" <${process.env.EMAIL_USER}>`,
        to: 'restaurantdejorgitoadm@gmail.com', // Dirección de correo para recibir las reservaciones
        subject: subject,
        html: htmlContent,
        replyTo: email
      };

      const info = await transporter.sendMail(mailOptions);
      
      console.log('Email enviado con éxito:', info.messageId);
    } catch (error) {
      console.error('Error al enviar email con Nodemailer:', error);
      return res.status(500).json({ error: 'Error al enviar la reservación' });
    }

    res.status(200).json({ success: true, message: 'Reservación enviada con éxito' });
  } catch (err) {
    console.error('Error en el servidor:', err);
    res.status(500).json({ error: 'Error del servidor al procesar la reservación' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Servidor ejecutándose en http://localhost:${port}`);
});