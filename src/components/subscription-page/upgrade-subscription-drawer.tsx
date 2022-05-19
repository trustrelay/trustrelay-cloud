import React, { useState } from 'react';
import { Typography, Button, InputLabel, Select, MenuItem, OutlinedInput, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import {  Subscription } from '../../api/models/models';
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