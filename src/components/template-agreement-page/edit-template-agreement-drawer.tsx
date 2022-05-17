import React, { useState } from 'react';
import { Typography, makeStyles, Button, InputLabel, Select, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Common, TemplateAgreement  } from '../../api/models/models';


const EditTemplateAgreementDrawer = ({
  agreement,
  open,
  handleClose,
  onAction
}: {
  agreement: TemplateAgreement;
  open: boolean;
  handleClose: () => void;
  onAction: (title: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [title, setTitle] = useState(agreement.title); 


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setTitle(agreement.title); 
    onAction(title);
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
    return (title.length <= 0)

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

        <Typography variant="h5">{t('labels.editTemplateAgreement')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
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

            {t('labels.editTemplateAgreement')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default EditTemplateAgreementDrawer;