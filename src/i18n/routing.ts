import { createNavigation } from 'next-intl/navigation'
import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['fr', 'gb', 'es', 'it', 'gr', 'hr', 'hu', 'ro'],
  defaultLocale: 'fr',
})

export const { Link, getPathname, redirect, usePathname, useRouter } = createNavigation(routing)
