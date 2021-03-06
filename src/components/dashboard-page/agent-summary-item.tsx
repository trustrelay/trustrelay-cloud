import React, { useEffect, useState } from "react";
import { Chip, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Typography, Theme } from '@mui/material';
import { formatDate, generateRandomColor } from "../../api/utils"; 
import CustomAvatar from "../customAvatar";
import { Agent } from "../../api/models/models";
import { useTranslation } from "react-i18next";
import EventIcon from '@mui/icons-material/Event';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import BusinessIcon from '@mui/icons-material/Business';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    boxContainer: {
        width: "100%",
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },
}));

const AgentSummaryItem = ({
    agent,
    avatarIcon,
}: {
    agent: Agent;
    avatarIcon: React.ReactNode
}) => {

    const css = useStyles();

    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');
    const { t } = useTranslation();

    

    useEffect(() => {
       
        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }
    },[loadedColor])

    return (
        <Paper >
            <Grid className={css.boxContainer} item container >
                <Grid item container direction="row" rowGap={1} columnGap={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <CustomAvatar backgroundColor={color} iconColor="#FFFFFF" >
                            {avatarIcon}
                        </CustomAvatar>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Typography textAlign="left" variant="body1">{agent.name}</Typography>
                    </Grid>
                </Grid>

                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <List  > 

                        <ListItem>
                                <ListItemIcon>
                                    <BusinessIcon />
                                </ListItemIcon>
                                <ListItemText id="organization" primary={t('labels.organization')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={agent.organizationName} /> 
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText id="location" primary={t('labels.location')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={agent.location} />
                                </ListItemSecondaryAction>
                            </ListItem>


                            <ListItem>
                                <ListItemIcon>
                                    <EventIcon />
                                </ListItemIcon>
                                <ListItemText id="joined" primary={t('labels.joined')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={formatDate(agent.timestamp)} />
                                </ListItemSecondaryAction>
                            </ListItem>


                        </List>
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    &nbsp;
                </Grid>
                </Grid>
               
            </Grid>
        </Paper>
    )
}

export default AgentSummaryItem;