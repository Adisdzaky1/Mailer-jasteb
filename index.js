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
      host: "my.panell-vip.xyz",
      port: 465,
      auth: {
        user: "jasteb-rlx002@my.panell-vip.xyz",
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
    from: "jasteb-rlx002@my.panell-vip.xyz",
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
