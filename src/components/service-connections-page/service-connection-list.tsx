import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Agent, ServiceConnection } from "../../api/models/models"; 
import { useMsal, useAccount, } from '@azure/msal-react';  
import HttpsIcon from '@material-ui/icons/Https';
import { useTranslation } from "react-i18next";
import ServiceConnectionSummaryItem from "./service-connection-summary-item";

const useStyles = makeStyles((theme) => ({
    graphContainer: {
        width: "100%",
        height: "100%",
        padding: "24px 0px 0px 3px"
    },

    smFont: {
        fontSize: "4vw",

    },
    mdFont: {
        fontSize: "1.4vw",

    },
    lgFont: {
        fontSize: "0.8vw",

    },
    caption: {
        color: "#AAAAAA",
        fontSize: "12px"
    }
})
)


const ServiceConnectionList = ({
    dataspace,
    serviceConnections
}: {
    dataspace:string;
    serviceConnections: Array<ServiceConnection>;
}) => {
    const { t } = useTranslation(); 

    useEffect(() => {
        
    }, [])



    const renderServiceConnection = (serviceConnection: ServiceConnection) => {

        return <Grid item key={`agent_${serviceConnection.id}`} xl={3} lg={3} md={5} sm={5} xs={12} >
            <ServiceConnectionSummaryItem
            dataspace={dataspace}
                avatarIcon={<HttpsIcon />}
                serviceConnection={serviceConnection}
            />
        </Grid>

    }

    return (

        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2}>
            {serviceConnections.map((serviceConnection) => renderServiceConnection(serviceConnection))}
        </Grid>

    )
}

export default ServiceConnectionList;