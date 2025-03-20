// index.ts
import { serve } from "https://deno.land/std@0.114.0/http/server.ts";

serve(async (req) => {
  // Solo se permite el método POST
  if (req.method !== "POST") {
    return new Response("Método no permitido", { status: 405 });
  }

  try {
    const data = await req.json();
    const { customerName, email, items } = data;

    // Validación básica de campos requeridos
    if (!customerName || !email || !items) {
      return new Response("Faltan datos requeridos: customerName, email o items", { status: 400 });
    }

    // Preparar contenido del correo
    const subject = "Nueva reserva de pedido";
    const htmlContent = `
      <p>Se ha recibido una nueva reserva:</p>
      <ul>
        <li><strong>Cliente:</strong> ${customerName}</li>
        <li><strong>Email:</strong> ${email}</li>
        <li><strong>Items:</strong> ${JSON.stringify(items)}</li>
      </ul>
      <p>Desde: <a href="https://restaurantrincondejorgito.com">restaurantrincondejorgito.com</a></p>
    `;

    // Realizar la llamada a la API de Resend
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        // Se utiliza la API KEY de Resend proporcionada
        "Authorization": "Bearer re_d1pZnASq_AaYMfpUWwfbJAz6DGjowHEPK"
      },
      body: JSON.stringify({
        from: "no-reply@restaurantrincondejorgito.com", // Asegúrate de que este correo esté verificado en Resend
        to: ["restaurantdejorgitoadm@gmail.com"],
        subject: subject,
        html: htmlContent
      })
    });

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text();
      return new Response(`Error al enviar el correo: ${errorText}`, { status: 500 });
    }

    // Aquí podrías agregar la inserción en la base de datos (opcional)
    return new Response("Reserva registrada y notificación enviada", { status: 200 });
  } catch (error) {
    return new Response(`Error interno: ${error.message}`, { status: 500 });
  }
});
