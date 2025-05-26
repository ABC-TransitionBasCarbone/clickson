export const prepareValueForTranslation = (value: string) => {
  let newValue

  newValue = value
    .toLowerCase()
    .replace(/\s+/g, '-')
    .replace(/\s/g, '')
    .replace(/-\([^)]*\)$/, '')

  return `${newValue}`
}
