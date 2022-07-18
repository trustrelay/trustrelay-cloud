import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button,  Breadcrumbs, Divider, Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import  { useContext, useEffect, useState } from 'react';
import { CreateTemplateAgreementPayload } from '../api/models/models';
import { AppNotificationsContext, AppPushNotificationContext,  DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { useWizard } from 'react-wizard-primitive';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate, useParams } from 'react-router-dom';
import CreateTemplateAgreementStep1 from '../components/template-agreement-wizard-page/step1';
import CreateTemplateAgreementStep2 from '../components/template-agreement-wizard-page/step2';
import CreateTemplateAgreementStep3 from '../components/template-agreement-wizard-page/step3';
import CreateTemplateAgreementStep4 from '../components/template-agreement-wizard-page/step4';
import CreateTemplateAgreementStep5 from '../components/template-agreement-wizard-page/step5';
import CreateTemplateAgreementStep6 from '../components/template-agreement-wizard-page/step6';
import CreateTemplateAgreementStep7 from '../components/template-agreement-wizard-page/step7';
import { getToastMessageTypeByName } from '../components/toast';
import CloudDoneIcon from '@mui/icons-material/CloudDone';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const TemplateAgreementWizardPage = () => {
 
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


    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const navigate = useNavigate();


    const createTemplate = () => {
        var template = {
            title,
            purpose,
            //step 2 
            dataAssets,
            //step 3 
            rightsAndResponsibilities,
            //step 4 
            permissions,
            //step 5
            durationType,
            durationPeriod,
            durationFrom,
            durationUntil,
            frequencyOfUpdates,
            dataRetentionPeriod,
            terminationNoticePeriod,
            //step 6
            jurisdiction
        } as CreateTemplateAgreementPayload;
        trustRelayService.createNewTemplateAgreement(jwt, dataspaceid!, template).then(() => {

        }).catch((err: Error) => {
            toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
        });
        navigate(`/dataspaces/${dataspaceid}/template-agreements`)
    }

    const wizard = useWizard();
    const step1 = wizard.getStep();
    const step2 = wizard.getStep();
    const step3 = wizard.getStep();
    const step4 = wizard.getStep();
    const step5 = wizard.getStep();
    const step6 = wizard.getStep();
    const step7 = wizard.getStep();

    const titleText = 'Data sharing agreement'

    const purposeSampleText = 'e.g. The Parties are entering into this Agreement so that {{DATA-CONSUMER}} and its partners ' +
        'may access [DATASET NAME], analyze and use such data ' +
        'and other relevant data for the purposes of [PURPOSE].'  


    const rightsAndResponsibilitiesText = 'e.g. {{DATA-PROVIDER}} has the right to grant {{DATA-CONSUMER}} the rights to the Licensed ' +
        'Data granted in this Agreement, the use of the Licensed Data by ' +
        '{{DATA-CONSUMER}} in accordance with the license will not infringe or violate the rights of any third party.';

    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth();
    var day = d.getDate();
    var c = new Date(year, month + 6, day);

    // step 1
    const [title, setTitle] = useState(titleText);
    const [purpose, setPurpose] = useState(purposeSampleText);

    //step 2
    const [dataAssets, setDataAssets] = useState('raw');


    //step 3 
    const [rightsAndResponsibilities, setRightsAndResponsibilities] = useState(rightsAndResponsibilitiesText);


    //step 4 
    const initialPermissionsList: Array<string> = ['Read']
    const [permissions, setPermissions] = useState(initialPermissionsList);

    //step 5
    const [durationType, setDurationType] = useState('fixed');
    const [durationPeriod, setDurationPeriod] = useState('');
    const [durationFrom, setDurationFrom] = useState(new Date());
    const [durationUntil, setDurationUntil] = useState(c);

    const [frequencyOfUpdates, setFrequencyOfUpdates] = useState('monthly');
    const [dataRetentionPeriod, setDataRetentionPeriod] = useState('');
    const [terminationNoticePeriod, setTerminationNoticePeriod] = useState('');

    //step 6
    // const [accessControl, setAccessControl] = useState('whitelist')

    const [jurisdiction, setJurisdiction] = useState('CHE');

 

    const renderWizard = (index: number) => {
        switch (index) {


            case 6:
                return <CreateTemplateAgreementStep7
                    send={createTemplate}
                    previous={step7.previousStep}
                    title={title}
                    purpose={purpose}
                    dataAssets={dataAssets}
                    rightsAndResponsibilities={rightsAndResponsibilities}
                    permissions={permissions}
                    durationType={durationType}
                    durationPeriod={durationPeriod}
                    durationFrom={durationFrom}
                    durationUntil={durationUntil}
                    frequencyOfUpdates={frequencyOfUpdates}
                    dataRetentionPeriod={dataRetentionPeriod}
                    terminationNoticePeriod={terminationNoticePeriod}
                    jurisdiction={jurisdiction}
                />

            case 5:
                return <CreateTemplateAgreementStep6
                    next={step6.nextStep}
                    previous={step6.previousStep}
                    jurisdiction={jurisdiction}
                    setJurisdiction={setJurisdiction}
                />

            case 4:
                return <CreateTemplateAgreementStep5
                    next={step5.nextStep}
                    previous={step5.previousStep}
                    durationType={durationType}
                    setDurationType={setDurationType}

                    durationPeriod={durationPeriod}
                    setDurationPeriod={setDurationPeriod}

                    durationFrom={durationFrom}
                    setDurationFrom={setDurationFrom}

                    durationUntil={durationUntil}
                    setDurationUntil={setDurationUntil}

                    frequencyOfUpdates={frequencyOfUpdates}
                    setFrequencyOfUpdates={setFrequencyOfUpdates}
                    dataRetentionPeriod={dataRetentionPeriod}
                    setDataRetentionPeriod={setDataRetentionPeriod}
                    terminationNoticePeriod={terminationNoticePeriod}
                    setTerminationNoticePeriod={setTerminationNoticePeriod}
                />


            case 3:
                return <CreateTemplateAgreementStep4
                    next={step4.nextStep}
                    previous={step4.previousStep}
                    permissions={permissions}
                    setPermissions={setPermissions}
                />


            case 2:
                return <CreateTemplateAgreementStep3
                    next={step3.nextStep}
                    previous={step3.previousStep}
                    rightsAndResponsibilities={rightsAndResponsibilities}
                    setRightsAndResponsibilities={setRightsAndResponsibilities}
                />

            case 1:
                return <CreateTemplateAgreementStep2
                    next={step2.nextStep}
                    previous={step2.previousStep}
                    dataAssets={dataAssets}
                    setDataAssets={setDataAssets}
                />

            case 0:
                return <CreateTemplateAgreementStep1
                    next={step1.nextStep}
                    title={title}
                    setTitle={setTitle}
                    purpose={purpose}
                    setPurpose={setPurpose}
                />
            default:
                return <span>Step not known</span>
        }
    }


    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState !== null && dataspaceState !== "") {
            return (
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={1}>
                    {renderWizard(wizard.activeStepIndex)}
                </Grid>

            )
        } else {
            return <Grid item><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }

  

    useEffect(() => {

        if (isAuthenticated) {

            if (jwt !== "") {
                if (typeof window !== 'undefined') {
                    if (localStorage.getItem('selectedDataspace') === null) {
                        if (dataspace.dataspaceState === '') {
                            trustRelayService.getAccount(jwt).then((res) => {
                                dataspace.setDataspaceState(res.defaultDataspace)

                            });
                        }
                    } else {
                        dataspaceCtx.setDataspaceState(localStorage.getItem('selectedDataspace'))
                    }

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
        latestPushNotification
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
                            <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceid}/dashboard`} >
                                {t('labels.dashboard')}
                            </Link>
                            <Link className={css.breadcrumbLink} to={`/dataspaces/${dataspaceCtx.dataspaceState}/template-agreements`} >
                                {t('labels.templateAgreements')}
                            </Link>
                            <Typography variant="body1" color="textPrimary"> &gt;</Typography>
                        </Breadcrumbs>
                    </Grid>
                    <Grid item container direction="row">
                        <CloudDoneIcon fontSize="medium" color="primary" style={{ marginTop: "6px", marginRight: "2px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">New</Typography>
                            <Typography variant="body2" color="textPrimary">{t('labels.templateAgreement')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />
                    <Grid item container>
 
                        <DataspaceContext.Consumer>
                            {({ dataspaceState }) => (
                                renderContent(dataspaceState)
                            )}

                        </DataspaceContext.Consumer>
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

        <Button variant="contained" onClick={() => instance.loginRedirect({ scopes: [], state: `/dataspaces/${dataspaceid}/template-agreements` })} >Login first</Button>

    </Grid>

</UnauthenticatedTemplate>
</>

    );
};

export default TemplateAgreementWizardPage;