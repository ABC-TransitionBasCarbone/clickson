import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Greetings = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [i18n]);

    return <h1>{t("translations:hello")}</h1>
};