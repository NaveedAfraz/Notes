const nodemailer = require("nodemailer");

const sendEmail = async (to, resetLink) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Use Gmail or any other service
      auth: {
        user: process.env.EMAIL_USER, // Your email
        pass: process.env.EMAIL_PASS, // App password (not your real password)
      },
    });

    const mailOptions = {
      from: `"Notes App" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Reset Password",
      html: `<p>Click <a href=${resetLink}>here</a> to reset your password.</p>`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
