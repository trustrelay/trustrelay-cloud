import React, { useState } from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { CommonSchema } from '../../api/models/models';

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

const DeleteSchemaDrawer = ({
    schema,
    open,
    handleClose,
    onAction
}: {
    schema: CommonSchema;
    open: boolean;
    handleClose: () => void;
    onAction: (id:string) =>void;
}) => {

    const { t } = useTranslation();

    const [schemaName, setSchemaName] = useState<string>('');



    const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        setSchemaName('');
        onAction(schema.id);
        handleClose()
    }


    const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        handleClose();
    }

    const handleChange = (e: any) => {
        setSchemaName(e.target.value);
    }



    const disableContinueButton = () => {
        return schemaName != schema.name
    };


    const css = useStyles();


    return (
        <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

            <Toolbar className={css.innernav}>

                <Typography variant="h5">{t('labels.deleteSchema')}</Typography>
            </Toolbar>

            <div className={css.drawerContainer}>
                <form>

                    <InputLabel>Type {schema.name} <br />{t('messages.toConfirmDeletion')}</InputLabel>
                    <TextField
                        autoFocus
                        autoComplete="off"
                        margin="dense"
                        id="name"
                        label={t('labels.name')}
                        onChange={handleChange}
                        value={schemaName}
                        fullWidth
                    />
                    <br /><br />
                    <Button onClick={handleCancel} color="primary">
                        {t('labels.cancel')}
                    </Button>
                    <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">
                        {t('labels.delete')}
                    </Button>
                </form>
            </div>
        </Drawer>
    )
}

export default DeleteSchemaDrawer;