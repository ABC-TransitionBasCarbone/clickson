import { styled } from "@mui/system";

const classesLabel = "ActivityDataForm";

export const classes = {
    divider: `${classesLabel}Divider`,
    paragraph: `${classesLabel}Paragraph`,
    button: `${classesLabel}Button`,
}

export const StyledContainer = styled('div')(({ theme }) => ({
    [`.${classes.divider}`]: {
        marginTop: theme.spacing(5),
    },
    [`.${classes.paragraph}`]: {
        textAlign: "right",
        fontSize: "14px",
    },
    [`.${classes.button}`]: {
        marginTop: theme.spacing(2),
    },
}));
