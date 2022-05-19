import React from 'react';
import { Typography, Button,  Grid, Drawer, Toolbar, Theme } from '@mui/material'; 
import { useTranslation } from 'react-i18next'; 
import ToggleDarkMode from './toggle-dark-mode'; 
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


const SettingsDrawer = ({
theme,
toggleTheme,
  open,
  handleClose 
}: {
theme:string;
toggleTheme:()=>void;
  open: boolean;
  handleClose: () => void; 
}) => {

  const { t, i18n } = useTranslation();
 

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }


  


  const css = useStyles();



  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.settings')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <Grid item container spacing={2} rowGap={1}>
           
            <Grid item container direction="row" columnGap={2} alignContent="center" alignItems="center" textAlign="center">
              <Grid item ><Typography variant="body1">{t('labels.selectTheme')}</Typography></Grid>
              <Grid item><ToggleDarkMode theme={theme} toggleTheme={toggleTheme} /></Grid>
            </Grid>
            <Grid item container direction="row" columnGap={2} alignContent="center" alignItems="center" textAlign="center">
              <Grid item ><Typography variant="body1">{t('labels.selectLanguage')}</Typography></Grid>
              <Grid item container spacing={3}>
              <Grid item>  <Button color="primary" onClick={() => i18n.changeLanguage('en')}>English</Button></Grid>
              <Grid item>  <Button disabled color="primary" onClick={() => i18n.changeLanguage('de')}>Deutsch</Button></Grid>
              <Grid item>   <Button disabled color="primary" onClick={() => i18n.changeLanguage('fr')}>Français</Button></Grid>
              <Grid item>   <Button disabled color="primary" onClick={() => i18n.changeLanguage('it')}>Italiano</Button></Grid>
              <Grid item>   <Button color="primary" onClick={() => i18n.changeLanguage('es')}>Español</Button></Grid>

              </Grid>
            </Grid> 
          </Grid>
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.close')}
          </Button> 
        </form>
      </div>
    </Drawer>
  )
}

export default SettingsDrawer;