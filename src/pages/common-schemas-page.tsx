import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs,    Divider, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { useParams, Link } from "react-router-dom";

import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { AuditLogsRequest, AuditLogEntry, Common } from '../api/models/models';
import { getToastMessageTypeByName } from '../components/toast';
import AuditLogList from '../components/audit-logs-page/audit-log-item-list';
import AddIcon from '@mui/icons-material/Add';

import ChromeReaderModeIcon from '@mui/icons-material/ChromeReaderMode';
import LogDetailsDrawer from '../components/audit-logs-page/log-details-drawer';
import { makeStyles  } from '@mui/styles';
import AddNewSchemaDrawer from '../components/common-schemas-page/add-new-schema-drawer';
import { emptyCommon } from './common-page';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);


export const formatDateTime = (value: string): string => {
    return `${moment(value).format('MMM Do, hh:mm:ss A')}`;
    // return value;

};

const CommonSchemasPage = () => {

 

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();

    const { instance, accounts, inProgress } = useMsal();

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');


    const account = useAccount(accounts[0] || {});

    let emptyLogEntry: AuditLogEntry = { timestamp: "", category: "", target: "", activityType: "", dataspace: "", userAgent: "", status: "", statusReason: "" }

    const [selectedLogEntry, setSelectedLogEntry] = useState(emptyLogEntry)
    const [selectedCommon, setSelectedCommon] = useState(emptyCommon);

    const emptyAuditLogs: Array<AuditLogEntry> = [];
    const [auditLogs, setAuditLogs] = useState(emptyAuditLogs);
    const [loadedAuditLogs, setLoadedAuditLogs] = useState(false);
    const [isAddNewSchemaDrawerOpen, setIsAddNewSchemaDrawerOpen] = useState(false);

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const [isLogDetailsDrawerOpen, setIsLogDetailsDrawerOpen] = useState(false);

    const { dataspaceid, commonid } = useParams<{ dataspaceid: string, commonid: string }>();

    const toggleLogDetailsDrawer = () => {
        setIsLogDetailsDrawerOpen(!isLogDetailsDrawerOpen);
    }

    const toggleAddNewSchemaDrawer = () => {
        setIsAddNewSchemaDrawerOpen(!isAddNewSchemaDrawerOpen)
    }

    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState !== null && dataspaceCtx.dataspaceState !== "") {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                    <Grid item container spacing={2} rowGap={1}>
                       
                        <Grid item container direction="row">
                            <AuditLogList jwt={jwt} logs={auditLogs} setSelectedLogEntry={setSelectedLogEntry} toggleLogDetailsDrawer={toggleLogDetailsDrawer} />
                        </Grid>
                    </Grid>

                    <LogDetailsDrawer
                        open={isLogDetailsDrawerOpen}
                        handleClose={toggleLogDetailsDrawer}
                        logEntry={selectedLogEntry}
                    />
                    <AddNewSchemaDrawer
                        open={isAddNewSchemaDrawerOpen}
                        handleClose={toggleAddNewSchemaDrawer}
                        common={selectedCommon}
                        onAction={configureCommon}
                    />

                </Grid>)
        } else {
            return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

    useEffect(() => {
        trustRelayService.getCommon(jwt, dataspaceid!, commonid!).then((res) => {
            setSelectedCommon(res);
        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }, [])




    // useEffect(() => {


    //     if (jwt !== "") {

    //         var auditLogsReq: AuditLogsRequest = { continuationNextPartitionKey: "", continuationNextRowKey: "" }

    //         trustRelayService.getAuditLogs(jwt, selectedDataspace, auditLogsReq).then((res) => {
    //             // setLoadedAuditLogs(true);
    //             // setAuditLogs(res.value);
    //         }).catch((err: Error) => {
    //             toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
    //         });

    //     }


    // }, [])



    useEffect(() => {
   


        if (isAuthenticated) {

            if (jwt !== "") {

                trustRelayService.getAccount(jwt).then((res) => {

                    const ds = res.defaultDataspace
                    dataspaceCtx.setDataspaceState(ds)
                    setSelectedDataspace(ds); 
                    setLoadedAuditLogs(false);
                    setAuditLogs(emptyAuditLogs); 
                 
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

    const configureCommon = (commonId: string, url: string) => {
        trustRelayService.setNewSchemaFromUrl(jwt, commonid!, url, dataspaceid!).then((res) => {
        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

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
                            <Typography variant="body1" color="textPrimary">{t('labels.auditLogs')}</Typography>
                        </Breadcrumbs>



                    </Grid>
                    <Grid item container direction="row">
                        <ChromeReaderModeIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.dataspaceLogs')}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.auditLogs')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                            <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >
                                <Button variant="text"
                                    color="primary"
                                    startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                                    onClick={toggleAddNewSchemaDrawer}
                                >
                                    {t('labels.new')}
                                </Button>
                            </Grid>
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

           <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/account` })} >Login first</Button>

       </Grid>

   </UnauthenticatedTemplate>
</>

    );
};

export default CommonSchemasPage;