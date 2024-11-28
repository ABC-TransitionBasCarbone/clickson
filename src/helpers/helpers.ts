"use client"

export const convertToPercentage = (data: number[]) => {
    const threshold = 0;

    const total = data.reduce((sum, value) => sum + value, 0);
    return data
        .map(value => (value / total) * 100)
        .filter(value => value >= threshold);
}

export const toLocaleString = (value: number) => {
    return Number(value).toLocaleString();
}
