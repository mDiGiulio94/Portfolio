const nodemailer = require("nodemailer");

// Simple CORS helper for Vercel serverless
const setCorsHeaders = (req, res) => {
  const allowedOrigin = process.env.CLIENT_URL || "*";
  res.setHeader("Access-Control-Allow-Origin", allowedOrigin);
  res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.status(200).end();
    return true;
  }

  if (req.method !== "POST") {
    res.status(405).json({ success: false, message: "Metodo non consentito" });
    return true;
  }

  return false;
};

const requiredEnv = ["EMAIL_USER", "EMAIL_PASS", "EMAIL_TO"];

const getEnvErrors = () =>
  requiredEnv.filter((envKey) => !process.env[envKey]);

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

module.exports = async function handler(req, res) {
  // CORS + method guard
  if (setCorsHeaders(req, res)) return;

  // Parse body if needed
  let body = req.body || {};
  if (typeof body === "string") {
    try {
      body = JSON.parse(body || "{}");
    } catch (parseError) {
      return res.status(400).json({
        success: false,
        message: "Payload non valido: invia un JSON corretto."
      });
    }
  }
  const { nome, cognome, email, messaggio } = body;

  if (!nome || !cognome || !email || !messaggio) {
    return res
      .status(400)
      .json({ success: false, message: "Tutti i campi sono obbligatori." });
  }

  const missingEnv = getEnvErrors();
  if (missingEnv.length) {
    return res.status(503).json({
      success: false,
      message:
        "Server email non configurato correttamente. Controlla le variabili d'ambiente."
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_USER,
    replyTo: email,
    to: process.env.EMAIL_TO,
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
    return res
      .status(200)
      .json({ success: true, message: "Email inviata con successo!" });
  } catch (error) {
    console.error("Errore invio email (serverless):", error);
    return res
      .status(500)
      .json({ success: false, message: "Errore durante l'invio dell'email." });
  }
};