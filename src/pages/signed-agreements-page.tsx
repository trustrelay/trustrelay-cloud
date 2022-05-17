import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, CircularProgress, Card, CardContent, Breadcrumbs, Divider } from '@material-ui/core';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import { SignedAgreement, SignedAgreementSummary, } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext, DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { InteractionRequiredAuthError } from '@azure/msal-browser';
import { getToastMessageTypeByName } from '../components/toast';

import SignedAgreementList from '../components/signed-agreements-page/signed-agreement-item-list';
import { useTranslation } from 'react-i18next';
import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import { Link, useParams } from 'react-router-dom';

const SignedAgreementsPage = () => {

    const toast = useToast();
    const { t } = useTranslation();

    const [finishedLoading, setFinishedLoading] = useState(false);
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const appNotifications = useContext(AppNotificationsContext);
    const latestPushNotification = useContext(AppPushNotificationContext);
    const [jwt, setJwt] = useState('');
    const [recentPushNotification, setRecentPushNotification] = useState('');
    const [showLoading, setShowLoading] = useState(false);
    const dataspaceCtx = useContext(DataspaceContext);

    const emptyDataspaceAgreementList: Array<SignedAgreementSummary> = [];
    const [dataspaceAgreements, setDataspaceAgreements] = useState(emptyDataspaceAgreementList);
    const [dataspaceAgreementsLoaded, setDataspaceAgreementsLoaded] = useState(false);
    const [membershipsLoaded, setMembershipsLoaded] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState != null && dataspaceState != "") {
            return (
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={1}>

                    <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                        <SignedAgreementList dataspace={(dataspaceState) ? dataspaceState : ""} dataspaceAgreements={dataspaceAgreements} />
                    </Grid>
                </Grid>
            )

        } else {
            return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

    useEffect(() => {


        if (isAuthenticated) {

            if (jwt != "") {
                if (typeof window !== 'undefined') {
                    if (localStorage.getItem('selectedDataspace') == null) {
                        if (dataspaceCtx.dataspaceState == '') {
                            trustRelayService.getAccount(jwt).then((res) => {
                                dataspaceCtx.setDataspaceState(res.defaultDataspace)

                            }).catch((err: Error) => {
                                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
                            });
                        }
                    } else {
                        dataspaceCtx.setDataspaceState(localStorage.getItem('selectedDataspace'))
                    }
                }

                if (dataspaceAgreements.length <= 0 && !dataspaceAgreementsLoaded && dataspaceCtx.dataspaceState) {
                    trustRelayService.getSignedAgreements(jwt, dataspaceCtx.dataspaceState).then((res) => {
                        setDataspaceAgreements(res);
                        setDataspaceAgreementsLoaded(true);
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
    }, [appNotifications.trustRelayNotificationsState, jwt, finishedLoading, isAuthenticated, latestPushNotification, dataspaceCtx.dataspaceState, dataspaceAgreementsLoaded, membershipsLoaded, dataspaceAgreements])





    return (
        <LayoutPage
            toast={toast}
            openToast={toast.openToast}
            closeToast={toast.closeToast}
        >

            <LayoutCentered fullHeight>
                <Grid container item direction="column" rowGap={2} columnGap={1} spacing={1}>
                    <Grid item container>
                        <LibraryAddCheckIcon fontSize="small" style={{ color: "#666666" }} />
                        <Breadcrumbs aria-label="breadcrumb">
                            <Link color="inherit" to="/dashboard" >
                                {t('labels.dashboard')}
                            </Link>
                            <Typography variant="body1" color="textPrimary">{t('labels.signedAgreements')}</Typography>
                        </Breadcrumbs>
                        {/* <Typography variant="body1"  >
                            {t('labels.common')}
                        </Typography> */}
                        <Divider />
                    </Grid>
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >

                    </Grid>
                    <AuthenticatedTemplate>
                        <DataspaceContext.Consumer>
                            {({ dataspaceState }) => (
                                renderContent(dataspaceState)
                            )}

                        </DataspaceContext.Consumer>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <Typography variant="body1">{t('messages.signedOut')}</Typography><Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/signed-agreements` })} >Login first</Button>
                    </UnauthenticatedTemplate>
                    <Grid item>
                        &nbsp;
                    </Grid>
                </Grid>

            </LayoutCentered>
        </LayoutPage>


    );
};

export default SignedAgreementsPage;