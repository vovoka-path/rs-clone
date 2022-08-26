import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
dotenv.config({});

async function sendMail(email) {

    const { EMAIL, PASS } = process.env;

    const smtpTransport = nodemailer.createTransport({
        host: "smtp.mail.ru",
        secure: true,
        port: 465,
        auth: {
            user: EMAIL,
            pass: PASS
        }
   });

    const info = await smtpTransport.sendMail(email);

    return info;
}

export default sendMail;