import { Accordion, AccordionDetails, AccordionSummary, TextField } from '@mui/material';
import { EmissionFactor } from '@/src/types/EmissionFactor';
import { EmissionFactorForm } from './EmissionFactorForm';
import { CategoryInput } from './CategoryInput';
import { SubCategory } from '@/src/types/SubCategory';
import { Category } from '@/src/types/Category';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface SubCategoryListProps {
    subCategory: SubCategory;
    keys: string[];
    modifySubCategory: (category: Category | SubCategory) => void;
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    createFE: (idEmissionCategory: number, idLanguage: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SubCategoryList: React.FC<SubCategoryListProps> = ({ subCategory, keys, handleInputChange, createFE, modifySubCategory }) => (
    <div style={{ marginLeft: 10 }} key={subCategory.id} >
        <Accordion sx={{ m: 2 }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                <CategoryInput category={subCategory} modifyCategory={modifySubCategory} />
            </AccordionSummary>
            <AccordionDetails>
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
                    ))
                }
            </AccordionDetails>
        </Accordion>
    </div >
);

function isText(key: string) {
    return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number';
}
