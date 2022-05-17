import React, { useEffect, useState } from "react";
import {  Button, getBottomNavigationActionUtilityClass, Grid, Hidden, IconButton, makeStyles, Paper, SvgIcon, Typography, useMediaQuery, withStyles } from "@material-ui/core";
import {  generateRandomColor } from "../../api/utils";  
import { useHistory } from "react-router-dom"; 
import CustomAvatar from "../customAvatar";
import JoinDataspaceDialog from "./join-dataspace-dialog";
import GroupWorkIcon from '@material-ui/icons/GroupWork';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
    boxContainer: {
        width: "100%", 
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },
 
})
)


const DataspaceSummaryItem = ({
    name, 
    href, 
    joined,
    onJoin,
}: {
    name: string, 
    href?: string, 
    joined: boolean,
    onJoin: (id: string) => void;
}) => {
    const { t } = useTranslation();
    const css = useStyles();
    const smDown = !useMediaQuery('(min-width:600px)');
    const lgUp = useMediaQuery('(min-width:1000px)');

    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');


    let history = useHistory();

    const goToAction = () => {
        if (href != null) {
            history.push(href);
        }
    }

 

    const renderJoinButton = (isMember: boolean, dataspaceName: string) => {
        if (!isMember) {
            return <JoinDataspaceDialog 
                onAction={onJoin}
            />
        } else {
            return <span>{t('labels.joined')}</span>
        }
    }

    const renderButton = () => {
        if (joined) {
            return (
                <Button
                sx={{width:"100%", padding:"15px"}}
                    variant="contained"
                    color="secondary"
                    endIcon={<NavigateNextIcon />}
                    onClick={() => goToAction()}
                >
                    {t('labels.details')}
                </Button>
            )
        } else {
            return <>{renderJoinButton(joined, name)}</>
        }
    }

    useEffect(() => {
     

        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }
    })

    return (
        <Paper >
            <Grid className={css.boxContainer} item container direction="column" rowGap={1} columnGap={1}>
 
            <Grid item container direction="row" rowGap={1} spacing={3} columnGap={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <CustomAvatar backgroundColor={color} iconColor="#FFFFFF" >
                        <GroupWorkIcon />
                        </CustomAvatar>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Typography variant="body1">{name}</Typography>
                    </Grid>
                </Grid>

                
               
                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>&nbsp;</Grid>
                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                        {renderButton()}
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>&nbsp;</Grid>
                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </Paper>
    )
}

export default DataspaceSummaryItem;