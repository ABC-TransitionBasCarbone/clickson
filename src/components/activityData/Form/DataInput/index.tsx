'use client'

import { FormControl, Stack, MenuItem, Select, Typography, SelectChangeEvent, InputAdornment, TextField } from "@mui/material";
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

export const DataInput = (props: DataInputProps) => {
    const t = useTranslations('category');
    const [emission, setEmission] = useState<Emission>({
        emissionFactor: props.emissionFactors[0],
        value: 0,
        total: 0,
    });

    const handleEmissionFactorChange = (event: SelectChangeEvent<number>) => {
        const {
            target: { value: factorId },
        } = event;

        const selectedFactor = props.emissionFactors.find(factor => factor.id === factorId);
        if (selectedFactor) {
            setEmission(prevEmission => ({
                ...prevEmission,
                emissionFactor: selectedFactor,
            }));
        }
    };

    const handleEmissionValueChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmission(prevEmission => ({
            ...prevEmission,
            value: Number(event.target.value),
        }));
    };

    return <StyledInputData>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{props.titleSelectInput}</Typography>
                <Select
                    IconComponent={KeyboardArrowDown}
                    value={Number(emission.emissionFactor.id)}
                    onChange={handleEmissionFactorChange}
                >
                    {props.emissionFactors.map((emissionFactor) => (<MenuItem key={emissionFactor.id} value={emissionFactor.id}>{emissionFactor.label}</MenuItem>))}
                </Select>
            </FormControl>
        </Stack>
        <Stack className={classes.input}>
            <FormControl className={classes.form}>
                <Typography className={classes.label}>{props.annualConsumptionText}</Typography>
                <TextField
                    type='number'
                    InputProps={{
                        endAdornment: <InputAdornment position="end">{emission.emissionFactor.unit}</InputAdornment>,
                    }}
                    value={emission.value}
                    onChange={handleEmissionValueChange}
                />
            </FormControl>
        </Stack>
        <Stack className={classes.button} >
            <PrimaryButton disabled={props.saving || props.locked} onClick={() => emission.value > 0 && props.handleAddData(emission)}>
                {props.locked ? t('locked') : t('add')}
            </PrimaryButton>
        </Stack>
    </StyledInputData>
};
