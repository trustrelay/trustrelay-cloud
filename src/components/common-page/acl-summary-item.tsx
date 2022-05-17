import React, { useEffect, useState } from "react";
import {  Chip, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, ListSubheader, makeStyles, Paper,  Typography, useMediaQuery, withStyles } from "@material-ui/core";

import { formatDate,   generateRandomColor } from "../../api/utils";
import CustomAvatar from "../customAvatar";
import { Acl } from "../../api/models/models"; 
import trustrelayService from "../../api/trustrelay-service";
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';

const useStyles = makeStyles((theme) => ({
    boxContainer: {
        width: "100%", 
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },

   
})
)





const AclSummaryItem = ({
    jwt,
    dataspace,
    common,
    agent,
    agentName, 
    avatarIcon,
    onSave
}: {
    jwt:string,
    dataspace:string,
    common: string,
    agent: string,
    agentName: string, 
    avatarIcon: React.ReactNode,
    onSave: (allowRead: boolean, allowWrite: boolean, allowCopy: boolean, allowScript: boolean, allowExport: boolean) => void
}) => {

    const css = useStyles();
    const smDown = !useMediaQuery('(min-width:600px)');
    const lgUp = useMediaQuery('(min-width:1000px)');
    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');
    const emptyAcl: Acl = { id: "", agent: "", agentName: "", common: "", commonName: "", timestamp: "", allowCopy: false, allowRead: false, allowWrite: false, allowExport: false, allowScript: false, validFrom:"", validUntil:"" }
    const [acl, setAcl] = useState(emptyAcl);
    const [loadedAcl, setLoadedAcl] = useState(false);
    const emptyList: Array<string> = []
    const [checked, setChecked] = React.useState(emptyList);
 

    useEffect(() => {
       
        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }
        if (!loadedAcl) {
            trustrelayService.getCommonAcl(jwt, dataspace, common, agent).then((res)=>{
                setAcl(res);
                setLoadedAcl(true);

                const newChecked = [...checked]; 
                if(res.allowRead){
                    newChecked.push('allowread');
                }
                if(res.allowWrite){
                    newChecked.push('allowwrite');
                }
                if(res.allowCopy){
                    newChecked.push('allowcopy');
                }
                if(res.allowScript){
                    newChecked.push('allowscript');
                }
                if(res.allowExport){
                    newChecked.push('allowexport');
                }
                setChecked(newChecked);
            })
           
        }
    },[acl,checked])

    return (
        <Paper >
            <Grid className={css.boxContainer} item container direction="column" rowGap={1} columnGap={1}>  
                <Grid item container direction="row" rowGap={1} spacing={3} columnGap={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <CustomAvatar backgroundColor={color} iconColor="#FFFFFF" >
                            {avatarIcon}
                        </CustomAvatar>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Typography variant="body1">{agentName}</Typography>
                    </Grid>
                </Grid>

                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <List subheader={<ListSubheader>Permissions</ListSubheader>} >
                            
                             <ListItem>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText id="permissions" primary="Permissions" />
                                <ListItemSecondaryAction>
                              
                                     {(acl.allowRead) ? <Chip size="small" variant="outlined" label="R"/> : <></>}
                                     {(acl.allowWrite) ? <Chip size="small" variant="outlined" label="W"/>  : <></>}
                                     {(acl.allowCopy) ? <Chip size="small" variant="outlined" label="C"/>  : <></>}
                                     {(acl.allowScript) ? <Chip size="small" variant="outlined" label="S"/>  : <></>}
                                     {(acl.allowExport) ? <Chip size="small" variant="outlined" label="E"/>  : <></>}

                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <HourglassEmptyIcon />
                                </ListItemIcon>
                                <ListItemText id="duration-period" primary="Period" />
                                <ListItemSecondaryAction>
                                      <Chip variant="outlined" label={`${formatDate(acl.validFrom)}-${formatDate(acl.validUntil)}`}/>
                                </ListItemSecondaryAction>
                            </ListItem>
                        </List>
                    </Grid>
                     

                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </Paper>
    )
}

export default AclSummaryItem;