const file = require('../models/FE/Base_Carbone_V23.3_UTF8.csv') as FE[]

/**
 * TODO check if i have multiple data ? Do i have to do a average ?
 * @param category 
 * @returns Number of Total poste non décomposé
 */
export function getEmissionFactor(category: string) {
    return Number(file.filter(j =>
        j.statutdellment.toLowerCase() !== "archivé"
        && j.nombasefranais.toLowerCase().includes(category))[0]?.totalpostenondcompos)
}

/**
 * TODO check if i have multiple data ? Do i have to do a average ?
 * @param category 
 * @returns Number of incertitude
 */
export function getIncertitude(category: string) {
    return Number(file.filter(j =>
        j.statutdellment.toLowerCase() !== "archivé"
        && j.nombasefranais.toLowerCase().includes(category))[0]?.incertitude)
}
