import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import { Box } from '@material-ui/core';

export default function LearMoreDialog(
  {
    title, 
    dialog,
    inputName,
    variant="contained",
    primaryColor=true,
    sendDetails
  }:{
    title:string;
    dialog:string;
    inputName:string;
    variant?:string;
    primaryColor?:boolean;
    sendDetails: (input:string)=> void;
  }) {
  const [open, setOpen] = React.useState(false);
  const [input, setInput] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    
    sendDetails(input);
    setInput('')
    setOpen(false); 
    // alert('you can close now this window')
  }

  const handleChange = (e:any) => {
    setInput(e.target.value);
  } 

  return (
    <Box style={{width:"100%"}}>
      <Button variant={variant=="outlined"?"outlined": "contained"} color={primaryColor?"primary":"secondary"} onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialog}
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label={inputName}
            onChange={handleChange}
            autoComplete="off"
            value={input}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleClose} color="secondary">
            Close
          </Button>
          <Button onClick={handleContinue} color="primary">
            {title}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}