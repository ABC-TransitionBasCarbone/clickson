import { Typography } from '@mui/material';
import { Category } from '@/src/types/Category';
import { SubCategoryList } from './SubCategoryList';
import { EmissionFactor } from '@/src/types/EmissionFactor';

interface CategoryListProps {
    categories: Category[];
    keys: string[];
    handleInputChange: (id: string, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    createFE: (idEmissionCategorie: number, idLanguage: number, key: keyof EmissionFactor | string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, keys, handleInputChange, createFE }) => (
    <>
        {categories.map(category => (
            <div key={category.id}>
                <Typography variant="h4">{category.id + " " + category.label}</Typography>
                {category.emissionSubCategories?.map(subCategory => (
                    <SubCategoryList subCategory={subCategory} keys={keys} handleInputChange={handleInputChange} createFE={createFE} />
                ))}
            </div>
        ))}
    </>
);
