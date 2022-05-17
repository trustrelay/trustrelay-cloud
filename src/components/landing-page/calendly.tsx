import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import Calendly from '../calendly';
import { useTranslation } from 'react-i18next';
import { Height } from '@material-ui/icons';

export default function CalendlyDialog(
  {
    title, 
    dialog,
    variant="contained",
    primaryColor=true,
    url
  }:{
    title:string;
    dialog:string;
    variant?:string;
    primaryColor?:boolean;
    url:string
  }) {

    const { t } = useTranslation();

    
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
 
 

  return (
    <div >
      <Button variant={variant=="outlined"?"outlined": "contained"} color={primaryColor?"primary":"secondary"} onClick={handleClickOpen}>
        {title}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
        <DialogTitle id="form-dialog-title">{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {dialog}
          </DialogContentText> 
           <Calendly url={url} minWidth={300} height={450} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            {t('labels.close')}
          </Button> 
        </DialogActions>
      </Dialog>
    </div>
  );
}