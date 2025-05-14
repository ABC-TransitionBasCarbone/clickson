import theme from "@/app/theme";
import { FormControl, OutlinedInput, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { useTranslations } from 'next-intl'

interface FormCreateSessionProps {
    handleCreateSession: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormCreateSession({ handleCreateSession }: FormCreateSessionProps) {
    const t = useTranslations("session");

    return <form onSubmit={handleCreateSession}>
        <p>{t('noActiveSession')}</p>
        <FormControl
            sx={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}>
            <div>
                <OutlinedInput placeholder={t('name')}
                    type="text"
                    name="sessionName"
                />
                <Button type="submit"><AddIcon color='primary' />{t('create')}</Button>
            </div>
        </FormControl>
    </form>

}
