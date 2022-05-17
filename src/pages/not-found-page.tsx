import { useTranslation } from 'react-i18next';
import { Box, Button, CssBaseline, Grid, makeStyles, MuiThemeProvider, Typography } from '@material-ui/core';
import { useToast } from '../hooks/toast-hook'; 
import { useHistory } from "react-router-dom";
import { useEffect, useState } from 'react';
import { collector, Producer, Transport } from '../apm';
import { Helmet } from 'react-helmet';
import LightTheme from '../assets/themes/TrustRelay/light';
import TopMenu from '../components/landing-page/top-menu';

const useStyles = makeStyles({
  pageContainer: {
    paddingTop: '1.7em',
    width: "100%",
    height: "100%",
    // backgroundColor:"pink",
    flexDirection: "row",
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },
  leftPad: {
    // backgroundColor:"green",
    flexGrow: 0,
    flexShrink: 1
  },
  rightPad: {
    // backgroundColor:"red",
    flexGrow: 0,
    flexShrink: 1
  },
  center: {
    padding: "0em 0em 1em 1em",
    // backgroundColor:"blue",
    flexGrow: 1,
  },
});


const NotFoundPage = () => {
  const { t } = useTranslation();
  const toast = useToast();
  let history = useHistory();
  const css = useStyles();
  const [apmSent, setApmSent] = useState(false);

  const goHome = () => {
    history.push('/')
  }

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

        }
      })();
    }
  })

  return (
    // <LayoutPage
    //   toast={toast}
    //   openToast={toast.openToast}
    //   closeToast={toast.closeToast}
    // >
    //   <LayoutCentered fullHeight>
    <MuiThemeProvider theme={LightTheme}>
      <CssBaseline />
      <div id="landingpage" className="landing">
        <Helmet>
          <title>404 Page Not Found</title>
          <meta name="description" content="Page not found" />
          <meta name="robots" content="noindex" />
        </Helmet>
        <TopMenu />
        <Box className={css.pageContainer}>
          <Box className={css.leftPad}>&nbsp;</Box>
          <Box className={css.center}>
            <Grid item container>
              <Typography variant="body1">{t('messages.pageNotFound')}</Typography>
            </Grid>
            <Grid item container>
              &nbsp;
            </Grid>
            <Grid item container>
              <Button variant="contained" onClick={() => goHome()}>
                {t('labels.homePage')}
              </Button>
            </Grid>
          </Box>
          <Box className={css.rightPad}>&nbsp;</Box>
        </Box>
      </div>
    </MuiThemeProvider>
  );
};

export default NotFoundPage;
