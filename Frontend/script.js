document.getElementById('bookingForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission

    // Get form data
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const ticketType = document.getElementById('ticketType').value;
    const ticketQuantity = document.getElementById('ticketQuantity').value;

    // Prepare data to send to the server
    const bookingData = {
        name,
        email,
        phone,
        ticketType,
        ticketQuantity: parseInt(ticketQuantity)
    };

    try {
        // Send POST request to the server
        const response = await fetch('http://localhost:5000/api/bookings', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bookingData),
        });

        const result = await response.json();

        if (response.ok) {
            // Show success message
            document.getElementById('confirmationMessage').innerHTML = `
                Thank you, ${name}!<br>
                Your booking for ${ticketQuantity} ${ticketType} ticket(s) has been confirmed.<br>
                A confirmation email will be sent to ${email}.
            `;
        } else {
            // Show error message
            document.getElementById('confirmationMessage').innerHTML = `
                Error: ${result.error}
            `;
        }

        // Clear the form after submission
        document.getElementById('bookingForm').reset();
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('confirmationMessage').innerHTML = 'There was an error submitting your booking. Please try again.';
    }
});
