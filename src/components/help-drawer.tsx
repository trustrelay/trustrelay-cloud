import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Button, Grid, IconButton } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import OpenInNewIcon from '@material-ui/icons/OpenInNew';

const HelpDrawer = ({

  open,
  handleClose
}: {

  open: boolean;
  handleClose: () => void;
}) => {


 

const { t } = useTranslation();
let history = useHistory(); 

  const [dataspaceName, setDataspaceName] = useState('');

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
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
    bolderText: {
      fontWeight:"bolder"
    }, 
  })


  const css = useStyles();



  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.statusAndSupport')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <Grid container rowGap={2} flexDirection="column">
            <Grid item>
       <Typography style={{fontWeight:"bolder"}} variant="body2">{t('messages.healthStatus')}</Typography> 

            </Grid>
            <Grid item>
              <Typography variant="body1">{t('messages.noHealthIssues')}</Typography>
            </Grid>
            <Grid item>
              <Typography  style={{fontWeight:"bolder"}} variant="body2">{t('labels.supportResources')}</Typography>
           
             
            </Grid>
<Grid item>
<IconButton size="small" onClick={() => window.open("https://docs.trustrelay.io", "_blank")} color="primary" >
                <Typography variant="body1">docs.trustrelay.io</Typography> <OpenInNewIcon fontSize="small" />
              </IconButton>
</Grid>
            
            <Grid item>

              <Button onClick={handleCancel} color="primary">
                {t('labels.close')}
              </Button>
              {/* <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

                {t('labels.sendFeedback')}

              </Button> */}
            </Grid>

          </Grid>
        </form>
      </div>
    </Drawer>
  )
}

export default HelpDrawer;