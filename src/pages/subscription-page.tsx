import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, TableContainer,  Table,  TableRow, TableCell, TableBody,  Divider, Accordion, AccordionSummary, AccordionDetails,  Theme} from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import {  DailyCount, Ping,  Subscription } from '../api/models/models';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useNavigate, useParams, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import { formatDate, formatDateTime } from "../api/utils";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DynamicFeedIcon from '@mui/icons-material/DynamicFeed';
import CancelIcon from '@mui/icons-material/Cancel';
import ClassIcon from '@mui/icons-material/Class';
import UpgradeSubscriptionDrawer from '../components/subscription-page/upgrade-subscription-drawer';
import CancelSubscriptionDrawer from '../components/subscription-page/cancel-subscription-drawer';
import EditSubscriptionDrawer from '../components/subscription-page/edit-subscription-drawer';
import Forward30Icon from '@mui/icons-material/Forward30';
import ExtendTrialSubscriptionDrawer from '../components/subscription-page/extend-trial-subscription-drawer';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const SubscriptionPage = () => {

 

    const toast = useToast();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const css = useStyles();



    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const { subscriptionid } = useParams<{ subscriptionid: string }>();

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const [isUpgradeSubscriptionDrawerOpen, setIsUpgradeSubscriptionDrawerOpen] = useState(false);
    const [isCancelSubscriptionDrawerOpen, setIsCancelSubscriptionDrawerOpen] = useState(false);
    const [isEditSubscriptionDrawerOpen, setIsEditSubscriptionDrawerOpen] = useState(false);
    const [isExtendTrialSubscriptionDrawerOpen, setIsExtendTrialSubscriptionDrawerOpen] = useState(false);


    const toggleUpgradeSubscriptionDrawer = () => {
        setIsUpgradeSubscriptionDrawerOpen(!isUpgradeSubscriptionDrawerOpen);
    }

    const toggleCancelSubscriptionDrawer = () => {
        setIsCancelSubscriptionDrawerOpen(!isCancelSubscriptionDrawerOpen);
    }

    const toggleEditSubscriptionDrawer = () => {
        setIsEditSubscriptionDrawerOpen(!isEditSubscriptionDrawerOpen);
    }

    const toggleExtendTrialSubscriptionDrawer = () => {
        setIsExtendTrialSubscriptionDrawerOpen(!isExtendTrialSubscriptionDrawerOpen);
    }


    const emptySubscription: Subscription = {
        id: "",
        name: "",
        admin1: "",
        admin1Email: "",
        admin2: "",
        admin2Email: "",
        procurement: "",
        procurementEmail: "",
        maxDataspaces: 0,
        maxCommons: 0,
        maxMembers: 0,
        currentDataspaces: 0,
        currentMembers: 0,
        currentCommons: 0,
        subscriptionType: "",
        expires: "",
        isEnabled:false,
        timestamp: ""
    };
    const [selectedSubscription, setSelectedSubscription] = useState(emptySubscription);
    const [subscriptionLoaded, setSubscriptionLoaded] = useState(false);

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


    const handleUpgradeSubscription = (
        subscriptionId: string,
        subscriptionType: string
    ) => {
        trustRelayService.upgradeSubscription(
            jwt,
            subscriptionId,
            subscriptionType
        ).then(() => {
            
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }

    const handleCancelSubscription = () => {
        trustRelayService.cancelSubscription(
            jwt,
            subscriptionid!
        ).then(() => {
           
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }


    const handleEditSubscription = (subscriptionName: string, procurementEmail: string) => {
        trustRelayService.editSubscription(
            jwt,
            subscriptionid!,
            subscriptionName,
            procurementEmail
        ).then(() => {
           
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }

    const handleExtendTrialSubscription = (subscriptionId: string) => {
        trustRelayService.extendTrialSubscription(
            jwt,
            subscriptionid!
        ).then(() => {
            
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }


    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState != null && dataspaceCtx.dataspaceState != "" && selectedSubscription.id.length > 0) {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>



                    <UpgradeSubscriptionDrawer
                        subscription={selectedSubscription}
                        open={isUpgradeSubscriptionDrawerOpen}
                        handleClose={toggleUpgradeSubscriptionDrawer}
                        onAction={handleUpgradeSubscription}
                    />

                    <CancelSubscriptionDrawer
                        subscription={selectedSubscription}
                        open={isCancelSubscriptionDrawerOpen}
                        handleClose={toggleCancelSubscriptionDrawer}
                        onAction={handleCancelSubscription}
                    />

                    <EditSubscriptionDrawer
                        subscription={selectedSubscription}
                        open={isEditSubscriptionDrawerOpen}
                        handleClose={toggleEditSubscriptionDrawer}
                        onAction={handleEditSubscription}
                    />

                    <ExtendTrialSubscriptionDrawer
                        subscription={selectedSubscription}
                        open={isExtendTrialSubscriptionDrawerOpen}
                        handleClose={toggleExtendTrialSubscriptionDrawer}
                        onAction={handleExtendTrialSubscription}
                    />


                </Grid>
            )
        } else {
            return <Grid item container><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

    function generateGeneralInfoTable(subscription: Subscription) {
        if (subscription) {
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{subscription.id}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.dataspaces')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{`${subscription.currentDataspaces}/${subscription.maxDataspaces}`}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.commons')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{`${subscription.currentCommons}/${subscription.maxCommons}`}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.subscriptionType')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{subscription.subscriptionType}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.procurementEmail')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{subscription.procurementEmail}</Typography></TableCell>
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{(selectedSubscription.subscriptionType === "free-trial" && new Date(selectedSubscription.expires) < new Date() || !subscription.isEnabled) ? t('labels.expiredOrCancelled') : "Active"}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.expires')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDate(subscription.expires)}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.timestamp')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDateTime(subscription.timestamp)}</Typography></TableCell>
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
        setSubscriptionLoaded(false);
        setSelectedSubscription(emptySubscription);
        setPingsPerDay(emptyDailyPingCountList);
        setLoadedPingsPerDay(false);
        setPings(emptyPingList);
        setLoadedPings(false);

    }

    useEffect(() => {
       

        if (selectedDataspace != "" && !subscriptionLoaded && jwt != "") {


            trustRelayService.getSubscription(jwt, subscriptionid!).then((res) => {
                setSelectedSubscription(res);
                setSubscriptionLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });



        }
        else {
            
        }


    }, [selectedDataspace, subscriptionLoaded])







    useEffect(() => {
       

        if (isAuthenticated) {

            if (jwt != "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setSubscriptionLoaded(false);
                    setSelectedSubscription(emptySubscription);
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
                            <Link className={css.breadcrumbLink} to={`/account`} >
                                {t('labels.account')}
                            </Link>
                            <Typography variant="body1" color="textPrimary">{t('labels.subscriptions')}</Typography>
                            <Typography variant="body1" color="textPrimary">{subscriptionid}</Typography>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <ClassIcon fontSize="medium" color="primary" style={{ marginTop: "6px", marginRight: "2px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{selectedSubscription.name}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >

                        <Button variant="text"
                            color="primary"
                            startIcon={<EditIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleEditSubscriptionDrawer}

                        >
                            {t('labels.edit')}
                        </Button>

                        {(selectedSubscription.subscriptionType === "free-trial" && new Date(selectedSubscription.expires) < new Date()) ? <Button variant="text"
                            color="primary"
                            startIcon={<Forward30Icon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleExtendTrialSubscriptionDrawer}
                        >
                            {t('labels.extendTrialSubscription')}
                        </Button> : <></>}


                        <Button variant="text"
                            color="primary"
                            startIcon={<DynamicFeedIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleUpgradeSubscriptionDrawer}
                        >
                            {t('labels.upgradeSubscription')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<CancelIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleCancelSubscriptionDrawer}

                        >
                            {t('labels.cancelSubscription')}
                        </Button>



                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                        >
                            {t('labels.refresh')}
                        </Button>

                    </Grid>
                    {(selectedSubscription) ? generateGeneralInfoTable(selectedSubscription) : <Grid item>&nbsp;</Grid>}
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
                                <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/settings/subscriptions/${subscriptionid}` })} >Login first</Button>
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

export default SubscriptionPage;