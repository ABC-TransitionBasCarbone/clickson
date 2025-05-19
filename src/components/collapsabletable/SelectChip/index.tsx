import Box from '@mui/material/Box'
import Chip from '@mui/material/Chip'
import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import OutlinedInput from '@mui/material/OutlinedInput'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
}

interface MultipleSelectProps {
  setRights: (rights: Rights[]) => void
  rights: Rights[]
  groupRights: number[]
}

export default function MultipleSelectChip({ setRights, rights, groupRights }: MultipleSelectProps) {
  const t = useTranslations('dashboard')

  const [selectedRights, setSelectedRights] = useState<number[]>(groupRights)

  const handleChange = (event: SelectChangeEvent<typeof selectedRights>) => {
    const {
      target: { value: rightsSelected },
    } = event

    setSelectedRights(
      // On autofill we get a stringified value.
      typeof rightsSelected === 'string' ? [] : rightsSelected,
    )
    const slectedRightsKeys = (rightsSelected as number[]).map((right) => Number(right))
    setRights(rights.filter((right) => slectedRightsKeys.includes(right.key)))
  }

  const getLabel = (label: string, advanced: boolean) => {
    return t(label) + (advanced ? ' ' + t('advanced') : '')
  }

  function getValue(value: number) {
    const right = rights.find((right) => right.key === value)
    return right ? getLabel(right.label, right.advanced) : ''
  }

  return (
    <div>
      <FormControl sx={{ m: 1, width: 700 }}>
        <InputLabel>{t('rights')}</InputLabel>
        <Select
          multiple
          value={selectedRights}
          onChange={handleChange}
          input={<OutlinedInput id="select-multiple-chip" label="Chip" />}
          renderValue={(selected) => (
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
              {selected.map((value) => (
                <Chip key={value} label={getValue(Number(value))} />
              ))}
            </Box>
          )}
          MenuProps={MenuProps}
        >
          {rights.map((right) => (
            <MenuItem key={right.key} value={right.key}>
              {getLabel(right.label, right.advanced)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </div>
  )
}
