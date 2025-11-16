import axios from "axios";

const BASE_URL = "https://portfolio-38468-default-rtdb.firebaseio.com/";
const API_URL = `${BASE_URL}/projects.json`;

// Post dei progetti

export const ProjectPost = async (project) => {
  const { ...data } = project; // i file non devono arrivare qui
  const payload = {
    ...data,
    createAt: new Date().toISOString(),
  };

  try {
    const resp = await axios.post(API_URL, payload);
    return resp.data;
  } catch (error) {
    throw error.response?.data || { error: "Errore durante il caricamento" };
  }
};

// GET: tutti i progetti
export const GetProgetti = async () => {
  try {
    const resp = await axios.get(API_URL);
    const data = resp.data;
    if (data == null) return [];
    return Object.entries(data).map(([id, projects]) => ({
      id,
      ...projects,
      tecnologies: Array.isArray(projects?.tecnologies)
        ? projects.tecnologies
        : Object.values(projects?.tecnologies ?? {}),
    }));
  } catch (error) {
    console.error("Error in GetProgetti:", error);

    if (axios.isAxiosError?.(error)) {
      const msg =
        error.response?.data?.error ??
        error.message ??
        "Error during projects fetch";
      const e = new Error(msg);
      e.status = error.response?.status; // opzionale
      throw e;
    }

    throw error instanceof Error
      ? error
      : new Error("Error during projects fetch");
  }
};
