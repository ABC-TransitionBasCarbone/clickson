import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { FormControl, Typography, OutlinedInput, Stack } from "@mui/material";
import { useTranslations } from "next-intl";
import { ChangeEvent, useState } from "react";
import { StyledInputData, classes } from "../../DataInput/styles";

interface CommentInputProps {
    addComment: (comment: string) => void;
}
export const CommentInput = ({ addComment }: CommentInputProps) => {
    const t = useTranslations()
    const [comment, setComments] = useState("")

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setComments(event.target.value);
    }

    return <StyledInputData>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{t('category.commentsNotes')}</Typography>
                <OutlinedInput
                    type='text'
                    name="annual_consumption"
                    value={comment}
                    onChange={handleValueChange}
                />
            </FormControl>
        </Stack>
        <Stack className={classes.button}>
            <PrimaryButton onClick={() => addComment(comment)}>{t('category.add')}</PrimaryButton>
        </Stack>
    </StyledInputData>
}
