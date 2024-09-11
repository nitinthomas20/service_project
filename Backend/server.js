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
    .catch(err => console.log(err));

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
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    ticketType: { type: String, required: true },
    ticketQuantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
});

// Create a model from the schema
const Ticket = mongoose.model('Ticket', ticketSchema);

// Route to handle ticket booking form submission
app.post('/api/bookings', async (req, res) => {
    const { name, email, phone, ticketType, ticketQuantity } = req.body;

    // Calculate total price based on ticket type
    let ticketPrice = 0;
    if (ticketType === 'standard') {
        ticketPrice = 10;
    } else if (ticketType === 'vip') {
        ticketPrice = 25;
    } else if (ticketType === 'premium') {
        ticketPrice = 50;
    }

    const totalPrice = ticketPrice * ticketQuantity;

    // Create a new ticket booking
    const newBooking = new Ticket({
        name,
        email,
        phone,
        ticketType,
        ticketQuantity,
        totalPrice,
    });

    // Save to database
    try {
        await newBooking.save();

        // Send Confirmation Email
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: email, // recipient's email
            subject: 'Booking Confirmation',
            html: `
                <h2>Booking Confirmation</h2>
                <p>Dear ${name},</p>
                <p>Thank you for booking your ticket with us. Here are your booking details:</p>
                <ul>
                    <li><strong>Ticket Type:</strong> ${ticketType}</li>
                    <li><strong>Quantity:</strong> ${ticketQuantity}</li>
                    <li><strong>Total Price:</strong> $${totalPrice}</li>
                </ul>
                <p>We look forward to seeing you soon!</p>
                <p>Best regards,<br>BookMyTicket</p>
            `,
        };

        // Send the email
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ error: 'Error sending confirmation email' });
            }
            console.log('Email sent: ' + info.response);
        });

        res.status(201).json({ message: 'Booking successfully saved!' });
    } catch (error) {
        res.status(500).json({ error: 'Error saving booking, please try again.' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
