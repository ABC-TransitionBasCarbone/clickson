import { DataToFill } from "@/src/types/DataToFill";
import { useTranslation } from "react-i18next";

export const useDataToFill = () => {
    const { t } = useTranslation();

    const dataToFill: DataToFill[] = [
        {
            id: 1,
            category: 'fuel',
            type: "table",
            titleSelectInput: t('abc-kind-of-fuel'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 2,
            category: 'electricity',
            type: "table",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 3,
            category: 'advanced',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 4,
            category: 'food',
            type: "table",
            titleSelectInput: t('abc-food-service'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 5,
            category: 'food',
            type: "table",
            titleSelectInput: t('abc-food-service'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 6,
            category: 'food',
            type: "table",
            titleSelectInput: t('abc-food-service'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 7,
            category: 'school-buses',
            type: "table",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 8,
            category: 'staff-travel',
            type: "table",
            titleSelectInput: t('abc-personnel-travel'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 9,
            category: 'personnel-travel',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 10,
            category: 'school-trips',
            type: "table",
            titleSelectInput: t('abc-school-trips'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 11,
            category: 'furnitures',
            type: "input",
            titleSelectInput: t('abc-kind-of-fuel'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 12,
            category: 'supplies',
            type: "input",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 13,
            category: 'equipment',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 14,
            category: 'building',
            type: "input",
            titleSelectInput: t('abc-kind-of-infrastructure'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]

        },
        {
            id: 15,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('abc-kind-of-equipment'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]

        },
    ];

    return dataToFill;
}
