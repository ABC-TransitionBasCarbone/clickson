export interface EmissionFactor {
    id: string;
    idEmissionSubCategorie?: number;
    idLanguage?: number;
    label: string;
    type?: string;
    unit?: string;
    value: number;
    uncertainty?: number;
}
