const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

app.post("/api/subscribe", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "Email is required"
            });
        }

        await transporter.sendMail({
            from: `"Smriti Notes" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: "Thanks for joining our list! 🎉",
            html: `
                <div style="font-family: Arial, sans-serif;">
                    <h2>Thanks for signing up! 🎉</h2>

                    <p>Hi there,</p>

                    <p>
                        Thanks for joining our notification list.
                        We'll let you know when we launch.
                    </p>

                    <p>
                        We appreciate your interest!
                    </p>

                    <br>

                    <p>— Smriti Notes Team</p>
                </div>
            `
        });

        res.json({
            message: "Confirmation email sent successfully"
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Failed to send email"
        });
    }
});

app.listen(5000, () => {
    console.log("Server running on port 5000");
});