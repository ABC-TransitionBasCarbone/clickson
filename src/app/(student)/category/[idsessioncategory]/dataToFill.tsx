import { DataToFill } from "@/src/types/DataToFill";
import { useTranslations } from 'next-intl'

export const useDataToFill = () => {
    const t = useTranslations('dataToFill');

    const dataToFill: DataToFill[] = [
        {
            id: 1,
            category: 'fuel',
            type: "table",
            titleSelectInput: t('kindOfFuel'),
            titleAnnualConsumptionInput: t('annualConsumption'),
            tableHeader: [t('typeOfFuel'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 2,
            category: 'electricity',
            type: "table",
            titleSelectInput: t('billOfTheMonth'),
            titleAnnualConsumptionInput: `${t('consumptionFromLatestBill')}`,
            tableHeader: [t('billOfTheMonth'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 3,
            category: 'advanced',
            type: "table",
            titleSelectInput: t('kindOfGas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 4,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            titleAnnualConsumptionInput: t('annualConsumption'),
            tableHeader: [t('typeOfFuel'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 5,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            titleAnnualConsumptionInput: t('annualConsumption'),
            tableHeader: [t('typeOfFuel'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 6,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            titleAnnualConsumptionInput: t('annualConsumption'),
            tableHeader: [t('typeOfFuel'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 7,
            category: 'school-buses',
            type: "table",
            titleSelectInput: t('billOfTheMonth'),
            titleAnnualConsumptionInput: `${t('consumptionFromLatestBill')}`,
            tableHeader: [t('billOfTheMonth'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 8,
            category: 'staff-travel',
            type: "table",
            titleSelectInput: t('personnelTravel'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 9,
            category: 'personnel-travel',
            type: "table",
            titleSelectInput: t('kindOfGas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 10,
            category: 'school-trips',
            type: "table",
            titleSelectInput: t('schoolTrips'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 11,
            category: 'furnitures',
            type: "input",
            titleSelectInput: t('kindOfFuel'),
            titleAnnualConsumptionInput: t('annualConsumption'),
            tableHeader: [t('typeOfFuel'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 12,
            category: 'supplies',
            type: "input",
            titleSelectInput: t('billOfTheMonth'),
            titleAnnualConsumptionInput: `${t('consumptionFromLatestBill')}`,
            tableHeader: [t('billOfTheMonth'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 13,
            category: 'equipment',
            type: "table",
            titleSelectInput: t('kindOfGas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]
        },
        {
            id: 14,
            category: 'building',
            type: "input",
            titleSelectInput: t('kindOfInfrastructure'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]

        },
        {
            id: 15,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEquipment'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('values'), t('emissionFactor'), t('uncertainty')]

        },
    ];

    return dataToFill;
}
