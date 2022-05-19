import React, { useState } from 'react';
import { Typography, Button, InputLabel, TextField, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { TemplateAgreement } from '../../api/models/models';
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


const DeleteTemplateAgreementDrawer = ({
  agreement,
  open,
  handleClose,
  onAction
}: {
  agreement: TemplateAgreement;
  open: boolean;
  handleClose: () => void;
  onAction: () => void;
}) => {

  const { t } = useTranslation();

  const [title, setTitle] = useState('');


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTitle(agreement.title);
    onAction();
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleTitleChange = (e: any) => {
    setTitle(e.target.value)
  }

  const disableContinueButton = () => {
    return (agreement.title !== title)

  }


  const css = useStyles();



  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.deleteCommon')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <InputLabel>Type {agreement.title} <br />{t('messages.toConfirmDeletion')}</InputLabel>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.title')}
            onChange={handleTitleChange}
            value={title}
            fullWidth
          />
          <br /><br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.deleteTemplateAgreement')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default DeleteTemplateAgreementDrawer;