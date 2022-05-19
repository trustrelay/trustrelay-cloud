import React, { useState } from 'react';
import { Typography, Button, InputLabel, TextField, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Organization } from '../../api/models/models';
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

const DeleteOrganizationalUnitDrawer = ({
  organizationalUnit,
  open,
  handleClose,
  onAction
}: {
  organizationalUnit: Organization;
  open: boolean;
  handleClose: () => void;
  onAction: (organizationId: string) => void;
}) => {

  const { t } = useTranslation();

  const [organizationName, setOrganizationName] = useState('');


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOrganizationName('');
    onAction(organizationalUnit.id);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleOrganizationNameChange = (e: any) => {
    setOrganizationName(e.target.value)
  }

  const disableContinueButton = () => {
    return (organizationalUnit.name !== organizationName)

  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.deleteOrganizationalUnit')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <InputLabel>Type {organizationalUnit} <br />{t('messages.toConfirmDeletion')}</InputLabel>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.organizationName')}
            onChange={handleOrganizationNameChange}
            value={organizationName}
            fullWidth
          />

          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.deleteOrganizationalUnit')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default DeleteOrganizationalUnitDrawer;