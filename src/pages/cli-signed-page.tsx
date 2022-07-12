import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { Button, Grid, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { collector, Producer, Transport } from '../apm';
import trustRelayService from '../api/trustrelay-service';
import { getToastMessageTypeByName } from '../components/toast';
import { useToast } from '../hooks/toast-hook';
import { useLocation } from 'react-router-dom';
import { protectedResources } from '../authConfig';

const CliSignedPage = () => {
  const { t } = useTranslation();
  const toast = useToast();
  const [apmSent, setApmSent] = useState(false);
  const { instance, accounts, inProgress } = useMsal();
  const isAuthenticated = useIsAuthenticated();
  const [jwt, setJwt] = useState('');
  const location = useLocation()
  const account = useAccount(accounts[0] || {});
  const [sessionId, setSessionId] = useState('');
  const [sessionAcknowledged, setSessionAcknowledged] = useState(false);
  const [errorAcknowledging, setErrorAcknowledging] = useState(false);
 

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

    if (isAuthenticated) {
      
      if (jwt !== "") {
         
        const searchParams = new URLSearchParams(location.hash.replace("#", "?"))
        const sessionValue = searchParams.get('session')

        console.log(sessionValue)

       
        if (sessionValue && sessionValue.length > 0) {
          setSessionId(sessionValue)
          
        }
      
        if (sessionId && sessionId.length > 0 && !sessionAcknowledged) {
          trustRelayService.ackSession(jwt, sessionId).then((res) => {
          setSessionAcknowledged(true)

          }).catch((err: Error) => {
            setErrorAcknowledging(true)
          });
        }  
      }
      else {

        instance.acquireTokenSilent({
            scopes: protectedResources.api.scopes,
            account: account!
        }).then((returnedToken) => {

            setJwt(returnedToken.idToken)

        }).catch((error: any) => {

            console.log(error)

        })
    }
    }  

  }, [isAuthenticated,jwt, sessionId, location.hash, sessionAcknowledged])

  return (
    <>

      <AuthenticatedTemplate>
        <Grid container direction="column" justifyContent="center" textAlign="center" alignItems="center">
{(sessionAcknowledged) ?  <><Typography variant="h1">{t('messages.clisignedin')}</Typography><img alt="not found" width="450" height="360" src="https://cdn.trustrelay.io/media/flying.webp" /></>  : <></> }
{(!sessionAcknowledged && errorAcknowledging) ?   <Typography variant="h1">{t('messages.errorAcknowledging')}</Typography> : <></> }
        
          


        </Grid>
      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>

        <Grid container direction="column" justifyContent="center" textAlign="center" alignItems="center">

          <Typography variant="h1">{t('messages.signedOut')}</Typography>
          <img alt="unauthorized" width="450" height="360" src="https://cdn.trustrelay.io/media/unauthorized.webp" />

          <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/cli-signed-in` })} >Login first</Button>

        </Grid>

      </UnauthenticatedTemplate>
    </>

  );
};

export default CliSignedPage;
