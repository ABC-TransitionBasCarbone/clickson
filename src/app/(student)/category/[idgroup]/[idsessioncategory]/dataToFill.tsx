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
            tableHeader: [t('typeOfFuel'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 2,
            category: 'electricity',
            type: "calendar",
            titleSelectInput: t('billOfTheMonth'),
            titleAnnualConsumptionInput: `${t('consumptionFromLatestBill')}`,
            tableHeader: [t('billOfTheMonth'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 3,
            category: 'advanced',
            type: "table",
            titleSelectInput: t('kindOfGas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsenBurnerGas'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 4,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            tooltipText: t('foodTootlipText'),
            titleAnnualConsumptionInput: t('meals'),
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 5,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            titleAnnualConsumptionInput: t('meals'),
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 6,
            category: 'food',
            type: "table",
            titleSelectInput: t('foodService'),
            titleAnnualConsumptionInput: t('quantity'),
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 7,
            category: 'school-buses',
            type: "table",
            titleSelectInput: t('meanOfTravel'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 8,
            category: 'staff-travel',
            type: "table",
            titleSelectInput: t('meanOfTravel'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 9,
            category: 'personnelTravel',
            type: "table",
            titleSelectInput: t('meanOfTravel'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 10,
            category: 'schoolTrips',
            type: "table",
            titleSelectInput: t('schoolTrips'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 11,
            category: 'furnitures',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: t('quantity'),
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 12,
            category: 'supplies',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 13,
            category: 'equipment',
            type: "table",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]
        },
        {
            id: 14,
            category: 'building',
            type: "input",
            titleSelectInput: t('kindOfInfrastructure'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
        {
            id: 15,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
        {
            id: 16,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
        {
            id: 17,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
        {
            id: 18,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
        {
            id: 19,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kindOfEmissionFactor'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('emissionFactor'), t('quantity'), t('value'), t('uncertainty'), t('total')]

        },
    ];

    return dataToFill;
}
