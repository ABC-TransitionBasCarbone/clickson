import { Button } from "@mui/material"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyledContainer, classes } from "./styles";

interface ActivityDataFormDescription {
    description: string;
}
export const ActivityDataFormDescription = ({ description }: ActivityDataFormDescription) => {
    const { t } = useTranslation();
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return <StyledContainer>
        <p className={classes.paragraph}>
            {isExpanded ? description : description.slice(0, Number(description.length*0.50))}
        </p>
        <Button onClick={() => setIsExpanded((prev) => !prev)} className={classes.button}>
            {isExpanded ? t('read-less') : t('read-more')}
        </Button>
    </StyledContainer>
}
