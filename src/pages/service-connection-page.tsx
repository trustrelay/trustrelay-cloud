import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody, Checkbox, AppBar, Tabs, Tab, Divider, Accordion, AccordionSummary, AccordionDetails, Hidden, Chip, makeStyles, Theme, createStyles, Tooltip } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { Common, DailyCount, Ping, ServiceConnection, Task } from '../api/models/models';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useHistory, useParams, Link } from "react-router-dom";
import TabPanel from '../components/tab-panel';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import { formatDateTime } from "../api/utils";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';

import CloudDoneIcon from '@material-ui/icons/CloudDone';
import EditServiceConnectionDrawer from '../components/service-connections-page/edit-service-connection-drawer';
import DeleteServiceConnectionDrawer from '../components/service-connection-page/delete-service-connection-drawer';

const ServiceConnectionPage = () => {

    const useStyles = makeStyles(({ palette, ...theme }) => ({
        breadcrumbLink: {
            color: palette.primary.main
        }

    })
);

    const toast = useToast();
    const { t } = useTranslation();
    const history = useHistory();
    const css = useStyles();



    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const { dataspaceid, serviceconnectionid } = useParams<{ dataspaceid: string, serviceconnectionid: string }>();

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const [isEditServiceConnectionDrawerOpen, setIsEditServiceConnectionDrawerOpen] = useState(false);
    const [isDeleteServiceConnectionDrawerOpen, setIsDeleteServiceConnectionDrawerOpen] = useState(false);


    const toggleEditServiceConnectionDrawer = () => {
        setIsEditServiceConnectionDrawerOpen(!isEditServiceConnectionDrawerOpen);
    }

    const toggleDeleteServiceConnectionDrawer = () => {
        setIsDeleteServiceConnectionDrawerOpen(!isDeleteServiceConnectionDrawerOpen);
    }


    const emptyServiceConnection: ServiceConnection = {
        id: "",
        name: "",
        timestamp: "",
        storageProvider: "",
        storageLocation: "",
        user: "",

        hostOrService: "",
        hostPort: "",
        databaseOrContainer: "",
        accountOrUserOrId: "",
        secretPreview: "",

        dataspace: "",
        up: false,
        lastChecked: "",
        isLocked:false
    };
    const [selectedServiceConnection, setSelectedServiceConnection] = useState(emptyServiceConnection);
    const [serviceConnectionLoaded, setServiceConnectionLoaded] = useState(false);

    const [value, setValue] = React.useState(0);



    const emptyPingList: Array<Ping> = [];
    const [pings, setPings] = useState(emptyPingList);
    const [loadedPings, setLoadedPings] = useState(false);

    const emptyDailyPingCountList: Array<DailyCount> = [];
    const [pingsPerDay, setPingsPerDay] = useState(emptyDailyPingCountList);
    const [loadedPingsPerDay, setLoadedPingsPerDay] = useState(false);




    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const editServiceConnection = (
        serviceConnectionId: string,
        serviceConnectionName: string, 
        storageLocation: string,
        hostOrService: string,
        hostPort: string,
        databaseOrContainer: string,
        accountOrUserOrId: string,
        secret: string
    ) => {
        trustRelayService.editServiceConnection(
            jwt,
            dataspaceid,
            serviceConnectionId,
            serviceConnectionName, 
            storageLocation,
            hostOrService,
            hostPort,
            databaseOrContainer,
            accountOrUserOrId,
            secret
        ).then(() => {
   
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }

    const deleteServiceConnection = () => {
        trustRelayService.deleteServiceConnection(
            jwt,
            dataspaceid,
            serviceconnectionid 
            ).then(() => {
          
            }).catch((err: Error) => {
                toast.openToast('error', err.message, getToastMessageTypeByName('error'))
            })
    }



    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState != null && dataspaceCtx.dataspaceState != "" && selectedServiceConnection.id.length > 0) {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                    {/* <AppBar position="static">
                        <Tabs
                            variant="scrollable"
                            scrollButtons={true}
                            value={value}
                            onChange={handleTabChange}
                            aria-label="source tabs">

                         
                            <Tab label={t('labels.pings')} {...a11yProps(0)} />
                            <Tab label={t('labels.pingsChart')} {...a11yProps(1)} />

                        </Tabs>
                    </AppBar>

                  

                    <TabPanel id="pings" value={value} index={0}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                               
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel id="chart" value={value} index={1}>
                        <Grid item container direction="column" rowGap={1}>

                            <Grid item>&nbsp;</Grid>

                            <Grid item style={{ width: "100%", height: "150px", alignContent: "left", textAlign: "left", alignItems: "left" }}>
                                
                            </Grid>

                        </Grid>

                    </TabPanel> */}

                    <EditServiceConnectionDrawer
                        serviceConnection={selectedServiceConnection}
                        open={isEditServiceConnectionDrawerOpen}
                        handleClose={toggleEditServiceConnectionDrawer}
                        onAction={editServiceConnection}
                    />

                    <DeleteServiceConnectionDrawer
                        serviceConnection={selectedServiceConnection}
                        open={isDeleteServiceConnectionDrawerOpen}
                        handleClose={toggleDeleteServiceConnectionDrawer}
                        onAction={deleteServiceConnection}
                    />


                </Grid>
            )
        } else {
            return <Grid item container><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

    function generateGeneralInfoTable(serviceConnection: ServiceConnection) {
        if (serviceConnection) {
            return (
                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>


                    <Accordion variant="outlined" defaultExpanded style={{ width: "100%" }}>
                        <AccordionSummary
                            title="Hide/Show"
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="essentials-content"
                            id="essentials-header"
                        >
                            <Typography variant="body1" style={{ fontWeight: "bold" }}>{t('labels.generalInfo')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <TableContainer >
                                        <Table aria-label="simple table" size="small">
                                            <TableBody>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.id')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.id}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.storageProvider')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.storageProvider}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.storageLocation')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.storageLocation}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.databaseOrContainer')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.hostOrService}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.hostPort')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.hostPort}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.databaseOrContainer')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.databaseOrContainer}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.accountOrUserOrId')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.accountOrUserOrId}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.secret')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.secretPreview}</Typography></TableCell>
                                                </TableRow>


                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                                <Grid item xs={12} sm={2} md={2} lg={2} xl={2}>
                                </Grid>

                                <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                                    <TableContainer >
                                        <Table aria-label="simple table" size="small">
                                            <TableBody>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.status')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">Active</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.locked')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.isLocked.toString()}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.up')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{serviceConnection.up.toString()}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.lastChecked')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDateTime(serviceConnection.lastChecked)}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.timestamp')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDateTime(serviceConnection.timestamp)}</Typography></TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </Grid>
                            </Grid>
                        </AccordionDetails>
                    </Accordion>
                </Grid>

            )

        }

        return <span>  {t('labels.loading')}</span>
    }

    const refreshData = () => {
        setServiceConnectionLoaded(false);
        setSelectedServiceConnection(emptyServiceConnection);
        setPingsPerDay(emptyDailyPingCountList);
        setLoadedPingsPerDay(false);
        setPings(emptyPingList);
        setLoadedPings(false);

    }

    useEffect(() => {
      

        if (selectedDataspace != "" && !serviceConnectionLoaded && jwt != "") {


            trustRelayService.getServiceConnection(jwt, dataspaceid, serviceconnectionid).then((res) => {
                setSelectedServiceConnection(res);
                setServiceConnectionLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });



        }
        else {
          
        }


    }, [selectedDataspace, serviceConnectionLoaded])







    useEffect(() => {
        

        if (isAuthenticated) {

            if (jwt != "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setServiceConnectionLoaded(false);
                    setSelectedServiceConnection(emptyServiceConnection);
                    setPingsPerDay(emptyDailyPingCountList);
                    setLoadedPingsPerDay(false);
                    setPings(emptyPingList);
                    setLoadedPings(false);

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
        isAuthenticated])
    // latestPushNotification
    // appNotifications.swisscomNotificationsState,
    return (
        <LayoutPage
            toast={toast}
            openToast={toast.openToast}
            closeToast={toast.closeToast}
        >

            <LayoutCentered fullHeight>
                <Grid container item direction="column" rowGap={2} columnGap={1} spacing={1}>
                    <Grid item container>
                        <Breadcrumbs aria-label="breadcrumb">
                        <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceid}/dashboard`} >
                                {t('labels.dashboard')}
                            </Link>
                            <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceCtx.dataspaceState}/settings/service-connections`} >
                                {t('labels.serviceConnections')}
                            </Link>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <CloudDoneIcon fontSize="medium" color="primary" style={{ marginTop: "6px", marginRight: "2px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{selectedServiceConnection.name}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >



                        <Button variant="text"
                            color="primary"
                            startIcon={<EditIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleEditServiceConnectionDrawer}
                        >
                            {t('labels.edit')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<DeleteIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleDeleteServiceConnectionDrawer}
                            disabled={selectedServiceConnection.isLocked} 
                        >
                            {t('labels.delete')}
                        </Button>



                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                        >
                            {t('labels.refresh')}
                        </Button>

                    </Grid>
                    {(selectedServiceConnection) ? generateGeneralInfoTable(selectedServiceConnection) : <Grid item>&nbsp;</Grid>}
                    <AuthenticatedTemplate>


                        <Grid item container >
                            <DataspaceContext.Consumer>
                                {({ dataspaceState }) => (
                                    renderContent()
                                )}
                            </DataspaceContext.Consumer>
                        </Grid>
                        <Grid item>
                            &nbsp;
                        </Grid>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>

                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/service-connections/${serviceconnectionid}`})} >Login first</Button>
                            </Grid>
                        </Grid>
                    </UnauthenticatedTemplate>
                    <Grid item>
                        &nbsp;
                    </Grid>
                </Grid>

            </LayoutCentered>
        </LayoutPage>


    );
};

export default ServiceConnectionPage;