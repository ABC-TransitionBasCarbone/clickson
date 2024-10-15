import { Divider } from "@mui/material"
import { useTranslation } from "react-i18next";
import { StyledContainer, classes } from "../styles";

interface ActivityDataFormHeaderProps {
    domain: string;
    category: string;
}
export const ActivityDataFormHeader = ({ domain, category }: ActivityDataFormHeaderProps) => {
    const { t } = useTranslation();

    return <StyledContainer>
        <h4>{t(`abc-${domain}`).toUpperCase()} - {t(`abc-${category}`).toUpperCase()}</h4>
        <Divider className={classes.divider} aria-hidden="true" />
    </StyledContainer>;
}
