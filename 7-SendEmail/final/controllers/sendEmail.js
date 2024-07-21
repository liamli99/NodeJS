const nodemailer = require('nodemailer');

// GET /api/v1/send
// Only for testing!
const sendEmail = async (req, res) => {
    // This is provided by Ethereal: https://ethereal.email/create
    const transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        auth: {
            user: 'trey.bashirian@ethereal.email',
            pass: 'b3G8FdhCPGBf9A6nfy'
        }
    });

    // This email is not actually delivered from A to B! It can be seen in: https://ethereal.email/messages
    const info = await transporter.sendMail({
        from: '"Liam Li" <zl127@illinois.edu>',
        to: 'li.11899@osu.edu',
        subject: "Test",
        html: '<h1>Hello World</h1>' // text: 'Hello world'
    });

    res.json(info);
}

// Used in production! SendGrid

module.exports = sendEmail;