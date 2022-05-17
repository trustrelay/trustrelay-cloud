import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button'; 
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle'; 
import { Checkbox, Link } from '@material-ui/core';
import LinkIcon from '@material-ui/icons/Link';
import { useTranslation } from 'react-i18next';

export default function JoinCommonDialog(
  {
    dataspace, 
    agreementTemplate,
    sendDetails
  }:{
    dataspace:string; 
    agreementTemplate:string;
    sendDetails: ()=> void; 
  }) {
    const { t } = useTranslation();
    
  const [open, setOpen] = React.useState(false);  
  const [acceptedAgreement, setAcceptedAgreement] = React.useState(false);


  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleContinue = () => {
    setOpen(false); 
    sendDetails()
  }
 
 
 

  const handleCheck = (e:any) => {
    setAcceptedAgreement(e.target.checked)
  }

  const disableContinueButton = () => {
    return (agreementTemplate!=null && !acceptedAgreement) 
  }


  useEffect(() => {
   
  },[acceptedAgreement])

 
  return (
    <div>
      <Button 
      sx={{width:"100%", padding:"15px"}}
      variant="contained"
      color="primary"
      endIcon={<LinkIcon />}
      onClick={handleClickOpen}>
        {t('labels.requestAccessToCommon')}
      </Button>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{t('labels.requestAccessToCommon')}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          {t('messages.pleaseFillIn')}
          </DialogContentText> 
          
          <Checkbox onChange={handleCheck} checked={acceptedAgreement} />{t('labels.accept')} <Link target="_blank" rel="noopener" underline="always" href={`/dataspaces/${dataspace}/template-agreements/${agreementTemplate}`}>Agreement</Link>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
          {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">
          {t('labels.requestAccessToCommon')}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}