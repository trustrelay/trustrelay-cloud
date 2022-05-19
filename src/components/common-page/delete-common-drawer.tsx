import React, { useState } from 'react';
import { Typography,  Button, InputLabel, TextField, FormControlLabel, Checkbox, Drawer, Toolbar, Theme } from '@mui/material';  
import { Common } from '../../api/models/models';
import { makeStyles  } from '@mui/styles';
import { useTranslation } from 'react-i18next';

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


const DeleteCommonDrawer = ({
  common,
  open,
  handleClose,
  onAction
}: {
  common: Common;
  open: boolean;
  handleClose: () => void;
  onAction: (deleteServiceConnection: boolean) => void;
}) => {

  const { t } = useTranslation(); 

  const [commonName, setCommonName] = useState('');

  const [deleteServiceConnection, setDeleteServiceConnection] = useState(false)


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCommonName('');
    setDeleteServiceConnection(false);
    onAction(deleteServiceConnection);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleCommonNameChange = (e: any) => {
    setCommonName(e.target.value)
  }

  const handleDeleteServiceConnectionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteServiceConnection(event.target.checked);
  }

  const disableContinueButton = () => {
    return (common.name !== commonName)

  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.deleteCommon')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <InputLabel>Type {common.name} <br />{t('messages.toConfirmDeletion')}</InputLabel>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.commonName')}
            onChange={handleCommonNameChange}
            value={commonName}
            fullWidth
          />
             <br /><br />
          {(common.serviceConnectionId.length>0)?  <FormControlLabel
            control={
              <Checkbox
                checked={deleteServiceConnection}
                onChange={handleDeleteServiceConnectionChange}
                name="delete-service-connection"
                color="primary"
              />
            }
            label="Delete service connection?"
          /> : <></>}
       
       <br /><br />
          
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.deleteCommon')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default DeleteCommonDrawer;