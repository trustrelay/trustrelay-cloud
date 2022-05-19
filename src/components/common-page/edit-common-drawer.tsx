import React, { useState } from 'react';
import { Typography, Button, TextField, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import { Common  } from '../../api/models/models';
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


const EditCommonDrawer = ({
  common,
  open,
  handleClose,
  onAction
}: {
  common: Common;
  open: boolean;
  handleClose: () => void;
  onAction: (commonName: string, dataOwner: string, dataExpert: string) => void;
}) => {

  const { t } = useTranslation(); 


  const [commonName, setCommonName] = useState(common.name);
  const [dataOwner, setDataOwner] = useState(common.dataOwner);
  const [dataExpert, setDataExpert] = useState(common.dataExpert);


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCommonName(common.name);
    setDataOwner(common.dataOwner);
    setDataExpert(common.dataExpert);
    onAction(commonName, dataOwner, dataExpert);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleCommonNameChange = (e: any) => {
    setCommonName(e.target.value)
  }

  const handleDataOwnerChange = (e: any) => {
    setDataOwner(e.target.value)
  }

  const handleDataExpertChange = (e: any) => {
    setDataExpert(e.target.value)
  }

  const disableContinueButton = () => {
    return (commonName.length <= 0)

  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.editCommon')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.commonName')}
            onChange={handleCommonNameChange}
            value={commonName}
            fullWidth
          />
          <br /><br />
          <TextField
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.dataOwner')}
            onChange={handleDataOwnerChange}
            value={dataOwner}
            fullWidth
          />
          <br /><br />
          <TextField
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.dataExpert')}
            onChange={handleDataExpertChange}
            value={dataExpert}
            fullWidth
          />
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.editCommon')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default EditCommonDrawer;