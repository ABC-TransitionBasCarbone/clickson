'use client'

export const fetchExportFile = async () => {
    try {
        const res = await fetch('/clickson.xlsx')
        if (!res.ok) {
            console.error('File not found or error fetching:', res.status)
            return undefined
        }
        const contentType = res.headers.get('content-type')
        if (!contentType || !contentType.includes('application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')) {
            console.error('Invalid file type:', contentType)
            return undefined
        }
        const arrayBuffer = await res.arrayBuffer()
        return arrayBuffer
    } catch (error) {
        console.error('Error fetching file:', error)
        return undefined
    }
}
