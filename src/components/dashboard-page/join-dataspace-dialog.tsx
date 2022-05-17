import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import LinkIcon from '@material-ui/icons/Link';
import { useTranslation } from 'react-i18next';

export default function JoinDataspaceDialog(
  { 
    onAction
  }:{ 
    onAction: (agentName:string)=> void;
  }) {
    const { t } = useTranslation();
    
  const [open, setOpen] = React.useState(false); 
  const [agentName, setAgentName] = React.useState('');  

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false); 
    onAction(agentName)
  }
 

  const handleAgentNameChange = (e:any) => {
    setAgentName(e.target.value);
  }

  const disableContinueButton = () => {
    return ( agentName.length<=0) 
  }


  useEffect(() => {
    
  },[])
 

  return (
    <div>
 

      <Button
       sx={{width:"100%", padding:"15px"}}
                    variant="contained"
                    color="primary"
                    endIcon={<LinkIcon />}
                    onClick={handleClickOpen}
                >
                    {t('labels.join')}
                </Button>
                
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('messages.pleaseFillIn')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t('messages.pleaseFillIn')}
          </DialogContentText>
       
           <TextField
            autoFocus
            autoComplete="off" 
            margin="dense"
            id="agentName"
            label={t('labels.agentName')}
            onChange={handleAgentNameChange}
            value={agentName}
            fullWidth
          /> 
           </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">
          {t('labels.join')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}