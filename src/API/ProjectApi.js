import axios from "axios";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/firebase.config";

const BASE_URL = "https://portfolio-38468-default-rtdb.firebaseio.com/";
const API_URL = `${BASE_URL}/projects.json`;
const DEFAULT_LANGUAGE = "it";

// Post dei progetti

export const uploadProjectImage = async (file) => {
  const storageRef = ref(storage, `projects/${Date.now()}-${file.name}`);
  const snapshot = await uploadBytes(storageRef, file);

  return getDownloadURL(snapshot.ref);
};

export const ProjectPost = async (project) => {
  const { imageFile, imageUrl: providedImageUrl = "", ...data } = project;
  const file = imageFile?.[0] ?? imageFile;

  const imageUrl = file ? await uploadProjectImage(file) : providedImageUrl;

  const payload = {
    ...data,
    ...(imageUrl && { imageUrl }),
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
const selectTranslation = (item, language, defaultLanguage) => {
  const translations = item?.translations || {};
  return translations[language] || translations[defaultLanguage] || {};
};

export const GetProgetti = async ({ language, defaultLanguage = DEFAULT_LANGUAGE } = {}) => {
  try {
    const resp = await axios.get(API_URL, {
      headers: {
        "Accept-Language": language,
      },
      params: {
        lang: language,
      },
    });
    const data = resp.data;
    if (data == null) return [];
    return Object.entries(data).map(([id, projects]) => ({
      id,
      ...projects,
      ...selectTranslation(projects, language, defaultLanguage),
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