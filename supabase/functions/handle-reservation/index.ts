
// Follow these steps to deploy this Edge Function in your Supabase project:
// 1. Run `supabase functions new handle-reservation` to create this function locally
// 2. Copy this code into the index.ts file
// 3. Set your Resend API key in Supabase secrets: `supabase secrets set RESEND_API_KEY=re_123456789`
// 4. Deploy the function: `supabase functions deploy handle-reservation`

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

interface ReservationData {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  message: string;
  reservationType: "table" | "event";
  eventType?: string;
  attendees?: string;
  eventDescription?: string;
}

serve(async (req) => {
  try {
    // CORS headers
    if (req.method === 'OPTIONS') {
      return new Response('ok', {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'POST, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        }
      })
    }

    // Only accept POST requests
    if (req.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), {
        status: 405,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
    }

    // Get request body
    const reservationData: ReservationData = await req.json()

    // Create a Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL') as string
    const supabaseServiceKey = Deno.env.get('SUPABASE_ANON_KEY') as string
    const supabase = createClient(supabaseUrl, supabaseServiceKey)

    // 1. Store the reservation in the database
    const { error: dbError } = await supabase
      .from('reservations')
      .insert([
        {
          name: reservationData.name,
          email: reservationData.email,
          date: reservationData.date,
          time: reservationData.time,
          guests: reservationData.guests,
          message: reservationData.message,
          reservation_type: reservationData.reservationType,
          event_type: reservationData.eventType,
          attendees: reservationData.attendees,
          event_description: reservationData.eventDescription,
          created_at: new Date().toISOString()
        }
      ])

    if (dbError) {
      console.error('Error storing reservation:', dbError)
      return new Response(JSON.stringify({ error: 'Failed to store reservation' }), {
        status: 500,
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
        }
      })
    }

    // 2. Send an email notification using Resend
    const resendApiKey = "re_123456789" // Using the provided API key
    const adminEmail = 'restaurantdejorgitoadm@gmail.com'
    
    // Email template
    let emailContent = `
      <h1>Nueva Reserva</h1>
      <p><strong>Nombre:</strong> ${reservationData.name}</p>
      <p><strong>Correo:</strong> ${reservationData.email}</p>
      <p><strong>Fecha:</strong> ${reservationData.date}</p>
      <p><strong>Hora:</strong> ${reservationData.time}</p>
      <p><strong>Invitados:</strong> ${reservationData.guests}</p>
      <p><strong>Mensaje:</strong> ${reservationData.message || 'N/A'}</p>
    `

    // Add event-specific information if applicable
    if (reservationData.reservationType === 'event') {
      emailContent += `
        <h2>Detalles del Evento</h2>
        <p><strong>Tipo de Evento:</strong> ${reservationData.eventType}</p>
        <p><strong>Cantidad de Asistentes:</strong> ${reservationData.attendees}</p>
        <p><strong>Descripción del Evento:</strong> ${reservationData.eventDescription || 'N/A'}</p>
      `
    }

    // Send email using Resend
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${resendApiKey}`
      },
      body: JSON.stringify({
        from: 'El Rincón de Jorgito <reservations@elrincondejorgito.com>',
        to: [adminEmail, reservationData.email], // Send to both admin and customer
        subject: `Nueva Reserva: ${reservationData.name}`,
        html: emailContent
      })
    })

    if (!emailResponse.ok) {
      console.error('Error sending email:', await emailResponse.text())
      // Continue processing even if email fails - at least we saved to DB
    }

    // Return success response
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Reservation submitted successfully' 
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })

  } catch (error) {
    console.error('Unexpected error:', error)
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    })
  }
})
