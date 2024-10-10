'use client';

import Link from "next/link";
import {styled} from "@mui/system";
import Image from "next/image";
import i18n from "i18next";
import {Language} from "@/app/types/Language";

const languages: Language[] = [
    {code: 'en', name: 'English', image: "https://flagcdn.com/h20/gb.png"},
    {code: 'fr', name: 'French', image: "https://flagcdn.com/h20/fr.png"},
    {code: 'es', name: 'Spanish', image: "https://flagcdn.com/h20/es.png"},
    {code: 'it', name: 'Italian', image: "https://flagcdn.com/h20/it.png"},
    {code: 'gr', name: 'Greek', image: "https://flagcdn.com/h20/gr.png"},
    {code: 'hr', name: 'Croatian', image: "https://flagcdn.com/h20/hr.png"},
    {code: 'hu', name: 'Hungarian', image: "https://flagcdn.com/h20/hu.png"},
    {code: 'ro', name: 'Romanian', image: "https://flagcdn.com/h20/ro.png"},
];

const LanguageMenu = styled('ul')(({theme}) => ({
    li: {
        display: "inline-block",
        paddingLeft: theme.spacing(1),
        marginTop: theme.spacing(2),
        marginBottom: theme.spacing(1),
    },
}));

const changeLanguage = (locale: string) => {

    i18n.changeLanguage(locale)
        .catch((error) => {
            console.error('Failed to change language:', error);
        });

};
export default function LanguageSwitcher() {
    return (
        <LanguageMenu>
            {languages.map(({code, name, image}) => (
                <li key={code}>
                    <Link
                        href=""
                        onClick={() => changeLanguage(code)}
                    >
                        <Image
                            src={image}
                            alt={name}
                            width={17}
                            height={11}
                        />
                    </Link>
                </li>
            ))}
        </LanguageMenu>
    )
}
