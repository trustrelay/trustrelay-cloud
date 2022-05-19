import React, { useEffect, useState } from 'react';
import { Typography, Button,  TextField, Switch, FormGroup, FormControlLabel, IconButton, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import { Dataspace } from '../../api/models/models';
import { CopyToClipboard } from 'react-copy-to-clipboard'; 
import FileCopyIcon from '@mui/icons-material/FileCopy';
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

const CreateAnonymousInviteDrawer = ({
  dataspace,
  open,
  handleClose,
  onAction
}: {
  dataspace: Dataspace;
  open: boolean;
  handleClose: () => void;
  onAction: (isEnabled: boolean) => void;
}) => {

  const { t } = useTranslation(); 

  const [isEnabled, setIsEnabled] = useState(dataspace.isInvitationEnabled)

  const handleIsEnabledChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.checked
    setIsEnabled(newValue);
   onAction(newValue)
  };
 
  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }
  
  const css = useStyles();


  useEffect(() => {
  
  },[isEnabled, dataspace])

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.setAnonymousInvite')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <FormGroup row>

            <FormControlLabel
              control={
                <Switch
                  checked={isEnabled}
                  onChange={handleIsEnabledChange}
                  name="enabled"
                  color="primary"
                />
              }
              label={t('labels.enabled')}
            />
          </FormGroup>
          <br /><br />
      
                <TextField
                  id="invitationUrl"
                  label={t('labels.invitationUrl')}
                  defaultValue={`/join/${dataspace.invitationCode}`}
                  InputProps={{
                    readOnly: true,
                    startAdornment:  <CopyToClipboard text={`${process.env.REACT_APP_AZURE_SIGNIN_REDIRECT_URL}/dataspaces/${dataspace.id}/join/${dataspace.invitationCode}`}>
                    <IconButton size="small">
                    <FileCopyIcon />
                  </IconButton>
                  </CopyToClipboard>
                  }} 
                />

              
              
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.close')}
          </Button> 
        </form>
      </div>
    </Drawer>
  )
}

export default CreateAnonymousInviteDrawer;