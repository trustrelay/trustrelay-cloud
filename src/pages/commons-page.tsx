import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Divider, Breadcrumbs, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import { useContext, useEffect, useState } from 'react';
import { Common, TemplateAgreementSummary, ServiceConnection, Subscription, Agent } from '../api/models/models';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import CommonList from '../components/commons-page/common-item-list';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import ArchiveIcon from '@mui/icons-material/Archive';
import AddIcon from '@mui/icons-material/Add';
import NewCommonDrawer from '../components/commons-page/new-common-drawer';
import RefreshIcon from '@mui/icons-material/Refresh';
import JoinCommonDrawer from '../components/commons-page/join-common-drawer';
import LinkIcon from '@mui/icons-material/Link';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const CommonsPage = () => {



    const toast = useToast();
    const css = useStyles();
    const { t } = useTranslation();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');
    const emptyCommonsList: Array<Common> = [];
    const [commons, setCommons] = useState(emptyCommonsList);
    const [loadedCommons, setLoadedCommons] = useState(false);

    const emptyServiceConnectionList: Array<ServiceConnection> = [];
    const [serviceConnections, setServiceConnections] = useState(emptyServiceConnectionList);
    const [loadedServiceConnections, setLoadedServiceConnections] = useState(false);

    const [loadedSubscription, setLoadedSubscription] = useState(false);

    const [loadedAgent, setLoadedAgent] = useState(false);


    const emptySubscription: Subscription = {
        id: "",
        name: "",
        admin1: "", admin1Email: "",
        admin2: "", admin2Email: "",
        procurement: "", procurementEmail: "",
        maxDataspaces: 0, maxCommons: 0, maxMembers: 0,
        currentDataspaces: 0, currentCommons: 0, currentMembers: 0,
        subscriptionType: "",
        expires: "",
        isEnabled: false,
        timestamp: ""
    }
    const [selectedSubscription, setSelectedSubscription] = useState(emptySubscription);

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('')

    const emptyAgreementTemplateList: Array<TemplateAgreementSummary> = [];
    const [templateAgreements, setTemplateAgreements] = useState(emptyAgreementTemplateList);

    const emptyAgent: Agent = { id: '', dataspace: '', dataspaceName: '', subscription: '', name: '', user: '', location: '', organization: '', organizationName: '', organizationDomain: '', timestamp: '' }
    const [myAgent, setMyAgent] = useState(emptyAgent);

    const [loadedAgreementTemplates, setLoadedAgreementTemplates] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const [isNewCommonDrawerOpen, setIsNewCommonDrawerOpen] = useState(false);

    const [isJoinCommonDrawerOpen, setIsJoinCommonDrawerOpen] = useState(false);

    const toggleNewCommonDrawer = () => {
        setIsNewCommonDrawerOpen(!isNewCommonDrawerOpen);
    }

    const toggleJoinCommonDrawer = () => {
        setIsJoinCommonDrawerOpen(!isJoinCommonDrawerOpen);
    }

    const createNewCommon = (commonName: string, serviceConnection: string, templateAgreement: string) => {
        trustRelayService.createNewCommon(jwt, dataspaceid!, commonName, serviceConnection, templateAgreement).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleJoinCommon = (commonId: string) => {
        trustRelayService.joinCommon(jwt, dataspaceid!, commonId).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const refreshData = () => {
        setLoadedCommons(false);
        setCommons(emptyCommonsList);
        setLoadedAgreementTemplates(false);
        setTemplateAgreements(emptyAgreementTemplateList);
        setServiceConnections(emptyServiceConnectionList);
        setLoadedServiceConnections(false);
        setSelectedSubscription(emptySubscription);
        setLoadedSubscription(false);
    }

    const getRemainingCommons = () => {
        if (selectedSubscription && selectedSubscription.maxCommons > 0 && commons) {
            return `${commons.length}/${selectedSubscription.maxCommons}`
        }
        return ''
    }

    const displayCreateCommon = () => {
        if (selectedSubscription && selectedSubscription.maxCommons > 0 && commons) {
            return (selectedSubscription.maxCommons > commons.length)
        }
        return false
    }


    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState !== null && dataspaceState !== "" && account && account.localAccountId && account.localAccountId.length > 0) {
            return (

                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={1}>

                    <Grid item container>
                        {`${getRemainingCommons()} ${t('labels.commonsReserved')}`}
                    </Grid>
                    <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                        <CommonList currentUser={account.localAccountId} jwt={jwt} dataspace={dataspaceid!} agent="TODO-missing" commons={commons} />
                    </Grid>
                    <NewCommonDrawer
                        serviceConnections={serviceConnections}
                        templateAgreements={templateAgreements}
                        open={isNewCommonDrawerOpen}
                        handleClose={toggleNewCommonDrawer}
                        onAction={createNewCommon}
                    />
                    <JoinCommonDrawer
                        commons={commons}
                        account={account.localAccountId}
                        myOrganizationId={myAgent.organization}
                        open={isJoinCommonDrawerOpen}
                        handleClose={toggleJoinCommonDrawer}
                        onAction={handleJoinCommon}
                    />
                </Grid>



            )
        } else {
            return <Grid item container><Typography>{t('messages.pleaseSelectDataspace')}</Typography></Grid>
        }
    }

    useEffect(() => {

        if (selectedDataspace !== "" && !loadedCommons && jwt !== "") {




            trustRelayService.getCommons(jwt, selectedDataspace).then((res) => {
                setCommons(res);
                setLoadedCommons(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }

    }, [selectedDataspace, loadedCommons])

    useEffect(() => {

        if (loadedCommons && !loadedAgreementTemplates && jwt !== "") {

            trustRelayService.getTemplateAgreementSummaries(jwt, dataspaceid!).then((res) => {
                setTemplateAgreements(res)
                setLoadedAgreementTemplates(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [loadedCommons, loadedAgreementTemplates])

    useEffect(() => {

        if (loadedAgreementTemplates && !loadedServiceConnections && jwt !== "") {

            trustRelayService.getAvailableServiceConnections(jwt, dataspaceid!).then((res) => {
                setServiceConnections(res)
                setLoadedServiceConnections(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [loadedAgreementTemplates, loadedServiceConnections])

    useEffect(() => {

        if (loadedServiceConnections && !loadedSubscription && jwt !== "") {

            trustRelayService.getDataspaceSubscription(jwt, dataspaceid!).then((res) => {
                setSelectedSubscription(res)
                setLoadedSubscription(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [loadedServiceConnections, loadedSubscription])

    useEffect(() => {

        if (loadedSubscription && !loadedAgent && jwt !== "") {

            trustRelayService.getAgent(jwt, dataspaceid!).then((res) => {
                setMyAgent(res)
                setLoadedAgent(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [loadedSubscription, loadedAgent])

    useEffect(() => {


        if (isAuthenticated) {

            if (jwt !== "") {

                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setLoadedCommons(false);
                    setCommons(emptyCommonsList);
                    setLoadedAgreementTemplates(false);
                    setTemplateAgreements(emptyAgreementTemplateList);
                    setServiceConnections(emptyServiceConnectionList);
                    setLoadedServiceConnections(false);
                    setSelectedSubscription(emptySubscription);
                    setLoadedSubscription(false);
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
    }, [
        jwt,
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
                                <Breadcrumbs className={css.breadcrumbLink} aria-label="breadcrumb">
                                    <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceid}/dashboard`} >
                                        {t('labels.dashboard')}
                                    </Link>
                                    <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                                </Breadcrumbs>

                            </Grid>
                            <Grid item container direction="row">

                                <ArchiveIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                                <Grid item>
                                    <Typography variant="h5" color="textPrimary">{t('labels.commons')}</Typography>
                                </Grid>
                            </Grid>
                            <Divider />


                            <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >

                                {(displayCreateCommon()) ?
                                    <Button variant="text"
                                        color="primary"
                                        startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                        onClick={toggleNewCommonDrawer}
                                    >
                                        {t('labels.newCommon')}
                                    </Button>
                                    : <></>}

                                <Button variant="text"
                                    color="primary"
                                    startIcon={<LinkIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={toggleJoinCommonDrawer}
                                >
                                    {t('labels.requestAccessToCommon')}
                                </Button>

                           
                                <Button variant="text"
                                    color="primary"
                                    startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={() => refreshData()}
                                >
                                    {t('labels.refresh')}
                                </Button>



                            </Grid>

                            <DataspaceContext.Consumer>
                                {({ dataspaceState }) => (
                                    renderContent(dataspaceState)
                                )}

                            </DataspaceContext.Consumer>


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

                    <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/commons` })} >Login first</Button>

                </Grid>

            </UnauthenticatedTemplate>
        </>

    );
};

export default CommonsPage;