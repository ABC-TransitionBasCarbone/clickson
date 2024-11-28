'use server'

import { cookies as getCookies } from 'next/headers'
import { LocaleType, defaultLocale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = async (): Promise<LocaleType> => {
  const cookies = getCookies()
  return (cookies.get(COOKIE_NAME)?.value as LocaleType) || defaultLocale
}

export const switchLocale = async (value: LocaleType) => {
  const cookies = getCookies()
  cookies.set(COOKIE_NAME, value)
}
