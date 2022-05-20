import { ChangeEvent, useEffect, useState } from 'react';
import { SasInfo } from '../api/models/models';
import { Grid, IconButton, Typography, CircularProgress, Button, Theme } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import _ from 'lodash';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    input: {
        display: 'none',
    },
    uploadIcon: {
        maxWidth: '45px',
        height: 'auto',
        width: '20%',
        objectFit: 'contain',
    },
    withMargins: {
        margin: '1rem 0',
    },
    imageBox: {
        width: '100%',
        lineHeight: 0,
        overflow: 'hidden',
        display: 'block',
        position: 'relative',
        height: '130px',
    },
    dropBox: {
        textAlign: 'center',
        cursor: 'pointer',
        height: '130px',
    },
    withBorder: {
        border: `1px solid ${theme.palette.grey[500]}`,
    },
    form: {
        '& > *': {
            margin: theme.spacing(1),
            width: '80%',
        }
    },
}));

const ModelUploader = ({
    sasInfo,
    setSasInfo,
    jwt,
    uploading,
    setFile,
    file,
    setCustomFileSize,
    setUploading,
    setFileUploaded,
    fileUploaded,
    resetToUploadAgain
}: {
    sasInfo: SasInfo;
    setSasInfo: (sasInfo: SasInfo) => void;
    jwt: string;
    uploading: boolean;
    setUploading: (uploading: boolean) => void;
    setFile: (file: File) => any;
    file: File;
    setCustomFileSize: (size: number) => void;
    setFileUploaded: (uploaded: boolean) => void;
    fileUploaded: boolean;
    resetToUploadAgain: () => any;
}) => {

    const css = useStyles();

    const [fileName, setFilename] = useState('')

    const getFormattedSize = (size: number) => {
        if (size <= 1024) {
            return `${size} bytes`
        }
        else {
            if ((size / 1024) < 1000) {
                return `${Math.floor(size / 1024)} KB`
            }
            else {
                return `${Math.floor(size / 1024 / 1024)} MB`
            }
        }
    }

    const handleCapture = async (event: ChangeEvent<HTMLInputElement>): Promise<void> => {
        const selectedFile = event.currentTarget.files![0]
        setFilename(selectedFile.name)
        setFile(selectedFile)
        setCustomFileSize(selectedFile.size)
    };




    const uploadFile = async () => {
        // setUploading(true);
        // const sasInfo = await trustRelayService.getUploadSasInfo(jwt);
        // setSasInfo(sasInfo.value);
        // const fileReader = new FileReader();

        // const blobServiceClient = BlobServiceClient.fromConnectionString(`${sasInfo.value.blobEndpoint}${sasInfo.value.sas}`);

        // const containerClient = blobServiceClient.getContainerClient(sasInfo.value.container);

        // fileReader.readAsDataURL(file);

        // const blockBlobClient = containerClient.getBlockBlobClient(sasInfo.value.path)

        // blockBlobClient.uploadBrowserData(file).then((res) => {

        //     setFileUploaded(true);
        //     setUploading(false);
        // })
    }

    useEffect(() => {

    }, [fileUploaded, uploading, sasInfo.id, fileName]);

    return (
        <Grid item container>

            <Grid item >
                <input accept="*" className={css.input} disabled={fileUploaded} onChange={handleCapture} id="icon-button-file" type="file" />
                <label htmlFor="icon-button-file">
                    <IconButton color="primary" aria-label="upload dataset" component="span">
                        <CloudUploadIcon />
                    </IconButton>
                    <Typography variant="overline">{(fileName === '' ? 'Browse file' : fileName)}</Typography>
                </label>
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                &nbsp;
            </Grid>
            <Grid item >
                {(fileName && fileName.length > 0) ? (
                    <Typography variant="body1">
                        {`${fileName} (${getFormattedSize(file.size)})`}
                    </Typography>
                ) : (<></>)}
            </Grid>
            <Grid item >
                {(uploading) ? (
                    <CircularProgress />
                ) : (
                    <Button size="large" color="primary" onClick={() => uploadFile()} disabled={(_.isNull(file) || fileUploaded)} variant="contained">Upload</Button>
                )}
            </Grid>
            <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                &nbsp;
            </Grid>


        </Grid>
    );
}

export default ModelUploader;