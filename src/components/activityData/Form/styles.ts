import { styled } from "@mui/system";

const classesLabel = "ActivityDataForm";

export const classes = {
    divider: `${classesLabel}Divider`,
    paragraph: `${classesLabel}Paragraph`,
    button: `${classesLabel}Button`,
    form: `${classesLabel}Form`
}

export const StyledContainer = styled('div')(({ theme }) => ({
    [`.${classes.divider}`]: {
        marginTop: theme.spacing(2),
    },
    [`.${classes.paragraph}`]: {
        fontSize: "14px",
    },
    [`.${classes.button}`]: {
        marginTop: theme.spacing(2),
    },
}));
