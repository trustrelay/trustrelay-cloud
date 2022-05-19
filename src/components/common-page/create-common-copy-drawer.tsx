import React, { useState } from 'react';
import { Typography,  TextField, Button, InputLabel, Select, OutlinedInput, MenuItem, Drawer, Toolbar, Theme } from '@mui/material'; 
import { useTranslation } from 'react-i18next'; 
import { ServiceConnection } from '../../api/models/models';
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

const CreateCommonCopyDrawer = ({
  serviceConnections,
  open,
  handleClose,
  onAction
}: {
  serviceConnections: Array<ServiceConnection>;
  open: boolean;
  handleClose: () => void;
  onAction: (name: string, schema: string, frequency: string, storageType: string, serviceConnection:string) => void;
}) => {

  const { t } = useTranslation(); 

  const [name, setName] = React.useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [scanFrequency, setScanFrequency] = React.useState('');
  const [serviceConnection, setServiceConnection] = useState('');
  const [storageType, setStorageType] = useState('tabular-json');

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setName('');
    setScanFrequency('');
    setServiceConnection('');
    setStorageType('tabular-json');
    setSelectedSchema('');
    onAction(name, selectedSchema, scanFrequency, storageType, serviceConnection);
    handleClose()
  }

  const handleServiceConnectionChange = (e: any) => {
    setServiceConnection(e.target.value);
  }


  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleChange = (e: any) => {
    setName(e.target.value);
  }

  const disableContinueButton = () => {
    return (selectedSchema.length <= 0 || name.length <= 0 || scanFrequency.length <= 0)
  }


  const css = useStyles();


  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createCommonCopy')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.commonName')}
            onChange={handleChange}
            value={name}
            fullWidth
          />
          <br/><br/>
         
          <InputLabel id="common-type-label">{t('labels.serviceConnection')}</InputLabel>

          <Select
            labelId="connection-label"
            id="connection-select"
            value={serviceConnection}
            label={t('labels.serviceConnection')}
            input={<OutlinedInput label="Format" />}
            onChange={handleServiceConnectionChange}
          >

            {(serviceConnections && serviceConnections.length > 0) ? serviceConnections.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}

          </Select>
         
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createCommonCopy')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default CreateCommonCopyDrawer;