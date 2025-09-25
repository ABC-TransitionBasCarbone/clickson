'use server'

import fs, { readFileSync } from 'fs'
import { join } from 'path'

export const fetchExportFile = async () => {
  const filePath = join(process.cwd(), '/public', 'clickson.xlsx')
  try {
    if (!fs.existsSync(filePath)) {
      console.error('File not found: ', filePath)
    }
    const buffer = Buffer.from(readFileSync(filePath))
    return buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength)
  } catch (error) {
    console.error('Error reading file: ', error)
  }
}
