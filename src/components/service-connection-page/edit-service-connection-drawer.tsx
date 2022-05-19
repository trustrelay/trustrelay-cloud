import React, { useState } from 'react';
import { Typography, Button,  TextField, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import { ServiceConnection  } from '../../api/models/models';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '350px',
    flexGrow: 1,
  },
  topnav: {
    height: "3em",
    paddingLeft: "0em"
  },
  innernav: {
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "0",
    marginBottom: "0"
  },
  drawerContainer: {
    width: "350px",
    padding: "0em 1em 1em 1em",
    backgroundColor: "transparent"
  },
}));

const EditServiceConnectionDrawer = ({
  serviceConnection,
  open,
  handleClose,
  onAction
}: {
  serviceConnection: ServiceConnection;
  open: boolean;
  handleClose: () => void;
  onAction: () => void;
}) => {

  const { t } = useTranslation(); 


  const [serviceConnectionName, setServiceConnectionName] = useState(serviceConnection.name); 

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setServiceConnectionName(serviceConnection.name);
   
    onAction();
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleServiceConnectionNameChange = (e: any) => {
    setServiceConnectionName(e.target.value)
  }
 

  const disableContinueButton = () => {
    return (serviceConnectionName.length <= 0)

  }
 
  const css = useStyles();
 
  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.editServiceConnection')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.serviceConnectionName')}
            onChange={handleServiceConnectionNameChange}
            value={serviceConnectionName}
            fullWidth
          />
          
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.editServiceConnection')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default EditServiceConnectionDrawer;