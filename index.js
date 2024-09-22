const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const cors = require("cors");
const app = express();

app.use(cors())
app.use(bodyParser.json());

app.post("/api/mail", (req, res) => {
  const pass = req.body.password;
  const to = req.body.to;
  const subject = req.body.subject;
  const htmll = req.body.pesan;
  const sendEmail = async (mailDetails) => {
    const transporter = nodemailer.createTransport({
      host: "panellvvip.my.id",
      port: 25,
      auth: {
        user: "admin@panellvvip.my.id",
        pass: pass,
      },
    });

    try {
      //console.log("Sending your email...");
      await transporter.sendMail(mailDetails);
      res.json({ status: true, msg: "Email Send Success" });
    } catch (error) {
      res.status(404).json({ status: false, msg: `${error}` });
    }
  };

  sendEmail({
    from: "admin@panellvvip.my.id",
    to: to,
    subject: subject,
    html: htmll,
  });
});
app.use((req, res, next) => {
  res
    .status(404)
    .json({
      status: false,
      msg: "Visit https://github.com/Armanidrisi/Mailer For More Info",
    });
});
app.listen(5000, () => console.log("API listening on port 5000"));
