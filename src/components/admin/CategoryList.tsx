import { Category } from '@/src/types/Category';
import { SubCategoryList } from './SubCategoryList';
import { CategoryInput } from './CategoryInput';
import { SubCategory } from '@/src/types/SubCategory';
import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

interface CategoryListProps {
    categories: Category[];
    keys: string[];
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    modifyCategory: (category: Category | SubCategory) => void;
    modifySubCategory: (category: Category | SubCategory) => void;
    createFE: (idEmissionCategory: number, idLanguage: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, keys, handleInputChange, modifyCategory, modifySubCategory, createFE }) => (
    <>
        {categories.map(category => (
            <div key={category.id}>
                <CategoryInput category={category} modifyCategory={modifyCategory} />
                {/* <Grid display={'flex'} alignItems={'center'} sx={{ mt: 2, mb: 2 }}>
                    <Typography sx={{ mt: 2, mr: 2 }}>Nouvelle Catégorie </Typography>
                    <CategoryInput category={{ ...category, id: 0, label: "" }} modifyCategory={modifyCategory} />
                </Grid> */}
                {category.emissionSubCategories?.map((subCategory, i) => (
                    <SubCategoryList key={i} subCategory={subCategory} keys={keys} modifySubCategory={modifySubCategory} handleInputChange={handleInputChange} createFE={createFE} />
                ))}
                <Grid display={'flex'} alignItems={'center'} sx={{ m: 2 }}>
                    <Typography sx={{ mt: 2, mr: 2, ml: 4 }}>Nouvelle Sous Catégorie </Typography>
                    <CategoryInput category={{ ...category, idEmissionCategory: category.id, id: 0, label: "" }} modifyCategory={modifySubCategory} />
                </Grid>
            </div>
        ))}
    </>
);
