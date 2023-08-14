import { useState, ChangeEvent } from "react";
import { useTranslation } from "react-i18next";
import { Languages } from "../services/Languages.ts";

export default function Lang() {
  const { i18n } = useTranslation();
  let language = Languages.FR;
  const [lang, setLang] = useState(language);

  const changeLanguage = (event: ChangeEvent<HTMLInputElement>) => {
    setLang((event.target as HTMLInputElement).value);
    language = (event.target as HTMLInputElement).value;

    switch (language) {
      case Languages.EN:
        i18n.changeLanguage(Languages.EN);
        break;
      case Languages.FR:
      default:
        i18n.changeLanguage(Languages.FR);
        break;
    }
  };

  return (
    <div>
      <form>
        <select onChange={changeLanguage} value={lang}>
          <option value={Languages.FR}>FR</option>
          <option value={Languages.EN}>EN</option>
        </select>
      </form>
    </div>
  );
}
