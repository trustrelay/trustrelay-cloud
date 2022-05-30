import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Paper, Divider, Accordion, AccordionSummary, AccordionDetails, LinearProgress, Card, CardContent, ButtonGroup, Popper, Grow, ClickAwayListener, MenuList, MenuItem, CircularProgress, Theme, TextField } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { AppPushNotificationContext, DataspaceContext, ToastMessageType } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { getToastMessageTypeByName } from '../components/toast';
import { DashboardStats, DrillQueryResponse, QueryHistoryEntry, QueryHistoryRequest, TemplateAgreementSummary } from '../api/models/models';
import { useTranslation } from 'react-i18next';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import RefreshIcon from '@mui/icons-material/Refresh';
import ResultsTable from '../components/dashboard-page/results-table'; 
// import Editor from '@uiw/react-textarea-code-editor';
import Editor from "react-simple-code-editor";
import Prism, { languages } from 'prismjs'
import "prismjs/components/prism-sql"; 
import 'prismjs/themes/prism-funky.css';
import ArchiveIcon from '@mui/icons-material/Archive';
import CloudOffIcon from '@mui/icons-material/CloudOff';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import QueryStats from '../components/dashboard-page/query-stats';
import { useNavigate, useParams } from 'react-router-dom';
import { GridColDef, GridRowsProp  } from '@mui/x-data-grid-premium';
import SettingsInputAntennaIcon from '@mui/icons-material/SettingsInputAntenna';
import ExportToCommonDrawer from '../components/dashboard-page/export-to-common-drawer';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    root: {
        margin: '0px 0px 0px 0px',
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        border: "0px none #FFFFFF"
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
    loading: {
        width: "100%"
    },
    card: {
        "&:hover:not(.Mui-disabled)": {
            cursor: "pointer"
        }
    } 
})
);

const MyEditor : any = Editor;

const DashboardPage = () => {


    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();
    const navigate = useNavigate();

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const runOptions = [t('labels.run'), t('labels.convertLastRunToCommon')];
    const saveOptions = ['Download results as CSV', 'Download results as JSON', 'Download query jupyter notebook'];

    const emptyDashboardStats: DashboardStats = { issues: -1, tasks: -1, commons: -1, failingConnections: -1, members: -1 }
    const [stats, setStats] = useState(emptyDashboardStats)
    const [statsLoaded, setStatsLoaded] = useState(false)

    const dataspaceCtx = useContext(DataspaceContext);

    const [localDataspace, setLocaDataspace] = useState(dataspaceCtx.dataspaceState)

    const [loadedAgreementTemplates, setLoadedAgreementTemplates] = useState(false);

    const emptyAgreementTemplateList: Array<TemplateAgreementSummary> = [];
    const [templateAgreements, setTemplateAgreements] = useState(emptyAgreementTemplateList);


    const latestPushNotification = useContext(AppPushNotificationContext);

    const [isExportToCommonDrawerOpen, setIsExportToCommonDrawerOpen] = useState(false);

    const toggleExportToCommonDrawer = () => {
        setIsExportToCommonDrawerOpen(!isExportToCommonDrawerOpen);
    }

    const emptyHistory: Array<QueryHistoryEntry> = [];
    const [queryHistory, setQueryHistory] = useState(emptyHistory);
    const [queriesLoaded, setQueriesLoaded] = useState(false);



    const emptyDrillQueryResponse: DrillQueryResponse = {
        id: "",
        columns: [],
        rows: [],
        metadata: [],
        attemptedAutoLimit: 0,
        queryState: ""
    }
    const [drillQueryResponse, setDrillQueryResponse] = useState(emptyDrillQueryResponse);

    const [loading, setLoading] = useState(false);

    const emptyRows: GridRowsProp = [];
    const emptyColumns: Array<GridColDef> = [];

    const [rows, setRows] = useState(emptyRows)

    const [columns, setColumns] = useState(emptyColumns);

    const [query, setQuery] = useState('');

    const [isNewUser, setIsNewUser] = useState(false);

    const [completeSignUpSent, setCompleteSignUpSent] = useState(false);

    const handleQueryChange = (code: string) => {
        setQuery(code)
    }

    const refreshData = () => {
        setStats(emptyDashboardStats);
        setStatsLoaded(false);
        setQueryHistory(emptyHistory);
        setQueriesLoaded(false);
        setLoadedAgreementTemplates(false);
    }

    const [openRun, setOpenRun] = React.useState(false);

    const runOptionRef = React.useRef<HTMLDivElement>(null);



    const [selectedRunIndex, setSelectedRunIndex] = React.useState(0);

    const handleMenuItemClick = (
        event: React.MouseEvent<HTMLLIElement, MouseEvent>,
        index: number,
    ) => {
        setSelectedRunIndex(index);
        setOpenRun(false);
    };

    const handleToggleRun = () => {
        setOpenRun((prevOpen) => !prevOpen);
    };


    const handleCloseRun = (event: MouseEvent | TouchEvent) => {
        if (runOptionRef.current && runOptionRef.current.contains(event.target as HTMLElement)) {
            return;
        }

        setOpenRun(false);
    };

    const handleExportToCommon = (commonName: string, templateAgreement: string) => {
        trustRelayService.exportToCommon(jwt, dataspaceid!, commonName, query, templateAgreement).then((res) => {
        }).catch((e) => {
            toast.openToast('query error', 'Failed request to export to common', ToastMessageType.Error)

        })
    }

    const handleSearch = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault(); 

        if (selectedRunIndex === 0) {
            setLoading(true);

            trustRelayService.query(jwt, dataspaceid!, query).then((res) => {
                setDrillQueryResponse(res);
                setLoading(false);


                if (res.columns && res.columns.length > 0) {
                    let formattedColumns: Array<GridColDef> = []
                    res.columns.forEach((col) => formattedColumns.push({ field: col, headerName: col, width: 150 }))
                    setColumns(formattedColumns)
                }
                if (res.rows && res.rows.length > 0) {
                    let formattedRows: any = []
                    let counter = 0

                    res.rows.forEach((row) => {
                        counter++
                        let rowData: any = {}
                        Object.entries(row).map(([key, value]) => {
                            rowData["id"] = counter
                            rowData[key] = value
                        })

                        formattedRows.push(rowData)
                    })

                    setRows(formattedRows)
                }
                var entry: QueryHistoryEntry = {
                    id: "",
                    query: query,
                    timestamp: new Date().toUTCString()
                }
                var newQueryHistory = [...queryHistory, entry]
                setQueryHistory(newQueryHistory)

            }).catch((e: Error) => {
                toast.openToast('query error', e.message, ToastMessageType.Error)
                setLoading(false)
            })
        } else {
            toggleExportToCommonDrawer()
        }
    }

    function renderContent() {


        return <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} rowGap={1}>

            <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>

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
                        <Grid container direction="row" columnGap={1} rowGap={4}>

                            <Grid item xs={5} sm={4} md={2} lg={2} xl={2}>
                                <Card
                                    className={css.card}
                                    onClick={() => navigate(`/dataspaces/${dataspaceid}/commons`)}>
                                    <CardContent>
                                        <Grid container direction="row">
                                            <Grid item alignContent="left" xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <ArchiveIcon fontSize='large' />
                                            </Grid>
                                            <Grid item alignContent="center" xs={10} sm={10} md={10} lg={10} xl={10}>
                                                {(stats.commons < 0) ? <CircularProgress color="secondary" /> : <Typography color="primary" textAlign="center" variant="h2" style={{fontWeight:"bolder", fontSize:"60px"}} >{stats.commons}</Typography>}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography variant="body1">{t('labels.commonsEnabled')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5} sm={4} md={2} lg={2} xl={2}>
                                <Card
                                    className={css.card}
                                    onClick={() => navigate(`/dataspaces/${dataspaceid}`)}>
                                    <CardContent>
                                        <Grid container direction="row">
                                            <Grid item alignContent="left" xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <SettingsInputAntennaIcon fontSize='large' />
                                            </Grid>
                                            <Grid item alignContent="center" xs={10} sm={10} md={10} lg={10} xl={10}>
                                                {(stats.members < 0) ? <CircularProgress color="secondary" /> : <Typography  color="primary" textAlign="center" variant="h2" style={{fontWeight:"bolder", fontSize:"60px"}}>{stats.members}</Typography>}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography variant="body1">{t('labels.membersInvited')}</Typography>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                            <Grid item xs={5} sm={4} md={2} lg={2} xl={2}>
                                <Card
                                    className={css.card}
                                    onClick={() => navigate(`/dataspaces/${dataspaceid}/settings/service-connections`)}>
                                    <CardContent>
                                        <Grid container direction="row">
                                            <Grid item alignContent="left" xs={1} sm={1} md={1} lg={1} xl={1}>
                                                <CloudOffIcon color="primary" fontSize='large' />
                                            </Grid>
                                            <Grid item alignContent="center" xs={10} sm={10} md={10} lg={10} xl={10}>
                                                {(stats.failingConnections < 0) ? <CircularProgress color="secondary" /> : <Typography color="primary" textAlign="center" variant="h2" style={{fontWeight:"bolder", fontSize:"60px"}}>{stats.failingConnections}</Typography>}
                                            </Grid>
                                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                                <Typography variant="body1">{t('labels.connectionsFailed')}</Typography>
                                            </Grid>


                                        </Grid>
                                    </CardContent>
                                </Card>
                            </Grid>
                        </Grid>
                    </AccordionDetails>
                </Accordion>

            </Grid>

            <Grid container item xs={12} sm={12} md={11} lg={11} xl={11} rowGap={1}>

                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        <Paper variant="outlined" className={css.root}>
                            <MyEditor
                                value={query}
                                onValueChange={(code:string)=>handleQueryChange(code)}
                                highlight={(code:string) => Prism.highlight(code, languages.sql, 'sql')}
                                padding={10}

                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                    width: "100%",
                                    height: "150px",
                                    backgroundColor: "rgba(var(--body), 0.1)" 
                                }}
                            />
                            
                        </Paper>
                    </Grid>
                    
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <div className={css.loading}>
                        {(loading) ? <LinearProgress /> : <></>}
                    </div>
                </Grid>
                <Grid item container direction="row" xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item container xs={4} sm={4} md={4} lg={4} xl={4}>
                        <ButtonGroup variant="contained" color="primary" ref={runOptionRef} aria-label="split button">
                            <Button onClick={handleSearch}>{runOptions[selectedRunIndex]}</Button>
                            <Button
                                color="primary"
                                size="small"
                                aria-controls={openRun ? 'split-button-menu-run' : undefined}
                                aria-expanded={openRun ? 'true' : undefined}
                                aria-label="run options"
                                aria-haspopup="menu"
                                onClick={handleToggleRun}
                            >
                                <ArrowDropDownIcon />
                            </Button>
                        </ButtonGroup>
                        <Popper open={openRun} anchorEl={runOptionRef.current} role={undefined} transition >
                            {({ TransitionProps, placement }) => (
                                <Grow
                                    {...TransitionProps}
                                    style={{
                                        transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                    }}
                                >
                                    <Paper>
                                        <ClickAwayListener onClickAway={handleCloseRun}>
                                            <MenuList id="split-button-menu-run">
                                                {runOptions.map((option, index) => (
                                                    <MenuItem
                                                        key={option}
                                                        disabled={(index === 1 && drillQueryResponse.columns.length <= 0)}
                                                        selected={index === selectedRunIndex}
                                                        onClick={(event) => handleMenuItemClick(event, index)}
                                                    >
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </MenuList>
                                        </ClickAwayListener>
                                    </Paper>
                                </Grow>
                            )}
                        </Popper>
                    </Grid>
                    <Grid item justifyContent="flex-end" spacing={1} container xs={8} sm={8} md={8} lg={8} xl={8} >

                        <Grid item xs={8} sm={8} md={8} lg={8} xl={8} >
                            <QueryStats drillQueryResponse={drillQueryResponse} />
                        </Grid>

                        {/* <Grid item xs={4} sm={4} md={4} lg={4} xl={4} >
                                <ButtonGroup disabled variant="contained" color="primary" ref={saveOptionRef} aria-label="split button">
                                    <Button onClick={handleDownload}>{saveOptions[selectedSaveIndex]}</Button>
                                    <Button
                                        color="primary"
                                        size="small"
                                        aria-controls={openSave ? 'split-button-menu-save' : undefined}
                                        aria-expanded={openSave ? 'true' : undefined}
                                        aria-label="save"
                                        aria-haspopup="menu"
                                        onClick={handleToggleSave}
                                    >
                                        <ArrowDropDownIcon />
                                    </Button>
                                </ButtonGroup>
                                <Popper open={openSave} anchorEl={saveOptionRef.current} role={undefined} transition >
                                    {({ TransitionProps, placement }) => (
                                        <Grow
                                            {...TransitionProps}
                                            style={{
                                                transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom',
                                            }}
                                        >
                                            <Paper>
                                                <ClickAwayListener onClickAway={handleCloseSave}>
                                                    <MenuList id="split-button-menu-save">
                                                        {saveOptions.map((option, index) => (
                                                            <MenuItem
                                                                key={option}
                                                                disabled={index === 2}
                                                                selected={index === selectedSaveIndex}
                                                                onClick={(event) => handleMenuItemClick(event, index)}
                                                            >
                                                                {option}
                                                            </MenuItem>
                                                        ))}
                                                    </MenuList>
                                                </ClickAwayListener>
                                            </Paper>
                                        </Grow>
                                    )}
                                </Popper>
                            </Grid> */}
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <ResultsTable queryHistory={queryHistory} rows={rows} columns={columns} />
                </Grid>
            </Grid>


            <Grid item xs={12} sm={12} md={11} lg={11} xl={11}>

            </Grid>

            <ExportToCommonDrawer
                templateAgreements={templateAgreements}
                query={query}
                open={isExportToCommonDrawerOpen}
                handleClose={toggleExportToCommonDrawer}
                onAction={handleExportToCommon}
            />

        </Grid>


    }




    useEffect(() => {
        

        if (statsLoaded && !queriesLoaded && jwt !== "") {

            var queryHistoryReq: QueryHistoryRequest = { continuationNextPartitionKey: "", continuationNextRowKey: "" }

            trustRelayService.getQueryHistory(jwt, dataspaceid!, queryHistoryReq).then((res) => {
                setQueryHistory(res.value);
                setQueriesLoaded(true);
                if (res.value.length > 0) {
                    setQuery(res.value[0].query) //populate edit with last query
                }

            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
             
        }


    }, [statsLoaded, queriesLoaded])


    useEffect(() => {

        if (queriesLoaded && !loadedAgreementTemplates && jwt !== "") {

            trustRelayService.getTemplateAgreementSummaries(jwt, dataspaceid!).then((res) => {
                setTemplateAgreements(res)
                setLoadedAgreementTemplates(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [queriesLoaded, loadedAgreementTemplates])

    useEffect(() => {
      

       
        if (dataspaceid !== localDataspace) {
            setLocaDataspace(dataspaceid!)
            setStatsLoaded(false);
            setQueriesLoaded(false);
            setLoadedAgreementTemplates(false);
        }


        if (isAuthenticated) {

            if (jwt !== "") {

                trustRelayService.getAccount(jwt).then((res) => {

                    if (res.id.length <= 0) {
                        if (account && account.idTokenClaims) {

                            const map = new Map(Object.entries(account.idTokenClaims));

                            if (map.get("newUser") === true && !completeSignUpSent) {
                                setIsNewUser(true)
                                trustRelayService.completeSignup(jwt).catch((err) => {
                                    toast.openToast(`error`, 'sorry we were unable to setup your account. Please try again later.', getToastMessageTypeByName('error'));
                                    setCompleteSignUpSent(true)
                                })
                            }


                        }
                    }


                }).catch((err: Error) => {
                    toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));

                });

                if (!statsLoaded) {

                    trustRelayService.getStats(jwt, dataspaceid!).then((res) => {
                        setStats(res);
                        setStatsLoaded(true);
                        setQueriesLoaded(false);
                        setLoadedAgreementTemplates(false);
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
        statsLoaded,
        dataspaceCtx.dataspaceState,
        latestPushNotification.trustRelayPushNotificationState,
        completeSignUpSent,
        loading
    ])


    return (
        <>

        <AuthenticatedTemplate>
        <LayoutPage
            toast={toast}
            openToast={toast.openToast}
            closeToast={toast.closeToast}
            selectedDataspace={dataspaceid}
        >

            {(isNewUser) ? <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} style={{ marginTop: "100px" }}>
                <Grid item xs={1} sm={1} md={2} lg={3} xl={3}>&nbsp;</Grid>
                <Grid item container flexDirection="column" justifyContent="center" textAlign="center" xs={10} sm={10} md={8} lg={6} xl={6}>
                    <Grid item><Typography color="primary" variant="h5">Preparing your account...</Typography></Grid>
                    <Grid item><CircularProgress /></Grid>
                </Grid>
                <Grid item xs={1} sm={1} md={2} lg={3} xl={3}>&nbsp;</Grid>
            </Grid> :
                <LayoutCentered fullHeight>
                    <Grid container item direction="column" rowGap={2} columnGap={1} spacing={1}>

                        <Grid item container direction="row">

                            <DashboardIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                            <Grid item>
                                <Typography variant="h5" color="textPrimary">{t('labels.dashboard')}</Typography>
                            </Grid>
                        </Grid>
                        <Divider />
                      
                            <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                                <Button variant="text"
                                    color="primary"
                                    startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={() => refreshData()}
                                >
                                    {t('labels.refresh')}
                                </Button>

                            </Grid>


                            <Grid item container alignItems="left" alignContent="left" direction="column" >

                                <Grid item container >
                                    <DataspaceContext.Consumer>
                                        {({ dataspaceState }) => (
                                            renderContent()
                                        )}
                                    </DataspaceContext.Consumer>
                                </Grid>
                            </Grid>

                      
                        <Grid item>
                            &nbsp;
                        </Grid>
                    </Grid>
                </LayoutCentered>
            }

        </LayoutPage>
        </AuthenticatedTemplate>

<UnauthenticatedTemplate>

    <Grid container direction="column" justifyContent="center" textAlign="center" alignItems="center">

        <Typography variant="h1">{t('messages.signedOut')}</Typography>
        <img alt="unauthorized" width="450" height="360" src="https://cdn.trustrelay.io/media/unauthorized.webp" />

        <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dashboard` })} >Login first</Button>

    </Grid>

</UnauthenticatedTemplate>
</>

    );
};

export default DashboardPage;
