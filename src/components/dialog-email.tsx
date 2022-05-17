import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from '@material-ui/core';
import React, { useState } from 'react';

export default function EmailDialog({
open,
handleClose,
title,
dialogText,
handleContinue
}:{
open:boolean,
handleClose:()=>void,
title:string,
dialogText:string,
handleContinue:(email:string)=>void
}) {


const [email, setEmail] = useState('')

return(
    <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
    <DialogTitle id="form-dialog-title">{title}</DialogTitle>
    <DialogContent>
      <DialogContentText>
        {dialogText}
      </DialogContentText>
      <TextField
        autoFocus
        margin="dense"
        id="name"
        label="Email Address"
        type="email"
        value={email}
        onChange={(props) => setEmail(props.target.value)}
        fullWidth
      />
    </DialogContent>
    <DialogActions>
      <Button onClick={handleClose} color="primary">
        Cancel
      </Button>
      <Button onClick={()=> handleContinue(email)} color="primary">
        Continue
      </Button>
    </DialogActions>
  </Dialog>
)
}
