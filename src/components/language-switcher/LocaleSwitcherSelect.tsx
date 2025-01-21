'use client';

import { Locale } from '@/src/i18n/config';
import { styled } from '@mui/system';
import clsx from 'clsx';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ChangeEvent, ReactNode, useTransition } from 'react';

type Props = {
  children: ReactNode;
  defaultValue: string;
};

const LanguageMenu = styled('select')(({ theme }) => ({
  option: {
    display: "inline-block",
    paddingLeft: theme.spacing(1),
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(1),
  },
}));

export default function LocaleSwitcherSelect({
  children,
}: Props) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  return (
    <label
      className={clsx(
        'relative text-gray-400',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      {children}
    </label>
  );
}
