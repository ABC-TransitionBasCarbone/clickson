'use server'

import xlsx from 'node-xlsx'

export const prepareExcel = async (
  data: {
    name: string
    data: (string | number)[][]
    options: object
  }[],
) => {
  const buffer = xlsx.build(data)
  return buffer
}
