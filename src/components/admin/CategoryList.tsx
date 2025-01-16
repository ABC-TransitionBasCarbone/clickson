import { Category } from '@/src/types/Category';
import { SubCategoryList } from './SubCategoryList';
import { CategoryInput } from './CategoryInput';
import { SubCategory } from '@/src/types/SubCategory';

interface CategoryListProps {
    categories: Category[];
    keys: string[];
    handleInputChange: (id: string, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, toUpdate?: boolean) => void;
    modifyCategory: (category: Category | SubCategory) => void;
    modifySubCategory: (category: Category | SubCategory) => void;
    createFE: (idEmissionCategorie: number, idLanguage: number, key: string, event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}

export const CategoryList: React.FC<CategoryListProps> = ({ categories, keys, handleInputChange, modifyCategory, modifySubCategory, createFE }) => (
    <>
        {categories.map(category => (
            <div key={category.id}>
                <CategoryInput category={category} modifyCategory={modifyCategory} />
                {category.emissionSubCategories?.map((subCategory, i) => (
                    <SubCategoryList key={i} subCategory={subCategory} keys={keys} modifySubCategory={modifySubCategory} handleInputChange={handleInputChange} createFE={createFE} />
                ))}
            </div>
        ))}
    </>
);
