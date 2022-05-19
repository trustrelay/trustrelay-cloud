import React, { useEffect, useState } from "react";
import {  Button, Chip,  Grid,  List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Typography, Theme } from '@mui/material';
import { formatDate, generateRandomColor } from "../../api/utils";
import { useNavigate } from "react-router-dom";
import CustomAvatar from "../customAvatar";
import { ServiceConnection } from "../../api/models/models";
import { useTranslation } from "react-i18next";
import TodayIcon from '@mui/icons-material/Today';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DnsIcon from '@mui/icons-material/Dns';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    boxContainer: {
        width: "100%", 
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },
 
})
)

const ServiceConnectionSummaryItem = ({
    dataspace,
    serviceConnection,
    avatarIcon
}: {
    dataspace:string;
    serviceConnection: ServiceConnection;
    avatarIcon: React.ReactNode;
}) => {

    const css = useStyles();
    const { t } = useTranslation(); 
    const navigate = useNavigate();

    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');

   

    useEffect(() => {
       

        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }
    })

    return (
        <Paper >
            <Grid className={css.boxContainer} item container  >
                <Grid item container direction="row" rowGap={1} columnGap={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <CustomAvatar backgroundColor={color} iconColor="#FFFFFF" >
                            {avatarIcon}
                        </CustomAvatar>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Typography variant="body1">{serviceConnection.name}</Typography>
                    </Grid>
                </Grid>

                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <List > 
                        <ListItem>
                                <ListItemIcon>
                                    <DnsIcon />
                                </ListItemIcon>
                                <ListItemText id="type" primary={t('labels.provider')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={serviceConnection.storageProvider} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            

                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText id="storagelocation" primary={t('labels.storageLocation')} />
                                <ListItemSecondaryAction>

                                    <Chip variant="outlined" label={serviceConnection.storageLocation} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <TodayIcon />
                                </ListItemIcon>
                                <ListItemText id="timestamp" primary={t('labels.created')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={formatDate(serviceConnection.timestamp)} />
                                </ListItemSecondaryAction>
                            </ListItem>

 

                        </List>
                    </Grid>
                       <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>&nbsp;</Grid>

                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                        <Button
                         sx={{width:"100%", padding:"15px"}}
                            variant="contained"
                            color="secondary" 
                            endIcon={<NavigateNextIcon/>}
                            onClick={()=>navigate(`/dataspaces/${dataspace}/settings/service-connections/${serviceConnection.id}`)}
                        >
                            {t('labels.details')}
                        </Button>
                    </Grid> 

                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </Paper>
    )
}

export default ServiceConnectionSummaryItem;