import React, { useContext } from 'react';
import { Typography, makeStyles,  TextField, Button } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer'; 
import Toolbar from '@material-ui/core/Toolbar'; 
import { useHistory } from "react-router-dom";  
import { useTranslation } from 'react-i18next';


const InviteMemberDrawer = ({
  open,
  handleClose,
  onAction
}: {
  open: boolean;
  handleClose: () => void;
  onAction: (email: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [email, setEmail] = React.useState('');

  const handleContinue = (event:React.MouseEvent<HTMLElement>) => { 
    event.preventDefault();
    setEmail(''); 
    onAction(email);
    handleClose();
  }

  const handleCancel = (event:React.MouseEvent<HTMLElement>)=>{
    event.preventDefault();
    handleClose();
  }
 

  const handleEmailChange = (e: any) => {
    setEmail(e.target.value);
  }
 

  const disableContinueButton = () => {
    return (email.length <= 0 )

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

        <Typography variant="h5">{t('labels.inviteMember')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <TextField
            autoComplete="off"
            autoFocus
            margin="dense"
            id="email"
            label={t('labels.email')}
            onChange={handleEmailChange}
            value={email}
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

export default InviteMemberDrawer;