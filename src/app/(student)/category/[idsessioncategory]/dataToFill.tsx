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
        }
    ];

    return dataToFill;
}
