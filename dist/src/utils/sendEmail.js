import nodemailer from "nodemailer";
export const sendEmail = async (to, html, subject) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
    });
    await transporter.sendMail({
        from: '"LMS Platform" <noreply@lms.com>',
        to,
        subject,
        html,
    });
};
