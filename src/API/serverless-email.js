import nodemailer from "nodemailer";

const REQUIRED_ENV = ["EMAIL_FROM_USER", "EMAIL_FROM_PASS", "EMAIL_TO"];

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_FROM_USER?.trim(),
    pass: process.env.EMAIL_FROM_PASS?.trim()
  }
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res
      .status(405)
      .json({ success: false, message: "Metodo non consentito" });
  }

  const missingEnv = REQUIRED_ENV.filter((key) => !process.env[key]);
  if (missingEnv.length) {
    return res.status(503).json({
      success: false,
      message: `Configurazione email mancante: ${missingEnv.join(", ")}`
    });
  }

  const { nome, cognome, email, messaggio } = req.body || {};

  if (!nome || !cognome || !email || !messaggio) {
    return res.status(400).json({
      success: false,
      message: "Tutti i campi sono obbligatori."
    });
  }

  const mailOptions = {
    from: process.env.EMAIL_FROM_USER,
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
    console.error("Errore invio email:", error);
    return res.status(500).json({
      success: false,
      message: "Errore durante l'invio dell'email."
    });
  }
}