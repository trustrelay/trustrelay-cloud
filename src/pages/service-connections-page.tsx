import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Divider, Breadcrumbs,  Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import  { useContext, useEffect, useState } from 'react';
import { DataspaceInfo, ServiceConnection } from '../api/models/models';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import ServiceConnectionList from '../components/service-connections-page/service-connection-list';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast'; 
import { Link,  useParams } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import NewServiceConnectionDrawer from '../components/service-connections-page/new-service-connection-drawer';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const ServiceConnectionsPage = () => {

 

    const toast = useToast();
    const css = useStyles();
    const { t } = useTranslation();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState(''); 
    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');
    const [serviceConnectionsLoaded, setServiceConnectionsLoaded] = useState(false);
    const emptyServiceConnectionsList: Array<ServiceConnection> = [];
    const [serviceConnections, setServiceConnections] = useState(emptyServiceConnectionsList);
    const { dataspaceid } = useParams<{ dataspaceid: string }>(); 
    const [isNewServiceConnectionDrawerOpen, setIsNewServiceConnectionDrawerOpen] = useState(false);


    const toggleNewServiceConnectionDrawer = () => {
        setIsNewServiceConnectionDrawerOpen(!isNewServiceConnectionDrawerOpen);
    }

    const createNewServiceConnection = (
        serviceConnectionName: string, 
        storageProvider: string,  
        storageLocation: string,
        hostOrService:string,
        databaseOrContainer:string,
        accountOrUserOrId:string, 
        secret:string,
        hostPort:string,
        ) => {
        trustRelayService.createNewServiceConnection(
            jwt, 
            dataspaceid!, 
            serviceConnectionName, 
            storageProvider, 
            storageLocation, 
            hostOrService,
            databaseOrContainer, 
            accountOrUserOrId,  
            secret,
            hostPort
            ).then(() => {
           
        }).catch((err: Error) => {
            toast.openToast('error', err.message, getToastMessageTypeByName('error'))
        })
    }

    const renderContent = () => {


        if (dataspaceCtx && dataspaceCtx.dataspaceState  && dataspaceCtx.dataspaceState !== "") {
            return (
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={1}>

                    <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                        <ServiceConnectionList dataspace={dataspaceCtx.dataspaceState} serviceConnections={serviceConnections} />
                    </Grid>
                    <NewServiceConnectionDrawer
                        open={isNewServiceConnectionDrawerOpen}
                        handleClose={toggleNewServiceConnectionDrawer}
                        onAction={createNewServiceConnection}
                    />
                </Grid>
            )
        } else {
            return <Grid item container><Typography variant="body1">{t('messages.pleaseSelectDataspace')}</Typography></Grid>
        }
    }

    const refreshData = () => {
        setServiceConnectionsLoaded(false);
        setServiceConnections(emptyServiceConnectionsList);
    }

    useEffect(() => {
 

        if (selectedDataspace !== "" && !serviceConnectionsLoaded && jwt !== "") {
            trustRelayService.getAllServiceConnections(jwt, selectedDataspace).then((res) => {
                setServiceConnections(res);
                setServiceConnectionsLoaded(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
             
        }


    }, [selectedDataspace, serviceConnectionsLoaded])

    useEffect(() => {
       
 
        if (isAuthenticated) {

            if (jwt !== "") {
                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setServiceConnectionsLoaded(false);
                    setServiceConnections(emptyServiceConnectionsList);
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
    }, [jwt, isAuthenticated])

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
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>

                    </Grid>
                    <Grid item container direction="row">

                        <CloudDoneIcon fontSize="medium" color="primary" style={{ marginTop: "3px", marginRight: "3px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.serviceConnections')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />




                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleNewServiceConnectionDrawer}
                        >
                            {t('labels.newServiceConnection')}
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

                                renderContent()

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

         <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/service-connections` })} >Login first</Button>

     </Grid>

 </UnauthenticatedTemplate>
</>

    );
};

export default ServiceConnectionsPage;