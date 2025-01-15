export interface EmissionFactor {
    id: string;
    idEmissionSubCategory?: number;
    idLanguage?: number;
    label: string;
    type?: string;
    unit?: string;
    value: number;
    uncertainty?: number;
    depreciationPeriod?: number;
}
