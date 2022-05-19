import React, { useState } from 'react';
import { Typography, TextField, Button, InputLabel, Input, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { ServiceConnection } from '../../api/models/models';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
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
  toggleGroup: {
    marginTop: "10px"
  },
  tabImage: {
    height: "40px",
    width: "40px"
  },
  toggleButtonImg: {
    height: "45px",
    width: "45px"
  }
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
  onAction: (
    serviceConnectionId: string,
    serviceConnectionName: string,
    hostOrService: string,
    hostPort: string,
    storageLocation: string,
    databaseOrContainer: string,
    accountOrUserOrId: string,
    secret: string
  ) => void;
}) => {



  const { t } = useTranslation();
  const css = useStyles();

  const [serviceConnectionName, setServiceConnectionName] = useState(serviceConnection.name);
  const [storageLocation, setStorageLocation] = useState(serviceConnection.storageLocation);
  const [hostOrService, setHostOrService] = useState(serviceConnection.hostOrService);
  const [hostPort, setHostPort] = useState(serviceConnection.hostPort);
  const [databaseOrContainer, setDatabaseOrContainer] = useState(serviceConnection.databaseOrContainer);
  const [accountOrUserOrId, setAccountOrUserOrId] = useState(serviceConnection.accountOrUserOrId);
  const [secret, setSecret] = useState('');

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setServiceConnectionName(serviceConnection.name);
    onAction(serviceConnection.id,
      serviceConnectionName,
      storageLocation,
      hostOrService,
      hostPort,
      databaseOrContainer,
      accountOrUserOrId,
      secret
    )
    handleClose()
  }



  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleServiceConnectionNameChange = (e: any) => {
    setServiceConnectionName(e.target.value);
  }


  const disableContinueButton = () => {
    return serviceConnectionName.length <= 0
  }



  const handleStorageLocationChange = (e: any) => {
    setStorageLocation(e.target.value);
  }

  const handleHostOrServiceChange = (e: any) => {
    setHostOrService(e.target.value);
  }

  const handleHostPortChange = (e: any) => {
    setHostPort(e.target.value);
  }

  const handleDatabaseOrContainerChange = (e: any) => {
    setDatabaseOrContainer(e.target.value);
  }

  const handleAccountOrUserOrIdChange = (e: any) => {
    setAccountOrUserOrId(e.target.value);
  }

  const handleSecretChange = (e: any) => {
    setSecret(e.target.value);
  }



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
            id="serviceConnectionName"
            label={t('labels.serviceConnectionName')}
            onChange={handleServiceConnectionNameChange}
            value={serviceConnectionName}
            fullWidth
          />
          <br /><br />
          <TextField
            autoComplete="off"
            margin="dense"
            id="hostOrService"
            label={t('labels.hostOrService')}
            onChange={handleHostOrServiceChange}
            value={hostOrService}
            fullWidth
          />



          <br /><br />
          <InputLabel id="hostPort-label">{t('labels.hostPort')}</InputLabel>

          <Input
            type="number"
            autoComplete="off"
            margin="dense"
            rows={1}
            id="hostPort"
            onChange={handleHostPortChange}
            value={hostPort}
            fullWidth
          />
          <br /><br />

          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="storageLocation"
            label={t('labels.storageLocation')}
            onChange={handleStorageLocationChange}
            value={storageLocation}
            fullWidth
          />
          <br /> <br />
          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="databaseOrContainer"
            label={t('labels.databaseOrContainer')}
            onChange={handleDatabaseOrContainerChange}
            value={databaseOrContainer}
            fullWidth
          />

          <br /> <br />
          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="accountOrUserOrId"
            label={t('labels.accountOrUserOrId')}
            onChange={handleAccountOrUserOrIdChange}
            value={accountOrUserOrId}
            fullWidth
          />

          <br /> <br />
          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="secret"
            type="password"
            label={t('labels.secretHint')}
            onChange={handleSecretChange}
            value={secret}
            fullWidth
          />

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