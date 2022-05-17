import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, CircularProgress, Card, CardContent, Paper, makeStyles, GridTypeMap, GridProps, Chip, Breadcrumbs, AppBar, Tabs, Tab, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Divider, createStyles, Theme } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { SignedAgreement, TemplateAgreement, } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext,  DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { getToastMessageTypeByName } from '../components/toast';
import { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import UserAgreementList from '../components/template-agreements-page/template-agreement-item-list';
import { useParams, Link } from 'react-router-dom';
import TemplateAgreementPdf from '../components/template-agreement-page/template-agreement-pdf';
import TagsInput from '../components/tagsInput';
import { Label } from '@material-ui/icons';
import TabPanel from '../components/tab-panel';
import { formatDateTime } from '../api/utils';
import SignedAgreementPdf from '../components/signed-agreement-page/signed-agreement-pdf';
import { useTranslation } from 'react-i18next';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';

const SignedAgreementPage = () => {

    const useStyles = makeStyles(({ palette, ...theme }) => ({
        breadcrumbLink: {
            color: palette.primary.main
        }

    })
);

    const toast = useToast();
    const { t } = useTranslation();
    const [finishedLoading, setFinishedLoading] = useState(false);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const css = useStyles(); 

    const isAuthenticated = useIsAuthenticated();
    const appNotifications = useContext(AppNotificationsContext);
    const latestPushNotification = useContext(AppPushNotificationContext);
    const [jwt, setJwt] = useState('');
    const [recentPushNotification, setRecentPushNotification] = useState(''); 
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

    const handleTagsChange = (tags: Array<string>) => {
        if (signedAgreement && signedAgreement.tags.length !== tags.length) {
            signedAgreement.tags = tags
            setSignedAgreement(signedAgreement);
       
 
        }
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

                                {/* <TableRow>
                                    <TableCell component="th" scope="row">
                                        Tags
                                    </TableCell>
                                    <TableCell align="left">
                                    <TagsInput
                                    onTagsChange={(tags) => handleTagsChange(tags)}
                                    fullWidth
                                    variant="outlined"
                                    id="tags"
                                    name="tags"
                                    placeholder="add Tags"
                                    tags={agreement.tags}
                                    label="tags"
                                />
                                    </TableCell>
                                </TableRow> */}

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
        if (dataspaceState && dataspaceState != null && dataspaceState != "") {
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

                                {/* {(signedAgreement && signedAgreement.url.length > 0) ? <iframe width="100%" height="600px" style={{ minHeight: "500px" }} src="https://trustrelaystgprod.blob.core.windows.net/docs/DSA Template version.pdf" /> : <>...</>} */}
                                
                                 {(signedAgreement && templateAgreement && signedAgreement.id!=="" && templateAgreement.id !=="") ? (<PDFViewer style={{width:"100%", minHeight:"500px"}}>
                        <SignedAgreementPdf 
                        dataspaceName={signedAgreement.dataspaceName}
                        agreement={templateAgreement}
                        />
                    </PDFViewer>) : <>...</>}
                                
                 

              

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

            if (jwt != "") {

             

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
                    trustRelayService.getSignedAgreement(jwt, dataspaceid, agreementid).then((res) => {
                        setSignedAgreementLoaded(true);
                        setSignedAgreement(res);

                    }).catch((err:Error)=>{
                        toast.openToast(`error`, err.message, getToastMessageTypeByName('error')); 
                      });

                }

                if (signedAgreementLoaded && !templateAgreementLoaded && signedAgreement && signedAgreement.agreement.length>0) {
                    trustRelayService.getTemplateAgreement(jwt, dataspaceid, signedAgreement.agreement).then((res) => {
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
                        {/* <Typography variant="body1"  >
                            {t('labels.common')}
                        </Typography> */}
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