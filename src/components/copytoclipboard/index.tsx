import ContentCopyIcon from '@mui/icons-material/ContentCopy'
import { Alert, Button, Tooltip } from '@mui/material'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface CopyToClipboardProps {
  shortUrl: string
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
  const [copied, setCopied] = useState(false)
  const t = useTranslations('session')

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.host + '/dashboard/' + props.shortUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy text: ', err)
    }
  }

  return (
    <Tooltip title={t('copy')}>
      <Button onClick={() => handleCopy()}>
        {copied && <Alert severity="success" />}
        <ContentCopyIcon />
      </Button>
    </Tooltip>
  )
}
