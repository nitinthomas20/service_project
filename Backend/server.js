const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables

// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Atlas Connection
const mongoURI = process.env.MONGO_URI;
mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Nodemailer Transporter (for sending emails)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

// Define a Schema for ticket bookings
const ticketSchema = new mongoose.Schema({
    name:  { type: String, required: true },
    email: { type: String, required: true },
   
    tours: [
        {
            id:    { type: String, required: true },
            title: { type: String, required: true },
            date: { type: Number, required: true },
            
        }
    ],
    
    bookingDate: { type: Date, default: Date.now },
});

// Create a model from the schema
const Ticket = mongoose.model('Ticety', ticketSchema);

// Route to handle ticket booking form submission
app.post('/api/bookings', async (req, res) => {
    const { name, email,  tours } = req.body;

    // Calculate total price based on selected tours
    let totalPrice = 0;
    tours.forEach(tour => {
        totalPrice += tour.price * tour.quantity;
    });

    // Create a new ticket booking
    const newBooking = new Ticket({
        name,
        email,
        tours
        
    });

    // Save to database
    try {
        await newBooking.save();

        // Generate the list of tours in HTML format
        const toursListHTML = tours.map(tour => `
            <li><strong>${tour.title}</strong> - Date: ${tour.date}</li>
        `).join('');

        // Send Confirmation Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // recipient's email
            subject: 'Event Notification',
            html: `
                <h2>Events</h2>
                
                <p>Thank you for the interest. Here are the event details</p>
                <ul>
                    ${toursListHTML}
                </ul>
                
                <p>We look forward to seeing you soon!</p>
                <p>Best regards,<br>BookMyShow</p>
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.error('Error sending confirmation email:', error);
                return res.status(500).json({ error: 'Error sending confirmation email' });
            }
            console.log('Email sent: ' + info.response);
            res.status(201).json({ message: 'Booking successfully saved and email sent!' });
        });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ error: 'Error saving booking, please try again.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
