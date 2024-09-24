'use client'

import { useTranslation } from "react-i18next";
import { DataToFill } from "../types/DataType";

export const useDataToFill = () => {
    const { t } = useTranslation();

    const dataToFill: DataToFill[] = [
        {
            key: 'fuel',
            category: 'fuel',
            options: [
                new Option(t('abc-heating-oil'), "Heating oil"),
                new Option(t('abc-heavy-fuel-oil'),  "Heavy fuel oil"),
                new Option(t('abc-natural-gas'), "Natural gas"),
                new Option(t('abc-wood-pellets'), "Wood pellets (8% humidity)")
            ],
            titleSelectInput: t('abc-kind-of-fuel'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')],
            description: t('abc-energy-fuel-description'),
            units: new Map<string, string>([
                ["Heating oil", "kWh LHV"],
                ["Heavy fuel oil", "kgCO2e/kWh net heating value"],
                ["Natural gas", "kgCO2e/kWh gross heating value"],
                ["Wood pellets (8% humidity)", "kgCO2e/kWh net heating value"],
            ]),
        },
        {
            key:'electricity',
            category: 'electricity',
            options: [
                new Option(t('abc-january'), "January"),
                new Option(t('abc-february'), "February"),
                new Option(t('abc-march'), "March"),
                new Option(t('abc-april'), "April"),
                new Option(t('abc-may'), "May"),
                new Option(t('abc-june'), "June"),
                new Option(t('abc-july'), "July"),
                new Option(t('abc-august'), "August"),
                new Option(t('abc-september'), "September"),
                new Option(t('abc-october'), "October"),
                new Option(t('abc-november'), "November"),
                new Option(t('abc-december'), "December")
            ],
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')} (kWh)`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')],
            description: t('abc-energy-electricity-description'),
        },
        {
            key:'advances',
            category: 'advanced',
            options: [
                new Option(t('abc-ch4'), "CH4"),
                new Option(t('abc-c3h8'), "C3H8"),
                new Option(t('abc-c4h10'), "C4H10"),
                new Option(t('abc-n20'), "N20"),
                new Option(t('abc-sf6'), "SF6"),
                new Option(t('abc-nf3'), "NF3")
            ],
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')} (kgCO2e/kg)`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')],
            description: t('abc-energy-advanced-description'),
        }
    ];

    return { dataToFill };
}