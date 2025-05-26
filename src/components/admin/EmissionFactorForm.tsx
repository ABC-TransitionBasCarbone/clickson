import { Delete } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { EmissionFactors } from '@prisma/client'
import { EmissionFactorFormField } from './EmissionFactorFormField'

export interface EmissionFactorFormProps {
  factor: EmissionFactors
  keys: string[]
  handleInputChange: (
    id: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    toUpdate?: boolean,
  ) => void
}

export const EmissionFactorForm: React.FC<EmissionFactorFormProps> = ({ factor, keys, handleInputChange }) => (
  <div>
    {keys.map((key, id) => (
      <EmissionFactorFormField
        key={id}
        fieldKey={key}
        id={factor.id}
        value={factor[key as keyof EmissionFactors] ?? undefined}
        handleInputChange={handleInputChange}
      />
    ))}
    <IconButton
      sx={{ mt: 3, cursor: 'pointer' }}
      color="error"
      onClick={() => handleInputChange(factor.id, 'delete', {} as React.ChangeEvent<HTMLInputElement>)}
    >
      <Delete />
    </IconButton>
  </div>
)

export function isText(key: string) {
  return key === 'label' || key === 'type' || key === 'unit' ? 'text' : 'number'
}
