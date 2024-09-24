'use client';

import { Category } from "@/app/models/Category/Category";
import { Grid } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { styled } from "@mui/system";
import { useRouter } from 'next/navigation'
import { Download } from '@mui/icons-material';
import {useTranslation} from "react-i18next";


const CustomH3 = styled('h3')(({theme}) => ({
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

const OngoingButton = styled("button")(({theme}) => ({
    backgroundColor: theme.palette.secondary.main,
    color: 'white !important' ,
    fontSize: 16,
    textTransform: "capitalize",
    padding: 12,
    minWidth: 120,
    height: 50,
    borderRadius: 8,
    textAlign: "center",
    textDecoration: "none",
    border: '0',
    '&:hover': {
        backgroundColor: theme.palette.primary.main,
        color: 'white'
    }
}));

const DownloadButton = styled("button")(({theme}) => ({
    marginTop: 5,
    backgroundColor: "white",
    border: `1px solid ${theme.palette.primary.main}`, 
    color: theme.palette.primary.main ,
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

    '&:hover': {
        border: `1px solid ${theme.palette.secondary.main}`, 
        color: theme.palette.secondary.main ,
    }
}));

interface Props {
    category: Category,
    borderColor: string
}

export const CategoryItem = ({category, borderColor}: Props) => {
    const router = useRouter();
    const { t } = useTranslation();

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

    const handleOnGoing = (category: Category) => {
        router.push(`/${category.label.toLocaleLowerCase().replaceAll(" ", "-")}?id=${category.id}`,)
    }

    return (<Grid container xs={12} sm={2} sx={conatinerStyle}>
        <CustomH3>{t(`abc-${category.label.toLocaleLowerCase().replace(" ", "-")}`)}</CustomH3>
        <Paragraph>
            {t(category.details)}
        </Paragraph>
        <OngoingButton onClick={() => handleOnGoing(category)}>{t('abc-on-going')}</OngoingButton>
        <DownloadButton onClick={() => {}}>{t('abc-download')} <Download sx={{cursor: 'pointer'}} onClick={()=>{}}/></DownloadButton>
    </Grid>);
}