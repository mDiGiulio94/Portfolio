import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase.config";

const BASE_URL = "https://portfolio-38468-default-rtdb.firebaseio.com/";
const API_URL = `${BASE_URL}/projects.json`;

// Post dei progetti

export const ProjectPost = async (project) => {
  const { imageFile, imageUrl: providedImageUrl = "", ...data } = project;
  const file = imageFile?.[0] ?? imageFile;
  let imageUrl = providedImageUrl;

  try {
    if (file) {
      const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
      const snapshot = await uploadBytes(storageRef, file);
      imageUrl = await getDownloadURL(snapshot.ref);
    }

    const payload = {
      ...data,
      ...(imageUrl && { imageUrl }),
      createAt: new Date().toISOString(),
    };

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
