import { Grid, Typography } from '@mui/material'
import { EmissionCategories, EmissionSubCategories } from '@prisma/client'
import { CategoryInput } from './CategoryInput'
import { SubCategoryList } from './SubCategoryList'

interface CategoryListProps {
  categories: (EmissionCategories & { emissionSubCategories: EmissionSubCategories[] })[]
  keys: string[]
  handleInputChange: (
    id: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    toUpdate?: boolean,
  ) => void
  modifyCategory: (category: EmissionCategories | EmissionSubCategories) => void
  modifySubCategory: (category: EmissionCategories | EmissionSubCategories) => void
  deleteSubCategory: (category: EmissionSubCategories) => void
  createFE: (
    idEmissionCategory: number,
    idLanguage: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  keys,
  handleInputChange,
  modifyCategory,
  deleteSubCategory,
  modifySubCategory,
  createFE,
}) => (
  <>
    {categories.map((category) => (
      <div key={category.id}>
        <CategoryInput category={category} modifyCategory={modifyCategory} />
        {category.emissionSubCategories?.map((subCategory, i) => (
          <SubCategoryList
            key={i}
            subCategory={subCategory}
            keys={keys}
            modifySubCategory={modifySubCategory}
            handleInputChange={handleInputChange}
            deleteSubCategory={deleteSubCategory}
            createFE={createFE}
          />
        ))}
        <Grid display={'flex'} alignItems={'center'} sx={{ m: 2 }}>
          <Typography sx={{ mt: 2, mr: 2, ml: 4 }}>Nouvelle Sous Catégorie </Typography>
          <CategoryInput
            category={{ ...category, idEmissionCategory: category.id, id: 0, label: '' }}
            modifyCategory={modifySubCategory}
          />
        </Grid>
      </div>
    ))}
  </>
)
