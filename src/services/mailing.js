import mailer from 'nodemailer'; 
import config from '../config/config.js';

export default class MailingService {
    constructor(){
        this.client = mailer.createTransport({
            service: config.mailing.SERVICE,
            port: 587,
            auth: {
                user: config.mailing.USER,
                pass: config.mailing.PASSWORD
            }
        })
    }

    sendSimpleMail = async ({from, to, subject, html, attachments = []}) => {
        const result = await this.client.sendMail({from, to, subject, html, attachments});
        return result;
    }
}

sendPasswordResetEmail = async (email, token) => {
    const resetLink = `http://yourwebsite.com/reset-password/${token}`;
    const mailOptions = {
        from: 'your@email.com',
        to: email,
        subject: 'Password Reset',
        html: `
            <p>You are receiving this email because you (or someone else) has requested the reset of the password for your account.</p>
            <p>Please click on the following link, or paste this into your browser to complete the process:</p>
            <p><a href="${resetLink}">${resetLink}</a></p>
            <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
        `
    };
    try {
        await this.sendSimpleMail(mailOptions);
        console.log('Password reset email sent successfully');
    } catch (error) {
        console.error('Error sending password reset email:', error);
        throw new Error('Failed to send password reset email');
    }
}