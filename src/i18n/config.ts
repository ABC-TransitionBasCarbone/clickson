export enum Locale {
  EN = 'en',
  FR = 'fr',
  ES = 'es',
  IT = 'it',
  GR = 'gr',
  HR = 'hr',
}

export type LocaleType =
  typeof Locale.EN |
  typeof Locale.FR |
  typeof Locale.ES |
  typeof Locale.IT |
  typeof Locale.GR |
  typeof Locale.HR

export const defaultLocale: LocaleType = Locale.FR
