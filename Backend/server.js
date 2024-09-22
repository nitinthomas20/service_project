const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config(); // Load environment variables
const schedule = require('node-schedule'); // For scheduling emails

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
    name: { type: String, required: true },
    email: { type: String, required: true },
    tours: [
        {
            id: { type: String, required: true },
            title: { type: String, required: true },
            date: { type: Number, required: true }, // Assuming this is a timestamp
        }
    ],
    bookingDate: { type: Date, default: Date.now },
});

// Create a model from the schema
const Ticket = mongoose.model('Ticket', ticketSchema);

// In-memory storage for scheduled jobs (for simplicity)
const scheduledEmails = {};

// Route to handle ticket booking form submission
app.post('/api/bookings', async (req, res) => {
    const { name, email, tours } = req.body;

    // Create a new ticket booking
    const newBooking = new Ticket({
        name,
        email,
        tours
    });

    // Save to database
    try {
        await newBooking.save();

        // Current date and time
        const now = new Date();

        // Schedule or send emails for each tour
        tours.forEach((tour) => {
            const eventDateTime = new Date(tour.date); // Assuming tour.date is a timestamp
            const emailDateTime = new Date(eventDateTime.getTime() - 24 * 60 * 60 * 1000); // 1 day before event

            // Generate the list of tours in HTML format
            const tourDetailsHTML = `
                <li><strong>${tour.title}</strong> - Date: ${eventDateTime.toDateString()}</li>
            `;

            // Check if the event is happening tomorrow or within 24 hours
            if (emailDateTime <= now) {
                // If the event is happening tomorrow or within 24 hours, send the email immediately
                const mailOptions = {
                    from: process.env.EMAIL_USER,
                    to: email,
                    subject: `Reminder: Upcoming event - ${tour.title}`,
                    html: `
                        <h2>Event Reminder</h2>
                        <p>This is a reminder that the event "<strong>${tour.title}</strong>" is happening tomorrow.</p>
                        <ul>
                            ${tourDetailsHTML}
                        </ul>
                        <p>We look forward to seeing you soon!</p>
                        <p>Best regards,<br>BookMyShow</p>
                    `,
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        console.error(`Error sending immediate reminder email for tour: ${tour.title}`, error);
                    } else {
                        console.log(`Immediate email reminder sent for tour: ${tour.title}, info:`, info.response);
                    }
                });
            } else {
                // If the event is in the future, schedule the email for 1 day before the event
                const job = schedule.scheduleJob(emailDateTime, () => {
                    const mailOptions = {
                        from: process.env.EMAIL_USER,
                        to: email,
                        subject: `Reminder: Upcoming event - ${tour.title}`,
                        html: `
                            <h2>Event Reminder</h2>
                            <p>This is a reminder that the event "<strong>${tour.title}</strong>" is happening tomorrow.</p>
                            <ul>
                                ${tourDetailsHTML}
                            </ul>
                            <p>We look forward to seeing you soon!</p>
                            <p>Best regards,<br>BookMyShow</p>
                        `,
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                            console.error(`Error sending scheduled reminder email for tour: ${tour.title}`, error);
                        } else {
                            console.log(`Scheduled email reminder sent for tour: ${tour.title}, info:`, info.response);
                        }
                    });
                });

                // Save the job to the scheduled emails storage (Optional: to keep track)
                scheduledEmails[`${email}-${tour.id}`] = job;
            }
            console.log(String(scheduledEmails))
        });

        // Send response back to the client
        res.status(201).json({ message: 'Booking successfully saved and emails scheduled or sent!' });
    } catch (error) {
        console.error('Error saving booking:', error);
        res.status(500).json({ error: 'Error saving booking' });
    }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
