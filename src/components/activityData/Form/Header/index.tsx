import { Divider } from "@mui/material"
import { StyledContainer, classes } from "../styles";

interface ActivityDataFormHeaderProps {
    category: string;
}
export const ActivityDataFormHeader = ({ category }: ActivityDataFormHeaderProps) => {

    return <StyledContainer>
        <h4> {category.toUpperCase()}</h4>
        <Divider className={classes.divider} aria-hidden="true" />
    </StyledContainer>;
}
