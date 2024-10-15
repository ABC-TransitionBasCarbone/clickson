'use client'

import { useTranslation } from "react-i18next";
import { DataToFill } from "../../types/DataToFill";

export const useDataToFill = () => {
    const { t } = useTranslation();

    const dataToFill: DataToFill[] = [
        {
            key: 'fuel',
            category: 'fuel',
            type: "table",
            options: [
                { title: t('abc-heating-oil'), value: "Heating oil" },
                { title: t('abc-heavy-fuel-oil'), value: "Heavy fuel oil" },
                { title: t('abc-natural-gas'), value: "Natural gas" },
                { title: t('abc-wood-pellets'), value: "Wood pellets (8% humidity)" },
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
            type: "table",
            options: [
                { title: t('abc-january'), value: "January" },
                { title: t('abc-february'), value: "February" },
                { title: t('abc-march'), value: "March" },
                { title: t('abc-april'), value: "April" },
                { title: t('abc-may'), value: "May" },
                { title: t('abc-june'), value: "June" },
                { title: t('abc-july'), value: "July" },
                { title: t('abc-august'), value: "August" },
                { title: t('abc-september'), value: "September" },
                { title: t('abc-october'), value: "October" },
                { title: t('abc-november'), value: "November" },
                { title: t('abc-december'), value: "December" },
            ],
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')} (kWh)`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')],
            description: t('abc-energy-electricity-description'),
        },
        {
            key:'advances',
            category: 'advanced',
            type: "table",
            options: [
                { title: t('abc-ch4'), value: "CH4" },
                { title: t('abc-c3h8'), value: "C3H8" },
                { title: t('abc-c4h10'), value: "C4H10" },
                { title: t('abc-n20'), value: "N20" },
                { title: t('abc-sf6'), value: "SF6" },
                { title: t('abc-nf3'), value: "NF3" },
            ],
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')} (kgCO2e/kg)`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')],
            description: t('abc-energy-advanced-description'),
        }
    ];

    return { dataToFill };
}
