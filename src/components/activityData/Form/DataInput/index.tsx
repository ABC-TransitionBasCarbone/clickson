'use client'

import { FormControl, Stack, MenuItem, OutlinedInput, Select, Typography, SelectChangeEvent, InputAdornment } from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useTranslations } from 'next-intl'
import { PrimaryButton } from "@/src/components/buttons/primaryButton";
import { classes, StyledInputData } from "./styles";
import { EmissionFactor } from "@/src/types/EmissionFactor";
import { Emission } from "@/src/types/Emission";
import { ChangeEvent, useState } from "react";

interface DataInputProps {
    saving: boolean;
    locked: boolean;
    titleSelectInput?: string;
    annualConsumptionText?: string;
    emissionFactors: EmissionFactor[];
    handleAddData: (emission: Emission) => void;
}

export const DataInput = ({
    titleSelectInput,
    emissionFactors,
    saving,
    annualConsumptionText,
    handleAddData,
    locked
}: DataInputProps) => {
    const t = useTranslations();
    const [emission, setEmission] = useState<Emission>({
        emissionFactor: emissionFactors[0],
        value: 0,
    });

    const handleEmissionFactorChange = (event: SelectChangeEvent<number>) => {
        const {
            target: { value: factorId },
        } = event;

        const selectedFactor = emissionFactors.find(factor => factor.id === factorId);
        if (selectedFactor) {
            setEmission(prevEmission => ({
                ...prevEmission,
                emissionFactor: selectedFactor,
            }));
        }
    };

    const handleValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmission(prevEmission => ({
            ...prevEmission,
            value: Number(event.target.value),
        }));
    };

    return <StyledInputData>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{titleSelectInput}</Typography>
                <Select
                    IconComponent={KeyboardArrowDown}
                    value={emission.emissionFactor.id}
                    onChange={handleEmissionFactorChange}
                >
                    {emissionFactors.map((emissionFactor) => (
                        <MenuItem key={emissionFactor.id} value={emissionFactor.id}>{emissionFactor.label}</MenuItem>
                    ))}
                </Select>
            </FormControl>
        </Stack>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{annualConsumptionText}</Typography>
                <OutlinedInput
                    type='text'
                    name="annual_consumption"
                    endAdornment={<InputAdornment position="end">{emission.emissionFactor.unit}</InputAdornment>}
                    value={emission.value}
                    onChange={handleValueChange}
                />
            </FormControl>
        </Stack>
        <Stack className={classes.button} >
            <PrimaryButton disabled={saving || locked} onClick={() => handleAddData(emission)}>
                {locked ? t('category.locked') : t('category.add')}
            </PrimaryButton>
        </Stack>
    </StyledInputData>
};
