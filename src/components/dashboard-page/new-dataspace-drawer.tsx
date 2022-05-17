import React, { useContext } from 'react';
import { Typography, makeStyles,  TextField, Button, InputLabel, Select,   OutlinedInput, MenuItem } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import { useHistory } from "react-router-dom"; 
import { DataspaceContext } from '../../app-contexts';
import { useTranslation } from 'react-i18next';
import { Subscription } from '../../api/models/models';


const NewDataspaceDrawer = ({
  subscriptions,
  open,
  handleClose,
  onAction
}: {
  subscriptions:Array<Subscription>;
  open: boolean;
  handleClose: () => void;
  onAction: (subscription:string, dataspaceName: string, agentName: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [dataspaceName, setDataspaceName] = React.useState('');
  const [agentName, setAgentName] = React.useState('');

  const [subscription, setSubscription] = React.useState('');


  const handleContinue = (event:React.MouseEvent<HTMLElement>) => { 
    event.preventDefault();
    setDataspaceName('');
    setAgentName('');
    setSubscription('');
    onAction(subscription, dataspaceName, agentName);
    handleClose()
  }

  const handleCancel = (event:React.MouseEvent<HTMLElement>)=>{
    event.preventDefault();
    handleClose();
  }

  const handleDataspaceNameChange = (e: any) => {
    setDataspaceName(e.target.value);
  }

  const handleAgentNameChange = (e: any) => {
    setAgentName(e.target.value);
  }

  const handleSubscriptionChange = (e: any) => {
    setSubscription(e.target.value);
  }


  const disableContinueButton = () => {
    return (agentName.length <= 0 || subscription.length<=0)

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

  const dataspaceCtx = useContext(DataspaceContext);

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">Create new dataspace</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="dataspaceName"
            label={t('labels.dataspaceName')}
            onChange={handleDataspaceNameChange}
            value={dataspaceName}
            fullWidth
          />
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="agentName"
            label={t('labels.agentName')}
            onChange={handleAgentNameChange}
            value={agentName}
            fullWidth
          />
           <br /> <br />
          <InputLabel id="subscription-label">{t('labels.subscription')}</InputLabel>

          <Select
            labelId="subscription-label"
            id="subscription-select"
            value={subscription}
            label={t('labels.subscription')}
            input={<OutlinedInput label="Format" />}
            onChange={handleSubscriptionChange}
          >

            {(subscriptions && subscriptions.length > 0) ? subscriptions.filter(x=>x.maxDataspaces>x.currentDataspaces).map((item) => <MenuItem value={item.id}>{item.id}</MenuItem>) : <></>}

          </Select>
          <br /> <br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createNewDataspace')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default NewDataspaceDrawer;