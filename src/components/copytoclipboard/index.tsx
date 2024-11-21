import { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { Alert, Button, Tooltip } from '@mui/material';

interface CopyToClipboardProps {
    shortUrl: string;
}

export default function CopyToClipboard(props: CopyToClipboardProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(window.location.host + "/dashboard/" + props.shortUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <Tooltip title="Copy the link to share acccess with the group">
            <Button onClick={() => handleCopy()} >
                {copied && <Alert severity="success" />}
                <ContentCopyIcon />
                {props.shortUrl}
            </Button>
        </Tooltip>);
}
