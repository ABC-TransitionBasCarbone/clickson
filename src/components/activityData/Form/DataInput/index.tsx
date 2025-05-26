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
import { EmissionFactors, SessionEmissions } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { ChangeEvent, useState } from 'react'
import { PrimaryButton } from '../../../../components/buttons/primaryButton'
import { classes, StyledInputData } from './styles'

interface DataInputProps {
  saving: boolean
  locked: boolean
  titleSelectInput?: string
  tootlipText?: string
  annualConsumptionText?: string
  emissionFactors: EmissionFactors[]
  handleAddData: (emission: SessionEmissions & { emissionFactor: EmissionFactors }) => void
}

export const DataInput = (props: DataInputProps) => {
  const t = useTranslations('category')
  const [emission, setEmission] = useState<SessionEmissions & { emissionFactor: EmissionFactors }>({
    id: '',
    label: '',
    type: '',
    unit: '',
    value: 0,
    uncertainty: 0,
    idSessionEmissionSubCategory: '',
    idEmissionFactor: props.emissionFactors && props.emissionFactors[0] ? props.emissionFactors[0].id : 0,
    total: 0,
    createdAt: new Date(),
    updatedAt: new Date(),
    emissionFactor:
      props.emissionFactors && props.emissionFactors[0]
        ? props.emissionFactors[0]
        : ({
            id: 0,
            idEmissionSubCategory: 0,
            idLanguage: 0,
            label: '',
            type: '',
            unit: '',
            value: 0,
            depreciationPeriod: null,
            uncertainty: 0,
          } as EmissionFactors),
  })

  const handleEmissionFactorChange = (event: SelectChangeEvent<number>) => {
    const {
      target: { value: factorId },
    } = event

    const selectedFactor = props.emissionFactors.find((factor) => factor.id === factorId)
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
      value: event.target.value ? Number(event.target.value) : 0,
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
            onClick={() => emission.value && props.handleAddData(emission)}
          >
            {props.locked ? t('locked') : t('add')}
          </PrimaryButton>
        </Stack>
      </StyledInputData>
    )
  )
}
