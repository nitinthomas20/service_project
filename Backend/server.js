const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');


// Load environment variables from .env file


// Initialize Express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose.connect("mongodb+srv://nitinthomas20:8UTTsn5yWewm4QAs@ticketbooking.1jznt.mongodb.net/?retryWrites=true&w=majority&appName=ticketBooking", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch(err => console.log(err));

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
