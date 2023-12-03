const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    requireTLS: true,
    auth: {
        user: process.env.USER_EMAIL,
        pass: process.env.USER_EMAIL_PASSWORD
    }
});

const mailOptionResetPassFn = (username, email) => {
    return {
        from: process.env.USER_EMAIL,
        to: email,
        subject: "Reset Password!!",
        html: `<p>To reset your password,${username} please click or copy the following link: <a href="http://localhost:8000/api/auth/reset-password?email=${email}">link</a> and reset the password</p>`
    }
}
const mailOptionContactFn = (username, message) => {
    const subject = "Contact Us"
    return {
        from: process.env.USER_EMAIL,
        to: email,
        subject: subject,
        html: `<p>Username: ${username}\nSubject: ${subject}\nMessage: ${message}</p>`
    }
}



module.exports = { transporter, mailOptionResetPassFn, mailOptionContactFn }
