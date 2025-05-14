import { EmissionFactor } from '@/types/EmissionFactor';
import { EmissionFactorFormField } from './EmissionFactorFormField';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';

export interface EmissionFactorFormProps {
    factor: EmissionFactor;
    keys: string[];
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
}

export const EmissionFactorForm: React.FC<EmissionFactorFormProps> = ({ factor, keys, handleInputChange }) => (<div>
    {keys.map((key, id) => (
        <EmissionFactorFormField key={id} fieldKey={key} id={factor.id} value={factor[key as keyof EmissionFactor]} handleInputChange={handleInputChange} />
    ))}
    <IconButton
        sx={{ mt: 3, cursor: 'pointer' }}
        color="error"
        onClick={() => handleInputChange(factor.id, 'delete', {} as React.ChangeEvent<HTMLInputElement>)}>
        <Delete />
    </IconButton>
</div>);

export function isText(key: string) {
    return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number';
}
