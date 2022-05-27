import { useState, lazy, Suspense, useEffect } from 'react';
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
  Routes,
  Route,
  BrowserRouter as Router
} from 'react-router-dom';

import { MsalProvider } from "@azure/msal-react";


import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";
import Page from './components/page';


import GlobalCss from "./styles/jss/GlobalCss";
import './App.css';
import LightTheme from './assets/themes/TrustRelay/light';
import DarkTheme from './assets/themes/TrustRelay/dark';


import { ThemeProvider } from '@mui/material/styles'
import { Box, CssBaseline, LinearProgress } from '@mui/material';
import { useDarkMode } from './hooks/dark-mode';

import { LicenseInfo } from '@mui/x-license-pro';

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



const MyPerfectScrollbar: any = PerfectScrollbar

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

  // eslint-disable-next-line @typescript-eslint/no-unused-vars 
  const [theme, themeToggler] = useDarkMode();
  const themeMode = theme === 'light' ? LightTheme : DarkTheme;

  useEffect(() => {
    LicenseInfo.setLicenseKey('6c55dc46dfadd834c230493066ec3090Tz00NDU4MSxFPTE2ODUyNTMzMDYyMzEsUz1wcmVtaXVtLExNPXN1YnNjcmlwdGlvbixLVj0y');
  }, [theme])

  return <ThemeProvider theme={themeMode}>
    <CssBaseline />
    <GlobalCss>

      <MsalProvider instance={msalInstance}>
        <ToastContext.Provider value={toastProviderValue}>
          <AppNotificationsContext.Provider value={trustRelayNotificationsProviderValue}>
            <AppPushNotificationContext.Provider value={trustRelayPushNotificationProviderValue}>
              <DataspaceContext.Provider value={dataspaceProviderValue}>
                <MembershipsContext.Provider value={membershipsProviderValue}>

                  <MyPerfectScrollbar
                    className="h-full-screen scrollable-content"
                    options={{ suppressScrollX: true }}
                  >
                    <Router>
                      <Suspense fallback={<Box sx={{ width: '100%' }}>
                        <LinearProgress  />
                      </Box>}>
                        <Routes>
 
                          <Route
                            index
                            element={<Page title="TrustRelay | Account">
                              <AccountPage />
                            </Page>
                            }
                          />


                          <Route
                            path="/redirect"

                            element={<Page title="TrustRelay | Redirecting">
                              <RedirectPage />
                            </Page>}
                          />




                          <Route
                            path="/account"

                            element={<Page title="TrustRelay | Account">
                              <AccountPage />
                            </Page>}
                          />

                          <Route
                            path="/organizations"

                            element={<Page title="TrustRelay | Organizations">
                              <OrganizationsPage />
                            </Page>}
                          />


                          <Route
                            path="/settings/subscriptions/:subscriptionid"

                            element={<Page title="TrustRelay | Subscription">
                              <SubscriptionPage />
                            </Page>}
                          />



                          <Route
                            path="/dataspaces/:dataspaceid"

                            element={<Page title="TrustRelay | Dataspace">
                              <DataspacePage />
                            </Page>}
                          />


                          <Route
                            path="/dataspaces/:dataspaceid/dashboard"

                            element={<Page title="TrustRelay | Dashboard">
                              <DashboardPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/issues"

                            element={<Page title="TrustRelay | Issues">
                              <IssuesPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/join/:code"

                            element={<Page title="TrustRelay | Join">
                              <JoinPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/audit-logs"

                            element={<Page title="TrustRelay | Audit Logs">
                              <AuditLogsPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/tasks"

                            element={<Page title="TrustRelay | Tasks">
                              <UserTasksPage />
                            </Page>}
                          />




                          <Route
                            path="/dataspaces/:dataspaceid/commons/:commonid"

                            element={<Page title="TrustRelay | Common">
                              <CommonPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/commons"

                            element={<Page title="TrustRelay | Commons">
                              <CommonsPage />
                            </Page>}
                          />


                          <Route
                            path="/dataspaces/:dataspaceid/signed-agreements/:agreementid"

                            element={<Page title="TrustRelay | Signed Agreement">
                              <SignedAgreementPage />
                            </Page>}
                          />


                          <Route
                            path="/dataspaces/:dataspaceid/signed-agreements"

                            element={<Page title="TrustRelay | Dataspace Agreements">
                              <SignedAgreementsPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/template-agreements/:agreementid"

                            element={<Page title="TrustRelay | Template Agreement">
                              <TemplateAgreementPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/template-agreements"

                            element={<Page title="TrustRelay | Template Agreements">
                              <TemplateAgreementsPage />
                            </Page>}
                          />

                          <Route
                            path="/dataspaces/:dataspaceid/template-agreement-wizard"

                            element={<Page title="TrustRelay | Create Template Agreement">
                              <TemplateAgreementWizardPage />
                            </Page>}
                          />



                          <Route

                            path="/dataspaces/:dataspaceid/settings/service-connections"
                            element={<Page title="TrustRelay | Service Connections">
                              <ServiceConnectionsPage />
                            </Page>}
                          />


                          <Route

                            path="/dataspaces/:dataspaceid/settings/service-connections/:serviceconnectionid"
                            element={<Page title="TrustRelay | Service Connection">
                              <ServiceConnectionPage />
                            </Page>}
                          />


                          <Route

                            path="/dataspaces/:dataspaceid/insights"
                            element={<Page title="TrustRelay | Insights">
                              <InsightsPage />
                            </Page>}
                          />




                          <Route
                            path="/signed-out"

                            element={<Page title="TrustRelay | Signed Out">
                              <SignedOutPage />
                            </Page>}
                          />




                          <Route
                            path="*"
                            element={<Page title="TrustRelay | 404 Not Found">
                              <NotFoundPage />
                            </Page>}
                          />



                        </Routes>
                      </Suspense>
                    </Router>
                  </MyPerfectScrollbar>

                </MembershipsContext.Provider>
              </DataspaceContext.Provider>
            </AppPushNotificationContext.Provider>
          </AppNotificationsContext.Provider>
        </ToastContext.Provider>
      </MsalProvider>
    </GlobalCss>
  </ThemeProvider>;
};

export default App;
