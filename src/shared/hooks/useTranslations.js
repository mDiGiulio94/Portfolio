import en from "../utils/en.json";
import it from "../utils/it.json";
import { useLanguage } from "../context/LanguageContext";

const bundles = { en, it };

export default function useTranslations() {
  const { language, defaultLanguage } = useLanguage();
  const fallbackBundle = bundles[defaultLanguage] || bundles.it;
  return bundles[language] || fallbackBundle;
}