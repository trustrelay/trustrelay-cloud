import { Grid } from '@mui/material';
import {  ServiceConnection } from "../../api/models/models";  
import HttpsIcon from '@mui/icons-material/Https'; 
import ServiceConnectionSummaryItem from "./service-connection-summary-item";
 
const ServiceConnectionList = ({
    dataspace,
    serviceConnections
}: {
    dataspace:string;
    serviceConnections: Array<ServiceConnection>;
}) => {
 
 
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