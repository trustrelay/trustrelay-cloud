import React, { useContext, useState } from 'react';
import { Typography, makeStyles, TextField, Button, InputLabel, Select, OutlinedInput, MenuItem, Slider } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import TreeView from '@material-ui/lab/TreeView';
import TreeItem from '@material-ui/lab/TreeItem';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ServiceConnection } from '../../api/models/models';

const CreateSynthenticCopyDrawer = ({
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
  let history = useHistory();


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

 
  const useStyles = makeStyles({
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

  })

  const css = useStyles();

  function valuetext(value: number) {
    return `ε${value}`;
  }

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createSynthenticCopy')}</Typography>
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
 <InputLabel id="epsilon-label">{t('labels.epsilon')}</InputLabel>
<Slider
  defaultValue={0.1}
  getAriaValueText={valuetext}
  aria-labelledby="epsilon"
  step={0.01}
  marks
  min={0}
  max={1}
  valueLabelDisplay="auto"
/>
            <br /> <br />
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

            {t('labels.createSynthenticCopy')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default CreateSynthenticCopyDrawer;