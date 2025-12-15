//qui è l'index.js dove viene generato avviato il server
const express = require("express");
//impedisce errori di cors
const cors = require("cors");
//plug-in per abilitare le email
const nodemailer = require("nodemailer");
//rotta per la registrazione
const registerRoute = require("./register");
//rotta dei preferiti
const agentOtp = require("./otp")
//password criptata per la chiave google per o reCAPTCHA
//rotta preferiti
const preferiti = require("./preferiti");
require("dotenv").config();

const app = express();
//set della porta
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));

// Route registrazione
app.use("/api/register", registerRoute);
app.use("/api/agent-otp", agentOtp);
app.use("/api/preferiti", preferiti)



// Route invio email
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "m.dig994@gmail.com",
    pass: "tlgxvwsoucfspowm" // 🔐 meglio usare variabile .env
  }
});

app.post("/api/send-email", async (req, res) => {
  const { nome, cognome, email, messaggio } = req.body;

  const mailOptions = {
    from: email,
    to: "m.dig994@gmail.com",
    subject: "Nuovo messaggio dal form contatti",
    html: `
      <h3>Hai ricevuto un nuovo messaggio!</h3>
      <p><strong>Nome:</strong> ${nome} ${cognome}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${messaggio}</p>`
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: "Email inviata con successo!" });
  } catch (error) {
    console.error("Errore invio email:", error);
    return res.status(500).json({ success: false, message: "Errore durante l'invio dell'email." });
  }
});

// Avvia server
app.listen(PORT, () => {
  console.log(`✅ Server attivo su http://localhost:${PORT}`);
});
