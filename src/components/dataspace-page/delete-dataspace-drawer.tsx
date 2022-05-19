import React, { useState } from 'react';
import { Typography, Button, InputLabel, TextField, FormControlLabel, Checkbox, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Dataspace } from '../../api/models/models';
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

const DeleteDataspaceDrawer = ({
  dataspace,
  open,
  handleClose,
  onAction
}: {
  dataspace: Dataspace;
  open: boolean;
  handleClose: () => void;
  onAction: () => void;
}) => {

  const { t } = useTranslation();

  const [dataspaceName, setDataspaceName] = useState('');

  const [deleteEverything, setDeleteEverything] = useState(false)


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setDataspaceName('');
    setDeleteEverything(false);
    onAction();
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleDataspaceNameChange = (e: any) => {
    setDataspaceName(e.target.value)
  }

  const handleDeleteEverythingChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDeleteEverything(event.target.checked);
  }

  const disableContinueButton = () => {
    return (dataspace.name !== dataspaceName || !deleteEverything)

  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.deleteDataspace')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <InputLabel>Type {dataspace.name} <br />{t('messages.toConfirmDeletion')}</InputLabel>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.dataspaceName')}
            onChange={handleDataspaceNameChange}
            value={dataspaceName}
            fullWidth
          />
          <br /><br />
          <FormControlLabel
            control={
              <Checkbox
                checked={deleteEverything}
                onChange={handleDeleteEverythingChange}
                name="delete-everything"
                color="primary"
              />
            }
            label="Delete everything?"
          />
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.deleteDataspace')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default DeleteDataspaceDrawer;