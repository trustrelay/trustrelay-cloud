import { Button, Checkbox, CircularProgress, FormControl, Grid, InputLabel, Step, StepLabel, Stepper, TextField, Typography } from "@material-ui/core"
import React, { useEffect, useState } from "react"; 


const CreateTemplateAgreementStep1 = ({
    next,
    title,
    setTitle,
    purpose,
    setPurpose  
}: {
    next: () => any,
    title:string,
    setTitle: (value: string) => void,
    purpose: string,
    setPurpose: (value: string) => void 
}) => {

    const handleTitleChange = (event: any) => {
        setTitle(event.target.value);
    }

    const handlePurposeChange = (event: any) => {
        setPurpose(event.target.value);
    }

  

    useEffect(() => {
        


    }, []);

    const isAbleToContinue = () => {
        return (
            title.length>0 && 
            (purpose.length > 0)
        )
    }

    function saveStateAndContinue() {
        //save state
        next();
    }

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={0}>
                    <Step completed={isAbleToContinue()}>
                        <StepLabel>{`Why`}</StepLabel>
                    </Step>
                    <Step completed={false}>
                        <StepLabel>{`What`}</StepLabel>
                    </Step>
                    <Step completed={false}>
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
            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row" rowGap={2}>

            <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                    
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>

                    <InputLabel htmlFor="title">What is the title of this agreement?</InputLabel>
                        <TextField
                            id="title" 
                            multiline
                            rows={1}
                            fullWidth 
                            maxRows={1}
                            value={title}
                            onChange={handleTitleChange}
                        />
                    </Grid>
                </Grid>

                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} direction="row">
                    
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>

                        <InputLabel htmlFor="purpose">What is the purpose of sharing this data?</InputLabel>
                        <TextField
                            id="purpose" 
                            multiline
                            rows={4}
                            fullWidth 
                            maxRows={4}
                            value={purpose}
                            onChange={handlePurposeChange}
                        />
                    </Grid>
                </Grid>
                
            </Grid>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Button variant="outlined" disabled={!isAbleToContinue()} onClick={saveStateAndContinue}>Next</Button>
            </Grid>
        </Grid>
    )
}

export default CreateTemplateAgreementStep1;