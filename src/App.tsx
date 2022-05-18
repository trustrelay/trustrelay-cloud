import { useEffect, useState, lazy, Suspense } from 'react';
import {
  ToastContext,
  TOAST_CONTEXT_DEFAULT,
  APP_NOTIFICATIONS_CONTEXT_DEFAULT,
  AppNotificationsContext,
  APP_PUSH_NOTIFICATION_CONTEXT_DEFAULT,
  AppPushNotificationContext,
  DataspaceContext,
  DATASPACE_CONTEXT_DEFAULT,
  MEMBERSHIPS_CONTEXT_DEFAULT,
  MembershipsContext
} from './app-contexts';
import NotFoundPage from './pages/not-found-page';
import {
  Switch,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';
import GlobalCss from "./styles/jss/GlobalCss.jsx";
import Scrollbar from "react-perfect-scrollbar";
import { MsalProvider } from "@azure/msal-react";

import './App.css';

import "react-perfect-scrollbar/dist/css/styles.css";

import Page from './components/page';

import LightTheme from './assets/themes/TrustRelay/light';

import { MuiThemeProvider } from '@material-ui/core';

const DashboardPage = lazy(() => import('./pages/dashboard-page'));
 
const SignedOutPage = lazy(() => import('./pages/signed-out-page'));
const CommonsPage = lazy(() => import('./pages/commons-page'));
const CommonPage = lazy(() => import('./pages/common-page'));
const DataspacePage = lazy(() => import('./pages/dataspace-page'));
const SignedAgreementsPage = lazy(() => import('./pages/signed-agreements-page'));
const SignedAgreementPage = lazy(() => import('./pages/signed-agreement-page'));
const ServiceConnectionsPage = lazy(() => import('./pages/service-connections-page'));
const TemplateAgreementsPage = lazy(() => import('./pages/template-agreements-page'));
const TemplateAgreementWizardPage = lazy(() => import('./pages/template-agreement-wizard-page'));
const TemplateAgreementPage = lazy(() => import('./pages/template-agreement-page'));
const InsightsPage = lazy(() => import('./pages/insights-page'));
const AccountPage = lazy(() => import('./pages/account-page'));
const IssuesPage = lazy(() => import('./pages/issues-page'));
const JoinPage = lazy(() => import('./pages/join-page'));
const UserTasksPage = lazy(() => import('./pages/user-tasks-page'));
const ServiceConnectionPage = lazy(() => import('./pages/service-connection-page'));
const AuditLogsPage = lazy(() => import('./pages/audit-logs-page'));
const RedirectPage = lazy(() => import('./pages/redirect-page'));
const OrganizationsPage = lazy(() => import('./pages/organizations-page'));
const SubscriptionPage = lazy(() => import('./pages/subscription-page')); 
  
 


const App = (
  { msalInstance
  }: {
    msalInstance: any
  }) => {
  const [toastState, setToastState] = useState(TOAST_CONTEXT_DEFAULT.toastState);
  const [trustRelayNotificationsState, setTrustRelayNotificationsState] = useState(APP_NOTIFICATIONS_CONTEXT_DEFAULT.trustRelayNotificationsState);
  const [trustRelayPushNotificationState, setTrustRelayPushNotificationState] = useState(APP_PUSH_NOTIFICATION_CONTEXT_DEFAULT.trustRelayPushNotificationState);
  const [dataspaceState, setDataspaceState] = useState(DATASPACE_CONTEXT_DEFAULT.dataspaceState);

  const toastProviderValue = { toastState, setToastState };
  const trustRelayNotificationsProviderValue = { trustRelayNotificationsState, setTrustRelayNotificationsState }
  const trustRelayPushNotificationProviderValue = { trustRelayPushNotificationState, setTrustRelayPushNotificationState }

  const dataspaceProviderValue = { dataspaceState, setDataspaceState }

  const [membershipsState, setMembershipsState] = useState(MEMBERSHIPS_CONTEXT_DEFAULT.membershipsState);
  const membershipsProviderValue = { membershipsState, setMembershipsState };


  useEffect(() => {

  })




  return (
    <MuiThemeProvider theme={LightTheme}>

      <MsalProvider instance={msalInstance}>
        <ToastContext.Provider value={toastProviderValue}>
          <AppNotificationsContext.Provider value={trustRelayNotificationsProviderValue}>
            <AppPushNotificationContext.Provider value={trustRelayPushNotificationProviderValue}>
              <DataspaceContext.Provider value={dataspaceProviderValue}>
                <MembershipsContext.Provider value={membershipsProviderValue}>
                  <GlobalCss>
                    <Scrollbar
                      className="h-full-screen scrollable-content"
                      options={{ suppressScrollX: true }}
                    >
                      <Router>
                        <Suspense fallback={<div>Loading...</div>}>
                          <Switch>


                            <Route
                              path="/redirect"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Redirecting">
                                  <RedirectPage />
                                </Page>
                              )}
                            />

                           
  

                            <Route
                              path="/account"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Account">
                                  <AccountPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/organizations"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Organizations">
                                  <OrganizationsPage />
                                </Page>
                              )}
                            />


                            <Route
                              path="/settings/subscriptions/:subscriptionid"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Subscription">
                                  <SubscriptionPage />
                                </Page>
                              )}
                            />



                            <Route
                              path="/dataspaces/:dataspaceid"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Dataspace">
                                  <DataspacePage />
                                </Page>
                              )}
                            />


                            <Route
                              path="/dataspaces/:dataspaceid/dashboard"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Dashboard">
                                  <DashboardPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/issues"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Issues">
                                  <IssuesPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/join/:code"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Join">
                                  <JoinPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/audit-logs"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Audit Logs">
                                  <AuditLogsPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/tasks"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Tasks">
                                  <UserTasksPage />
                                </Page>
                              )}
                            />




                            <Route
                              path="/dataspaces/:dataspaceid/commons/:commonid"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Common">
                                  <CommonPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/commons"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Commons">
                                  <CommonsPage />
                                </Page>
                              )}
                            />


                            <Route
                              path="/dataspaces/:dataspaceid/signed-agreements/:agreementid"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Signed Agreement">
                                  <SignedAgreementPage />
                                </Page>
                              )}
                            />


                            <Route
                              path="/dataspaces/:dataspaceid/signed-agreements"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Dataspace Agreements">
                                  <SignedAgreementsPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/template-agreements/:agreementid"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Template Agreement">
                                  <TemplateAgreementPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/template-agreements"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Template Agreements">
                                  <TemplateAgreementsPage />
                                </Page>
                              )}
                            />

                            <Route
                              path="/dataspaces/:dataspaceid/template-agreement-wizard"
                              exact
                              render={props => (
                                <Page {...props} title="TrustRelay | Create Template Agreement">
                                  <TemplateAgreementWizardPage />
                                </Page>
                              )}
                            />



                            <Route
                              exact
                              path="/dataspaces/:dataspaceid/settings/service-connections"
                              render={props => (
                                <Page {...props} title="TrustRelay | Service Connections">
                                  <ServiceConnectionsPage />
                                </Page>
                              )}
                            />


                            <Route
                              exact
                              path="/dataspaces/:dataspaceid/settings/service-connections/:serviceconnectionid"
                              render={props => (
                                <Page {...props} title="TrustRelay | Service Connection">
                                  <ServiceConnectionPage />
                                </Page>
                              )}
                            />


                            <Route
                              exact
                              path="/dataspaces/:dataspaceid/insights"
                              render={props => (
                                <Page {...props} title="TrustRelay | Insights">
                                  <InsightsPage />
                                </Page>
                              )}
                            />

                            <Route
                              exact
                              path="/"
                              render={props => (
                                <Page {...props} title="TrustRelay | Account">
                                <AccountPage />
                              </Page>
                              )}
                            />

                          

                            <Route
                              exact
                              path="/signed-out"
                              component={SignedOutPage}
                              render={props => (
                                <Page {...props} title="TrustRelay | Signed Out">
                                  <SignedOutPage />
                                </Page>
                              )}
                            />




                            <Route
                              component={NotFoundPage}
                              render={props => (
                                <Page {...props} title="TrustRelay | 404 Not Found">
                                  <NotFoundPage />
                                </Page>
                              )}
                            />



                          </Switch>
                        </Suspense>
                      </Router>
                    </Scrollbar>
                  </GlobalCss>
                </MembershipsContext.Provider>
              </DataspaceContext.Provider>
            </AppPushNotificationContext.Provider>
          </AppNotificationsContext.Provider>
        </ToastContext.Provider>
      </MsalProvider>
    </MuiThemeProvider>

  );
};

export default App;
