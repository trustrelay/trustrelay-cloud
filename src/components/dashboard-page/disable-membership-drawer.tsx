import React from 'react';
import { Typography, TextField, Button, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Agent } from '../../api/models/models';
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

const DisableMembershipDrawer = ({
  open,
  agents,
  handleClose,
  onAction
}: {
  open: boolean;
  agents: Array<Agent>;
  handleClose: () => void;
  onAction: (agent: string) => void;
}) => {

  const { t } = useTranslation();

  const [selectedAgent, setSelectedAgent] = React.useState('');

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSelectedAgent('');
    onAction(selectedAgent);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleSelectedAgentChange = (e: any) => {
    setSelectedAgent(e.target.value);
  }

  const disableContinueButton = () => {
    return (selectedAgent.length <= 0)
  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.uninviteMember')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="agentName"
            label={t('labels.member')}
            onChange={handleSelectedAgentChange}
            value={selectedAgent}
            fullWidth
          />
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.inviteMember')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default DisableMembershipDrawer;