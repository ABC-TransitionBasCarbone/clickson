
import TextField from '@mui/material/TextField';


// TODO On click send new password
// TODO get token

export default function ResetPassword() {
  return <>

    <TextField
      id="filled-password-input"
      label="Password"
      type="password"
      autoComplete="current-password"
      variant="filled"
    />
    
    </>;
}