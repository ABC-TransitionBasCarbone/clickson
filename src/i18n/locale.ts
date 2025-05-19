'use server'

import { cookies as getCookies } from 'next/headers'
import { LocaleType, defaultLocale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = async (): Promise<LocaleType> => {
  const cookies = getCookies()
  return ((await cookies).get(COOKIE_NAME)?.value as LocaleType) || defaultLocale
}

export const switchLocale = async (value: LocaleType) => {
  const cookies = getCookies()
  ;(await cookies).set(COOKIE_NAME, value)
}
