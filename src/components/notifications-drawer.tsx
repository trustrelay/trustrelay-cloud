import  { useContext, useEffect, useState } from 'react';
import { 
  LinearProgress,
  Typography,
  Drawer,
  Grid,
  IconButton,
  Box,
  List,
  Divider,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  ListItemSecondaryAction,
  Link,
  Theme
} from '@mui/material';

import { useTranslation } from 'react-i18next';
import { AppNotificationsContext, ToastMessageType } from '../app-contexts';
import moment from 'moment';
import CloseIcon from '@mui/icons-material/Close';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red, blue } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import swisscomService from '../api/trustrelay-service';
import { AppNotification } from '../api/models/models';
import { useAccount, useIsAuthenticated, useMsal } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '280px',
    flexGrow: 1, 
  }, 
  header: {
    margin: '1em 1em 1em 1em'
  },
  notification: {
    marginTop: '10px',
    margin: '1em 1em 1em 1em',
    paddingLeft: 0,
    paddingRight: 0,
    cursor: "pointer"
  },
  notificationAction: {
    height: "100%",
    paddingRight: 0
  },
  notificationTime: {
    fontSize: 'small',
    width: "100%"
  },
  notificationItem: {
    paddingLeft: 0,
    paddingRight: 0
  },
  itemAvatar: {
    minWidth: 0
  },
  avatar: { 
  },
  icon: {
    height: "10px",
    width: "10px",
    padding: '0',
    margin: '0',
    textAlign: "right"
  },
  timespan: {
    fontSize: "1em",
    textAlign: "right",
    fontStyle: "italic"
  },
  noNotifications: {
    paddingLeft: "1em"
  }
}));

const NotificationsDrawer = ({
  isDrawerOpen,
  handleClose,
  openToast
}: {
  isDrawerOpen: boolean;
  handleClose: (open: boolean) => any;
  openToast: (title: string, message: string, type: ToastMessageType) => any;
}) => {
  const css = useStyles();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const trustRelayNotifications = useContext(AppNotificationsContext);
  const { instance, accounts, inProgress } = useMsal();
  const account = useAccount(accounts[0] || {});
  const isAuthenticated = useIsAuthenticated();

  useEffect(() => {
   
  }, [trustRelayNotifications.trustRelayNotificationsState])

  const hideDismisedNotification = (id: string) => {

    const oldNotifications = [...trustRelayNotifications.trustRelayNotificationsState];
    const itemToRemove = oldNotifications.find((n) => n.id === id);
    if (itemToRemove) {
      const index = oldNotifications.indexOf(itemToRemove);
      oldNotifications.splice(index, 1);
      trustRelayNotifications.setTrustRelayNotificationsState(oldNotifications);
    }
  };

  const ackNotification = (notificationId: string) => {

    if (!isAuthenticated && !inProgress) {
     
      instance.loginRedirect(loginRequest)
    }

    if (isAuthenticated && account) {
      instance.acquireTokenSilent({
        scopes: protectedResources.api.scopes,
        account: account!
      }).then((returnedToken) => {
    

        swisscomService.ackNotification(returnedToken.idToken, notificationId)
          .then(() => {
            hideDismisedNotification(notificationId);
          })
          .catch((err) => {
            console.log(err)
            openToast('[notifications-drawer] error', 'an error occurred while acknowledging notification', ToastMessageType.Error)
          });
      })
    }
  };

  const displayIcon = (type: string) => {
    if (type === 'warn') return (<WarningIcon style={{ color: yellow[500] }} fontSize="small" />)
    if (type === 'error') return (<ErrorIcon style={{ color: red[500] }} fontSize="small" />)
    if (type === 'success') return (<CheckCircleIcon style={{ color: green[500] }} fontSize="small" />)
    return (<InfoIcon style={{ color: blue[500] }} fontSize="small" />)
  }

  const evaluateClosing = (event: any, reason: string) => {
    if (reason === 'backdropClick') {
      handleClose(false)
    }
    return
  }

  const getTimespan = (value: string) => {
    var now = moment.utc(new Date());
    var since = moment.utc(value);
    var duration = moment.duration(now.diff(since));
    const durationInSecs = duration.asSeconds()
    const durationInMinutes = duration.asMinutes();
    if (durationInMinutes < 5) {
      if (durationInSecs < 60) {
        if (durationInSecs <= 0) {
          return `now`
        }
        else {
          return `${Math.round(durationInSecs)} sec ago`
        }
      }
      else {
        return `${Math.round(durationInMinutes)} min ago`
      }
    }
    else {
      return moment(since).local().format('YYYY-MM-DD HH:mm:ss');
    }
  }

  const drawerContent = (notifications: Array<AppNotification>) => (
    <div role="presentation" >
      {loading ? (
        <LinearProgress color="primary" />
      ) : (
        <Grid container className={css.root} alignContent="flex-start" direction="row" alignItems="center">
          <Grid container item className={css.header}>

            <Box display="flex" p={1} >
              <Box p={1} width="100%" >
                <Typography variant="h5"   >
                  {t('labels.notifications')}
                </Typography>
              </Box>

              <Box p={1} flexShrink={0}>
                <IconButton onClick={() => handleClose(false)} className={css.icon} >
                  <CloseIcon fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Grid>
          {error ? (
            <Grid item>
              <p> {t('errorMessages.getNotifications')} </p>
            </Grid>
          ) : (
            <Grid item>
              {notifications.length > 0 ? (
                <Grid item>
                  <List >
                    {notifications.map((notification) => (

                      <div className={css.notification} key={notification.id} id={notification.id} >
                        <Divider variant="inset" component="li" />
                        <ListItem className={css.notificationItem}>
                          <ListItemAvatar className={css.itemAvatar}>
                            <Avatar className={css.avatar}>
                              {displayIcon(notification.type)}
                            </Avatar>
                          </ListItemAvatar>
                          <ListItemText primary={notification.title} secondary={notification.body} />
                          <ListItemSecondaryAction className={css.notificationAction}>
                            <Link color="textSecondary" component="button" onClick={() => ackNotification(notification.id)} >{t('labels.dismiss')}</Link>
                          </ListItemSecondaryAction>
                        </ListItem>
                        <Typography variant="caption" className={css.timespan}>{getTimespan(notification.timestamp)}</Typography>
                      </div>

                    ))}
                  </List>
                </Grid>


              ) : (
                <Grid item >
                  <Typography className={css.noNotifications} variant="caption" >{t('messages.noNewNotifications')}</Typography>
                </Grid>
              )}
            </Grid>
          )}
        </Grid>

      )
      }
    </div >
  );
  return (<AppNotificationsContext.Consumer>
    {({ trustRelayNotificationsState: swisscomNotificationsState, setTrustRelayNotificationsState: setSwisscomNotificationsState }) => (
      <Drawer anchor="right" open={isDrawerOpen} onClose={evaluateClosing}>
        {drawerContent(swisscomNotificationsState)}
      </Drawer>
    )}
  </AppNotificationsContext.Consumer>
  );
};

export default NotificationsDrawer;
