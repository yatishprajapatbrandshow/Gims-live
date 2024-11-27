const nodemailer = require("nodemailer");
require("dotenv").config(); // To use environment variables from a .env file

const createTransporter = () => {
  return nodemailer.createTransport({
    service:"gmail", // Replace with your SMTP server
    port: process.env.SMTP_PORT || 465, // Use 465 for secure connection
    secure: true, // Set to true for port 465
    auth: {
      user: process.env.SMTP_USER || "yatishprajapat.official@gmail.com", // Replace with your email
      pass: process.env.SMTP_PASS || "zjdj nisq ppbn vyti", // Replace with your email password
    },
  });
};

const sendMail = async ( to, subject, text, html ) => {
  const transporter = createTransporter();

  const mailOptions = {
    from: `yatishprajapat.official@gmail.com`, 
    to, 
    subject, 
    text, 
    html, 
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent: ${info.messageId}`);
    return { success: true, info };
  } catch (error) {
    console.error(`Error sending email: ${error.message}`);
    return { success: false, error };
  }
};

module.exports = { sendMail };
