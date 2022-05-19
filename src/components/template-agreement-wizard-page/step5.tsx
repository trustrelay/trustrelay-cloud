import { Button, Grid, InputLabel, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, TextField } from '@mui/material'
import  { useEffect, useState } from "react"; 
import { DatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';

const CreateTemplateAgreementStep5 = ({
    next,
    previous,
    durationType,
    setDurationType,
    durationPeriod,
    setDurationPeriod,
    durationFrom,
    setDurationFrom,
    durationUntil,
    setDurationUntil,
    frequencyOfUpdates,
    setFrequencyOfUpdates,
    dataRetentionPeriod,
    setDataRetentionPeriod,
    terminationNoticePeriod,
    setTerminationNoticePeriod 
}: {
    next: () => any,
    previous: () => any,
    durationType: string,
    setDurationType: (value: string) => void,
    durationPeriod: string,
    setDurationPeriod: (value: string) => void,
    durationFrom: Date,
    setDurationFrom: (value: Date) => void,
    durationUntil: Date,
    setDurationUntil: (value: Date) => void,
    frequencyOfUpdates: string,
    setFrequencyOfUpdates: (value: string) => void,
    dataRetentionPeriod: string,
    setDataRetentionPeriod: (value: string) => void,
    terminationNoticePeriod: string,
    setTerminationNoticePeriod: (value: string) => void 
}) => {

    const [durationPeriodUnit, setDurationPeriodUnit] = useState('');
    const [durationPeriodValue, setDurationPeriodValue] = useState(1);

    const [noticePeriodUnit, setNoticePeriodUnit] = useState('');
    const [noticePeriodValue, setNoticePeriodValue] = useState(1);

    const [dataRetentionPeriodUnit, setDataRetentionPeriodUnit] = useState('');
    const [dataRetentionPeriodValue, setDataRetentionPeriodValue] = useState(1);
 
 

    const handleDurationTypeChange = (event: any) => {
        setDurationType(event.target.value);
    }

    const handleDurationPeriodValueChange = (event: any) => {
        setDurationPeriodValue(event.target.value);
        const newPeriod = `${event.target.value}${durationPeriodUnit}`; 
        setDurationPeriod(newPeriod)
    }

    const handleDurationPeriodUnitChange = (event: any) => {
        setDurationPeriodUnit(event.target.value);
        const newPeriod = `${durationPeriodValue}${event.target.value}` 
        setDurationPeriod(newPeriod)
    }

    const handleNoticePeriodValueChange = (event: any) => {
        setNoticePeriodValue(event.target.value);
        const newPeriod = `${event.target.value}${noticePeriodUnit}`; 
        setTerminationNoticePeriod(newPeriod)
    }

    const handleNoticePeriodUnitChange = (event: any) => {
        setNoticePeriodUnit(event.target.value);
        const newPeriod = `${noticePeriodValue}${event.target.value}` 
        setTerminationNoticePeriod(newPeriod)
    }

    const handleDataRetentionPeriodValueChange = (event: any) => {
        setDataRetentionPeriodValue(event.target.value);
        const newPeriod = `${event.target.value}${dataRetentionPeriodUnit}`; 
        setDataRetentionPeriod(newPeriod)
    }

    const handleDataRetentionPeriodUnitChange = (event: any) => {
        setDataRetentionPeriodUnit(event.target.value);
        const newPeriod = `${dataRetentionPeriodValue}${event.target.value}` 
        setDataRetentionPeriod(newPeriod)
    }

    const handleFrequencyOfUpdatesChange = (event: any) => {
        setFrequencyOfUpdates(event.target.value);
    }

    useEffect(() => {
      


    }, [durationType]);

    const isAbleToContinue = () => {
        return (
            ( frequencyOfUpdates.length > 0   &&
            (  durationType.length > 0 && 
                    (durationType === 'relative' && durationPeriod.length > 0) || (durationType === 'fixed' && durationFrom && durationUntil))
            )    && 
              terminationNoticePeriod.length > 0    && 
               dataRetentionPeriod.length > 0 
        )
    }

    function saveStateAndContinue() {
        //save state
        next();
    }

    function goBack() {
        //save state
        previous();
    }

    const handleDurationFromChange = (date: Date | null) => {
        if (date) {
            setDurationFrom(date);
        }
    };

    const handleDurationUntilChange = (date: Date | null) => {
        if (date) {
            setDurationUntil(date);
        }
    };

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={4}>
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
                    <Step completed={isAbleToContinue()}>
                        <StepLabel>{`When`}</StepLabel>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{`Where`}</StepLabel>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{`Confirm`}</StepLabel>
                    </Step>
                </Stepper>
            </Grid>
            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={2}>

                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    
                    <Grid container item xs={11} sm={11} md={11} lg={11} xl={11} direction="row">
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            <InputLabel htmlFor="duration-type-select">How long will the data be shared?</InputLabel> 
                            <Select
                                id="duration-type-select"
                                value={durationType}
                                input={<OutlinedInput label="Format" />}
                                label="Duration type"
                                onChange={handleDurationTypeChange}>
                                <MenuItem value="relative">Relative</MenuItem>
                                <MenuItem value="fixed">Fixed</MenuItem>
                            </Select>

                            
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                            &nbsp;
                        </Grid>
                        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                        
                            <TextField
                                disabled={durationType == 'fixed'}
                                value={durationPeriodValue}
                                style={{width:"80px"}}
                                onChange={handleDurationPeriodValueChange}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />&nbsp;
                            <Select
                                disabled={durationType == 'fixed'}
                                id="duration-period-unit-select"
                                value={durationPeriodUnit}
                                input={<OutlinedInput label="Format" />}
                                label="Period Unit"
                                onChange={handleDurationPeriodUnitChange}>
                                <MenuItem value="days">Days</MenuItem>
                                <MenuItem value="months">Months</MenuItem>
                                <MenuItem value="years">Years</MenuItem>

                            </Select>

                        </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                            &nbsp;
                            </Grid>
                        <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                            <Grid item xs={6} sm={6} md={6} lg={6} xl={6} spacing={4}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker value={durationFrom} 
                                       disabled={durationType != 'fixed'}
                                    onChange={handleDurationFromChange} label="From"
                                    renderInput={props => <TextField label="Date" helperText="" />}
                                    />
                                </LocalizationProvider>&nbsp;&nbsp;
                                <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DatePicker value={durationUntil} 
                                       disabled={durationType != 'fixed'}
                                    onChange={handleDurationUntilChange} label="Until"
                                    renderInput={props => <TextField label="Date" helperText="" />} />
                                </LocalizationProvider>

                            </Grid>
                            
                        </Grid>
                    </Grid>

                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                    
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <InputLabel htmlFor="frequency-select">How frequent will shared data be updated?</InputLabel>
                        <Select
                            id="frequency-select"
                            value={frequencyOfUpdates}
                            label="Frequency of updates"
                            input={<OutlinedInput label="Format" />}
                            onChange={handleFrequencyOfUpdatesChange}
                        >
                            <MenuItem value="onetime">One time</MenuItem>
                            <MenuItem value="realtime">Real time</MenuItem>
                            <MenuItem value="hourly">Hourly</MenuItem>
                            <MenuItem value="daily">Daily</MenuItem>
                            <MenuItem value="weekly">Weekly</MenuItem>
                            <MenuItem value="monthly">Monthly</MenuItem>
                            <MenuItem value="yearly">Yearly</MenuItem>
                        </Select>
                       
                    </Grid>
                </Grid>
                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                   
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <InputLabel htmlFor="dataRetention">What is the data retention period of the data shared?</InputLabel>
                        <TextField
                               
                                value={dataRetentionPeriodValue}
                                style={{width:"80px"}}
                                onChange={handleDataRetentionPeriodValueChange}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />&nbsp;
                            <Select
                             
                                id="duration-period-unit-select"
                                value={dataRetentionPeriodUnit}
                                label="Period Unit"
                                input={<OutlinedInput label="Format" />}
                                onChange={handleDataRetentionPeriodUnitChange}>
                                <MenuItem value="days">Days</MenuItem>
                                <MenuItem value="months">Months</MenuItem>
                                <MenuItem value="years">Years</MenuItem>

                            </Select>
                    </Grid>
                </Grid>
                <Grid container item xs={12} sm={12} md={12} lg={12} xl={12}>
                   
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <InputLabel htmlFor="termination">What is the termination notice period?</InputLabel>
                        <TextField 
                                value={noticePeriodValue}
                                style={{width:"80px"}}
                                onChange={handleNoticePeriodValueChange}
                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} />&nbsp;
                            <Select 
                                id="duration-period-unit-select"
                                value={noticePeriodUnit}
                                label="Period Unit"
                                input={<OutlinedInput label="Format" />}
                                onChange={handleNoticePeriodUnitChange}>
                                <MenuItem value="days">Days</MenuItem>
                                <MenuItem value="months">Months</MenuItem>
                                <MenuItem value="years">Years</MenuItem>

                            </Select>
                    </Grid>
                </Grid>
            </Grid>
            <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} direction="row" flexDirection="row" columnGap={1}>
                <Grid item>
                    <Button variant="outlined" onClick={goBack}>&lt; Previous</Button>
                </Grid>
                <Grid item>
                    <Button variant="outlined" disabled={!isAbleToContinue()} onClick={saveStateAndContinue}>Next &gt;</Button>
                </Grid>

            </Grid>
        </Grid>
    )
}

export default CreateTemplateAgreementStep5;