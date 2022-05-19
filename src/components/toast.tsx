import {
  Snackbar, 
  IconButton, 
  Paper, 
  ListItem,
  ListItemAvatar,
  ListItemText,
  ListItemSecondaryAction,
  List, 
  Avatar,
  Theme
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import {  ToastMessageInfo } from '../app-contexts'; 
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import { green, yellow, red, blue } from '@mui/material/colors';
import InfoIcon from '@mui/icons-material/Info';
import { ToastMessageType } from '../app-contexts';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    error: {
      color: theme.palette.error.main,
    },
    success: {
      color: theme.palette.success.main,
    },
    warning: {
      color: theme.palette.warning.main,
    },
    info: {
      color: theme.palette.info.main,
    },
    root: {
      backgroundColor: theme.palette.background.default, 
      minWidth: 'fit-content',
      maxWidth:'25em',
      padding: '1em 1em 1em 1em',
      margin: '5em 0em 0em 0em', 
      zIndex:999999
    },
    notification: {
      padding: '0em 0em 0em 0em',
      margin: '0em 0em 0em 0em',  
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
      padding: '0em 0em 0em 0em',
      margin: '0em 0em 0em 0em' 
    },
    itemAvatar: {
      minWidth: 0,
      padding: '0em 0em 0em 0em',
      margin: '0em 0em 0em 0em'
    },
    avatar: {
      backgroundColor: "inherit"
    },
    icon: {
      height: "10px",
      width: "10px",
      padding: '0',
      margin: '0',
      textAlign: "right"
    }
  }));

export const getToastMessageTypeByName = (name: string) => {
  switch (name) {
    case "success":
      return ToastMessageType.Success;
    case "error":
      return ToastMessageType.Error;
    case "info":
      return ToastMessageType.Info;
    case "warn":
      return ToastMessageType.Warning;
  }
  return ToastMessageType.Closed;
}
 
export const Toast = ({ value, close }: { value: ToastMessageInfo; close: () => any; }) => {
  const css = useStyles();
  const toastMessages = {
    Error: css.error,
    Success: css.success,
    Warning: css.warning,
    Info: css.info,
    Closed: css.info,
  };

  const displayIcon = (type: ToastMessageType) => {
    if (type === ToastMessageType.Warning) return (<WarningIcon style={{ color: yellow[500] }} fontSize="small" />)
    if (type === ToastMessageType.Error) return (<ErrorIcon style={{ color: red[500] }} fontSize="small" />)
    if (type === ToastMessageType.Success) return (<CheckCircleIcon style={{ color: green[500] }} fontSize="small" />)
    return (<InfoIcon style={{ color: blue[500] }} fontSize="small" />)
  }

  return (
    <Snackbar
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={value.open}
      autoHideDuration={10000}
      onClose={close}
      TransitionProps={{ enter: true, exit: false }}
    >
      <Paper elevation={3} className={`${toastMessages[value.messageType]} ${css.root}`} >

        <List className={css.notification} >
          <ListItem className={css.notificationItem}>
            <ListItemAvatar className={css.itemAvatar}>
              <Avatar className={css.avatar}>
                {displayIcon(value.messageType)}
              </Avatar>
            </ListItemAvatar>
            <ListItemText primary={value.title} secondary={value.message} />
            <ListItemSecondaryAction className={css.notificationAction}>
              <IconButton className={css.icon}
                onClick={()=>close()}>

                <CloseIcon color="action" fontSize="small" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>

        </List>

      </Paper>

    </Snackbar>
  );
};