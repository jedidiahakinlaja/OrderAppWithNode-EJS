
const dotenv = require('dotenv')
const myEnv = dotenv.config()
const nodemailer = require('nodemailer');
const { google } = require('googleapis');



const OAuth2 = google.auth.OAuth2;
console.log(process.env)

// Replace these values with your credentials
const CLIENT_ID = process.env.CLIENT_ID
const CLIENT_SECRET = process.env.CLIENT_SECRET
const REDIRECT_URI = process.env.REDIRECT_URI
const REFRESH_TOKEN = process.env.REFRESH_TOKEN

// Set up OAuth2 client
const oauth2Client = new OAuth2(
    CLIENT_ID,
    CLIENT_SECRET,
    REDIRECT_URI
);

oauth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });


exports.sendMail= async (req,res)=>{
    try {
        const {name, title, email,status}=req.body
        const accessToken = await oauth2Client.getAccessToken();

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                type: 'OAuth2',
                user: 'akinlajajedidiah@gmail.com',
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken.token
            }
        });

        const mailOptions = {
            from: 'akinlajajedidiah@gmail.com',
            to: email,
            subject: `Purchase of ${title}`,
            text: ` Dear ${name}. your Purchase of ${title} is  ${status}`,
            // html:<p>verify your email addresss</p>
        };

        const result = await transporter.sendMail(mailOptions);
        console.log('Email sent...', result);
    } catch (error) {
        console.log('Error:', error);
    }
}

