import React, { useState } from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SasInfo, ServiceConnection } from '../../api/models/models';
import ModelUploader from '../uploader-model';
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
}));

const CheckSlaDrawer = ({
  serviceConnections,
  open,
  handleClose,
  onAction
}: {
  serviceConnections: Array<ServiceConnection>;
  open: boolean;
  handleClose: () => void;
  onAction: (name: string, schema: string, frequency: string, storageType: string, serviceConnection: string) => void;
}) => {

  const { t } = useTranslation();

  const [name, setName] = React.useState('');
  const [selectedSchema, setSelectedSchema] = useState('');
  const [scanFrequency, setScanFrequency] = React.useState('');
  const [serviceConnection, setServiceConnection] = useState('');
  const [storageType, setStorageType] = useState('tabular-json');

  const defaultSasInfo: SasInfo = {
    sas: '',
    account: '',
    blobEndpoint: '',
    queueEndpoint: '',
    tableEndpoint: '',
    fileEndpoint: '',
    id: '',
    path: '',
    container: ''
  }

  const [sasInfo, setSasInfo] = useState(defaultSasInfo);
  const defaultFile: File = new File([""], "filename");
  const [file, setFile] = useState(defaultFile)

  const [fileUploaded, setFileUploaded] = useState(false);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [customFileSize, setCustomFileSize] = useState(0);
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [datasetPath, setDatasetPath] = useState('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [datasetName, setDatasetName] = useState('');
// eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [datasetDescription, setDatasetDescription] = useState('');

  const [uploading, setUploading] = useState(false);




  const resetToUploadAgain = () => {
    setSasInfo(defaultSasInfo);
    setFile(defaultFile);
    setFileUploaded(false);
    setDatasetPath('');
    setCustomFileSize(0);
    setDatasetName('');
    setUploading(false);
    setDatasetDescription('')
  }


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

        <Typography variant="h5">{t('labels.checkSla')}</Typography>
      </Toolbar>

       <div className={css.drawerContainer}>
       {/* <form>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.runName')}
            onChange={handleChange}
            value={name}
            fullWidth
          /> */}
          {/* <br/><br/> 
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

          </Select> */}
          <br /><br />
          {/* <ModelUploader
            jwt=""
            sasInfo={sasInfo}
            setSasInfo={setSasInfo}
            file={file}
            setFile={setFile}
            setUploading={setUploading}
            uploading={uploading}
            setCustomFileSize={setCustomFileSize}
            resetToUploadAgain={resetToUploadAgain}
            setFileUploaded={setFileUploaded}
            fileUploaded={fileUploaded}
          />

          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.checkSchema')}

          </Button>
        </form> */}
      </div>
    </Drawer>
  )
}

export default CheckSlaDrawer;