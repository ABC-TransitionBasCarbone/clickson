import { Typography } from "@mui/material";
import { useEffect } from "react";
import { useTranslation } from 'react-i18next';

export const Test = () => {
    const { t, i18n } = useTranslation();

    useEffect(() => {
        const lng = navigator.language;
        i18n.changeLanguage(lng);
        console.log(lng);
    }, []);

    return <Typography>{t("Hello")}</Typography>
};
