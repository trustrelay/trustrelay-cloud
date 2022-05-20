import { Box,  Grid, Typography, Theme } from '@mui/material';
import { useToast } from '../hooks/toast-hook'; 
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { collector, Producer, Transport } from '../apm';
import LayoutCentered from '../components/layout-centered';
import LayoutPage from '../components/layout-one-column';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
  pageContainer: {
    paddingTop: '1.7em',
    width: "100%",
    height: "100%", 
    flexDirection: "row",
    display: 'flex',
    flexWrap: 'nowrap',
    justifyContent: 'center'
  },
  leftPad: { 
    flexGrow: 0,
    flexShrink: 1
  },
  rightPad: { 
    flexGrow: 0,
    flexShrink: 1
  },
  center: {
    padding: "0em 0em 1em 1em", 
    flexGrow: 1,
  },
}));


const NotFoundPage = () => { 
  const toast = useToast();
  const css = useStyles();
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

        }
      })();
    }
  })

  return (
    <LayoutPage
      toast={toast}
      openToast={toast.openToast}
      closeToast={toast.closeToast}
    >
      <LayoutCentered fullHeight>
      <Box className={css.pageContainer}>
        <Box className={css.leftPad}>&nbsp;</Box>
        <Box className={css.center}>
          <Grid item container>
            <Typography variant="h1">Page not found.</Typography>
          </Grid>
        </Box>
        <Box className={css.rightPad}>&nbsp;</Box>
      </Box>
    </LayoutCentered>
    </LayoutPage>
  );
};

export default NotFoundPage;
