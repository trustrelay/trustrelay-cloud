import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs,   Divider, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import  { useContext, useEffect, useState } from 'react';
import { DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useParams, Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import moment from 'moment';
import { Organization } from '../api/models/models';
import { getToastMessageTypeByName } from '../components/toast';
import OrganizationList from '../components/organizations-page/organization-item-list';
import OrganizationDrawer from '../components/organizations-page/organization-drawer';
import BusinessIcon from '@mui/icons-material/Business';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import NewOrganizationalUnitDrawer from '../components/organizations-page/new-organizational-unit-drawer';
import RefreshIcon from '@mui/icons-material/Refresh'; 
import { makeStyles  } from '@mui/styles';

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

const OrganizationsPage = () => {

  

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();

    const { instance, accounts, inProgress } = useMsal();

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');


    const account = useAccount(accounts[0] || {});


    const emptyOrganizationList: Array<Organization> = [];
    const emptyOrganization: Organization = {
        id: "",
        name: "",
        registry: "",
        admin: "",
        addressLine1: "",
        postalCode: "",
        city: "",
        country: "",
        website: "",
        isVerified: false,
        maturityUrl: "",
        scoreOverall: 0,
        scorePurpose: 0,
        scorePractice: 0,
        scorePeople: 0,
        isAssessed: false
    }
    const [organizations, setOrganizations] = useState(emptyOrganizationList);
    const [loadedOrganizations, setLoadedOrganizations] = useState(false);

    const [selectedOrganization, setSelectedOrganization] = useState(emptyOrganization)


    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');


    const { dataspaceid } = useParams<{ dataspaceid: string }>();


    const [isOrganizationDrawerOpen, setIsOrganizationDrawerOpen] = useState(false);

    const toggleOrganizationDrawer = () => {
        setIsOrganizationDrawerOpen(!isOrganizationDrawerOpen);
    }

    const [isNewOrganizationalUnitDrawerOpen, setIsNewOrganizationalUnitDrawerOpen] = useState(false);

    const toggleNewOrganizationalUnitDrawer = () => {
        setIsNewOrganizationalUnitDrawerOpen(!isNewOrganizationalUnitDrawerOpen);
    }

    const handleCreateNewOrganizationalUnit = (organizationName: string) => {
        trustRelayService.createNewOrganizationalUnit(jwt, organizationName).then((res) => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });

    }

   
 

    const handleDeleteOrganizationalUnit = (organizationId:string) => {
        trustRelayService.deleteOrganizationalUnit(jwt,organizationId).then((res) => {
           
        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleSetAsMyOrganizationalUnit = (organizationId:string) => {
        trustRelayService.changeOrganizationalUnit(jwt,organizationId).then((res) => {
          
        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
    }

    const handleVerifyOrganization = (organizationId: string,
        registryIdentifier: string,
        organizationName: string,
        organizationLegalAddressLine1: string,
        organizationLegalAddressPostalCode: string,
        organizationLegalAddressCity: string,
        country: string,
        organizationWebsite: string) => {

        trustRelayService.verifyOrganization(jwt,
            organizationId,
            registryIdentifier,
            organizationName,
            organizationLegalAddressLine1,
            organizationLegalAddressPostalCode,
            organizationLegalAddressCity,
            country,
            organizationWebsite
        ).then((res) => {
            // setVerificationRequestSent(true);
            toast.openToast(`info`, 'Verification request sent', getToastMessageTypeByName('info'));

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });

    }


    const handleAssessOrganization = (organizationId: string, maturityUrl: string) => {

        trustRelayService.assessOrganization(jwt, organizationId, maturityUrl).then((res) => {
            // setVerificationRequestSent(true);
            toast.openToast(`info`, 'Assessment request sent', getToastMessageTypeByName('info'));

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });

    }


    const refreshData = () => {
        setLoadedOrganizations(false);
        setOrganizations(emptyOrganizationList);
    }


    const renderContent = () => {
        if (dataspaceCtx && dataspaceCtx.dataspaceState !== null && dataspaceCtx.dataspaceState !== "") {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>


                    <Grid item container spacing={2} rowGap={1}>

                        <Grid item container direction="row">

                            <OrganizationList
                                toggleOrganizationDrawer={toggleOrganizationDrawer}
                                organizations={organizations}
                                setSelectedOrganization={setSelectedOrganization}
                                onDelete={handleDeleteOrganizationalUnit}
                                onSetAsMyOrganization={handleSetAsMyOrganizationalUnit}
                                  />

                        </Grid>
                    </Grid>

                    {(selectedOrganization.name.length > 0) ? <OrganizationDrawer
                        organization={selectedOrganization}
                        open={isOrganizationDrawerOpen}
                        handleClose={toggleOrganizationDrawer}
                        onVerify={handleVerifyOrganization}
                        onAssess={handleAssessOrganization}
                    /> : <></>}

                    <NewOrganizationalUnitDrawer
                        open={isNewOrganizationalUnitDrawerOpen}
                        handleClose={toggleNewOrganizationalUnitDrawer}
                        onAction={handleCreateNewOrganizationalUnit}
                    />

                  


                </Grid>)
        } else {
            return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }


    useEffect(() => {
  


        if (jwt !== "" && organizations.length === 0) {


            trustRelayService.getOrganizations(jwt).then((res) => {
                setLoadedOrganizations(true);
                setOrganizations(res);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });

        }
        else {
       
        }

    }, [selectedDataspace, loadedOrganizations])



    useEffect(() => {
    


        if (isAuthenticated) {

            if (jwt !== "") {

                trustRelayService.getAccount(jwt).then((res) => {

                    const ds = res.defaultDataspace
                    dataspaceCtx.setDataspaceState(ds)
                    setSelectedDataspace(ds);
                    setLoadedOrganizations(false);
                    setOrganizations(emptyOrganizationList);
                    
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
        isAuthenticated
    ])

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
                        <Link className={css.breadcrumbLink} to={`/account`} >
                                {t('labels.account')}
                            </Link>
                            <Typography variant="body1" color="textPrimary">{t('labels.organizations')}</Typography>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <BusinessIcon fontSize="medium" color="primary" style={{ marginTop: "6px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.organizations')}</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.organizationalUnits')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >
                        <Button variant="text"
                            color="primary"
                            startIcon={<AddLocationIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={toggleNewOrganizationalUnitDrawer}
                        >
                            {t('labels.addOrganizationalUnit')}
                        </Button>

                      

                        <Button variant="text"
                            color="primary"
                            startIcon={<RefreshIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => refreshData()}
                        >
                            {t('labels.refresh')}
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

          <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/organizations` })} >Login first</Button>

      </Grid>

  </UnauthenticatedTemplate>
</>

    );
};

export default OrganizationsPage;