//qui è l'index.js dove viene generato avviato il server
const express = require("express");
//impedisce errori di cors
const cors = require("cors");
//plug-in per abilitare le email
const nodemailer = require("nodemailer");

require("dotenv").config();

const app = express();
//set della porta
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

const {
  EMAIL_FROM_USER,
  EMAIL_FROM_PASS,
  EMAIL_TO,
  CLIENT_URL
} = process.env;

const allowedOrigin = CLIENT_URL || "http://localhost:3000";
app.use(cors({ origin: allowedOrigin }));

const missingEnv = ["EMAIL_FROM_USER", "EMAIL_FROM_PASS", "EMAIL_TO"].filter(
  (envVar) => !process.env[envVar]
);

if (missingEnv.length) {
  console.warn(
    `⚠️ Variabili d'ambiente mancanti per il server email: ${missingEnv.join(", ")}`
  );
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_FROM_USER,
    pass: EMAIL_FROM_PASS
  }
});

// Verifica configurazione transporter all'avvio
transporter.verify((error) => {
  if (error) {
    console.error("Errore di configurazione SMTP:", error.message);
  } else {
    console.log("📧 Connessione SMTP pronta per l'invio");
  }
});

// Route invio email

app.post("/api/send-email", async (req, res) => {
  const { nome, cognome, email, messaggio } = req.body;

  if (!nome || !cognome || !email || !messaggio) {
    return res
      .status(400)
      .json({ success: false, message: "Tutti i campi sono obbligatori." });
  }

  if (!EMAIL_FROM_USER || !EMAIL_FROM_PASS || !EMAIL_TO) {
    return res.status(503).json({
      success: false,
      message:
        "Server email non configurato correttamente. Controlla le variabili d'ambiente."
    });
  }

  const mailOptions = {
    from: EMAIL_FROM_USER,
    replyTo: email,
    to: EMAIL_TO,
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