import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['fr', 'gb', 'es', 'it', 'gr', 'hr', 'hu', 'ro'],
  defaultLocale: 'fr',
  pathnames: {
    '/': '/',
    '/pathnames': {
      gb: '/pathnames',
      fr: '/pfadnamen',
      es: '/nombres-de-ruta',
      it: '/nomi-percorso',
      gr: '/ονόματα-διαδρομής',
      hr: '/imena-putanja',
      hu: '/útvonalnevek',
      ro: '/nume-de-traseu'
    }
  }
});

export type Pathnames = keyof typeof routing.pathnames;
export type Locale = (typeof routing.locales)[number];

export const { Link, getPathname, redirect, usePathname, useRouter } =
  createNavigation(routing);
