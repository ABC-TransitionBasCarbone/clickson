import { TextField } from '@mui/material';
import { Category } from '@/src/types/Category';
import { useState } from 'react';
import { SubCategory } from '@/src/types/SubCategory';

interface CategoryInputProps {
    category: Category | SubCategory;
    modifyCategory: (category: Category | SubCategory) => void;
}

export const CategoryInput: React.FC<CategoryInputProps> = ({ category, modifyCategory }) => {
    const [categoryData, setCategoryData] = useState(category);

    const handleChange = (field: keyof Category | keyof SubCategory, value: string) => {
        setCategoryData(prevState => {
            return { ...prevState, [field]: value };
        });
    };

    const handleBlur = (field: keyof Category | keyof SubCategory, value: string) => {
        setCategoryData(prevState => {
            const updatedCategory = { ...prevState, [field]: value };
            modifyCategory(updatedCategory);
            return updatedCategory;
        });
    };

    return <>
        <TextField
            sx={{ mt: 2 }}
            label={categoryData.id}
            type="text"
            onChange={(event) => handleChange('label', event.target.value)}
            onBlur={(event) => handleBlur('label', event.target.value)}
            value={categoryData.label}
        />
        <TextField
            sx={{ mt: 2 }}
            label="Description"
            value={categoryData.detail}
            onChange={(event) => handleChange('detail', event.target.value)}
            onBlur={(event) => handleBlur('detail', event.target.value)}
            fullWidth
        />
    </>
}
