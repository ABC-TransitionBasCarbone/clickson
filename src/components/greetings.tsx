import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";

export const Greetings = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
    }, [i18n]);

    return <Typography>{t("translations:hello")}</Typography>
};
