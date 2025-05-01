const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post('/send-email', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.USER,
            pass: process.env.PASS 
        }
    });

    const mailOptions = {
        from: email,
        to: 'akhileshkumarbst0@gmail.com',
        subject: subject || 'New Message from Contact Form',
        text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    };

    try {
        await transporter.sendMail(mailOptions);
        res.json({ message: 'Email sent successfully!' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to send email.' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
