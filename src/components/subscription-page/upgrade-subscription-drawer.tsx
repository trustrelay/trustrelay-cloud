import React, { useState } from 'react';
import { Typography, makeStyles, Button, InputLabel, Select, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Common, Subscription } from '../../api/models/models';


const UpgradeSubscriptionDrawer = ({
  subscription,
  open,
  handleClose,
  onAction
}: {
  subscription: Subscription;
  open: boolean;
  handleClose: () => void;
  onAction: (subscriptionId: string, subscriptionType: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [subscriptionType, setSubscriptionType] = useState(subscription.subscriptionType);


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    onAction(subscription.id, subscriptionType);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleSubscriptionTypeChange = (e: any) => {
    setSubscriptionType(e.target.value)
  }

  const disableContinueButton = () => {
    return (subscriptionType.length <= 0)

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

        <Typography variant="h5">{t('labels.upgradeSubscription')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <InputLabel htmlFor="subscription">{t('labels.subscriptionType')}</InputLabel>
          <Select
            id="subscription-select"
            value={subscriptionType}
            label={t('labels.subscription')}
            size="small"
            input={<OutlinedInput label="Format" />}
            onChange={handleSubscriptionTypeChange}
          >
            <MenuItem value="free-trial">Free trial</MenuItem>


          </Select>

          <br /><br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.upgradeSubscription')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default UpgradeSubscriptionDrawer;