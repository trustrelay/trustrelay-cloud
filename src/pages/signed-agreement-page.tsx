import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Paper, Breadcrumbs, AppBar, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Divider, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { SignedAgreement, TemplateAgreement, } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext,  DataspaceContext } from '../app-contexts';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { getToastMessageTypeByName } from '../components/toast';
import {  PDFViewer } from '@react-pdf/renderer'; 
import { useParams, Link } from 'react-router-dom'; 
import TabPanel from '../components/tab-panel';
import { formatDateTime } from '../api/utils';
import SignedAgreementPdf from '../components/signed-agreement-page/signed-agreement-pdf';
import { useTranslation } from 'react-i18next';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const MyPDFViewer : any = PDFViewer;

const SignedAgreementPage = () => {



    const toast = useToast();
    const { t } = useTranslation();
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [finishedLoading, setFinishedLoading] = useState(false);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const css = useStyles(); 

    const isAuthenticated = useIsAuthenticated();
    const appNotifications = useContext(AppNotificationsContext);
    const latestPushNotification = useContext(AppPushNotificationContext);
    const [jwt, setJwt] = useState(''); 
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [selectedDataspace, setSelectedDataspace] = useState('');


    const dataspace = useContext(DataspaceContext); 

    const dataspaceCtx = useContext(DataspaceContext);

    const emptySignedAgreement: SignedAgreement = {
        id: "",
        title: "",
        url: "",
        timestamp: "",
        tags: [],
        agreementType: "",
        agreement: "",
        dataspace: "",
        dataspaceName:"",
        common: "",
        commonName: "",
        user: "",
        accepted: false
    };

    const [signedAgreement, setSignedAgreement] = useState(emptySignedAgreement);
    const [signedAgreementLoaded, setSignedAgreementLoaded] = useState(false); 

    const { dataspaceid, agreementid } = useParams<{ dataspaceid: string, agreementid: string }>();

    const [value, setValue] = React.useState(0);

    const emptyTemplateAgreement: TemplateAgreement = {
        id: "",
        title: "",
        url: "", 
        purpose: "", 
        dataAssets: "", 
        rightsAndResponsibilities: "", 
        permissions: "", 
        durationType: "",
        durationPeriod:"",
        durationFrom:new Date(),
        durationUntil:new Date(), 
        frequencyOfUpdates: "", 
        dataRetentionPeriod: "", 
        terminationNoticePeriod: "", 
        jurisdiction: "",  
        agent:"",
        organization:"",
        organizationName:"",
        organizationDomain:"",
        timestamp: "",
        isLocked:false
    };
    const [templateAgreement, setTemplateAgreement] = useState(emptyTemplateAgreement);
    const [templateAgreementLoaded, setTemplateAgreementLoaded] = useState(false); 

    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

   
    const generateTableAgreement = (agreement:SignedAgreement) => {

        if (agreement) {
            return (<Grid container >
                <Grid item xl={10} lg={10} md={12} sm={12} xs={12}>
                    <TableContainer component={Paper}>
                        <Table aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Field</TableCell>
                                    <TableCell align="left">Value</TableCell>

                                </TableRow>
                            </TableHead>
                            <TableBody>

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        ID
                                    </TableCell>
                                    <TableCell align="left">{`${agreement.id}`}</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Title
                                    </TableCell>
                                    <TableCell align="left">{`${agreement.title}`}</TableCell>
                                </TableRow>

                                <TableRow>
                                    <TableCell component="th" scope="row">
                                        Timestamp
                                    </TableCell>
                                    <TableCell align="left">{formatDateTime(agreement.timestamp)}</TableCell>
                                </TableRow> 

                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    &nbsp;
                </Grid>
            </Grid>)
        }
         
    }

    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState !== null && dataspaceState !== "") {
            return (

                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="source tabs">
                            <Tab label="General" {...a11yProps(0)} />
                            <Tab label="PDF" {...a11yProps(1)} />
                        </Tabs>
                    </AppBar>


                    <TabPanel id="general" value={value} index={0}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>

                            <Grid item container alignItems="center" alignContent="center" textAlign="center">
                                {(signedAgreement) ? <> {generateTableAgreement(signedAgreement)}</> : <span>loading...</span>}
                            </Grid>



                        </Grid>
                    </TabPanel>
                    <TabPanel id="pdf" value={value} index={1}>
                        <Grid item container spacing={2} rowGap={1}>

                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item container alignItems="center" alignContent="center" textAlign="center">
 
                                 {(signedAgreement && templateAgreement && signedAgreement.id!=="" && templateAgreement.id !=="") ? (<MyPDFViewer style={{width:"100%", minHeight:"500px"}}>
                        <SignedAgreementPdf 
                        dataspaceName={signedAgreement.dataspaceName}
                        agreement={templateAgreement}
                        />
                    </MyPDFViewer>) : <>...</>}
                                
                 

              

                            </Grid>
                        </Grid>
                    </TabPanel>

                </Grid>



            )
        }
        else return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
    }

    useEffect(() => {
       

     

        if (isAuthenticated) {

            if (jwt !== "") {

             

                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    
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


                if (!signedAgreementLoaded) {
                    trustRelayService.getSignedAgreement(jwt, dataspaceid!, agreementid!).then((res) => {
                        setSignedAgreementLoaded(true);
                        setSignedAgreement(res);

                    }).catch((err:Error)=>{
                        toast.openToast(`error`, err.message, getToastMessageTypeByName('error')); 
                      });

                }

                if (signedAgreementLoaded && !templateAgreementLoaded && signedAgreement && signedAgreement.agreement.length>0) {
                    trustRelayService.getTemplateAgreement(jwt, dataspaceid!, signedAgreement.agreement).then((res) => {
                        setTemplateAgreementLoaded(true);
                        setTemplateAgreement(res);

                    }).catch((err:Error)=>{
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
    }, [appNotifications.trustRelayNotificationsState, 
        jwt, 
        finishedLoading, 
        isAuthenticated, 
        latestPushNotification, 
        dataspace.dataspaceState, 
        signedAgreementLoaded,   
        signedAgreement,
        templateAgreementLoaded,
        templateAgreement
    ])

    return (
        <LayoutPage
            toast={toast}
            openToast={toast.openToast}
            closeToast={toast.closeToast}
        >
             <Grid container item direction="column" rowGap={2} columnGap={1} spacing={1}>
                    <Grid item container>
                        <LibraryAddCheckIcon fontSize="small" style={{ color: "#666666" }} />
                        <Breadcrumbs aria-label="breadcrumb">
                                <Link className={css.breadcrumbLink} to="/dashboard" >
                                    Dashboard
                                </Link>
                                <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceCtx.dataspaceState}/signed-agreements`} >
                                    Signed Agreements
                                </Link>
                                <Typography variant="body1" color="textPrimary">{agreementid}</Typography>
                            </Breadcrumbs> 
                        <Divider />
                    </Grid>
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >
 
                    </Grid>

            <AuthenticatedTemplate>
                <Grid container style={{ marginTop: "5em" }}>
                    <Grid item xs={1} sm={1} md={1} lg={1} xl={1}>&nbsp;</Grid>
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11} columnGap={1} rowGap={1}>
                        <Grid container direction="row" columnGap={1} rowGap={1}>
                            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                                <Breadcrumbs aria-label="breadcrumb">
                                    <Link className={css.breadcrumbLink}  to="/dashboard" >
                                        Dashboard
                                    </Link>
                                    <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                                </Breadcrumbs> 
                            </Grid>
                            <Grid container item alignItems="left" alignContent="left" textAlign="left">
                            <h2>{signedAgreement.title}</h2>
                            </Grid>
                            <Grid item container> 
                                <DataspaceContext.Consumer>
                                    {({ dataspaceState }) => (

                                        renderContent(dataspaceState)
                                    )} 
                                </DataspaceContext.Consumer>
                            </Grid>

                        </Grid>
                    </Grid>

                </Grid>
            </AuthenticatedTemplate>
            <UnauthenticatedTemplate>
                <Typography variant="body1">{t('messages.signedOut')}</Typography><Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/signed-agreements/${agreementid}`})} >Login first</Button>
            </UnauthenticatedTemplate>
            </Grid>
        </LayoutPage>


    );
};

export default SignedAgreementPage;