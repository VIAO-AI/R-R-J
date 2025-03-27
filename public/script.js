document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('reservation-form');
  const alertContainer = document.getElementById('alert-container');
  const reservationTypeSelect = document.getElementById('reservation-type');
  const eventFieldsContainer = document.getElementById('event-fields');

  // Mostrar u ocultar campos de evento según el tipo de reserva
  reservationTypeSelect.addEventListener('change', function() {
    if (this.value === 'event') {
      eventFieldsContainer.style.display = 'block';
      // Hacer campos de evento requeridos
      document.getElementById('event-type').required = true;
      document.getElementById('attendees').required = true;
    } else {
      eventFieldsContainer.style.display = 'none';
      // Quitar requerido de campos de evento
      document.getElementById('event-type').required = false;
      document.getElementById('attendees').required = false;
    }
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    // Clear previous alerts
    alertContainer.innerHTML = '';
    
    // Show loading state
    const submitButton = form.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.textContent = 'Enviando...';
    submitButton.disabled = true;
    
    // Collect form data
    const formData = {
      name: document.getElementById('name').value,
      email: document.getElementById('email').value,
      phone: document.getElementById('phone').value,
      date: document.getElementById('date').value,
      time: document.getElementById('time').value,
      guests: document.getElementById('guests').value,
      message: document.getElementById('message').value,
      reservationType: document.getElementById('reservation-type').value
    };
    
    // Agregar campos de evento si el tipo de reserva es 'event'
    if (formData.reservationType === 'event') {
      formData.eventType = document.getElementById('event-type').value;
      formData.attendees = document.getElementById('attendees').value;
      formData.eventDescription = document.getElementById('event-description').value;
    }
    
    try {
      // Send data to server
      const response = await fetch('/api/reservation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const result = await response.json();
      
      // Reset button state
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      
      if (response.ok) {
        // Show success message
        showAlert('success', 'Reservación enviada con éxito. Nos pondremos en contacto pronto.');
        form.reset();
      } else {
        // Show error message
        showAlert('danger', result.error || 'Error al enviar la reservación. Por favor intente de nuevo.');
      }
    } catch (error) {
      console.error('Error:', error);
      submitButton.textContent = originalButtonText;
      submitButton.disabled = false;
      showAlert('danger', 'Error de conexión. Por favor intente de nuevo más tarde.');
    }
  });
  
  function showAlert(type, message) {
    const alert = document.createElement('div');
    alert.className = `alert alert-${type} alert-dismissible fade show`;
    alert.role = 'alert';
    alert.innerHTML = `
      ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    alertContainer.appendChild(alert);
  }
});