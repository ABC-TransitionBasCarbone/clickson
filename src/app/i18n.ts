import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
    .use(initReactI18next)
    .init({
        fallbackLng: "fr",
        resources:{
            fr: {
                translation: {
                    "Hello": "Bonjour !",
                },
            },
            "en-GB": {
                translation: {
                    "Hello": "Hi!"
                }
            }
        }
    });

export default i18n;