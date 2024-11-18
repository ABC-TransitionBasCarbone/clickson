import theme from "@/src/app/theme";
import { FormControl, OutlinedInput, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';

interface FormCreateSessionProps {
    handleCreateSession: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function FormCreateSession({ handleCreateSession }: FormCreateSessionProps) {

    return <form onSubmit={handleCreateSession}>
        <FormControl
            sx={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}>
            <div>
                <OutlinedInput placeholder='Nom de la session'
                    type="text"
                    name="sessionName"
                />
                <Button type="submit"><AddIcon color='primary' />Créer une session</Button>
            </div>
        </FormControl>
    </form>

}
