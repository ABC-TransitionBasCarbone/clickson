import TextField from '@mui/material/TextField'
import { useState } from 'react'
import { isText } from './EmissionFactorForm'

interface EmissionFactorFormFieldProps {
  value: string | number | undefined
  id: number
  fieldKey: string
  handleInputChange: (
    id: number,
    key: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    toUpdate?: boolean,
  ) => void
}

export const EmissionFactorFormField: React.FC<EmissionFactorFormFieldProps> = ({
  value,
  id,
  fieldKey,
  handleInputChange,
}) => {
  const [factorData, setFactorData] = useState(value)

  return (
    <>
      <TextField
        key={id}
        type={isText(fieldKey) ? 'text' : 'number'}
        value={factorData || ''}
        label={fieldKey}
        onChange={(event) => setFactorData(isText(fieldKey) ? event.target.value : Number(event.target.value))}
        onBlur={(event) => handleInputChange(id, fieldKey, event, true)}
        variant="outlined"
        margin="normal"
      />
    </>
  )
}
