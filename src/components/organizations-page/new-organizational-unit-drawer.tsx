import React, { useState } from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme } from '@mui/material'; 
import { useTranslation } from 'react-i18next'; 
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

const NewOrganizationalUnitDrawer = ({ 
  open,
  handleClose,
  onAction
}: {
  open: boolean;
  handleClose: () => void; 
  onAction: (organizationName: string) => void;
}) => {

  const { t } = useTranslation();
   
  const [organizationName, setOrganizationName] = useState(''); 

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setOrganizationName('');   
    onAction(organizationName)
    handleClose()
  }

  const handleOrganizationNameChange = (e: any) => {
    setOrganizationName(e.target.value);
  }
 

  const disableContinueButton = () => {
    return (  organizationName.length <= 0)
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }



  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createNewOrganizationalUnit')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="organizationName"
            label={t('labels.organizationName')}
            onChange={handleOrganizationNameChange}
            value={organizationName}
            fullWidth
          />
            
          
          <br /> <br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createNewOrganizationalUnit')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default NewOrganizationalUnitDrawer;