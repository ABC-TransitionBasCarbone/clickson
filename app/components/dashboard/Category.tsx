'use client';

import { Category } from "@/app/models/Category/Category";
import { Grid } from "@mui/material";
import {useTheme} from "@mui/material/styles";
import { styled } from "@mui/system";
import { useRouter } from 'next/navigation'

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

interface Props {
    category: Category,
    borderColor: string
}

export const CategoryItem = ({category, borderColor}: Props) => {

    const theme = useTheme();
    const router = useRouter();

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
        <CustomH3>{category.label}</CustomH3>
        <Paragraph>
            {category.details}
        </Paragraph>
        <OngoingButton onClick={() => handleOnGoing(category)}>On going</OngoingButton>
    </Grid>);
}