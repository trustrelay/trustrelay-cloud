import React, { useEffect, useState } from "react";
import { Button, Chip, Grid, List, ListItem, ListItemIcon, ListItemSecondaryAction, ListItemText, Paper, Typography,  Theme } from '@mui/material';
import { formatDate, generateRandomColor } from "../../api/utils";
import CustomAvatar from "../customAvatar";
import { TemplateAgreementSummary } from "../../api/models/models"; 
import { useNavigate } from "react-router-dom";
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import TimerIcon from '@mui/icons-material/Timer';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import GavelIcon from '@mui/icons-material/Gavel';
import { useTranslation } from "react-i18next";
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
    boxContainer: {
        width: "100%",
        height: "100%",
        padding: "3px 0px 0px 3px",
        backgroundColor: "#ffffff"
    },
}));

const TemplateAgreementSummaryItem = ({
    templateAgreement,
    avatarIcon
}: {
    templateAgreement: TemplateAgreementSummary,
    avatarIcon: React.ReactNode,
}) => {
    const { t } = useTranslation();
    const css = useStyles(); 

    const [loadedColor, setLoadedColor] = useState(false);
    const [color, setColor] = useState('');

    const navigate = useNavigate();


    const goToAction = () => {

        navigate(`/dataspaces/${templateAgreement.dataspace}/template-agreements/${templateAgreement.id}`)
    }


    useEffect(() => {
       

        if (!loadedColor) {
            setColor(generateRandomColor());
            setLoadedColor(true);
        }

    }, [loadedColor])

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
                        <Typography variant="body1">{templateAgreement.title}</Typography>
                    </Grid>
                </Grid>


                <Grid item container xl={12} lg={12} md={12} sm={12} xs={12} direction="row">

                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                        <List  > 

                            <ListItem>
                                <ListItemIcon>
                                    <TimerIcon />
                                </ListItemIcon>
                                <ListItemText id="duration-type" primary={t('labels.durationType')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={templateAgreement.durationType} />
                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <HourglassEmptyIcon />
                                </ListItemIcon>
                                <ListItemText id="duration-period" primary={t('labels.durationPeriod')} />
                                <ListItemSecondaryAction>
                                    {(templateAgreement.durationType === 'relative') ? <Chip variant="outlined" label={templateAgreement.durationPeriod} /> : <Chip variant="outlined" label={`${formatDate(templateAgreement.durationFrom)}-${formatDate(templateAgreement.durationUntil)}`} />}
                                </ListItemSecondaryAction>
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <VerifiedUserIcon />
                                </ListItemIcon>
                                <ListItemText id="permissions" primary={t('labels.permissions')} />
                                <ListItemSecondaryAction>

                                    {(templateAgreement.permissions.indexOf("Read") >= 0) ? <Chip size="small" variant="outlined" label="R" /> : <></>}
                                    {(templateAgreement.permissions.indexOf("Write") >= 0) ? <Chip size="small" variant="outlined" label="W" /> : <></>}
                                    {(templateAgreement.permissions.indexOf("Copy") >= 0) ? <Chip size="small" variant="outlined" label="C" /> : <></>}
                                    {(templateAgreement.permissions.indexOf("Script") >= 0) ? <Chip size="small" variant="outlined" label="S" /> : <></>}
                                    {(templateAgreement.permissions.indexOf("Export") >= 0) ? <Chip size="small" variant="outlined" label="E" /> : <></>}

                                </ListItemSecondaryAction>
                            </ListItem>
                            <ListItem>
                                <ListItemIcon>
                                    <GavelIcon />
                                </ListItemIcon>
                                <ListItemText id="jurisdiction" primary={t('labels.jurisdiction')} />
                                <ListItemSecondaryAction>
                                    <Chip variant="outlined" label={templateAgreement.jurisdiction} />
                                </ListItemSecondaryAction>
                            </ListItem>

                        </List>
                    </Grid>
                    <Grid item xl={1} lg={1} md={1} sm={1} xs={1}>&nbsp;</Grid>

                    <Grid item xl={10} lg={10} md={10} sm={10} xs={10}>
                        <Button
                            sx={{ width: "100%", padding: "15px" }}
                            variant="contained"
                            color="secondary"
                            endIcon={<NavigateNextIcon />}
                            onClick={goToAction}
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

export default TemplateAgreementSummaryItem;