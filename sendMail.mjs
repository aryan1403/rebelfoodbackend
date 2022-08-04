import nodemailer from "nodemailer";
import dotenv from 'dotenv';

dotenv.config();



export default async function sendM(toEmail, otp) {
    const email = process.env.email;
    const pass = process.env.pass;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: email,
            pass: pass,
        }
    });

    await transporter.sendMail({
        from: "aaryan14032006@gmail.com",
        to: toEmail,
        subject: "Authentication Required!",
        text: `Your OTP for MS is ${otp}`,
    }, (err, info) => {
        if(err) {
            const data = {
                status: 404,
                msg: 'Error Occured while Sending mail'
            };
            console.log(data);
            return data;
        } else {
            const data = {
                status: '200',
                msg: info.response
            };
            console.log(data);
            return data;
        }
    });
}