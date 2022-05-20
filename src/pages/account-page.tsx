import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, Divider, AppBar, Tabs, Tab, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableBody, TableRow, TableCell, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useNavigate } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AddIcon from '@mui/icons-material/Add';
import TabPanel from '../components/tab-panel';
import { TrustRelayAccount, DataspaceInfo, Subscription } from '../api/models/models';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../api/utils';
import { getToastMessageTypeByName } from '../components/toast';
import SubscriptionList from '../components/account-page/subscription-item-list';
import DataspaceList from '../components/account-page/dataspace-item-list';
import { useDarkMode } from '../hooks/dark-mode';
import BusinessIcon from '@mui/icons-material/Business';
import SettingsIcon from '@mui/icons-material/Settings';
import SettingsDrawer from '../components/account-page/settings-drawer'; 
import RefreshIcon from '@mui/icons-material/Refresh';
import CreateNewDataspaceDrawer from '../components/account-page/create-new-dataspace-drawer';
import CreateNewSubscriptionDrawer from '../components/account-page/create-new-subscription-drawer';
// import { makeStyles  } from '@mui/styles';

// const useStyles = makeStyles((theme:Theme) => ({ 
//     breadcrumbLink: {
//         color: theme.palette.primary.main
//     }

// }));


export const formatDateTime = (value: string): string => {
    return `${moment(value).format('MMM Do, hh:mm:ss A')}`;
    // return value;

};

const AccountPage = () => {

   

    const toast = useToast();
    const { t } = useTranslation();
    // const css = useStyles();

    const { instance, accounts, inProgress } = useMsal();

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const [theme, toggleTheme] = useDarkMode();
    const navigate = useNavigate();

    const [value, setValue] = React.useState(0);
    const emptyAccount: TrustRelayAccount = { id: "", timestamp: "", theme: "", email: "", defaultDataspace: "", organization: "", organizationName:"" };
    const [selectedAccount, setSelectedAccount] = useState(emptyAccount);
    const [accountLoaded, setAccountLoaded] = useState(false);
    const account = useAccount(accounts[0] || {});


    const emptySubscriptions: Array<Subscription> = [];
    const [subscriptions, setSubscriptions] = useState(emptySubscriptions);
    const [loadedSubscriptions, setLoadedSubscriptions] = useState(false);

   

    const emptyDataspaces: Array<DataspaceInfo> = [];
    const [dataspaces, setDataspaces] = useState(emptyDataspaces);
    const [loadedDataspaces, setLoadedDataspaces] = useState(false);


    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');
 

    const [isSettingsDrawerOpen, setIsSettingsDrawerOpen] = useState(false);

    const toggleSettingsDrawer = () => {
        setIsSettingsDrawerOpen(!isSettingsDrawerOpen);
    }

    const [isCreateNewDataspaceDrawerOpen, setIsCreateNewDataspaceDrawerOpen] = useState(false);

    const toggleCreateNewDataspaceDrawer = () => {
        setIsCreateNewDataspaceDrawerOpen(!isCreateNewDataspaceDrawerOpen);
    }

    const [isCreateNewSubscriptionDrawerOpen, setIsCreateNewSubscriptionDrawerOpen] = useState(false);

    const toggleCreateNewSubscriptionDrawer = () => {
        setIsCreateNewSubscriptionDrawerOpen(!isCreateNewSubscriptionDrawerOpen);
    }


    const refreshData = () => {
        setDataspaces([])
        setLoadedDataspaces(false);
        setSubscriptions(emptySubscriptions);
        setLoadedSubscriptions(false); 
    }


 

    const handleCreateNewDataspace = (subscriptionId: string, dataspaceName: string) => {
        trustRelayService.createNewDataspace(jwt, subscriptionId, dataspaceName).then((res) => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleCreateNewSubscription = (subscriptionName: string, subscriptionType: string) => {
        trustRelayService.createNewSubscription(jwt, subscriptionName, subscriptionType).then((res) => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }



    function generateGeneralInfoTable(thisAccount: TrustRelayAccount) {

        if (account && selectedDataspace && subscriptions && subscriptions.length > 0) {

            const currentDataspace = dataspaces.filter(x => x.id == selectedDataspace)[0]

            if (currentDataspace) {
                const currentSubscription = subscriptions.filter(x => x.id === currentDataspace.subscription)[0]

                if (currentSubscription) {
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
                                                            <TableCell align="left"><Typography textAlign="left" variant="body1">{thisAccount.id}</Typography></TableCell>
                                                        </TableRow>


                                                        <TableRow hover={false}>
                                                            <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.email')}</Typography></TableCell>
                                                            <TableCell align="left"><Typography textAlign="left" variant="body1">{thisAccount.email}</Typography></TableCell>
                                                        </TableRow>
 

                                                        <TableRow hover={false}>
                                                            <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.organization')}</Typography></TableCell>
                                                            <TableCell align="left"><Typography textAlign="left" variant="body1">{thisAccount.organizationName}</Typography></TableCell>
                                                        </TableRow>
                                                        <TableRow hover={false}>
                                                            <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.currentDataspace')}</Typography></TableCell>
                                                            <TableCell align="left"><Typography textAlign="left" variant="body1">{currentDataspace.name}</Typography></TableCell>
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
                                                            <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.created')}</Typography></TableCell>
                                                            <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDate(thisAccount.timestamp)}</Typography></TableCell>
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
            } 
        }

    }

    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState != null && dataspaceCtx.dataspaceState != "") {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="account tabs">

                            <Tab label={t('labels.dataspaces')} {...a11yProps(0)} />
                            <Tab label={t('labels.subscriptions')} {...a11yProps(1)} /> 



                        </Tabs>
                    </AppBar>

                    <TabPanel id="dataspaces" value={value} index={0}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item >
                                &nbsp;
                            </Grid>
                            <Grid item container direction="row">
                                <DataspaceList jwt={jwt} dataspaces={dataspaces} />
                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel id="subscriptions" value={value} index={1}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item >
                                &nbsp;
                            </Grid>
                            <Grid item container direction="row">
                                <SubscriptionList jwt={jwt} subscriptions={subscriptions} />
                            </Grid>
                        </Grid>
                    </TabPanel>

                  


                    <SettingsDrawer
                        theme={theme}
                        toggleTheme={toggleTheme}
                        open={isSettingsDrawerOpen}
                        handleClose={toggleSettingsDrawer}
                    />

                 

                    {(selectedAccount && selectedAccount.organization.length > 0) ? <CreateNewDataspaceDrawer
                        subscriptions={subscriptions}
                        open={isCreateNewDataspaceDrawerOpen}
                        handleClose={toggleCreateNewDataspaceDrawer}
                        onAction={handleCreateNewDataspace}
                    /> : <></>}

                    <CreateNewSubscriptionDrawer
                        subscriptions={subscriptions}
                        open={isCreateNewSubscriptionDrawerOpen}
                        handleClose={toggleCreateNewSubscriptionDrawer}
                        onAction={handleCreateNewSubscription}
                    />

                </Grid>)
        } else {
            return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }



    useEffect(() => {
   


        if (jwt != "") {
            trustRelayService.getAllSubscriptions(jwt).then((res) => {
                setLoadedSubscriptions(true);
                setSubscriptions(res);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
           
        }

    }, [selectedDataspace, loadedSubscriptions])

    useEffect(() => {
     


        if (loadedSubscriptions && !loadedDataspaces && jwt != "") {
            trustRelayService.getAllDataspaces(jwt).then((res) => {
                setLoadedDataspaces(true)
                setDataspaces(res)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
         
        }

    }, [loadedSubscriptions, loadedDataspaces])

    

    useEffect(() => {
       


        if (isAuthenticated) {

            if (jwt != "") {

                trustRelayService.getAccount(jwt).then((res) => {

                    const ds = res.defaultDataspace
                    dataspaceCtx.setDataspaceState(ds)
                    setSelectedDataspace(ds);
                    setSelectedAccount(res);
                    setAccountLoaded(true);
                    setDataspaces([])
                    setLoadedDataspaces(false);
                    setSubscriptions(emptySubscriptions);
                    setLoadedSubscriptions(false); 
                   
                }).catch((err: Error) => {
                    toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
                });


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
        dataspaceCtx.dataspaceState
    ])

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
                            
                            <Typography variant="body1" color="textPrimary">{t('labels.account')}</Typography>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <AccountBoxIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{selectedAccount.email}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.account')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleCreateNewSubscriptionDrawer}
                        >
                            {t('labels.addSubscription')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleCreateNewDataspaceDrawer}
                        >
                            {t('labels.addDataspace')}
                        </Button>


                        <Button variant="text"
                            color="primary"
                            startIcon={<BusinessIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={()=>navigate(`/organizations`)}
                        >
                            {t('labels.organizations')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<SettingsIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleSettingsDrawer}
                        >
                            {t('labels.settings')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                        >
                            {t('labels.refresh')}
                        </Button>


                    </Grid>
                    {(selectedAccount) ? generateGeneralInfoTable(selectedAccount) : <Grid item>&nbsp;</Grid>}
                    <AuthenticatedTemplate>


                        <Grid item container xl={11} lg={11} md={11} sm={11} xs={11}  >
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
                                <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/account` })} >Login first</Button>
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

export default AccountPage;