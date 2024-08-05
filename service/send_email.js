const express = require('express')
const router = express.Router()

const nodemailer = require('nodemailer');
require('dotenv').config();
const { google } = require('googleapis');
const OAuth2 = google.auth.OAuth2;


router.post('/', async (req, res) => {
    
    // Thay thế bằng thông tin của bạn
    const CLIENT_ID = process.env.CLIENT_ID ;
    const CLIENT_SECRET = process.env.CLIENT_SECRET ;
    const REFRESH_TOKEN = process.env.REFRESH_TOKEN ;
    const REDIRECT_URI = process.env.REDIRECT_URI ;
    const APP_USERNAME = process.env.APP_USERNAME;
    const APP_PASSWORD = process.env.APP_PASSWORD;

    // Tạo OAuth2 client
    const oauth2Client = new OAuth2(
        CLIENT_ID,
        CLIENT_SECRET,
        REDIRECT_URI
    );

    oauth2Client.setCredentials({
        refresh_token: REFRESH_TOKEN,
    });
    // Lấy access token
    const accessToken = await oauth2Client.getAccessToken();

    // Cấu hình transporter với OAuth2
    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        auth: {
            type: 'OAuth2',
            clientId: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            refreshToken: REFRESH_TOKEN,
            accessToken: accessToken.token,
            user: APP_USERNAME
        },
    });

    const { email, title, text } = req.body;

    // Tạo nội dung email
    const mailOptions = {
        from: APP_USERNAME,
        to: email,
        subject: title,
        html: text, // html body
    };

    // Gửi email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
        return res.status(500).json({status: 500}).send('Error while sending email: ' + error.message);
        }
        res.status(200).json({status: 500}).send('Registration successful! Email sent: ' + info.response);
    });
});

module.exports = router