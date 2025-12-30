import axios from "axios";

const BASE_URL = "https://portfolio-38468-default-rtdb.firebaseio.com/";
const API_URL = `${BASE_URL}/experiences.json`;

// Post dei esperienze

export const ExperiencePost = async (experience) => {
  const { ...data } = experience;
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

const selectTranslation = (item, language, defaultLanguage) => {
  const translations = item?.translations || {};
  return translations[language] || translations[defaultLanguage] || {};
};

// GET: tutte le esperienze
export const GetExperiences = async ({ language, defaultLanguage = "it" } = {}) => {
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
    return Object.entries(data).map(([id, experience]) => ({
      id,
      ...experience,
      ...selectTranslation(experience, language, defaultLanguage),
      tecnologies: Array.isArray(experience?.tecnologies)
        ? experience.tecnologies
        : Object.values(experience?.tecnologies ?? {}),
    }));
  } catch (error) {
    console.error("Error in GetExperience:", error);

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