import { Button, Grid, Step, StepLabel, Stepper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import { useTranslation } from "react-i18next";
import {formatDateTime} from '../../api/utils'

const CreateTemplateAgreementStep7 = ({
    previous,
    send,
    title,
    purpose,
    dataAssets,
    rightsAndResponsibilities,
    permissions,
    durationType,
    durationPeriod,
    durationFrom,
    durationUntil,
    frequencyOfUpdates,
    dataRetentionPeriod,
    terminationNoticePeriod,
    jurisdiction
}: {
    previous: () => any,
    send: () => any,
    title: string,
    purpose: string,
    dataAssets: string,
    rightsAndResponsibilities: string,
    permissions: Array<string>,
    durationType: string,
    durationPeriod: string,
    durationFrom: Date,
    durationUntil: Date,
    frequencyOfUpdates: string,
    dataRetentionPeriod: string,
    terminationNoticePeriod: string,
    jurisdiction: string
}) => {

    const { t } = useTranslation();


    function saveStateAndContinue() {
        //save state
        send();
    }

    function goBack() {
        //save state
        previous();
    }

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={6}>
                    <Step completed={true}>
                        <StepLabel>{`Why`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`What`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`Who`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`How`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`When`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`Where`}</StepLabel>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{`Confirm`}</StepLabel>
                    </Step>
                </Stepper>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={2}>

                <TableContainer>
                    <Table size="small" aria-label="source schema table">
                        <TableHead>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.field')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.value')}</Typography></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.title')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{title}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.purpose')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{purpose}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.dataAssets')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{dataAssets}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.rightsAndResponsibilities')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{rightsAndResponsibilities}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.permissions')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{permissions}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.durationType')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{durationType}</Typography></TableCell>
                            </TableRow>        

                            {(durationType=='fixed') ?      <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.durationUntil')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{formatDateTime(durationUntil.toString())}</Typography></TableCell>
                            </TableRow>   :  <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.durationPeriod')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{durationPeriod}</Typography></TableCell>
                            </TableRow> }

                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.frequencyOfUpdates')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{frequencyOfUpdates}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.dataRetentionPeriod')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{dataRetentionPeriod}</Typography></TableCell>
                            </TableRow>
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.terminationNoticePeriod')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{terminationNoticePeriod}</Typography></TableCell>
                            </TableRow>
                      
                            <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                                <TableCell variant="head"><Typography variant="body1">{t('labels.jurisdiction')}</Typography></TableCell>
                                <TableCell variant="head"><Typography variant="body1">{jurisdiction}</Typography></TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>

            </Grid>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} direction="row" flexDirection="row" columnGap={1}>
                <Grid item>
                    <Button variant="outlined" onClick={goBack}>&lt; Previous</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" onClick={saveStateAndContinue}>Finish</Button>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default CreateTemplateAgreementStep7;