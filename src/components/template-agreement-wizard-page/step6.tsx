import { Button, Checkbox, CircularProgress, FormControl, Grid, InputLabel, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper, TextField, Theme, Typography, useTheme } from "@material-ui/core"
import React, { useEffect, useState } from "react";  
import Countries from '../../api/models/iso3-countries'

const CreateTemplateAgreementStep6 = ({
    next,
    previous,
    jurisdiction,
    setJurisdiction
}: {
    next: () => any,
    previous: () => any, 
    jurisdiction:string,
    setJurisdiction:(value:string)=>void  
}) => {

    const theme = useTheme();
    
    const handleJurisdictionChange = (event: any) => {  
            setJurisdiction(event.target.value); 
       
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

  

    useEffect(() => {
        


    }, []);

    const isAbleToContinue = () => {
        return  jurisdiction.length > 0 
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
                <Stepper activeStep={5}>
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
                    <Step completed={isAbleToContinue()}>
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
                        <InputLabel htmlFor="jurisdiction-select">What is the jurisdiction that applies to this agreement?</InputLabel>
                        <Select
                            id="jurisdiction-select"
                            value={jurisdiction} 
                            onChange={handleJurisdictionChange}
                            input={<OutlinedInput label="Format" />}
                            MenuProps={MenuProps} 
                        >
                            {Countries.map((country) => (
                                <MenuItem
                                    key={country.code}
                                    value={country.code}
                                 
                                >
                                    {country.name}
                                </MenuItem>
                            ))} 
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

export default CreateTemplateAgreementStep6;