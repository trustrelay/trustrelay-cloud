import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Fab, Divider, Breadcrumbs, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { Issue, TemplateAgreementSummary } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext, DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import AddIcon from '@material-ui/icons/Add';
import { Link, useHistory, useParams } from "react-router-dom";
import TemplateAgreementList from '../components/template-agreements-page/template-agreement-item-list';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import BallotIcon from '@material-ui/icons/Ballot';
import RefreshIcon from '@material-ui/icons/Refresh';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { formatDate } from '../api/utils';
import IssueList from '../components/issues-page/issue-list';

const IssuesPage = () => {

    const useStyles = makeStyles(({ palette, ...theme }) => ({
        breadcrumbLink: {
            color: palette.primary.main
        }

    })
);

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const emptyIssueList: Array<Issue> = [];
    const [issues, setIssues] = useState(emptyIssueList);
    const [issuesLoaded, setIssuesLoaded] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    let history = useHistory();

    const refreshData = () => {
        setIssues(emptyIssueList);
        setIssuesLoaded(false);
    }

    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState != null && dataspaceState != "") {
            return (

                <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                    <IssueList issues={issues} />
                </Grid>


            )
        } else {
            return <Grid item><Typography variant="body1">{t('messages.pleaseSelectDataspace')}</Typography></Grid>
        }
    }

    useEffect(() => {
      

        if (selectedDataspace != "" && !issuesLoaded && jwt != "") {

            trustRelayService.getIssues(jwt, dataspaceid).then((res)=>{
                setIssues(res)
                setIssuesLoaded(true)
                
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
             
        }


    }, [selectedDataspace, issuesLoaded])

    useEffect(() => {
        

        if (isAuthenticated) {

            if (jwt != "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setIssues(emptyIssueList);
                    setIssuesLoaded(false);
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

                        <QuestionAnswerIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.issues')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />




                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}

                        >
                            {t('labels.newIssue')}
                        </Button>

                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                        >
                            {t('labels.refresh')}
                        </Button>
                    </Grid>
                    <AuthenticatedTemplate>
                        <DataspaceContext.Consumer>
                            {({ dataspaceState }) => (
                                renderContent(dataspaceState)
                            )}

                        </DataspaceContext.Consumer>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                    <Grid container direction="column">
                            <Grid item>
                            <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/issues`})} >Login first</Button>
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

export default IssuesPage;