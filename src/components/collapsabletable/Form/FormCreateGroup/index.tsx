import theme from "@/app/theme";
import { FormControl, OutlinedInput, Button } from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import { FormEvent } from "react";

interface FormCreateGroupProps {
    handleCreateGroup: (event: FormEvent<HTMLFormElement>) => void;
};

export default function FormCreateGroup({ handleCreateGroup: handleCreateGroup }: FormCreateGroupProps) {

    return <form onSubmit={handleCreateGroup}>
        <FormControl
            sx={{
                marginTop: theme.spacing(1),
                marginBottom: theme.spacing(1)
            }}>
            <div>
                <OutlinedInput placeholder='Nom du groupe'
                    type="text"
                    name="groupName"
                />
                <Button type="submit"><AddIcon color='primary' />Créer un groupe</Button>
            </div>
        </FormControl>
    </form>

}
