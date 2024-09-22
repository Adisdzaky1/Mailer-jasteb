const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/api/mail", async (req, res) => {
  try {
    const { password: pass, to, subject, pesan: html } = req.body;

    // Validasi input
    if (!pass || !to || !subject || !html) {
      return res.status(400).json({ status: false, msg: "All fields are required" });
    }

    // Validasi apakah alamat email penerima valid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(to)) {
      return res.status(400).json({ status: false, msg: "Invalid email address" });
    }

    const transporter = nodemailer.createTransport({
      host: "my.panell-vip.xyz",
      port: 465,
      secure: true, // Menggunakan secure: true untuk port 465 (SSL)
      auth: {
        user: "jasteb-rlx002@my.panell-vip.xyz",
        pass: pass,
      },
    });

    // Mengirim email
    await transporter.sendMail({
      from: "jasteb-rlx002@my.panell-vip.xyz",
      to: to, // Alamat email penerima
      subject: subject,
      html: html,
    });

    res.json({ status: true, msg: "Email Send Success" });
  } catch (error) {
    res.status(500).json({ status: false, msg: error.message });
  }
});

app.use((req, res) => {
  res.status(404).json({
    status: false,
    msg: "Visit https://github.com/Armanidrisi/Mailer For More Info",
  });
});

app.listen(5000, () => console.log("API listening on port 5000"));
