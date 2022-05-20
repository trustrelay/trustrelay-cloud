import React, { useEffect, useState } from "react";
import { Button, Chip, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Tooltip, Typography, Theme } from '@mui/material';
import { formatDate, generateRandomColor } from "../../api/utils";
import CustomAvatar from "../customAvatar";
import { Common } from "../../api/models/models";
import { useNavigate } from "react-router-dom";
import LabelIcon from '@mui/icons-material/Label';
import { useTranslation } from "react-i18next";
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import BusinessIcon from '@mui/icons-material/Business';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import BlockIcon from '@mui/icons-material/Block';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    boxContainer: {
        width: "100%",
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },
}));



const CommonSummaryItem = ({
    onJoin,
    common,
    currentUser,
    avatarIcon
}: {
    onJoin: () => void,
    common: Common,
    currentUser: string;
    avatarIcon: React.ReactNode,
}) => {

    const css = useStyles();

    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');

    const navigate = useNavigate();
    const { t } = useTranslation();


    const goToAction = () => {
        navigate(`/dataspaces/${common.dataspace}/commons/${common.id}`)
    }



    useEffect(() => {
        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }

    }, [loadedColor])

    return (
        <Paper >
            <Grid className={css.boxContainer} item container xl={12} lg={12} md={12} sm={12} xs={12} >


                <Grid item container direction="row" rowGap={1} columnGap={1} xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
                        <CustomAvatar backgroundColor={color} iconColor="#FFFFFF" >
                            {avatarIcon}
                        </CustomAvatar>
                    </Grid>
                    <Grid item xl={9} lg={9} md={9} sm={9} xs={9}>
                        <Typography variant="body1">{common.name}</Typography>
                    </Grid>
                </Grid>

                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <BusinessIcon />
                                </ListItemIcon>
                                <ListItemText id="storage-location" primary={t('labels.organization')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={common.organizationDomain} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LocationOnIcon />
                                </ListItemIcon>
                                <ListItemText id="storage-location" primary={t('labels.storageLocation')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={common.storageLocation} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <HourglassEmptyIcon />
                                </ListItemIcon>
                                <ListItemText id="duration-period" primary={t('labels.period')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={`${formatDate(common.accessValidFrom)}-${formatDate(common.accessValidUntil)}`} />
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText id="permissions" primary={t('labels.permissions')} />
                                <ListItemSecondaryAction>

                                    {(common.allowRead && !common.agreementIsTerminated) ? <Tooltip title={`${t('labels.read')}`}><Chip size="small" variant="outlined" label="R" /></Tooltip> : <></>}
                                    {(common.allowWrite && !common.agreementIsTerminated) ? <Tooltip title={`${t('labels.write')}`}><Chip size="small" variant="outlined" label="W" /></Tooltip> : <></>}
                                    {(common.allowCopy && !common.agreementIsTerminated) ? <Tooltip title={`${t('labels.copy')}`}><Chip size="small" variant="outlined" label="C" /></Tooltip> : <></>}
                                    {(common.allowScript && !common.agreementIsTerminated) ? <Tooltip title={`${t('labels.script')}`}><Chip size="small" variant="outlined" label="S" /></Tooltip> : <></>}
                                    {(common.allowExport && !common.agreementIsTerminated) ? <Tooltip title={`${t('labels.export')}`}><Chip size="small" variant="outlined" label="E" /></Tooltip> : <></>}

                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <AlternateEmailIcon />
                                </ListItemIcon>
                                <ListItemText id="data-owner" primary={t('labels.dataOwner')} />
                                <ListItemSecondaryAction>
                                    <br />
                                    <Typography variant="body1">{common.dataOwner} </Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <AlternateEmailIcon />
                                </ListItemIcon>
                                <ListItemText id="data-expert" primary={t('labels.dataExpert')} />
                                <ListItemSecondaryAction>
                                    <br />
                                    <Typography variant="body1">{common.dataExpert}</Typography>
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <LabelIcon />
                                </ListItemIcon>
                                <ListItemText id="duration-period" primary={(common.tags) ? common.tags.join(', ') : t('labels.noTags')} />
                                <ListItemSecondaryAction>

                                </ListItemSecondaryAction>
                            </ListItem>


                        </List>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>&nbsp;</Grid>

                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                        {((common.hasAccepted || common.createdBy === currentUser) && !common.agreementIsTerminated) ? (
                            <Button
                                sx={{ width: "100%", padding: "15px" }}
                                variant="contained"
                                color="secondary"
                                endIcon={<NavigateNextIcon />}
                                onClick={goToAction}
                            >
                                {t('labels.details')}
                            </Button>
                        ) : ( 
                            <></>
                        )
                        }

                        {(common.agreementIsTerminated) ? (
                            <Button
                                sx={{ width: "100%", padding: "15px" }}
                                variant="contained"
                                color="secondary"
                                disabled
                                endIcon={<BlockIcon />}
                            >
                                {t('labels.agreementIsTerminated')}
                            </Button>
                        ) : (
                            <></>
                        )
                        }


                    </Grid>


                </Grid>
                <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                    &nbsp;
                </Grid>
            </Grid>
        </Paper>
    )
}

export default CommonSummaryItem;