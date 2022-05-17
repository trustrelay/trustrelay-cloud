import { Button, Checkbox, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, TextField, Theme, Typography, useTheme } from "@material-ui/core"
import React, { useEffect, useState } from "react";



const CreateTemplateAgreementStep2 = ({
    next,
    previous,
    dataAssets,
    setDataAssets, 
}: {
    next: () => any,
    previous: () => any,
    dataAssets: string,
    setDataAssets: (value: string) => void
}) => {

    const theme = useTheme();
    
    const handleDataAssetsChange = (event: any) => {
        setDataAssets(event.target.value);
    }

    
 

    useEffect(() => {
     


    }, []);

    const isAbleToContinue = () => {
        return (
            (dataAssets.length > 0)  

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
 

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
 

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={1}>
                    <Step completed={true}>
                        <StepLabel>{`Why`}</StepLabel>
                    </Step>
                    <Step completed={isAbleToContinue()}>
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

                <Grid item container xs={12} sm={12} md={12} lg={12} xl={12}>
                    
                    <Grid item xs={11} sm={11} md={11} lg={11} xl={11}>
                        <InputLabel htmlFor="dataAssets">What are the shared data assets?</InputLabel>
                        <Select
                            id="data-assets-select"
                            value={dataAssets}
                            label="Data Asset Type"
                            input={<OutlinedInput label="Format" />}
                            onChange={handleDataAssetsChange} 
                        >
                            <MenuItem value="raw">Raw data</MenuItem>
                            <MenuItem value="aggregated">Aggregated data</MenuItem>
                            <MenuItem value="synthentic">Synthetic data</MenuItem>
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

export default CreateTemplateAgreementStep2;