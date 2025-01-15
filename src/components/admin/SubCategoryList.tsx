import { TextField, Typography } from '@mui/material';
import { EmissionFactor } from '@/src/types/EmissionFactor';
import { EmissionFactorForm } from './EmissionFactorForm';

interface SubCategoryListProps {
    subCategory: any;
    keys: string[];
    handleInputChange: (id: string, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    createFE: (idEmissionCategorie: number, idLanguage: number, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SubCategoryList: React.FC<SubCategoryListProps> = ({ subCategory, keys, handleInputChange, createFE }) => (
    <div key={subCategory.id} >
        <Typography variant="h6" > {subCategory.id + " " + subCategory.label} </Typography>
        {
            subCategory.emissionFactors.map((factor: EmissionFactor) => (
                <EmissionFactorForm key={factor.id} factor={factor} keys={keys} handleInputChange={handleInputChange} />
            ))
        }
        {
            keys.map(key => (
                <TextField
                    key={key}
                    type={isText(key) ? 'text' : 'number'}
                    label={key}
                    onBlur={(event) => createFE(subCategory.id, subCategory.idLanguage || 1, key, event)}
                    variant="outlined"
                    margin="normal"
                />
            ))}
    </div>
);

function isText(key: string) {
    return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number';
}
