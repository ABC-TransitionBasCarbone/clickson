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
            id: 9,
            category: 'electricity',
            type: "table",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 17,
            category: 'advanced',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 25,
            category: 'paper',
            type: "table",
            titleSelectInput: t('abc-kind-of-paper'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 33,
            category: 'plastic',
            type: "table",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 41,
            category: 'organic',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 49,
            category: 'electronic',
            type: "table",
            titleSelectInput: t('abc-kind-of-fuel'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 57,
            category: 'buses',
            type: "table",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 65,
            category: 'vehicules',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 77,
            category: 'furnitures',
            type: "input",
            titleSelectInput: t('abc-kind-of-fuel'),
            titleAnnualConsumptionInput: t('abc-annual-consumption'),
            tableHeader: [t('abc-type-of-fuel'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 85,
            category: 'supplies',
            type: "input",
            titleSelectInput: t('abc-bill-of-the-month'),
            titleAnnualConsumptionInput: `${t('abc-consumption-from-latest-bill')}`,
            tableHeader: [t('abc-bill-of-the-month'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 93,
            category: 'equipment',
            type: "table",
            titleSelectInput: t('abc-kind-of-gas'),
            titleAnnualConsumptionInput: `${t('abc-quantity')}`,
            tableHeader: [t('abc-bunsen-burner-gas'), t('abc-values'), t('abc-emission-factor'), t('abc-uncertainty')]
        },
        {
            id: 101,
            category: 'personnel-travel',
            type: "input",
            titleSelectInput: t('abc-personnel-travel')
        },
        {
            id: 109,
            category: 'school-trips',
            type: "input",
            titleSelectInput: t('abc-school-trips')
        },
        {
            id: 117,
            category: 'building',
            type: "input",
            titleSelectInput: t('abc-kind-of-infrastructure')
        },
        {
            id: 125,
            category: 'equipment',
            type: "input",
            titleSelectInput: t('abc-kind-of-equipment')
        },
    ];

    return dataToFill;
}
