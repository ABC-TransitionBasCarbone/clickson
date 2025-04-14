'use client';

import clsx from 'clsx';
import { ReactNode, useTransition } from 'react';

type Props = {
  children: ReactNode;
};

export default function LocaleSwitcherSelect({
  children,
}: Props) {
  const [isPending] = useTransition();

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
