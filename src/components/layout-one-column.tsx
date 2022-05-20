import { ReactNode, useState, useEffect } from 'react';
import { Toast } from './toast';
import { Grid, Theme, CssBaseline   } from '@mui/material';
import MainNavigation from './main-navigation';
import { ToastMessageInfo, ToastMessageType} from '../app-contexts';
import MainDrawer from './main-drawer';  
import { collector, Producer, Transport } from '../apm';
import { useDarkMode } from '../hooks/dark-mode'; 
import LightTheme from '../assets/themes/TrustRelay/light';
import DarkTheme from '../assets/themes/TrustRelay/dark';
import { makeStyles, ThemeProvider  } from '@mui/styles';


const useStyles = makeStyles((theme:Theme) => ({
  pageContainer: {
    // marginTop: '4em',
    width: "100%",
    height: "100%"
  },
  progressMargin: {
    marginTop: '7em',
  },
  mainNavigation: {
    zIndex: theme.zIndex.drawer + 1,
  },
  pageBody: {
    width: "100%",
    minHeight: "100%",
    height: "100%",
    flexGrow: 1
  },
}));


const Layout1Column = ({
  children,
  toast,
  openToast,
  closeToast,
  selectedDataspace
}: {
  children: ReactNode;
  toast: ToastMessageInfo;
  openToast: (title: string, message: string, type: ToastMessageType) => any;
  closeToast: () => any; 
  selectedDataspace?:string;
}) => {

  const css = useStyles(); 
  const [isMainDrawerOpen, setIsMainDrawerOpen] = useState(false);
  const [apmSent, setApmSent] = useState(false);

  useEffect(() => {
    
    if (!apmSent) {
       
      const targetUrl = process.env.REACT_APP_APM_BASE_URL;
      const transport = new Transport(targetUrl);
      const defaults = collector.defaultCollectors;

      const producer = new Producer(transport, defaults);
      (async function send() {
        try {
          // Step 5: Collect and send the event
          await producer.collect();
          setApmSent(true)
        } catch (cause) {
          console.log('Error processing event', cause);
        }
      })();
    }

  }, [])


  const toggleMainDrawer = () => {
    setIsMainDrawerOpen(!isMainDrawerOpen);
  }

  const [theme, toggleTheme] = useDarkMode();
  const themeMode = theme === 'light' ? LightTheme : DarkTheme;


  return (

    <ThemeProvider theme={themeMode}>
    <CssBaseline />
        <MainNavigation
          openToast={openToast}
          toggleMainDrawer={toggleMainDrawer} 
          selectedDataspace={selectedDataspace}
        />
        <Toast value={toast} close={() => closeToast()} />

        <Grid container alignItems="stretch" className={css.pageContainer}>

          <Grid item >
            <MainDrawer
              open={isMainDrawerOpen}
              handleClose={toggleMainDrawer}
              selectedDataspace={selectedDataspace}
               />
          </Grid>
          <Grid item >
         
          </Grid>

          <Grid container item className={css.pageBody} >
            <Grid item container>
              {children}
            </Grid>
          </Grid>
        </Grid>
    
        </ThemeProvider>

  );
};
export default Layout1Column;
