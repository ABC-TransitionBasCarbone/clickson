'use client';

import { Category } from "@/src/types/Category";
import { Download } from "@mui/icons-material";
import { Grid } from "@mui/material";
import { styled } from "@mui/system";
import Link from "next/link";
import { useTranslations } from 'next-intl'


const CustomH3 = styled('h3')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    fontWeight: "500",
    paddingBottom: 8,
    textAlign: "center",
}));

const Paragraph = styled("p")`
    font-family: "Open Sans", sans-serif;
    color: #000;
    font-weight: 200;
    font-size: 14px;
    padding-bottom: 30px;
    min-height: 280px;
    text-align: center;
`;

const OngoingButton = styled("button")(({ theme }) => ({
    backgroundColor: theme.palette.secondary.main,
    color: 'white !important',
    fontSize: 16,
    textTransform: "capitalize",
    padding: 12,
    minWidth: 120,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    textDecoration: "none",
    border: '0',
    cursor: 'pointer',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}));

const DownloadButton = styled("button")(({ theme }) => ({
    marginTop: 5,
    backgroundColor: "white",
    border: `1px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    fontSize: 16,
    textTransform: "capitalize",
    minWidth: 120,
    minHeight: 40,
    paddingRight: 4,
    paddingLeft: 4,
    borderRadius: 8,
    textAlign: "center",
    textDecoration: "none",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    cursor: 'pointer',

    '&:hover': {
        border: `1px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
    }
}));

interface Props {
    category: Category,
    borderColor: string
}

export const CategoryItem = ({ category, borderColor }: Props) => {
    const t = useTranslations('dashboard');

    const conatinerStyle = {
        justifyContent: "center",
        paddingLeft: 4,
        paddingRight: 4,
        paddingTop: 5,
        paddingBottom: 5,
        margin: 2,
        borderRadius: 3,
        border: `2px solid ${borderColor}`,
    }

    return (<Grid container xs={12} sm={2} sx={conatinerStyle}>
        <CustomH3>{category.label}</CustomH3>
        <Paragraph>
            {category.detail}
        </Paragraph>
        <Link href={`/category/` + category.idSessionEmissionCategory}>
            <OngoingButton >{t('onGoing')}</OngoingButton>
        </Link>
        {/* <DownloadButton onClick={() => { }}>{t('download')} <Download onClick={() => { }} /></DownloadButton> */}
    </Grid>);
}
