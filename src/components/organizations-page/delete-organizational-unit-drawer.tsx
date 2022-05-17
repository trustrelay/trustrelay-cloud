import React, { useState } from 'react';
import { Typography, makeStyles, Button, InputLabel, Select, MenuItem, OutlinedInput, TextField, FormControlLabel, Checkbox } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Common, Organization } from '../../api/models/models';


const DeleteOrganizationalUnitDrawer = ({
  organizationalUnit,
  open,
  handleClose,
  onAction
}: {
  organizationalUnit: Organization;
  open: boolean;
  handleClose: () => void;
  onAction: (organizationId:string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


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
    return ( organizationalUnit.name !== organizationName)

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



  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.deleteOrganizationalUnit')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

<InputLabel>Type {organizationalUnit} <br/>{t('messages.toConfirmDeletion')}</InputLabel>

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