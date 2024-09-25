import { styled } from "@mui/system";

const classesLabel = "ActivityDataForm";

export const classes = {
    paragraph: `${classesLabel}Paragraph`,
    button: `${classesLabel}Button`,
}

export const StyledContainer = styled('div')(({ theme }) => ({
    [`.${classes.paragraph}`]: {
        textAlign: "right",
        fontSize: "14px",
    },
    [`.${classes.button}`]: {
        marginTop: theme.spacing(2),
    },
}));
