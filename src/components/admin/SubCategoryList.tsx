import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, TextField } from '@mui/material';
import { EmissionFactor } from '@/src/types/EmissionFactor';
import { EmissionFactorForm } from './EmissionFactorForm';
import { CategoryInput } from './CategoryInput';
import { SubCategory } from '@/src/types/SubCategory';
import { Category } from '@/src/types/Category';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { Delete } from '@mui/icons-material';

interface SubCategoryListProps {
    subCategory: SubCategory;
    keys: string[];
    modifySubCategory: (category: Category | SubCategory) => void
    deleteSubCategory: (subCategory: SubCategory) => void
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    createFE: (idEmissionCategory: number, idLanguage: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const SubCategoryList: React.FC<SubCategoryListProps> = ({ subCategory, keys, handleInputChange, deleteSubCategory, createFE, modifySubCategory }) => (
    <Grid display={'flex'} alignItems={'center'} sx={{ marginLeft: 2 }} key={subCategory.id}>
        <Accordion sx={{ m: 2 }}>
            <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
                <CategoryInput category={subCategory} modifyCategory={modifySubCategory} />
            </AccordionSummary>
            <AccordionDetails>
                {
                    subCategory.emissionFactors.map((factor: EmissionFactor) => (
                        <EmissionFactorForm
                            key={factor.id}
                            factor={factor}
                            keys={keys}
                            handleInputChange={handleInputChange} />
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
        <IconButton color="error" onClick={() => deleteSubCategory(subCategory)}>
            <Delete />
        </IconButton>
    </Grid>
);

function isText(key: string) {
    return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number';
}
