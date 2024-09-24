import { Grid } from "@mui/material";
import { styled } from "@mui/system";

const classesLabel = "InputDataForm";

export const classes = {
    form: `${classesLabel}Form`,
    label: `${classesLabel}Label`,
}

export const StyledInputData = styled(Grid)(({ theme }) => ({
    [`.${classes.form}`]: {
        width: {xs: '100%', sm: '100%', md: '35ch', lg: '35ch'},
        marginBottom: theme.spacing(1),
    },
    [`.${classes.label}`]: {
        fontWeight: "bold",
        fontSize: "18px",
        marginBottom: "5px",
    },
}));
