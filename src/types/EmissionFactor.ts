export interface EmissionFactor {
    id: number;
    idEmissionSubCategorie?: number;
    idLanguage?: number;
    label: string;
    type?: string;
    unit?: string;
    value: number;
    uncertainty?: number;
}
