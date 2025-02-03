import TextField from '@mui/material/TextField';
import { isText } from './EmissionFactorForm';
import { useState } from 'react';

interface EmissionFactorFormFieldProps {
    value: string | number | undefined;
    id: string;
    fieldKey: string;
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
}

export const EmissionFactorFormField: React.FC<EmissionFactorFormFieldProps> = ({ value, id, fieldKey, handleInputChange }) => {
    const [factorData, setFactorData] = useState(value);

    return <>
        <TextField
            key={id}
            type={isText(fieldKey) ? 'text' : 'number'}
            value={factorData || ''}
            label={fieldKey}
            onChange={(event) => setFactorData(isText(fieldKey) ? event.target.value : Number(event.target.value))}
            onBlur={(event) => handleInputChange(id, fieldKey, event, true)}
            variant="outlined"
            margin="normal" />
    </>

}
