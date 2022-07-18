import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Divider, TableContainer, Table, TableRow, TableCell, Paper, TableBody, TextField, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import { useContext, useEffect, useState } from 'react';
import { AppPushNotificationContext, DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { getToastMessageTypeByName } from '../components/toast';
import { useTranslation } from 'react-i18next'; 
import ContactMailIcon from '@mui/icons-material/ContactMail';
import { useParams, useNavigate } from 'react-router-dom';
import { DataspaceSummary, InvitationStatus } from '../api/models/models';
import validator from 'validator'
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  table: {
    minWidth: 450,
    //  width:"100%"
  },
  form: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
})
);

const JoinPage = () => {



  const toast = useToast();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const css = useStyles();

  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated();
  const [jwt, setJwt] = useState('');
  const { dataspaceid, code } = useParams<{ dataspaceid: string, code: string }>();
  const dataspaceCtx = useContext(DataspaceContext);
  const [selectedDataspace, setSelectedDataspace] = useState('');
  const latestPushNotification = useContext(AppPushNotificationContext);

  const emptyDataspaceSummary: DataspaceSummary = { id: "", name: "", members: 0, commons: 0, admin: "", timestamp: "" }

  const [dataspaceSummary, setDataspaceSummary] = useState(emptyDataspaceSummary)
  const [loadedDataspaceSummary, setLoadedDataspaceSummary] = useState(false);

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('')

  const [signupRequestSent, setSignupRequestSent] = useState(false);

  const [joinRequestSent, setJoinRequestSent] = useState(false);

  const emptyInvitationStatus: InvitationStatus = { isValidCode: false, invitationType: "", alreadyMember: false }
  const [invitationStatus, setInvitationStatus] = useState(emptyInvitationStatus)
  const [loadedInvitationStatus, setLoadedInvitationStatus] = useState(false);


  const validateEmail = (e: any) => {
    var email = e.target.value
    setEmail(e.target.value)
    if (email.length > 5) {
      if (validator.isEmail(email)) {
        setEmailError('')
      } else {
        setEmailError('Invalid email')
      }
    }

  }

  const goToDashboard = () => {
    navigate(`/`)
  }

  const handleCancel = () => {
    navigate(`/`)
  }

  const handleJoin = () => {
    trustRelayService.joinDataspace(jwt, dataspaceid!, code!).then((res) => {
      // toast.openToast(`success`, 'Your request has been sent, you can close this window.', getToastMessageTypeByName('info'));
      setJoinRequestSent(true)
    }).catch((err: Error) => {
      toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
    });
  }

  const handleSignup = () => {
    trustRelayService.signupToJoinDataspace(email, dataspaceid!, code!).then((res) => {
      // toast.openToast(`success`, 'Your request has been sent, please check your inbox.', getToastMessageTypeByName('info'));
      setSignupRequestSent(true)
    }).catch((err: Error) => {
      toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
    });
  }

  const shouldDisableSignup = () => {
    return email.length <= 5 || emailError.length > 0
  }

  const handleLogin = () => {
    instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/join/${code}` })
  }

  function renderContent() {
    return <Grid container flexDirection="column" rowGap={2}>
      <Grid item>
        <Typography>{`${t('labels.dataspaceInvitation')}: ${dataspaceid}`}</Typography>
      </Grid>
      <Grid container item flexDirection="row">

        {(loadedInvitationStatus) ? <Grid container item>
          {(invitationStatus && !invitationStatus.alreadyMember) ? <Grid container item>
            {(invitationStatus && invitationStatus.isValidCode) ? <Grid container item>
              {(!signupRequestSent && !joinRequestSent) ? <Grid container rowGap={2} item>

                <Grid item>
                  <TableContainer component={Paper}>
                    <Table className={css.table} aria-label="simple table">

                      <TableBody>
                        <TableRow key="name">
                          <TableCell component="th" scope="row">Name</TableCell>
                          <TableCell align="right">{dataspaceSummary.name}</TableCell>
                        </TableRow>

                        <TableRow key="type">
                          <TableCell component="th" scope="row">Invitation Type</TableCell>
                          <TableCell align="right">{invitationStatus.invitationType}</TableCell>
                        </TableRow>

                        <TableRow key="admin">
                          <TableCell component="th" scope="row">Admin</TableCell>
                          <TableCell align="right">{dataspaceSummary.admin}</TableCell>
                        </TableRow>
                        <TableRow key="members">
                          <TableCell component="th" scope="row"> # Members  </TableCell>
                          <TableCell align="right">{dataspaceSummary.members}</TableCell>
                        </TableRow>
                        <TableRow key="commons">
                          <TableCell component="th" scope="row"> # Commons </TableCell>
                          <TableCell align="right">{dataspaceSummary.commons}</TableCell>
                        </TableRow>
                      </TableBody>
                    </Table>
                  </TableContainer>
                </Grid>

                <Grid item container spacing={2} rowGap={2}>
                  <Grid item>
                    <Button variant="contained" onClick={handleCancel} color="secondary">Cancel</Button>
                  </Grid>
                  <Grid item>
                    <Button variant="contained" onClick={handleJoin} color="primary">Join</Button>
                  </Grid>
                </Grid>

              </Grid> : <Grid item container spacing={2} rowGap={2}>
                <Grid item>
                  <Typography>Your request has been sent! Click on the link below to continue.</Typography>
                  <Button variant="text" onClick={() => goToDashboard()}>
                    {t('labels.goToDashboard')}
                  </Button>
                </Grid>
              </Grid>}
            </Grid> : <span>This code is invalid</span>
            }
          </Grid> : <span>You are already a member</span>
          }
        </Grid> : <span>Loading...</span>
        }
      </Grid>
    </Grid>

  }

  useEffect(() => {




    if (jwt !== "" && !loadedInvitationStatus) {
      trustRelayService.getInvitationStatus(jwt, dataspaceid!, code!).then((res) => {
        setLoadedInvitationStatus(true);
        setInvitationStatus(res);
      }).catch((err: Error) => {
        toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
      });

    }
    else {

    }


  }, [selectedDataspace, loadedInvitationStatus])

  useEffect(() => {




    if (loadedInvitationStatus && !loadedDataspaceSummary && jwt !== "") {
      trustRelayService.getDataspaceSummary(jwt, dataspaceid!).then((res) => {
        setLoadedDataspaceSummary(true);
        setDataspaceSummary(res);
      }).catch((err: Error) => {
        toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
      });

    }
    else {

    }


  }, [loadedInvitationStatus, loadedDataspaceSummary])

  useEffect(() => {


    if (isAuthenticated) {

      if (jwt !== "") {

        if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
          setSelectedDataspace(dataspaceCtx.dataspaceState)
        }
        else {
          trustRelayService.getAccount(jwt).then((res) => {
            const ds = res.defaultDataspace
            dataspaceCtx.setDataspaceState(ds)
            setSelectedDataspace(ds)

          }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
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

    } else {

      if (!inProgress) {

        instance.loginRedirect(loginRequest)
      }

    }
  }, [jwt,
    isAuthenticated,
    dataspaceCtx.dataspaceState,
    latestPushNotification.trustRelayPushNotificationState,
    dataspaceSummary,
    signupRequestSent
  ])


  return (
    <>

      <AuthenticatedTemplate>
        <LayoutPage
          toast={toast}
          openToast={toast.openToast}
          closeToast={toast.closeToast}
        >

          <LayoutCentered fullHeight>
            <Grid container item direction="column" rowGap={2} columnGap={1} spacing={1}>

              <Grid item container direction="row">

                <ContactMailIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                <Grid item>
                  <Typography variant="h5" color="textPrimary">&nbsp;{t('labels.joinDataspace')}</Typography>
                </Grid>
              </Grid>
              <Divider /> 
              <Grid item container alignItems="left" alignContent="left" direction="column" >

                <Grid item container >
                  <DataspaceContext.Consumer>
                    {({ dataspaceState }) => (
                      renderContent()
                    )}
                  </DataspaceContext.Consumer>
                </Grid>
              </Grid>
 
              <Grid item>
                &nbsp;
              </Grid>
            </Grid>
          </LayoutCentered>

        </LayoutPage>

      </AuthenticatedTemplate>

      <UnauthenticatedTemplate>
        {(!signupRequestSent) ?
          <Grid container flexDirection="column" rowGap={2}>
            <Grid item><Typography>{`${t('labels.dataspaceInvitation')}: ${dataspaceid}`}</Typography></Grid>
            <Grid item><Typography>{`However you're not logged in`}</Typography><Button onClick={handleLogin} variant="text">Do you already have an account?</Button></Grid>
            <Grid item><Typography>{`If not, just put your email address below and we'll create a new account for you`}</Typography></Grid>

            <Grid container item flexDirection="row">

              <form className={css.form} noValidate autoComplete="off">
                {(emailError && emailError.length > 0) ? <TextField error id="email" helperText={emailError} onChange={(e: any) => validateEmail(e)} value={email} label={t('labels.email')} /> : <TextField id="email" onChange={(e: any) => validateEmail(e)} value={email} label={t('labels.email')} />}
              </form>

            </Grid>

            <Grid item container spacing={2} rowGap={2}>
              <Grid item>
                <Button variant="contained" onClick={handleCancel} color="secondary">Cancel</Button>
              </Grid>
              <Grid item>
                <Button variant="contained" disabled={shouldDisableSignup()} onClick={handleSignup} color="primary">Sign me up</Button>
              </Grid>
            </Grid>
          </Grid>
          : <Grid item container spacing={2} rowGap={2}>
            <Grid item>
              <Typography>Your request has been sent! You can close this window.</Typography>
            </Grid>
          </Grid>}

      </UnauthenticatedTemplate>
    </>
  );
};

export default JoinPage;
