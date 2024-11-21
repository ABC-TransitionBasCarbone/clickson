import { DataToFill } from "@/src/types/DataToFill";
import { useTranslation } from "react-i18next";

export const useDataToFill = () => {
    const { t } = useTranslation();

    const dataToFill: DataToFill[] = [
        {
            id: 1,
            category: 'fuel',
            type: "table",
            titleSelectInput: t('kind-of-fuel'),
            titleAnnualConsumptionInput: t('annual-consumption'),
            tableHeader: [t('type-of-fuel'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 2,
            category: 'electricity',
            type: "table",
            titleSelectInput: t('bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('consumption-from-latest-bill')}`,
            tableHeader: [t('bill-of-the-month'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 3,
            category: 'advanced',
            type: "table",
            titleSelectInput: t('kind-of-gas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 4,
            category: 'food',
            type: "table",
            titleSelectInput: t('food-service'),
            titleAnnualConsumptionInput: t('annual-consumption'),
            tableHeader: [t('type-of-fuel'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 5,
            category: 'food',
            type: "table",
            titleSelectInput: t('food-service'),
            titleAnnualConsumptionInput: t('annual-consumption'),
            tableHeader: [t('type-of-fuel'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 6,
            category: 'food',
            type: "table",
            titleSelectInput: t('food-service'),
            titleAnnualConsumptionInput: t('annual-consumption'),
            tableHeader: [t('type-of-fuel'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 7,
            category: 'school-buses',
            type: "table",
            titleSelectInput: t('bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('consumption-from-latest-bill')}`,
            tableHeader: [t('bill-of-the-month'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 8,
            category: 'staff-travel',
            type: "table",
            titleSelectInput: t('personnel-travel'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 9,
            category: 'personnel-travel',
            type: "table",
            titleSelectInput: t('kind-of-gas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 10,
            category: 'school-trips',
            type: "table",
            titleSelectInput: t('school-trips'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 11,
            category: 'furnitures',
            type: "input",
            titleSelectInput: t('kind-of-fuel'),
            titleAnnualConsumptionInput: t('annual-consumption'),
            tableHeader: [t('type-of-fuel'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 12,
            category: 'supplies',
            type: "input",
            titleSelectInput: t('bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('consumption-from-latest-bill')}`,
            tableHeader: [t('bill-of-the-month'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 13,
            category: 'equipment',
            type: "table",
            titleSelectInput: t('kind-of-gas'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]
        },
        {
            id: 14,
            category: 'building',
            type: "input",
            titleSelectInput: t('kind-of-infrastructure'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]

        },
        {
            id: 15,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('kind-of-equipment'),
            titleAnnualConsumptionInput: `${t('quantity')}`,
            tableHeader: [t('bunsen-burner-gas'), t('values'), t('emission-factor'), t('uncertainty')]

        },
    ];

    return dataToFill;
}
