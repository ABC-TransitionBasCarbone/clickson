
import { useState } from "react";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';

export default function ConfirmationDialog(props:any) {
  //local states
  const [open, setOpen] = useState(false);

  const showDialog = () => {
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
  };

  const confirmRequest = () => {
    props.response();
    hideDialog();
  };

  return (<>
  
  {props.children(showDialog)}
      {open && (
        <Dialog
          open={open}
          keepMounted={true}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {props.description}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={hideDialog} color="primary">
              Non
            </Button>
            <Button onClick={confirmRequest} color="secondary">
              Oui
            </Button>
          </DialogActions>
        </Dialog>
      )}
  </>)
}
