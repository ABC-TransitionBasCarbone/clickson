import { Stack } from "@mui/material";
import { styled } from "@mui/system";

const classesLabel = "InputDataForm";

export const classes = {
    form: `${classesLabel}Form`,
    label: `${classesLabel}Label`,
    input: `${classesLabel}Input`,
    button: `${classesLabel}Button`,
}

export const StyledInputData = styled(Stack)(({ theme }) => ({
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
    marginBottom: theme.spacing(2),
    [`.${classes.form}`]: {
        flex: 1,
    },
    [`.${classes.label}`]: {
        fontWeight: "bold",
        fontSize: "14px",
        marginBottom: "5px",
    },
    [`.${classes.input}`]: {
        flex: 2,
        justifyContent: "flex-end",
        marginRight: theme.spacing(2),
    },
    [`.${classes.button}`]: {
        flex: 1,
        justifyContent: "flex-end",
    },
}));
