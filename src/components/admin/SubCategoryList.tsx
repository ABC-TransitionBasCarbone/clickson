import { Delete } from '@mui/icons-material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward'
import { Accordion, AccordionDetails, AccordionSummary, Grid, IconButton, TextField } from '@mui/material'
import { EmissionCategories, EmissionFactors, EmissionSubCategories } from '@prisma/client'
import { CategoryInput } from './CategoryInput'
import { EmissionFactorForm } from './EmissionFactorForm'

interface SubCategoryListProps {
  subCategory: EmissionSubCategories & { emissionFactors?: EmissionFactors[] }
  keys: string[]
  modifySubCategory: (category: EmissionCategories | EmissionSubCategories) => void
  deleteSubCategory: (subCategory: EmissionSubCategories) => void
  handleInputChange: (
    id: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    toUpdate?: boolean,
  ) => void
  createFE: (
    idEmissionCategory: number,
    idLanguage: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void
}

export const SubCategoryList: React.FC<SubCategoryListProps> = ({
  subCategory,
  keys,
  handleInputChange,
  deleteSubCategory,
  createFE,
  modifySubCategory,
}) => (
  <Grid display={'flex'} alignItems={'center'} sx={{ marginLeft: 2 }} key={subCategory.id}>
    <Accordion sx={{ m: 2 }}>
      <AccordionSummary expandIcon={<ArrowDownwardIcon />}>
        <CategoryInput category={subCategory} modifyCategory={modifySubCategory} />
      </AccordionSummary>
      <AccordionDetails>
        {subCategory.emissionFactors?.map((factor: EmissionFactors) => (
          <EmissionFactorForm key={factor.id} factor={factor} keys={keys} handleInputChange={handleInputChange} />
        ))}
        {keys.map((key) => (
          <TextField
            key={key}
            type={isText(key) ? 'text' : 'number'}
            label={key}
            onBlur={(event) => createFE(subCategory.id, subCategory.idLanguage || 1, key, event)}
            variant="outlined"
            margin="normal"
          />
        ))}
      </AccordionDetails>
    </Accordion>
    <IconButton color="error" onClick={() => deleteSubCategory(subCategory)}>
      <Delete />
    </IconButton>
  </Grid>
)

function isText(key: string) {
  return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number'
}
