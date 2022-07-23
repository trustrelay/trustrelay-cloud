import React, { useState } from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next'; 
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

const AddNewSchemaDrawer = ({ 
    open,
    handleClose,
    onAction
}: { 
    open: boolean;
    handleClose: () => void;
    onAction: any;
}) => {

    const { t } = useTranslation();

    const [schemaUrl, setSchemaUrl] = useState<string>('');
    const [schemaName, setSchemaName] = useState<string>('');
   
   

    const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSchemaUrl('');
        setSchemaName('');

        onAction(schemaName, schemaUrl);
        handleClose()
    }


    const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        handleClose();
    }

    const handleSchemaUrlChange = (e: any) => {
        setSchemaUrl(e.target.value);
    }

    const handleSchemaNameChange = (e: any) => {
        setSchemaName(e.target.value);
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
                    label={t('labels.name')}
                    onChange={handleSchemaNameChange}
                    value={schemaName}
                    fullWidth
                />
                <br /><br />
                <TextField
                    autoFocus
                    autoComplete="off"
                    margin="dense"
                    id="name"
                    label={t('labels.url')}
                    onChange={handleSchemaUrlChange}
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
               
            </div>
        </Drawer>
    )
}

export default AddNewSchemaDrawer;