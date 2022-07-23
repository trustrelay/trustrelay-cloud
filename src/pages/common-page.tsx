import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, TableContainer,  Table,  TableRow, TableCell, TableBody,  AppBar, Tabs, Tab, Divider, Accordion, AccordionSummary, AccordionDetails,  Chip, Tooltip,  CircularProgress, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { Agent, Common, CommonAgreementSummary, DailyCount, ServiceConnection  } from '../api/models/models';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useNavigate, useParams, Link } from "react-router-dom";
import TabPanel from '../components/tab-panel';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import ArchiveIcon from '@mui/icons-material/Archive';
import { formatDate } from '../api/utils';
import TableChartIcon from '@mui/icons-material/TableChart';
import SignedAgreementList from '../components/common-page/signed-agreement-list';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CalendarChart from '../components/insights-page/calendar';
import RefreshIcon from '@mui/icons-material/Refresh';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import GetAppIcon from '@mui/icons-material/GetApp';
import QueuePlayNextIcon from '@mui/icons-material/QueuePlayNext';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import HandshakeIcon from '@mui/icons-material/Handshake';
import SchemaIcon from '@mui/icons-material/Schema';
import BlurOnIcon from '@mui/icons-material/BlurOn';
import CreateSynthenticCopyDrawer from '../components/common-page/create-synthetic-copy-drawer';
import CreateCommonCopyDrawer from '../components/common-page/create-common-copy-drawer';
import RunModelDrawer from '../components/common-page/run-model-drawer';
import SchemaDetailsDrawer from '../components/common-schemas-page/schema-details-drawer';
import CheckSlaDrawer from '../components/common-page/check-sla-drawer';
import EditCommonDrawer from '../components/common-page/edit-common-drawer';
import ExportCommonDrawer from '../components/common-page/export-common-drawer';
import DeleteCommonDrawer from '../components/common-page/delete-common-drawer';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import BallotIcon from '@mui/icons-material/Ballot';
import CancelIcon from '@mui/icons-material/Cancel';
import TerminateAgreementDrawer from '../components/common-page/terminate-agreement-drawer';
import { makeStyles  } from '@mui/styles';
import { AccountInfo } from '@azure/msal-common';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const CommonPage = () => {
 
    const toast = useToast();
    const { t } = useTranslation();
    const navigate = useNavigate();

    const css = useStyles();
 
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const { commonid, dataspaceid } = useParams<{ commonid: string, dataspaceid: string }>();

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const emptyServiceConnectionList: Array<ServiceConnection> = [];
    const [serviceConnections, setServiceConnections] = useState(emptyServiceConnectionList);
    const [loadedServiceConnections, setLoadedServiceConnections] = useState(false);

    const [loadedAgent, setLoadedAgent] = useState(false);
    const emptyAgent: Agent = { id: '', dataspace: '', dataspaceName: '', subscription: '', name: '', user: '', location: '', organization: '', organizationName: '', organizationDomain: '', timestamp: '' }
    const [myAgent, setMyAgent] = useState(emptyAgent);

    const [selectedCommon, setSelectedCommon] = useState(emptyCommon);
    const [commonLoaded, setCommonLoaded] = useState(false);

    const [value, setValue] = React.useState(0); 
    const emptyCommonAgreements: Array<CommonAgreementSummary> = [];
    const [commonAgreements, setCommonAgreements] = useState(emptyCommonAgreements);
    const [loadedCommonAgreements, setLoadedCommonAgreements] = useState(false);

    const emptyDailyQueryCountList: Array<DailyCount> = [];
    const [queriesPerDay, setQueriesPerDay] = useState(emptyDailyQueryCountList);
    const [loadedQueriesPerDay, setLoadedQueriesPerDay] = useState(false);
 
    const [isEditCommonDrawerOpen, setIsEditCommonDrawerOpen] = useState(false);
    const [isDeleteCommonDrawerOpen, setIsDeleteCommonDrawerOpen] = useState(false);
    const [isExportCommonDrawerOpen, setIsExportCommonDrawerOpen] = useState(false);
    const [isCreateSynthenticCopyDrawerOpen, setIsCreateSynthenticCopyDrawerOpen] = useState(false);
    const [isCreateCommonCopyDrawerOpen, setIsCreateCommonCopyDrawerOpen] = useState(false);
    const [isRunModelDrawerOpen, setIsRunModelDrawerOpen] = useState(false);
    const [isCheckSchemaDrawerOpen, setIsCheckSchemaDrawerOpen] = useState(false);
    const [isCheckSlaDrawerOpen, setIsCheckSlaDrawerOpen] = useState(false);
    const [isTerminateAgreementDrawerOpen, setIsTerminateAgreementDrawerOpen] = useState(false);



    const toggleTerminateAgreementDrawer = () => {
        setIsTerminateAgreementDrawerOpen(!isTerminateAgreementDrawerOpen);
    }

    const toggleEditCommonDrawer = () => {
        setIsEditCommonDrawerOpen(!isEditCommonDrawerOpen);
    }

    const toggleDeleteCommonDrawer = () => {
        setIsDeleteCommonDrawerOpen(!isDeleteCommonDrawerOpen);
    }

    const toggleExportCommonDrawer = () => {
        setIsExportCommonDrawerOpen(!isExportCommonDrawerOpen);
    }



    const toggleCreateSyntheticCopyDrawer = () => {
        setIsCreateSynthenticCopyDrawerOpen(!isCreateSynthenticCopyDrawerOpen);
    }

    const toggleCreateCommonCopyDrawer = () => {
        setIsCreateCommonCopyDrawerOpen(!isCreateCommonCopyDrawerOpen);
    }

    const toggleRunModelDrawer = () => {
        setIsRunModelDrawerOpen(!isRunModelDrawerOpen);
    }

    const toggleCheckSchemaDrawer = () => {
      setIsCheckSchemaDrawerOpen(!isCheckSchemaDrawerOpen);
    }

    const toggleCheckSlaDrawer = () => {
      setIsCheckSlaDrawerOpen(!isCheckSlaDrawerOpen);
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



    const handleTerminateAgreement = (agreement: string) => {
        trustRelayService.terminateAgreement(jwt, dataspaceid!, agreement).then((res) => { 

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }



    const handleEditCommon = (commonName: string, dataOwner: string, dataExpert: string) => {
        trustRelayService.editCommon(jwt, dataspaceid!, commonid!, commonName, dataOwner, dataExpert).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleDeleteCommon = (deleteServiceConnection: boolean) => {
        trustRelayService.deleteCommon(jwt, dataspaceid!, commonid!, deleteServiceConnection).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState !== null && dataspaceCtx.dataspaceState !== "" && selectedCommon.id.length > 0  ) {
            return (

                
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <AppBar position="static">
                        <Tabs
                            variant="scrollable"
                            scrollButtons={true}
                            value={value}
                            onChange={handleTabChange}
                            aria-label="common tabs">

{(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ? <Tab label={t('labels.activityChart')} {...a11yProps(0)} /> : <></>}
 {(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ? <Tab label={t('labels.signedAgreements')} {...a11yProps(1)} /> : <></>}


                        </Tabs>
                    </AppBar>

                    {(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ?    <TabPanel id="activity" value={value} index={0}>
                        <Grid item container direction="column" rowGap={1}>

                            <Grid item>&nbsp;</Grid>

                            <Grid item style={{ width: "100%", height: "150px", alignContent: "left", textAlign: "left", alignItems: "left" }}>
                                {loadedQueriesPerDay ? <CalendarChart data={queriesPerDay} /> : <Grid container alignItems="center" alignContent="center" justifyContent="center" textAlign="center"> <Grid><CircularProgress color="secondary" /></Grid></Grid>}
                            </Grid>

                        </Grid>

                    </TabPanel> : <></>}


                    {(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ?   <TabPanel id="agreements" value={value} index={1}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                                <SignedAgreementList
                                    signedAgreements={commonAgreements}
                                    onTerminate={handleTerminateAgreement}
                                />
                            </Grid>
                        </Grid>
                    </TabPanel> : <></>}





                    <CreateSynthenticCopyDrawer
                        open={isCreateSynthenticCopyDrawerOpen}
                        handleClose={toggleCreateSyntheticCopyDrawer}
                        serviceConnections={serviceConnections}
                        onAction={() => console.log('not supported')}
                    />

                    <CreateCommonCopyDrawer
                        open={isCreateCommonCopyDrawerOpen}
                        handleClose={toggleCreateCommonCopyDrawer}
                        serviceConnections={serviceConnections}
                        onAction={() => console.log('not supported')}
                    />

                    <RunModelDrawer
                        open={isRunModelDrawerOpen}
                        handleClose={toggleRunModelDrawer}
                        serviceConnections={serviceConnections}
                        onAction={() => console.log('not supported')}
                    />

                    

                    <CheckSlaDrawer
                        open={isCheckSlaDrawerOpen}
                        handleClose={toggleCheckSlaDrawer}
                        serviceConnections={serviceConnections}
                        onAction={() => console.log('not supported')}
                    />

                    <EditCommonDrawer
                        common={selectedCommon}
                        open={isEditCommonDrawerOpen}
                        handleClose={toggleEditCommonDrawer}
                        onAction={handleEditCommon}
                    />

                    <DeleteCommonDrawer
                        common={selectedCommon}
                        open={isDeleteCommonDrawerOpen}
                        handleClose={toggleDeleteCommonDrawer}
                        onAction={handleDeleteCommon}
                    />

                    <ExportCommonDrawer
                        common={selectedCommon}
                        serviceConnections={serviceConnections}
                        open={isExportCommonDrawerOpen}
                        handleClose={toggleExportCommonDrawer}
                        onAction={() => console.log('not supported')}
                    />

                    <TerminateAgreementDrawer
                        common={selectedCommon}
                        open={isTerminateAgreementDrawerOpen}
                        handleClose={toggleTerminateAgreementDrawer}
                        onAction={handleTerminateAgreement}
                    />

                    {/* <NewTaskDrawer
                        dataspace={dataspaceCtx.dataspaceState}
                        open={isNewTaskDrawerOpen}
                        handleClose={toggleNewTaskDrawer}
                        sources={attachedSources}
                        taskTypes={taskTypes}
                        onAction={handleCreateNewTask}
                    /> */}
                </Grid>
            )
        } else {
            return <Grid item container><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

    function generateGeneralInfoTable(common: Common) {
        if (common) {
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{common.id}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.durationPeriod')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{`${formatDate(common.accessValidFrom)}-${formatDate(common.accessValidUntil)}`}</Typography></TableCell>
                                                </TableRow>

                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.permissions')}</Typography></TableCell>
                                                    <TableCell align="left">
                                                        {(common.allowRead) ? <Tooltip title={`${t('labels.read')}`}><Chip size="small" variant="outlined" label="R" /></Tooltip> : <></>}
                                                        {(common.allowWrite) ? <Tooltip title={`${t('labels.write')}`}><Chip size="small" variant="outlined" label="W" /></Tooltip> : <></>}
                                                        {(common.allowCopy) ? <Tooltip title={`${t('labels.copy')}`}><Chip size="small" variant="outlined" label="C" /></Tooltip> : <></>}
                                                        {(common.allowScript) ? <Tooltip title={`${t('labels.script')}`}><Chip size="small" variant="outlined" label="S" /></Tooltip> : <></>}
                                                        {(common.allowExport) ? <Tooltip title={`${t('labels.export')}`}><Chip size="small" variant="outlined" label="E" /></Tooltip> : <></>}
                                                    </TableCell>
                                                </TableRow>



                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.dataOwner')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{common.dataOwner}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.dataExpert')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{common.dataExpert}</Typography></TableCell>
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDate(common.timestamp)}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.location')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{common.storageLocation}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow hover={false}>
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.serviceConnection')}</Typography></TableCell>
                                                    <TableCell align="left">
                                                        <Chip size="small" variant="outlined" label="Healthy"
                                                            icon={<CloudDoneIcon />}
                                                        />
                                                    </TableCell>
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
        setCommonLoaded(false);
        setSelectedCommon(emptyCommon);
        setQueriesPerDay(emptyDailyQueryCountList);
        setLoadedQueriesPerDay(false);
        setServiceConnections(emptyServiceConnectionList);
        setCommonAgreements(emptyCommonAgreements);
        setLoadedCommonAgreements(false);

    }

    useEffect(() => {
  

        if (selectedDataspace !== "" && !commonLoaded && jwt !== "") {


            trustRelayService.getCommon(jwt, dataspaceid!, commonid!).then((res) => {
                setSelectedCommon(res);
                setCommonLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });



        }
        else {
          
        }


    }, [selectedDataspace, commonLoaded])





    useEffect(() => {
 

        if (commonLoaded && !loadedCommonAgreements && jwt !== "") {


            trustRelayService.getSignedAgreementsByCommon(jwt, selectedDataspace, commonid!).then((res) => {
                setCommonAgreements(res);
                setLoadedCommonAgreements(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });


        }
        else {
       
        }


    }, [commonLoaded, loadedCommonAgreements])


    useEffect(() => {

        if (commonLoaded && !loadedServiceConnections && jwt !== "") {

            trustRelayService.getAvailableServiceConnections(jwt, dataspaceid!).then((res) => {
                setServiceConnections(res)
                setLoadedServiceConnections(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [commonLoaded, loadedServiceConnections])


    useEffect(() => {

        if (loadedServiceConnections && !loadedAgent && jwt !== "") {

            trustRelayService.getAgent(jwt, dataspaceid!).then((res) => {
                setMyAgent(res)
                setLoadedAgent(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [loadedServiceConnections, loadedAgent])



    useEffect(() => {
       

        if (loadedAgent && !loadedQueriesPerDay && jwt !== "") {

            trustRelayService.getQueriesPerDay(jwt, dataspaceid!, commonid!).then((res) => {
                setQueriesPerDay(res);
                setLoadedQueriesPerDay(true);

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
          
        }

    }, [loadedAgent, loadedQueriesPerDay])

    const isVisible = (account: AccountInfo | null, common: Common, menuItem: string): boolean => {
        if (!account || !common) return false;

        let { localAccountId } = account;
        const { createdBy } = common;

        if (
            menuItem === "browseData" ||
            menuItem === "checkServiceConnection" ||
            menuItem === "runModel" ||
            menuItem === "refresh" ||
            menuItem === "checkSchema" ||
            menuItem === "checkSla"
        ) {
            return localAccountId === createdBy;
        }

        return false;
    };



    useEffect(() => {
       

        if (isAuthenticated) {

            if (jwt !== "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setCommonLoaded(false);
                    setSelectedCommon(emptyCommon);
                    setQueriesPerDay(emptyDailyQueryCountList);
                    setLoadedQueriesPerDay(false)
                    setCommonAgreements(emptyCommonAgreements);
                    setLoadedCommonAgreements(false);

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
        <>

        <AuthenticatedTemplate>
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
                            <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceCtx.dataspaceState}/commons`} >
                                {t('labels.commons')}
                            </Link>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <ArchiveIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{selectedCommon.name}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.common')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >

                        {isVisible(account, selectedCommon, "browseData") && <Button variant="text"
                            color="primary"
                            startIcon={<TableChartIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => navigate(`/dashboard`)}
                        >
                            {t('labels.browseData')}
                        </Button>}



                        {isVisible(account, selectedCommon, "checkServiceConnection") && <Button variant="text"
                            color="primary"
                            startIcon={<CloudDoneIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => navigate(`/dataspaces/${dataspaceCtx.dataspaceState}/settings/service-connections/${selectedCommon.serviceConnectionId}`)}
                        >
                            {t('labels.checkServiceConnection')}
                        </Button>}


                        {(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ? <Button variant="text"
                            color="primary"
                            startIcon={<EditIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleEditCommonDrawer}
                        >
                            {t('labels.edit')}
                        </Button> : <></>}


                        {(account && account.localAccountId && selectedCommon.createdBy === account.localAccountId) ? <Button variant="text"
                            color="primary"
                            startIcon={<DeleteIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleDeleteCommonDrawer}
                        >
                            {t('labels.delete')}
                        </Button> : <></>}

                        {(selectedCommon.allowExport) ? <Button variant="text"
                            color="primary"
                            startIcon={<GetAppIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleExportCommonDrawer}
                        >
                            {t('labels.export')}
                        </Button> : <></>}

                       {selectedCommon.allowScript &&
                          isVisible(account, selectedCommon, "runModel") && 
                          <Button variant="text"
                          color="primary"
                          startIcon={<QueuePlayNextIcon fontSize="small" style={{ color: "#0090BF" }} />}
                          onClick={toggleRunModelDrawer}
                        >
                          {t('labels.runModel')}
                        </Button>}


                          <Button variant="text"
                          color="primary"
                          startIcon={<SchemaIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={() => navigate(`/dataspaces/${dataspaceid}/commons/${selectedCommon.id}/schemas`)}
                        >
                                    {t('labels.schemas')}
                                </Button>

                        {(selectedCommon.allowCopy) ? <Button variant="text"
                            color="primary"
                            startIcon={<FileCopyIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleCreateCommonCopyDrawer}
                        >
                            {t('labels.copy')}
                        </Button> : <></>}

                        {(selectedCommon.allowScript && selectedCommon.allowCopy) ? <Button variant="text"
                            color="primary"
                            startIcon={<BlurOnIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleCreateSyntheticCopyDrawer}
                        >
                            {t('labels.createSynthenticCopy')}
                        </Button> : <></>}

                        {(selectedCommon.organization !== myAgent.organization) ? <Button variant="text"
                            color="primary"
                            startIcon={<BallotIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={() => navigate(`/dataspaces/${dataspaceCtx.dataspaceState}/signed-agreements/${selectedCommon.signedAgreement}`, {
                                        state: {
                                            common: selectedCommon
                                        }
                                    })}
                        >
                            {t('labels.terms')}
                        </Button> : <></>}

                        {(account && account.localAccountId && selectedCommon.createdBy !== account.localAccountId) ? <Button variant="text"
                            color="primary"
                            startIcon={<CancelIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleTerminateAgreementDrawer}
                        >
                            {t('labels.terminateAgreement')}
                        </Button> : <></>}

                        {isVisible(account, selectedCommon, "checkSla") && 
                          <Button variant="text"
                          color="primary"
                          startIcon={<HandshakeIcon fontSize="small" style={{ color: "#0090BF" }} />}
                          onClick={toggleCheckSlaDrawer}
                        >
                          {t('labels.checkSla')}
                        </Button>}

                        {isVisible(account, selectedCommon, "refresh") && <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                         >
                            {t('labels.refresh')}
                        </Button>}

                    </Grid>
                    {(selectedCommon) ? generateGeneralInfoTable(selectedCommon) : <Grid item>&nbsp;</Grid>}
                    


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
                    
                    <Grid item>
                        &nbsp;
                    </Grid>
                </Grid>

            </LayoutCentered>
        </LayoutPage>
        </AuthenticatedTemplate>

<UnauthenticatedTemplate>

    <Grid container direction="column" justifyContent="center" textAlign="center" alignItems="center">

        <Typography variant="h1">{t('messages.signedOut')}</Typography>
        <img alt="unauthorized" width="450" height="360" src="https://cdn.trustrelay.io/media/unauthorized.webp" />

        <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/commons/${commonid}` })} >Login first</Button>

    </Grid>

</UnauthenticatedTemplate>
</>

    );
};

export const emptyCommon: Common = {
    name: "",
    accessValidFrom: "",
    accessValidUntil: "",
    allowRead: false,
    allowWrite: false,
    allowCopy: false,
    allowScript: false,
    allowExport: false,
    id: "",
    serviceConnectionId: "",
    serviceConnectionName: "",
    storageLocation: "",
    timestamp: "",
    userAgent: "",
    adminAgent: "",
    dataExpert: "",
    dataOwner: "",
    dataspace: "",
    agreementTemplate: "",
    signedAgreement: "",
    createdBy: "",
    hasAccepted: false,
    tags: [],
    organization: "",
    organizationDomain: "",
    sourceType: "",
    sourceQuery: "",
    agreementIsTerminated: false,
    agreementTimestamp: ""
};

export default CommonPage;