import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button,  Divider, Breadcrumbs,  Theme } from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import  { useContext, useEffect, useState } from 'react';
import { TemplateAgreementSummary } from '../api/models/models';
import {  DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import AddIcon from '@mui/icons-material/Add';
import { Link, useNavigate, useParams } from "react-router-dom";
import TemplateAgreementList from '../components/template-agreements-page/template-agreement-item-list';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import BallotIcon from '@mui/icons-material/Ballot';
import RefreshIcon from '@mui/icons-material/Refresh';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const TemplateAgreementsPage = () => {

  

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');

    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const emptyTemplateAgreementList: Array<TemplateAgreementSummary> = [];
    const [templateAgreements, setTemplateAgreements] = useState(emptyTemplateAgreementList);
    const [templateAgreementsLoaded, setTemplateAgreementsLoaded] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const navigate = useNavigate();

    const refreshData = () => {
        setTemplateAgreements(emptyTemplateAgreementList);
        setTemplateAgreementsLoaded(false);
    }

    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState !== null && dataspaceState !== "") {
            return (

                <Grid container item xs={12} sm={12} md={12} lg={11} xl={11}>
                    <TemplateAgreementList templateAgreements={templateAgreements} />
                </Grid>


            )
        } else {
            return <Grid item><Typography variant="body1">{t('messages.pleaseSelectDataspace')}</Typography></Grid>
        }
    }

    useEffect(() => {
         

        if (selectedDataspace !== "" && !templateAgreementsLoaded && jwt !== "") {



            trustRelayService.getTemplateAgreementSummaries(jwt, dataspaceid!).then((res) => {
                setTemplateAgreements(res);
                setTemplateAgreementsLoaded(true);
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });




        }
        else {
           
        }


    }, [selectedDataspace, templateAgreementsLoaded])

    useEffect(() => {
         

        if (isAuthenticated) {

            if (jwt !== "") {


                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setTemplateAgreements(emptyTemplateAgreementList);
                    setTemplateAgreementsLoaded(false);
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

                        <BallotIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.templateAgreements')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />




                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                        <Button variant="text"
                            color="primary"
                            startIcon={<AddIcon fontSize="small" style={{ color: "#0090BF" }} />}
                            onClick={() => navigate(`/dataspaces/${dataspaceid}/template-agreement-wizard`)}
                        >
                            {t('labels.newTemplate')}
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
                        <Typography variant="body1">{t('messages.signedOut')}</Typography><Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/template-agreements`})} >Login first</Button>
                    </UnauthenticatedTemplate>
                    <Grid item>
                        &nbsp;
                    </Grid>
                </Grid>

            </LayoutCentered>
        </LayoutPage>


    );
};

export default TemplateAgreementsPage;