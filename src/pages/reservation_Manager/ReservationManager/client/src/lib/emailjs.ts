import emailjs from '@emailjs/browser';

const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

if (!EMAILJS_PUBLIC_KEY || !EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID) {
  console.error('EmailJS environment variables are not properly configured');
}

// Initialize EmailJS with the public key
emailjs.init(EMAILJS_PUBLIC_KEY);

export const sendReservationEmail = async (formData: {
  name: string;
  email: string;
  date: string;
  time: string;
  guests: string;
  message: string;
}) => {
  try {
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      throw new Error('EmailJS configuration is missing');
    }

    const templateParams = {
      from_name: formData.name,
      to_email: 'restaurantdejorgitoadm@gmail.com',
      guest_email: formData.email,
      reservation_date: formData.date,
      reservation_time: formData.time,
      guests: formData.guests,
      message: formData.message || 'No special requests',
    };

    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    if (response.status === 200) {
      return { success: true };
    } else {
      throw new Error(`Failed to send email: ${response.text}`);
    }
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};