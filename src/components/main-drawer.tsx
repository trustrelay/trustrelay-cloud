import { useContext, useEffect, useState } from 'react';
import { Typography,  IconButton, Link, Drawer, Toolbar, List, ListItem, ListItemIcon, ListItemText, Theme, Divider } from '@mui/material'; 
import CloseIcon from '@mui/icons-material/Close'; 
import { useNavigate } from "react-router-dom";
import { PathNames } from '../CustomRouter'; 
import ArchiveIcon from '@mui/icons-material/Archive';
import BallotIcon from '@mui/icons-material/Ballot';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import { DataspaceContext } from '../app-contexts';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@mui/icons-material/Dashboard';
import CloudDoneIcon from '@mui/icons-material/CloudDone'; 
import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode'; 
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    root: {

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
        width: "300px",
        padding: "0em 1em 1em 1em",
        backgroundColor: "transparent"
    },
    center: {
        textAlign: "center"
    },

    upperPad: {
        height: '5px',
        border: 'none'
    },
    home: {
        display: 'flex',
        minWidth: 'max-content',
    },
    logo: {
        maxHeight: '2em',
        margin: '0 0 0 0em',
    },
    logoText: {
        margin: "0",
        paddingBottom: "0.5em"
    },
    topIcon: {
        margin: "0",
        paddingTop: "3em",
        paddingRight: "1em"
    },
}));

const MainDrawer = ({
    open,
    handleClose,
    selectedDataspace
}: {
    open: boolean;
    handleClose: () => any;
    selectedDataspace?: string;
}) => {

    const { t } = useTranslation();
    const navigate = useNavigate();
   

    const dataspaceCtx = useContext(DataspaceContext);

    const [currentDataspace, setCurrentDataspace] = useState('')

    const css = useStyles();

    useEffect(()=>{
        if(dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState.length>0){
            setCurrentDataspace(dataspaceCtx.dataspaceState)
        } else{
           if(selectedDataspace){ 
               setCurrentDataspace(selectedDataspace)
            }
        }
    },[dataspaceCtx.dataspaceState])

    return (
        <Drawer className={css.root} variant="temporary" open={open} BackdropProps={{ invisible: true }} onClose={handleClose} >

            <Toolbar className={css.innernav}>
                <IconButton className={css.topIcon} aria-label="toggle main drawer" onClick={() => handleClose()}>
                    <CloseIcon />
                </IconButton>

                <Link underline="none" onClick={() => navigate(PathNames.Home)}>
                    <div className={css.home}>
                        <img className={css.logo} src="https://cdn.trustrelay.io/media/TrustRelayLogoMini.svg" alt="TrustRelay logo" />
                        <Typography style={{ float: "left", margin: "8px 0 0 -7px" }}>TrustRelay</Typography>
                    </div>
                </Link>
            </Toolbar>

            <div className={css.drawerContainer}>

                <List>

                    {(currentDataspace != null && currentDataspace.length > 0)   ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/dashboard`)} >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.dashboard')} />
                    </ListItem> : <></>}


                    <Divider />


                    {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/commons`)} >
                        <ListItemIcon><ArchiveIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.commons')} />
                    </ListItem> : <></>}

                    {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/insights`)} >
                        <ListItemIcon> <EqualizerIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.insights')} />
                    </ListItem> : <></>}


                </List>
                <Divider />
 

                {(currentDataspace!= null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/template-agreements`)} >
                    <ListItemIcon><BallotIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.templateAgreements')} />
                </ListItem> : <></>}

                {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/settings/service-connections`)} >
                    <ListItemIcon><CloudDoneIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.serviceConnections')} />
                </ListItem> : <></>}

                {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => navigate(`/dataspaces/${currentDataspace}/audit-logs`)} >
                    <ListItemIcon><ChromeReaderModeIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.auditLogs')} />
                </ListItem> : <></>}
                <List>
                </List>
            </div>
        </Drawer>
    )
}

export default MainDrawer;