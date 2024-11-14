export interface EmissionFactor {
    id: number;
    id_emission_sub_categorie?: number;
    id_language?: number;
    label: string;
    emissionTypes?: { label: string };
    emissionUnits?: { label: string };
    value: number | string;
    uncertainty?: number;
}
