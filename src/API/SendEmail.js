import axios from "axios";

const API_BASE_URL = (process.env.REACT_APP_API_BASE_URL || "").replace(/\/$/, "");

const sendMail = async (formData) => {
  const endpoint = API_BASE_URL ? `${API_BASE_URL}/api/send-email` : "/api/send-email";

  try {
    const response = await axios.post(endpoint, formData);
    console.log("Risposta invio email:", response.data);

    alert(response.data?.message || "Email inviata con successo!");
  } catch (error) {
    const serverMessage = error?.response?.data?.message;
    console.error("Errore durante l'invio dell'email:", error);
    alert(
      serverMessage ||
        "Si è verificato un errore durante l'invio dell'email. Riprova più tardi."
    );
  }
};

export default sendMail;