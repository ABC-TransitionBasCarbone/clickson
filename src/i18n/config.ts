export enum Locale {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  IT = 'it',
  GR = 'gr',
  HR = 'hr',
  HU = 'hu',
  RO = 'ro',
}

export type LocaleType =
  typeof Locale.EN |
  typeof Locale.FR |
  typeof Locale.ES |
  typeof Locale.IT |
  typeof Locale.GR |
  typeof Locale.HR |
  typeof Locale.HU |
  typeof Locale.RO

export const defaultLocale: LocaleType = Locale.FR
