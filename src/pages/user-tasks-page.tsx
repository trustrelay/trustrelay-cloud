import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Fab, Divider, Breadcrumbs, makeStyles, Theme, createStyles, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, IconButton } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { TemplateAgreementSummary, UserTask } from '../api/models/models';
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
import ListAltIcon from '@material-ui/icons/ListAlt';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { formatDate } from '../api/utils';
import UserTaskList from '../components/user-tasks-page/user-task-list';

const UserTasksPage = () => {

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

    const emptyUserTaskList: Array<UserTask> = [];
    const [userTasks, setUserTasks] = useState(emptyUserTaskList);
    const [userTasksLoaded, setUserTasksLoaded] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    let history = useHistory();

    const refreshData = () => {
        setUserTasks(emptyUserTaskList);
        setUserTasksLoaded(false);
    }

    const renderContent = () => {
        if (dataspaceCtx.dataspaceState && dataspaceCtx.dataspaceState != null && dataspaceCtx.dataspaceState != "") {
            return (

                <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                    <UserTaskList tasks={userTasks} />
                </Grid>


            )
        } else {
            return <Grid item><Typography variant="body1">{t('messages.pleaseSelectDataspace')}</Typography></Grid>
        }
    }

    useEffect(() => {
         

        if (selectedDataspace != "" && !userTasksLoaded && jwt != "") {
            trustRelayService.getUserTasks(jwt, dataspaceid).then((res)=>{
                setUserTasks(res)
                setUserTasksLoaded(true)
                
            })
        }
        else {
           
        }


    }, [selectedDataspace, userTasksLoaded])

    useEffect(() => {
       

        if (isAuthenticated) {

            if (jwt != "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setUserTasks(emptyUserTaskList);
                    setUserTasksLoaded(false);
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
                            <Link className={css.breadcrumbLink} to="/dashboard" >
                                {t('labels.dashboard')}
                            </Link>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>

                    </Grid>
                    <Grid item container direction="row">

                        <ListAltIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.tasks')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />




                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}

                        >
                            {t('labels.newTask')}
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
                                renderContent()
                            )}

                        </DataspaceContext.Consumer>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                      
                    <Grid container direction="column">
                            <Grid item>
                            <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                            <Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/user-tasks`})} >Login first</Button>
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

export default UserTasksPage;