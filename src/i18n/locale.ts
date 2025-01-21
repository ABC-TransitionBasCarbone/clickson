'use server'

import { cookies as getCookies } from 'next/headers'
import { LocaleType, defaultLocale } from './config'

const COOKIE_NAME = 'NEXT_LOCALE'

export const getLocale = async (): Promise<LocaleType> => {
  const cookies = getCookies()
  return (cookies.get(COOKIE_NAME)?.value as LocaleType) || defaultLocale
}

export const switchLocale = async (value: LocaleType) => {
  console.log('switchLocale', value)
  const cookies = getCookies()
  console.log('cookies', cookies)
  cookies.set(COOKIE_NAME, value)
}
