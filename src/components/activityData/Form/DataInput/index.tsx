'use client'

import { KeyboardArrowDown } from '@mui/icons-material'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import {
  FormControl,
  IconButton,
  InputAdornment,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'
import { PrimaryButton } from '../../../../components/buttons/primaryButton'
import { Emission } from '../../../../types/Emission'
import { EmissionFactor } from '../../../../types/EmissionFactor'
import { classes, StyledInputData } from './styles'

interface DataInputProps {
  saving: boolean
  locked: boolean
  titleSelectInput?: string
  tootlipText?: string
  annualConsumptionText?: string
  emissionFactors: EmissionFactor[]
  handleAddData: (emission: Emission) => void
}

export const DataInput = (props: DataInputProps) => {
  const t = useTranslations('category')
  const [emission, setEmission] = useState<Emission>({
    emissionFactor: props.emissionFactors
      ? props.emissionFactors[0]
      : ({ id: '0', value: 0, label: '', unit: '' } as EmissionFactor),
    value: 0,
    total: 0,
  })

  const handleEmissionFactorChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value: factorId },
    } = event

    const selectedFactor = props.emissionFactors.find((factor) => factor.id === factorId.toString())
    if (selectedFactor) {
      setEmission((prevEmission) => ({
        ...prevEmission,
        emissionFactor: selectedFactor,
      }))
    }
  }

  const handleEmissionValueChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmission((prevEmission) => ({
      ...prevEmission,
      value: Number(event.target.value),
    }))
  }

  return (
    props.emissionFactors && (
      <StyledInputData>
        <Stack className={classes.input}>
          <FormControl className={classes.form}>
            <Typography className={classes.label}>{props.titleSelectInput}</Typography>
            <Select
              IconComponent={KeyboardArrowDown}
              value={Number(emission.emissionFactor.id)}
              onChange={handleEmissionFactorChange}
            >
              {props.emissionFactors.map((emissionFactor) => (
                <MenuItem key={emissionFactor.id} value={emissionFactor.id}>
                  {emissionFactor.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
        <Stack className={classes.input}>
          <FormControl className={classes.form}>
            <Typography className={classes.label}>{props.annualConsumptionText}</Typography>
            <TextField
              type="number"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    {emission.emissionFactor.unit}
                    {props.tootlipText && (
                      <Tooltip title={props.tootlipText}>
                        <IconButton>
                          <HelpOutlineIcon />
                        </IconButton>
                      </Tooltip>
                    )}
                  </InputAdornment>
                ),
              }}
              onChange={handleEmissionValueChange}
            />
          </FormControl>
        </Stack>
        <Stack className={classes.button}>
          <PrimaryButton
            disabled={props.saving || props.locked}
            onClick={() => emission.value > 0 && props.handleAddData(emission)}
          >
            {props.locked ? t('locked') : t('add')}
          </PrimaryButton>
        </Stack>
      </StyledInputData>
    )
  )
}
