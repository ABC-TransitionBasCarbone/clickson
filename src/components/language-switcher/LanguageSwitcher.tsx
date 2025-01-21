import { useLocale } from 'next-intl';
import LocaleSwitcherSelect from './LocaleSwitcherSelect';
import { Link, routing } from '@/src/i18n/routing';
import Image from "next/image";
import { switchLocale } from '@/src/i18n/locale';
import { LocaleType } from '@/src/i18n/config';

export default function LocaleSwitcher() {
    const locale = useLocale();

    return (
        <LocaleSwitcherSelect defaultValue={locale} >
            {routing.locales.map((code) => (
                <Link
                    key={code}
                    href="/"
                    onClick={(e) => { e.preventDefault(); switchLocale(code as LocaleType); }}
                    style={{ display: 'inline-block', paddingLeft: '5px', marginTop: '2px', marginBottom: '1px' }}
                >
                    <Image
                        src={`https://flagcdn.com/h20/${code}.png`}
                        alt={code}
                        width={17}
                        height={11}
                    />
                </Link>
            ))}
        </LocaleSwitcherSelect >
    );
}
