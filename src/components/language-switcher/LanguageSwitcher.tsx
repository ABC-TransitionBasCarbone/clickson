import { LocaleType } from '@/i18n/config'
import { switchLocale } from '@/i18n/locale'
import { Link, routing } from '@/i18n/routing'
import Image from 'next/image'
import LocaleSwitcherSelect from './LocaleSwitcherSelect'

export default function LocaleSwitcher() {
  return (
    <LocaleSwitcherSelect>
      {routing.locales.map((code) => (
        <Link
          key={code}
          href="/"
          onClick={(e) => {
            e.preventDefault()
            switchLocale(code as LocaleType)
          }}
          style={{ display: 'inline-block', paddingLeft: '5px', marginTop: '2px', marginBottom: '1px' }}
        >
          <Image src={`https://flagcdn.com/h20/${code}.png`} alt={code} width={17} height={11} />
        </Link>
      ))}
    </LocaleSwitcherSelect>
  )
}
