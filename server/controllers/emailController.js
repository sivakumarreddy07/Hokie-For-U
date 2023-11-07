const config = require("config")
var nodemailer = require("nodemailer");

const sendNotificationMail = (toAddress, emailSubject, emailBody) => {
    return new Promise((resolve, reject) => {
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: config.get('EMAIL_USER'),
                pass: config.get('EMAIL_PASS'),
            },
        });

        const mailOptions = {
            from: config.get('EMAIL_USER'),
            to: toAddress,
            subject: emailSubject,
            html: emailBody, 
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve('Email sent: ' + info.response);
            }
        });
    });
};

module.exports = {
    sendNotificationMail,
};
