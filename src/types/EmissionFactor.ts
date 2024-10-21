export interface EmissionFactor {
    id: number;
    id_emission_sub_categorie?: number;
    id_language?: number;
    label: string;
    type?: string;
    unit?: string;
    value: number | string;
    uncertainty?: number;
}
