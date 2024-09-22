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

    const transporter = nodemailer.createTransport({
      host: "my.panell-vip.xyz",
      port: 465,
      secure: true, // Menggunakan secure: true untuk port 465
      auth: {
        user: "jasteb-rlx002@my.panell-vip.xyz",
        pass: "Asep@@12344",
      },
    });

    await transporter.sendMail({
      from: "jasteb-rlx002@my.panell-vip.xyz",
      to: to,
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
