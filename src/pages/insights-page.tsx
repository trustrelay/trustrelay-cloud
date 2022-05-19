import LayoutPage from '../components/layout-one-column';
import { useToast } from '../hooks/toast-hook';
import { Grid, Typography, Button, Breadcrumbs, AppBar, Tabs, Tab, Divider, Theme} from '@mui/material';
import trustRelayService from '../api/trustrelay-service';
import React, { useContext, useEffect, useState } from 'react';
import {   DataspaceContext } from '../app-contexts';
import LayoutCentered from '../components/layout-centered';
import { useMsal, useAccount, AuthenticatedTemplate, UnauthenticatedTemplate, useIsAuthenticated } from '@azure/msal-react';
import { loginRequest, protectedResources } from '../authConfig';
import { Link, useParams } from "react-router-dom";
import TabPanel from '../components/tab-panel';
import { useTranslation } from 'react-i18next';
import { getToastMessageTypeByName } from '../components/toast';
import EqualizerIcon from '@mui/icons-material/Equalizer';
import SankeyChart from '../components/insights-page/sankey-chart';
import { DataProvenanceSet, GeoScore, GeoScores, Usage } from '../api/models/models';
import ChordChart from '../components/insights-page/chord-chart';
import GeoChart from '../components/insights-page/geo-chart';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    breadcrumbLink: {
        color: theme.palette.primary.main
    }

})
);

const InsightsPage = () => {

   

    const toast = useToast();
    const { t } = useTranslation();
    const css = useStyles();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});
    const isAuthenticated = useIsAuthenticated();
    const [jwt, setJwt] = useState('');
    const [value, setValue] = React.useState(0);
    const dataspaceCtx = useContext(DataspaceContext);
    const [selectedDataspace, setSelectedDataspace] = useState('');

    const emptyDataProvenanceSet: DataProvenanceSet = { nodes: [], links: [] }
    const [dataProvenance, setDataProvenance] = useState(emptyDataProvenanceSet);
    const [dataProvenanceLoaded, setDataProvenanceLoaded] = useState(false);

    const { dataspaceid } = useParams<{ dataspaceid: string }>();

    const emptyGeoscores: GeoScores = {
    maxValue:0,
    scores:[]
    }
    const [geoscores, setGeoscores] = useState(emptyGeoscores);
    const [geoscoresLoaded, setGeoscoresLoaded] = useState(false);

    const emptyUsageData: Array<Array<number>> = [[]];
    const emptyUsageKeys: Array<string> = [];
    const emptyUsage: Usage = { data: emptyUsageData, keys: emptyUsageKeys }
    const [usage, setUsage] = useState(emptyUsage);
    const [usageLoaded, setUsageLoaded] = useState(false);

    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }


    const renderContent = (dataspaceState: string | null) => {
        if (dataspaceState && dataspaceState != null && dataspaceState != "") {
            return (
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>

                    <AppBar position="static">
                        <Tabs value={value} onChange={handleTabChange} aria-label="source tabs">

                            <Tab label={t('labels.provenance')} {...a11yProps(0)} /> 
                            <Tab label={t('labels.interactions')} {...a11yProps(1)} />
                            <Tab label={t('labels.geographicalContext')} {...a11yProps(2)} />

                        </Tabs>
                    </AppBar>

                    <TabPanel id="provenance" value={value} index={0}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item xl={10} lg={10} md={12} sm={12} xs={12} sx={{ height: "30em", width: "100%" }}>
                                {(dataProvenance && dataProvenance.nodes && dataProvenance.links && dataProvenance.nodes.length > 0 && dataProvenance.links.length > 0) ? <SankeyChart data={dataProvenance} /> : <></>}
                            </Grid>
                        </Grid>
                    </TabPanel>

                 


                    <TabPanel id="usage" value={value} index={1}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item xl={10} lg={10} md={12} sm={12} xs={12} sx={{ height: "25em", width: "100%" }}>

                             {(usageLoaded && usage) ?  <ChordChart data={usage.data} keys={usage.keys} /> : <></>}  

                            </Grid>
                        </Grid>
                    </TabPanel>

                    <TabPanel id="geo" value={value} index={2}>
                        <Grid item container spacing={2} rowGap={1}>
                            <Grid item container>
                                &nbsp;
                            </Grid>
                            <Grid item xl={10} lg={10} md={12} sm={12} xs={12} sx={{ height: "30em", width: "100%" }}>
                               {(geoscoresLoaded && geoscores && geoscores.scores && geoscores.scores.length>0) ?  <GeoChart maxValue={geoscores.maxValue} scores={geoscores.scores} /> : <></>}
                            </Grid>
                        </Grid>
                    </TabPanel>

                </Grid>
            )
        } else {
            return <Grid item container><Typography variant="body1">Please select a dataspace</Typography></Grid>
        }
    }


    useEffect(() => {
        
        if (selectedDataspace != "" && jwt != "" && !dataProvenanceLoaded) {
            trustRelayService.getDataProvenance(jwt, selectedDataspace).then((res) => {
                setDataProvenance(res)
                setDataProvenanceLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        }
    }, [selectedDataspace, dataProvenanceLoaded])


    useEffect(() => {
        

        if (dataProvenanceLoaded && jwt != "" && !usageLoaded) {
            trustRelayService.getUsage(jwt, selectedDataspace).then((res) => {
                setUsage(res)
                setUsageLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        }
    }, [dataProvenanceLoaded, usageLoaded])

    useEffect(() => {
        

        if (usageLoaded && !geoscoresLoaded && jwt != "") {
            trustRelayService.getGeoscores(jwt, selectedDataspace).then((res) => {
                setGeoscores(res)
                setGeoscoresLoaded(true)
            }).catch((err: Error) => {
                toast.openToast(`error`, err.message, getToastMessageTypeByName('error'));
            });
        }
    }, [usageLoaded, geoscoresLoaded])


    useEffect(() => {
       

        if (isAuthenticated) {

            if (jwt != "") {

                if (dataspaceCtx && dataspaceCtx.dataspaceState !== null) {
                    setSelectedDataspace(dataspaceCtx.dataspaceState)
                    setDataProvenanceLoaded(false);
                    setDataProvenance(emptyDataProvenanceSet);

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

                        <EqualizerIcon fontSize="medium" color="primary" style={{ marginTop: "3px" }} />
                        <Grid item>
                            <Typography variant="h5" color="textPrimary">{t('labels.insights')}</Typography>
                        </Grid>
                    </Grid>
                    <Divider />



                    <Grid item container direction="row" spacing={2} display="inline-flex" sx={{ marginLeft: "1px" }} >


                    


                    </Grid>

                    <AuthenticatedTemplate>


                        <Grid item container >
                            <DataspaceContext.Consumer>
                                {({ dataspaceState }) => (
                                    renderContent(dataspaceState)
                                )}
                            </DataspaceContext.Consumer>
                        </Grid>
                        <Grid item>
                            &nbsp;
                        </Grid>
                    </AuthenticatedTemplate>
                    <UnauthenticatedTemplate>
                        <Grid container direction="column">
                            <Grid item>
                                <Typography variant="body1">{t('messages.signedOut')}</Typography>
                            </Grid>
                            <Grid item>
                                <Button variant="contained" onClick={() => instance.loginRedirect({scopes:[], state:`/dataspaces/${dataspaceid}/insights`})} >Login first</Button>
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

export default InsightsPage;