import axios from "axios";

const sendMail = async (formData) => {
  try {
    const response = await axios.post("http://localhost:5000/api/send-email", formData);
    console.log("Risposta invio email:", response.data);
    // Puoi mostrare un messaggio di successo
    alert("Email inviata con successo!");
  } catch (error) {
    console.error("Errore durante l'invio dell'email:", error);
    alert("Si è verificato un errore durante l'invio dell'email.");
  }
};

export default sendMail;