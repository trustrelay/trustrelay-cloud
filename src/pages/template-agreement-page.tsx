import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Chip, Breadcrumbs, makeStyles, Theme, createStyles, Accordion, AccordionSummary, AccordionDetails, TableContainer, Table, TableBody, TableRow, TableCell, Divider } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { Agent, TemplateAgreement, } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext, DataspaceContext } from '../app-contexts';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import ReactPDF, { Page, Text, View, Document, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';
import { useParams, Link } from 'react-router-dom';
import TemplateAgreementPdf from '../components/template-agreement-page/template-agreement-pdf';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import RefreshIcon from '@material-ui/icons/Refresh';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import LayoutCentered from '../components/layout-centered';
import BallotIcon from '@material-ui/icons/Ballot';
import { formatDateTime } from '../api/utils';
import EditTemplateAgreementDrawer from '../components/template-agreement-page/edit-template-agreement-drawer';
import DeleteTemplateAgreementDrawer from '../components/template-agreement-page/delete-template-agreement-drawer';

const TemplateAgreementPage = () => {

    const useStyles = makeStyles(({ palette, ...theme }) => ({
        breadcrumbLink: {
            color: palette.primary.main
        }

    })
    );

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();
    const [finishedLoading, setFinishedLoading] = useState(false);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const isAuthenticated = useIsAuthenticated();
    const appNotifications = useContext(AppNotificationsContext);
    const latestPushNotification = useContext(AppPushNotificationContext);
    const [jwt, setJwt] = useState('');
    const dataspace = useContext(DataspaceContext);
    const dataspaceCtx = useContext(DataspaceContext);

    const [selectedDataspace, setSelectedDataspace] = useState('');

    const emptyAgreement: TemplateAgreement = {
        id: "",
        title: "",
        url: "",
        purpose: "",
        dataAssets: "",
        rightsAndResponsibilities: "",
        permissions: "",
        durationType: "",
        durationPeriod: "",
        durationFrom: new Date(),
        durationUntil: new Date(),
        frequencyOfUpdates: "",
        dataRetentionPeriod: "",
        terminationNoticePeriod: "",
        jurisdiction: "",
        timestamp: "",
        agent: "",
        organization: "",
        organizationName: "",
        organizationDomain: "",
        isLocked:false
    };
    const [agreement, setAgreement] = useState(emptyAgreement);
    const [agreementLoaded, setAgreementLoaded] = useState(false);

    const { dataspaceid, agreementid } = useParams<{ dataspaceid: string, agreementid: string }>();

    const [isEditTemplateAgreementDrawerOpen, setIsEditTemplateAgreementDrawerOpen] = useState(false);
    const [isDeleteTemplateAgreementDrawerOpen, setIsDeleteTemplateAgreementDrawerOpen] = useState(false);

    const [loadedAgent, setLoadedAgent] = useState(false);
    const emptyAgent: Agent = { id: '', dataspace: '', dataspaceName: '', subscription: '', name: '', user: '', location: '', organization: '', organizationName: '', organizationDomain: '', timestamp: '' }
    const [myAgent, setMyAgent] = useState(emptyAgent);



    const toggleEditTemplateAgreementDrawer = () => {
        setIsEditTemplateAgreementDrawerOpen(!isEditTemplateAgreementDrawerOpen);
    }

    const toggleDeleteTemplateAgreementDrawer = () => {
        setIsDeleteTemplateAgreementDrawerOpen(!isDeleteTemplateAgreementDrawerOpen);
    }

    const handleEditServiceConnection = (title: string) => {
        trustRelayService.editTemplateAgreement(jwt, dataspaceid, agreementid, title).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleDeleteTemplateAgreement = () => {
        trustRelayService.deleteTemplateAgreement(jwt, dataspaceid, agreementid).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    function generateGeneralInfoTable(templateAgreement: TemplateAgreement) {
        if (templateAgreement.id.length>0) {
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
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{templateAgreement.id}</Typography></TableCell>
                                                </TableRow>
                                                <TableRow >
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.locked')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{templateAgreement.isLocked.toString()}</Typography></TableCell>
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
                                                    <TableCell align="left" sx={{ width: "150px" }}><Typography textAlign="left" variant="body1">{t('labels.timestamp')}</Typography></TableCell>
                                                    <TableCell align="left"><Typography textAlign="left" variant="body1">{formatDateTime(templateAgreement.timestamp)}</Typography></TableCell>
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

    }

    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState != null && dataspaceState != "") {
            return (<Grid item container>


                {(agreement && agreement.id !== "") ? (<PDFViewer style={{ width: "100%", minHeight: "500px" }}>
                    <TemplateAgreementPdf
                        agreement={agreement}
                    />
                </PDFViewer>) : <>...</>}


                {(agreement && agreement.title && agreement.title.length > 0) ? <EditTemplateAgreementDrawer
                    agreement={agreement}
                    open={isEditTemplateAgreementDrawerOpen}
                    handleClose={toggleEditTemplateAgreementDrawer}
                    onAction={handleEditServiceConnection}
                /> : <></>}

                <DeleteTemplateAgreementDrawer
                    agreement={agreement}
                    open={isDeleteTemplateAgreementDrawerOpen}
                    handleClose={toggleDeleteTemplateAgreementDrawer}
                    onAction={handleDeleteTemplateAgreement}
                />

            </Grid>
            )
        }
        else return <Grid item><Typography variant="body1">{t('messages.pleaseSelectDataspace')}</Typography></Grid>
    }


    useEffect(() => {

        if (selectedDataspace != "" && !loadedAgent && jwt != "") {
          
            trustRelayService.getAgent(jwt, dataspaceid).then((res) => {
                setMyAgent(res)
                setLoadedAgent(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
    }, [selectedDataspace, loadedAgent])

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


                if (!agreementLoaded) {
                    trustRelayService.getTemplateAgreement(jwt, dataspaceid, agreementid).then((res) => {
                        setAgreementLoaded(true);
                        setAgreement(res);

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
    }, [appNotifications.trustRelayNotificationsState,
        jwt,
        finishedLoading,
        isAuthenticated,
        latestPushNotification,
    dataspace.dataspaceState,
        agreementLoaded,
        agreement])

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
                        <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceid}/dashboard`} >
                                Dashboard
                            </Link>

                            <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceCtx.dataspaceState}/template-agreements`} >
                                Template Agreements
                            </Link>

                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <BallotIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{agreement.title}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.templateAgreement')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >

                        {(agreement.agent.length > 0 && agreement.agent === myAgent.id) ? <Button variant="text"
                            color="primary"
                            startIcon={<EditIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleEditTemplateAgreementDrawer}
                        >
                            {t('labels.edit')}
                        </Button> : <></>}


                        {(agreement.agent.length > 0 && agreement.agent === myAgent.id) ? <Button variant="text"
                            color="primary"
                            startIcon={<DeleteIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            disabled={agreement.isLocked}
                            onClick={toggleDeleteTemplateAgreementDrawer}
                        >
                            {t('labels.delete')}
                        </Button> : <></>}


                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => console.log('TODO')}
                        >
                            {t('labels.refresh')}
                        </Button>

                    </Grid>
                    {(agreement) ? generateGeneralInfoTable(agreement) : <Grid item>&nbsp;</Grid>}
                    <AuthenticatedTemplate>


                        <Grid item container>

                            <DataspaceContext.Consumer>
                                {({ dataspaceState }) => (

                                    renderContent(dataspaceState)
                                )}

                            </DataspaceContext.Consumer>
                        </Grid>


                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>

                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/template-agreements/${agreementid}` })} >Login first</Button>
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

export default TemplateAgreementPage;