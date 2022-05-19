import React, { useContext, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import MenuIcon from '@mui/icons-material/Menu';
import {  IconButton,  Link,  Toolbar,  AppBar,  Tooltip,  Badge,  Typography,  MenuItem,  Menu, Theme } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsDrawer from './notifications-drawer';
import { AppNotificationsContext, AppPushNotificationContext, MembershipsContext, DataspaceContext, ToastMessageType } from '../app-contexts';
import { PathNames } from '../CustomRouter'; 
import { useNavigate } from "react-router-dom";
import PersonIcon from '@mui/icons-material/Person';
import { AuthenticatedTemplate, UnauthenticatedTemplate, useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest } from "../authConfig";
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { protectedResources } from '../authConfig';
import trustRelayService from '../api/trustrelay-service';
import { AppNotification } from '../api/models/models';
import { sortByTime } from '../api/utils';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import * as signal from '@aspnet/signalr';
import { getToastMessageTypeByName } from './toast';
import TurnedInIcon from '@mui/icons-material/TurnedIn';
import WarningIcon from '@mui/icons-material/Warning'; 
import HelpIcon from '@mui/icons-material/Help';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpDrawer from './help-drawer';
import FeedbackDrawer from './feedback-drawer';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({

  topnav: {
    // height: "4em",
    paddingLeft: "0em",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid"
  },
  innernav: {
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    width: "100%"
  },
  home: {
    display: 'flex',
    minWidth: '100px',
    cursor: 'pointer',
  },
  homeText: {
    display: 'flex',
    margin: '0em 0em 0em 1em'
  },
  logo: {
    maxHeight: '2em',
    margin: '0 0 0 0em',

    flow: 'left'
  },
  logoText: {
    margin: "0",
    paddingBottom: "0.5em"
  },
  userMenuItem: {
    paddingLeft: '1em',
    paddingRight: '1em'
  },
  userName: {
    minWidth: 'fit-content',
    cursor: 'pointer',
  },
  menuBox: {
    outline: 'none',
  },
  topIcon: {
    margin: "0",
    paddingRight: "0.1em"
  },
  signInLink: {
    minWidth: 'fit-content',
  },
  themeToggler: {
    border: 'none'
  }
}));



const MainNavigation = ({
  openToast,
  toggleMainDrawer,
  selectedDataspace
}: {
  openToast: (title: string, message: string, type: ToastMessageType) => any;
  toggleMainDrawer: () => any;
  selectedDataspace?:string;
}) => {

  const { t } = useTranslation();
  const [isNotificationsDrawerOpen, setIsNotificationsDrawerOpen] = useState(false);
  const css = useStyles();
  const navigate = useNavigate();
  const { instance, accounts, inProgress } = useMsal();
  const trustRelayNotifications = useContext(AppNotificationsContext);
  const latestPushNotification = useContext(AppPushNotificationContext);
  const dataspaceCtx = useContext(DataspaceContext);
  const memberships = useContext(MembershipsContext);
  const [membershipsLoaded, setMembershipsLoaded] = useState(false);

  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated();
  const [finishedLoading, setFinishedLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [jwt, setJwt] = useState('');



  const builder = new signal.HubConnectionBuilder();

  const url = process.env.REACT_APP_SIGNALR_FX_BASE_URL;
  
  let connection: signal.HubConnection;
  connection = builder.withUrl(`${url}`).build();

  const [anchorDataspacesElement, setAnchorSettingsElement] = React.useState(null);
  const [anchorAccountElement, setAnchorAccountElement] = React.useState(null);

  const handleClickDataSpaces = (event: any) => {
    setAnchorSettingsElement(event.currentTarget);
  };


  const handleCloseDataspaces = () => {
    setAnchorSettingsElement(null);
  };

  const handleClickAccount = (event: any) => {
    setAnchorAccountElement(event.currentTarget);
  };

  const handleCloseAccount = () => {
    setAnchorAccountElement(null);
  };

  const [isFeedbackDrawerOpen, setIsFeedbackDrawerOpen] = useState(false);

  const toggleFeedbackDrawer = () => {
    setIsFeedbackDrawerOpen(!isFeedbackDrawerOpen);
  }


  const [isHelpDrawerOpen, setIsHelpDrawerOpen] = useState(false);

  const toggleHelpDrawer = () => {
    setIsHelpDrawerOpen(!isHelpDrawerOpen);
  }


  const handleClickDataspace = (dataspaceId: string) => {

    setAnchorSettingsElement(null);

    if (dataspaceCtx != null) {
      localStorage.setItem('selectedDataspace', dataspaceId)
      navigate(`/dataspaces/${dataspaceId}/dashboard`)
      dataspaceCtx.setDataspaceState(dataspaceId);
    }

  }


  const handleClickAccountSettings = () => {

    setAnchorSettingsElement(null);
    navigate(PathNames.Account)
  }
 

  const handleSendFeedback = (satisfactionLevel: string, feedbackText: string, canEmailYou: boolean) => {
    trustRelayService.sendFeedback(jwt, satisfactionLevel, feedbackText, canEmailYou).then(() => {

    }).catch((err: Error) => {
      openToast(`error`, err.message, getToastMessageTypeByName('error'));
    });
  }

  const handleClickSignout = () => {
    if(typeof window !== 'undefined'){
      const theme =  localStorage.getItem('theme')
      localStorage.clear()
      if (theme) localStorage.setItem('theme', theme)
    }
   
    instance.logout()
  }


  useEffect(() => {
    

    if (isAuthenticated && account != null && !finishedLoading) {
     

      if (jwt == "") {
        instance.acquireTokenSilent({
          scopes: protectedResources.api.scopes,
          account: account
        }).then((returnedToken) => {
          
          setJwt(returnedToken.idToken)
        }).catch((error: any) => {
      
          console.log(error)
          // in case if silent token acquisition fails, fallback to an interactive method
          if (error instanceof InteractionRequiredAuthError) {
            if (account && inProgress === "none") {
              instance.acquireTokenPopup({
                scopes: protectedResources.api.scopes,
              }).then((returnedToken) => {
              
                setJwt(returnedToken.idToken)
              })
            }
          }
        });
      } else {

        
        trustRelayService
          .getNotifications(jwt)
          .then((res: Array<AppNotification>) => {
           
            setFinishedLoading(true);

            trustRelayNotifications.setTrustRelayNotificationsState(sortByTime(res, "timestamp"));

          }).catch((err: Error) => {
            openToast(`error`, err.message, getToastMessageTypeByName('error'));
          });



        if (!listening && account != null) {
        
          connection.on(account.localAccountId, hubNotificationHandler); //user channel
          connection.start().then(function () {
            setListening(true);
           
          }).catch(function (error: any) {
          
            console.error(error)
          })
        }


        if (memberships.membershipsState.length <= 0 && !membershipsLoaded && jwt != "") {
          trustRelayService.getMemberships(jwt).then((res) => {
            memberships.setMembershipsState(res);
            setMembershipsLoaded(true);
          }).catch((err: Error) => {
            openToast(`error`, err.message, getToastMessageTypeByName('error'));
          });
        }
        else {
     
        }

      }

    } else {
     
    }

  }, [trustRelayNotifications.trustRelayNotificationsState, jwt, finishedLoading, isAuthenticated])

  const toggleNotificationsDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
    if (
      event &&
      event.type === 'keydown' &&
      ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')
    ) {
      return;
    }
    setIsNotificationsDrawerOpen(open);
  };

  const isDataspaceSelected = () => {
    return selectedDataspace && selectedDataspace.length >0 || dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState != '';
  }

  const getDataspaceTooltip = () => {
    return (dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== '') ? dataspaceCtx.dataspaceState : "select a dataspace";
  }

  const goHome = () => {
    let home = isAuthenticated ? `/dataspaces/${dataspaceCtx.dataspaceState}/dashboard` : PathNames.Home
    navigate(home)
  }

  const hubNotificationHandler = (
    type: string,
    time: string,
    data: string) => {
    
    if (!type || !time) return;


    const notificationPayload = JSON.parse(data);
    
    openToast(`${notificationPayload.title}`, `${notificationPayload.body}`, getToastMessageTypeByName(notificationPayload.notificationType));

    latestPushNotification.setTrustRelayPushNotificationState(time)
    trustRelayService
      .getNotifications(jwt)
      .then((res: Array<AppNotification>) => {

        setFinishedLoading(true);

        trustRelayNotifications.setTrustRelayNotificationsState(sortByTime(res, "timestamp"));

      }).catch((err: Error) => {
        openToast('error', err.message, getToastMessageTypeByName('error'))
      })


  };

  return (<AppNotificationsContext.Consumer>
    {({ trustRelayNotificationsState: swisscomNotificationsState, setTrustRelayNotificationsState: setSwisscomNotificationsState }) => (<>
      <AppBar component="header" position="fixed" color="inherit" className={css.topnav} >

        <Toolbar variant="dense" className={css.innernav}>

          <AuthenticatedTemplate>

            <IconButton className={css.topIcon} aria-label="toggle main drawer" onClick={() => toggleMainDrawer()}>
              <MenuIcon />
            </IconButton>

          </AuthenticatedTemplate>
          <Link underline="none" onClick={goHome}>
            <div className={css.home}>
              <img className={css.logo} src="https://cdn.trustrelay.io/media/TrustRelayLogoMini.svg" alt="TrustRelay logo"  />
              <Typography style={{ float: "left", margin: "8px 0 0 -7px" }}>TrustRelay</Typography>
            </div>
          </Link>

          <div className={css.divider}></div>

          <AuthenticatedTemplate>

            <DataspaceContext.Consumer>
              {({ dataspaceState, setDataspaceState }) => (

                <>
                  <Tooltip title={getDataspaceTooltip()}>
                    <IconButton className={css.topIcon} onClick={handleClickDataSpaces}  >
                      {(isDataspaceSelected()) ? <TurnedInIcon /> : <WarningIcon />}
                    </IconButton>
                  </Tooltip>

                  <Menu
                    id="dataspace-menu"
                    anchorEl={anchorDataspacesElement}
                    keepMounted
                    open={Boolean(anchorDataspacesElement)}
                    onClose={handleCloseDataspaces}
                  >
                    {memberships.membershipsState.map((item) => <MenuItem key={item.dataspace} value={item.dataspace} onClick={() => handleClickDataspace(item.dataspace)} >{item.dataspaceName}</MenuItem>)}

                  </Menu>
                </>
              )}
            </DataspaceContext.Consumer>



            <Tooltip title={`${t('labels.notifications')}`}>
              <IconButton className={css.topIcon} onClick={toggleNotificationsDrawer(true)}>
                <Badge badgeContent={swisscomNotificationsState.length} color="primary">
                  <NotificationsIcon />
                </Badge>
              </IconButton>
            </Tooltip>

            <Tooltip title={`${t('labels.feedback')}`}>
              <IconButton className={css.topIcon} onClick={toggleFeedbackDrawer}>

                <FeedbackIcon />

              </IconButton>
            </Tooltip>

            <Tooltip title={`${t('labels.help')}`}>
              <IconButton className={css.topIcon} onClick={toggleHelpDrawer}>

                <HelpIcon />

              </IconButton>
            </Tooltip>



            {accounts.length > 0 ? (<><Tooltip title={`${accounts[0].username}`}>
              <IconButton className={css.topIcon} onClick={handleClickAccount}  >
                <PersonIcon />
              </IconButton>
            </Tooltip>
              <Menu
                id="account-menu"
                anchorEl={anchorAccountElement}
                keepMounted
                open={Boolean(anchorAccountElement)}
                onClose={handleCloseAccount}
              > 
                <MenuItem onClick={handleClickAccountSettings}>{t('labels.accountSettings')}</MenuItem>
                <MenuItem onClick={handleClickSignout}>{t('labels.signout')}</MenuItem>

              </Menu>

            </>) : <></>}

          </AuthenticatedTemplate>

          <UnauthenticatedTemplate>

            <Tooltip title={`Sign in`}>
              <IconButton className={css.topIcon} onClick={() => instance.loginRedirect(loginRequest)} >
                <PersonOutlineIcon />
              </IconButton>
            </Tooltip>

          </UnauthenticatedTemplate>

        </Toolbar>
      </AppBar>
      <NotificationsDrawer
        isDrawerOpen={isNotificationsDrawerOpen}
        handleClose={setIsNotificationsDrawerOpen}
        openToast={openToast}
      />

      <FeedbackDrawer
        open={isFeedbackDrawerOpen}
        handleClose={toggleFeedbackDrawer}
        onAction={handleSendFeedback}
      />

      <HelpDrawer
        open={isHelpDrawerOpen}
        handleClose={toggleHelpDrawer}
      />
    </>
    )}
  </AppNotificationsContext.Consumer>

  );
};

export default MainNavigation;
