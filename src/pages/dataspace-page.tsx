import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, TableContainer, Table, TableRow, TableCell, TableBody, Divider, Accordion, AccordionSummary, AccordionDetails, AppBar, Tabs, Tab, IconButton, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { Dataspace, Agent } from '../api/models/models';
import { DataspaceContext, ToastMessageType } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useParams, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { formatDate } from '../api/utils';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import TabPanel from '../components/tab-panel';
import AgentList from '../components/dashboard-page/agent-item-list';
import InviteMemberDrawer from '../components/dashboard-page/invite-member-drawer';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PersonAddDisabledIcon from '@mui/icons-material/PersonAddDisabled';
import EditDataspaceDrawer from '../components/dataspace-page/edit-dataspace-drawer';
import DeleteDataspaceDrawer from '../components/dataspace-page/delete-dataspace-drawer';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import DisableMembershipDrawer from '../components/dashboard-page/disable-membership-drawer';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import KeyIcon from '@mui/icons-material/Key';
import CreateAnonymousInviteDrawer from '../components/dataspace-page/create-anonymous-invite-drawer';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const DataspacePage = () => {



    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');
    const [value, setValue] = React.useState(0);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const dataspaceCtx = useContext(DataspaceContext);
    const emptyDataspace: Dataspace = { id: "", name: "", timestamp: "", subscription: "", members: 0, maxMembers: 0, jdbc: "", jsonRpcUrl: "", accessKey: "", invitationCode: "", isInvitationEnabled: false }
    const [selectedDataspace, setSelectedDataspace] = useState(emptyDataspace);

    const [selectedDataspaceState, setSelectedDataspaceState] = useState('')

    const [dataspaceLoaded, setDataspaceLoaded] = useState(false);
    const [agentsLoaded, setAgentsLoaded] = useState(false);
    const emptyAgentsList: Array<Agent> = [];
    const [agents, setAgents] = useState(emptyAgentsList);

    const [secret, setSecret] = useState('');

    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const [isInviteMemberDrawerOpen, setInviteMemberDrawerOpen] = useState(false);
    const [isDisableMembershipDrawerOpen, setDisableMembershipDrawerOpen] = useState(false);
    const [isEditDataspaceDrawerOpen, setEditDataspaceDrawerOpen] = useState(false);
    const [isDeleteDataspaceDrawerOpen, setDeleteDataspaceDrawerOpen] = useState(false);
    const [isCreateAnonymousInviteDrawerOpen, setCreateAnonymousDrawerOpen] = useState(false);

    const toggleCreateAnonymousInviteDrawer = () => {
        setCreateAnonymousDrawerOpen(!isCreateAnonymousInviteDrawerOpen);
    }

    const toggleInviteMemberDrawer = () => {
        setInviteMemberDrawerOpen(!isInviteMemberDrawerOpen);
    }

    const toggleDisableMembershipDrawer = () => {
        setDisableMembershipDrawerOpen(!isDisableMembershipDrawerOpen);
    }

    const toggleEditDataspaceDrawer = () => {
        setEditDataspaceDrawerOpen(!isEditDataspaceDrawerOpen);
    }

    const toggleDeleteDataspaceDrawer = () => {
        setDeleteDataspaceDrawerOpen(!isDeleteDataspaceDrawerOpen);
    }

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    const handleUpdateInvitationSettings = (isEnabled: boolean) => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== "") {
            trustRelayService.setInvitationSettings(jwt, dataspaceCtx.dataspaceState, isEnabled).then(() => {
                // selectedDataspace.isInvitationEnabled = isEnabled
                // setSelectedDataspace(selectedDataspace)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        } else {
            toast.openToast(`error`, 'Failed request to update invitation settings', getToastMessageTypeByName('error'));
        }

    }

    const handleInviteMember = (email: string) => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== "") {
            trustRelayService.inviteMember(jwt, dataspaceCtx.dataspaceState, email).then(() => {

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        } else {
            toast.openToast(`error`, 'Failed request to invite this member', getToastMessageTypeByName('error'));
        }

    }

    const handleDisableMembership = (agent: string) => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== "") {
            trustRelayService.disableMembership(jwt, dataspaceCtx.dataspaceState, agent).then(() => {

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        } else {
            toast.openToast(`error`, 'Failed request to uninvite this member', getToastMessageTypeByName('error'));
        }

    }

    const handleEditDataspace = (dataspaceName: string) => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== "") {
            trustRelayService.editDataspace(jwt, dataspaceCtx.dataspaceState, dataspaceName).then(() => {

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        } else {
            toast.openToast(`error`, 'Failed request to get current dataspace', getToastMessageTypeByName('error'));
        }

    }

    const handleDeleteDataspace = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState !== "") {
            trustRelayService.deleteDataspace(jwt, dataspaceCtx.dataspaceState).then(() => {

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        } else {
            toast.openToast(`error`, 'Failed request to get current dataspace', getToastMessageTypeByName('error'));
        }

    }

    const renewAccessKey = () => {
        
        trustRelayService.renewAccessKey(jwt, dataspaceCtx.dataspaceState!).then((res: string) => {
            toast.openToast('Please copy this somewhere safe.',`You will not see this code again: ${res}`,ToastMessageType.Warning)
            
        })
    }

    const refreshData = () => {
        setAgents(emptyAgentsList);
        setSelectedDataspace(emptyDataspace);
        setDataspaceLoaded(false);
        setAgentsLoaded(false);
        setSelectedDataspace(emptyDataspace);
        setDataspaceLoaded(false);
    }

    function generateGeneralInfoTable(dataspace: Dataspace) {
        if (dataspace) {
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{dataspaceid}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.subscriptionId')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{selectedDataspace.subscription}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.jdbcConnection')}</Typography></TableCell>
                                                    <TableCell align="left">

                                                        <CopyToClipboard text={selectedDataspace.jdbc}>
                                                            <Grid container flex="row">
                                                                <Typography textAlign="left" variant="body1">{`<${t('labels.clickToCopy')}>`}</Typography>
                                                                <IconButton size="small">
                                                                    <FileCopyIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </CopyToClipboard>

                                                    </TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.jsonRpcUrl')}</Typography></TableCell>
                                                    <TableCell align="left">

                                                        <CopyToClipboard text={`${process.env.REACT_APP_BASE_API_URL}/dataspaces/${dataspaceid}/jsonrpc`}>
                                                            <Grid container flex="row">
                                                                <Typography textAlign="left" variant="body1">{`<${t('labels.clickToCopy')}>`}</Typography>
                                                                <IconButton size="small">
                                                                    <FileCopyIcon />
                                                                </IconButton>
                                                            </Grid>
                                                        </CopyToClipboard>

                                                    </TableCell>
                                                </TableRow>


                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.accessKey')}</Typography></TableCell>
                                                    <TableCell align="left">

                                                        <CopyToClipboard text={(secret !== '') ? secret : selectedDataspace.accessKey}>
                                                            <Grid container flex="row">
                                                                <Typography textAlign="left" variant="body1">{`${selectedDataspace.accessKey}`}</Typography>
                                                                {/* <IconButton size="small">
                                                                    <AutorenewIcon />
                                                                </IconButton> */}
                                                            </Grid>
                                                        </CopyToClipboard>

                                                    </TableCell>
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDate(dataspace.timestamp)}</Typography></TableCell>
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


    const getRemainingSeats = () => {


        return `${selectedDataspace.members}/${selectedDataspace.maxMembers}`

    }


    function renderContent() {

        if (dataspaceCtx && dataspaceCtx.dataspaceState !== null && dataspaceCtx.dataspaceState !== "") {
            return <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                <AppBar position="static">
                    <Tabs variant="scrollable" value={value} onChange={handleTabChange} aria-label="dashboard tabs">
                        <Tab label={t('labels.agents')} {...a11yProps(0)} />
                    </Tabs>
                </AppBar>



                <TabPanel id="partners" value={value} index={0}>
                    <Grid item container spacing={2} rowGap={1}>
                        <Grid item container>
                            &nbsp;
                        </Grid>
                        <Grid item container>
                            {`${getRemainingSeats()} seats reserved`}
                        </Grid>
                        <Grid item container alignItems="center" alignContent="center" textAlign="center">
                            <AgentList agents={agents} />
                        </Grid>
                    </Grid>
                </TabPanel>

                <InviteMemberDrawer
                    open={isInviteMemberDrawerOpen}
                    handleClose={toggleInviteMemberDrawer}
                    onAction={handleInviteMember}
                />

                <DisableMembershipDrawer
                    open={isDisableMembershipDrawerOpen}
                    agents={agents}
                    handleClose={toggleDisableMembershipDrawer}
                    onAction={handleDisableMembership}
                />

                {(selectedDataspace && selectedDataspace.name && selectedDataspace.name.length > 0) ? <EditDataspaceDrawer
                    dataspace={selectedDataspace}
                    open={isEditDataspaceDrawerOpen}
                    handleClose={toggleEditDataspaceDrawer}
                    onAction={handleEditDataspace}
                /> : <></>}


                {(selectedDataspace) ? <DeleteDataspaceDrawer
                    dataspace={selectedDataspace}
                    open={isDeleteDataspaceDrawerOpen}
                    handleClose={toggleDeleteDataspaceDrawer}
                    onAction={handleDeleteDataspace}
                /> : <></>}

                {(selectedDataspace && selectedDataspace.invitationCode.length > 0) ? <CreateAnonymousInviteDrawer
                    dataspace={selectedDataspace}
                    open={isCreateAnonymousInviteDrawerOpen}
                    handleClose={toggleCreateAnonymousInviteDrawer}
                    onAction={handleUpdateInvitationSettings}
                /> : <></>}

            </Grid>

        }
        else {
            return <Grid item container><Typography>Please select a dataspace</Typography></Grid>
        }
    }


    const displayInviteMember = () => {
        // if (subscriptions && subscriptions.length > 0 && selectedAgent && agents) {
        //     const currentSubscription = subscriptions.filter(x => x.id === selectedAgent.subscription)[0]
        //     if (currentSubscription) {
        //         return currentSubscription.maxMembers > agents.length
        //     }

        // }
        return true
    }

    useEffect(() => {

    }, [secret])

    useEffect(() => {



        if (!dataspaceLoaded && jwt !== "") {

            trustRelayService.getDataspace(jwt, dataspaceid!).then((res) => {
                setSelectedDataspace(res);
                setDataspaceLoaded(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });


        } else {

        }

    }, [selectedDataspaceState, selectedDataspace])

    useEffect(() => {



        if (selectedDataspace && !agentsLoaded && jwt !== "") {

            trustRelayService.getAgents(jwt, dataspaceid!).then((res) => {
                setAgents(res);
                setAgentsLoaded(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });


        } else {

        }

    }, [selectedDataspace, agentsLoaded])

    useEffect(() => {
        if (isAuthenticated) {

            if (jwt !== "") {
                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspaceState(dataspaceCtx.dataspaceState)
                    setAgents(emptyAgentsList);
                    setAgentsLoaded(false);
                    setSelectedDataspace(emptyDataspace);
                    setDataspaceLoaded(false);
                }
                else {


                    trustRelayService.getAccount(jwt).then((res) => {
                        const ds = res.defaultDataspace
                        dataspaceCtx.setDataspaceState(ds)
                        setSelectedDataspaceState(ds)

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
        secret])





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
                            {/* <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceid}/dashboard`} >
                                {t('labels.dashboard')}
                            </Link> */}
                            <Link className={css.breadcrumbLink} to={`/account`} >
                                {t('labels.account')}
                            </Link>
                            <Typography variant="body1" color="textPrimary">{t('labels.dataspaces')}</Typography>
                            <Typography variant="body1" color="textPrimary">{dataspaceid}</Typography>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <GroupWorkIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{selectedDataspace.name}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.dataspace')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >



                        {(account && account.localAccountId) ? <Button variant="text"
                            color="primary"
                            startIcon={<EditIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleEditDataspaceDrawer}
                        >
                            {t('labels.edit')}
                        </Button> : <></>}

                        {(account && account.localAccountId) ? <Button variant="text"
                            color="primary"
                            startIcon={<DeleteIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleDeleteDataspaceDrawer}
                        >
                            {t('labels.delete')}
                        </Button> : <></>}

                        {(displayInviteMember()) ?
                            <Button variant="text"
                                color="primary"
                                startIcon={<PersonAddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                onClick={toggleInviteMemberDrawer}
                            >
                                {t('labels.inviteMember')}
                            </Button> : <></>}

                        {(displayInviteMember()) ?
                            <Button variant="text"
                                color="primary"
                                startIcon={<PersonAddDisabledIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                onClick={toggleDisableMembershipDrawer}
                            >
                                {t('labels.uninviteMember')}
                            </Button> : <></>}

                        {(displayInviteMember()) ?
                            <Button variant="text"
                                color="primary"
                                startIcon={<GroupAddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                onClick={toggleCreateAnonymousInviteDrawer}
                            >
                                {t('labels.setAnonymousInvite')}
                            </Button> : <></>}

                        <Button variant="text"
                            color="primary"
                            startIcon={<KeyIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={renewAccessKey}
                        >
                            {t('labels.renewAccessKey')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={refreshData}
                        >
                            {t('labels.refresh')}
                        </Button>

                    </Grid>
                    {(selectedDataspace) ? generateGeneralInfoTable(selectedDataspace) : <Grid item>&nbsp;</Grid>}
                    <AuthenticatedTemplate>
                        <Grid item container alignItems="left" alignContent="left" direction="column" >

                            <Grid item container >
                                <DataspaceContext.Consumer>
                                    {({ dataspaceState }) => (
                                        renderContent()
                                    )}
                                </DataspaceContext.Consumer>
                            </Grid>
                        </Grid>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>


                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}` })} >Login first</Button>
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

export default DataspacePage;