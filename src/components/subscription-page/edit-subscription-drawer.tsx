import React, { useState } from 'react';
import { Typography, makeStyles, Button, InputLabel, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Common, Subscription } from '../../api/models/models';


const EditSubscriptionDrawer = ({
  subscription,
  open,
  handleClose,
  onAction
}: {
  subscription: Subscription;
  open: boolean;
  handleClose: () => void;
  onAction: (subscriptionName:string, procurementEmail:string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [subscriptionName, setSubscriptionName] = useState(subscription.name); 
  const [procurementEmail, setProcurementEmail] = useState(subscription.procurementEmail);



  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 
    onAction(subscriptionName, procurementEmail);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleSubscriptionNameChange = (e: any) => {
    setSubscriptionName(e.target.value)
  }

   

  const handleProcurementEmailChange = (e: any) => {
    setProcurementEmail(e.target.value)
  }

  const disableContinueButton = () => {
    return (subscription.name === subscriptionName && subscription.procurementEmail === procurementEmail)

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

        <Typography variant="h5">{t('labels.editSubscription')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

         

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.name')}
            onChange={handleSubscriptionNameChange}
            value={subscriptionName}
            fullWidth
          />
 

          <br /><br />

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="name"
            label={t('labels.procurementEmail')}
            onChange={handleProcurementEmailChange}
            value={procurementEmail}
            fullWidth
          />


          <br /><br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.editSubscription')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default EditSubscriptionDrawer;