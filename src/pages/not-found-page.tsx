import {   Button, Grid, Typography } from '@mui/material'; 
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collector, Producer, Transport } from '../apm';  

const NotFoundPage = () => {  
  const { t } = useTranslation();
  
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
    <Grid container direction="column" justifyContent="center" textAlign="center" alignItems="center">

    <Typography variant="h1">{t('messages.pageNotFound')}</Typography>
    <img alt="not found" width="450" height="360" src="https://cdn.trustrelay.io/media/not_found.webp" />
    <Button variant="contained" href="/" >Go back</Button>

</Grid>

   
  );
};

export default NotFoundPage;
