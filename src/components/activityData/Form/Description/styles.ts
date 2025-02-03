import { styled } from "@mui/system";

const classesLabel = "ActivityDataForm";

export const classes = {
    paragraph: `${classesLabel}Paragraph`,
    button: `${classesLabel}Button`,
}

export const StyledContainer = styled('div')(({ theme }) => ({
    height: "fit-content",
    alignItems: "flex-end",
    justifyContent: "flex-end",
    width: "200px",
    [`.${classes.paragraph}`]: {
        fontSize: "14px",
    },
    [`.${classes.button}`]: {
        marginTop: theme.spacing(2),
    },
}));
