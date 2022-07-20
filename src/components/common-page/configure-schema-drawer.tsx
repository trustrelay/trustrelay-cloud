import React, { useState } from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Common, SasInfo, ServiceConnection } from '../../api/models/models';
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

const ConfigureSchemaDrawer = ({
    common,
    open,
    handleClose,
    onAction
}: {
    common: Common;
    open: boolean;
    handleClose: () => void;
    onAction: any;
}) => {

    const { t } = useTranslation();

    const [schemaUrl, setSchemaUrl] = React.useState<string>('');
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




    // const resetToUploadAgain = () => {
    //     setSasInfo(defaultSasInfo);
    //     setFile(defaultFile);
    //     setFileUploaded(false);
    //     setDatasetPath('');
    //     setCustomFileSize(0);
    //     setDatasetName('');
    //     setUploading(false);
    //     setDatasetDescription('')
    // }


    const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSchemaUrl('');
        onAction(common.id, schemaUrl);
        handleClose()
    }


    const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        handleClose();
    }

    const handleChange = (e: any) => {
        setSchemaUrl(e.target.value);
    }

    function isValidHttpUrl(testUrl: string) {
        let url;
        try {
            url = new URL(testUrl);
        } catch (_) {
            return false;
        }
        return url.protocol === "http:" || url.protocol === "https:";
    }

    const disableContinueButton = () => {
        return !isValidHttpUrl(schemaUrl)
    };


    const css = useStyles();


    return (
        <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

            <Toolbar className={css.innernav}>

                <Typography variant="h5">{t('labels.configureSchema')}</Typography>
            </Toolbar>

            <div className={css.drawerContainer}>
                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    label={t('labels.url')}
                    onChange={handleChange}
                    value={schemaUrl}
                    fullWidth
                />
                <br /><br />
                <Button onClick={handleCancel} color="primary">
                    {t('labels.cancel')}
                </Button>
                <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">
                    {t('labels.configureSchema')}
                </Button>
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

            {t('labels.configureSchema')}

          </Button>
        </form> */}
            </div>
        </Drawer>
    )
}

export default ConfigureSchemaDrawer;