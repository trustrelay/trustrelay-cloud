import React, { useContext, useEffect, useState } from 'react';
import { Typography, makeStyles, IconButton, Link } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import List from '@material-ui/core/List';
import Toolbar from '@material-ui/core/Toolbar'; 
import CloseIcon from '@material-ui/icons/Close'; 
import { useHistory } from "react-router-dom";
import { PathNames } from '../CustomRouter'; 
import ArchiveIcon from '@material-ui/icons/Archive';
import BallotIcon from '@material-ui/icons/Ballot';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import { DataspaceContext } from '../app-contexts';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@material-ui/icons/Dashboard';
import CloudDoneIcon from '@material-ui/icons/CloudDone'; 
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode'; 

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
    let history = useHistory();
    const useStyles = makeStyles({
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
    })

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

                <Link underline="none" onClick={() => history.push(PathNames.Home)}>
                    <div className={css.home}>
                        <img className={css.logo} src="https://cdn.trustrelay.io/media/TrustRelayLogoMini.svg" alt="TrustRelay logo" />
                        <Typography style={{ float: "left", margin: "8px 0 0 -7px" }}>TrustRelay</Typography>
                    </div>
                </Link>
            </Toolbar>

            <div className={css.drawerContainer}>

                <List>

                    {(currentDataspace != null && currentDataspace.length > 0)   ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/dashboard`)} >
                        <ListItemIcon><DashboardIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.dashboard')} />
                    </ListItem> : <></>}


                    <Divider />


                    {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/commons`)} >
                        <ListItemIcon><ArchiveIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.commons')} />
                    </ListItem> : <></>}

                    {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/insights`)} >
                        <ListItemIcon> <EqualizerIcon /></ListItemIcon>
                        <ListItemText primary={t('labels.insights')} />
                    </ListItem> : <></>}


                </List>
                <Divider />


                {/* {(currentDataspace!= null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/organizations`)} >
                    <ListItemIcon> <BusinessIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.organizations')} />
                </ListItem> : <></>} */}

                {(currentDataspace!= null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/template-agreements`)} >
                    <ListItemIcon><BallotIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.templateAgreements')} />
                </ListItem> : <></>}

                {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/settings/service-connections`)} >
                    <ListItemIcon><CloudDoneIcon /></ListItemIcon>
                    <ListItemText primary={t('labels.serviceConnections')} />
                </ListItem> : <></>}

                {(currentDataspace != null && currentDataspace.length > 0) ? <ListItem button component="button" onClick={() => history.push(`/dataspaces/${currentDataspace}/audit-logs`)} >
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