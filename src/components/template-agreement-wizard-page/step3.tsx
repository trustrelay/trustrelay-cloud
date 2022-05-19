import { Button,  Grid, InputLabel, Step, StepLabel, Stepper, TextField } from '@mui/material'

const CreateTemplateAgreementStep3 = ({
    next,
    previous,
    
    rightsAndResponsibilities,
    setRightsAndResponsibilities 
}: {
    next: () => any,
    previous: () => any,
   
    rightsAndResponsibilities:string,
    setRightsAndResponsibilities:(value:string)=>any 
}) => {

    const handleRightsAndResponsibilitiesChange = (event: any) => {
        setRightsAndResponsibilities(event.target.value);
    }


    const isAbleToContinue = () => {
        return (  rightsAndResponsibilities.length>0 )
 
    }

    function saveStateAndContinue() {
        //save state
        next();
    }

    function goBack() {
        //save state
        previous();
    }

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={2}>
                    <Step completed={true}>
                        <StepLabel>{`Why`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`What`}</StepLabel>
                    </Step>
                    <Step completed={isAbleToContinue()}>
                        <StepLabel>{`Who`}</StepLabel>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{`How`}</StepLabel>
                    </Step>
                    <Step completed={false}>
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
            
            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                
                <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                    <InputLabel htmlFor="rights">What are the rights and responsibilities of accessing the shared data?</InputLabel>
                    <TextField
                        id="rights"
                        label="Rights and responsibilities"
                        multiline
                        fullWidth
                        rows={2}
                        maxRows={4} 
                        value={rightsAndResponsibilities}
                        onChange={handleRightsAndResponsibilitiesChange}
                    />
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

export default CreateTemplateAgreementStep3;