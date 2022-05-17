import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Button, InputLabel, Select, MenuItem, OutlinedInput, TextField } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { Common, Organization, Subscription } from '../../api/models/models';


const CreateNewDataspaceDrawer = ({
  subscriptions,
  open,
  handleClose,
  onAction
}: {
  subscriptions: Array<Subscription>;
  open: boolean;
  handleClose: () => void;
  onAction: (subscription:string, dataspaceName: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [dataspaceName, setDataspaceName] = useState('');

  const [selectedSubscription, setSelectedSubscription] = useState('');


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault(); 

    onAction(selectedSubscription, dataspaceName);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }


  const handleSubscriptionChange = (event: any) => {
    setSelectedSubscription(event.target.value);
  }


  const handleDataspaceNameChange = (e: any) => {
    setDataspaceName(e.target.value)
  }
 

  const disableContinueButton = () => {
    return (dataspaceName.length <= 0)

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

        <Typography variant="h5">{t('labels.addDataspace')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
           

<TextField
  autoFocus
  autoComplete="off"
  margin="dense"
  size="small"
  id="dataspacename"
  label={t('labels.dataspaceName')}
  onChange={handleDataspaceNameChange}
  value={dataspaceName}
  fullWidth
/>
<br /> <br />

<InputLabel htmlFor="subscription">{t('labels.subscription')}</InputLabel>
<Select
  id="subscription-select"
  value={selectedSubscription}
  label={t('labels.subscription')}
  size="small"
  input={<OutlinedInput label="Format" />}
  onChange={handleSubscriptionChange}
>
  {subscriptions.filter(su=>(su.maxDataspaces-su.currentDataspaces) > 0).map((s,index) => <MenuItem key={`item_${index}`} value={s.id}>{`#${index+1} : (${s.maxDataspaces-s.currentDataspaces}/${s.maxDataspaces} available dataspaces)`}</MenuItem>)}


</Select>
<br /> <br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.submit')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default CreateNewDataspaceDrawer;