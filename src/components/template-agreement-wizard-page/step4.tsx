import { Button,  Grid, InputLabel, MenuItem, OutlinedInput, Select, Step, StepLabel, Stepper,  Theme, useTheme } from '@mui/material';

const CreateTemplateAgreementStep4 = ({
    next,
    previous, 
    permissions,
    setPermissions,  
    
}: {
    next: () => any,
    previous: () => any, 
    permissions:Array<string>,
    setPermissions:(value:Array<string>)=>void 
}) => {

    const theme = useTheme();
    

    const handlePermissionsChange = (event: any) => {
        const {
            target: { value },
          } = event;
          setPermissions( 
            typeof value === 'string' ? value.split(',') : value,
          ); 
    }

   

    const isAbleToContinue = () => {
        return   ( permissions.length >0)  
        
    }

    function saveStateAndContinue() {
        //save state
        next();
    }

    function goBack() {
        //save state
        previous();
    }

    const possiblePermissions = [
        'Read',
        'Write',
        'Copy',
        'Script',
        'Export'
      ];

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


    function getStyles(permission: string, permissions: Array<string>, theme: Theme) {
        return {
            fontWeight:
            permissions.indexOf(permission) === -1
                    ? theme.typography.fontWeightRegular
                    : theme.typography.fontWeightMedium,
        };
    }

    return (
        <Grid container item direction="row" rowGap={2} xs={12} sm={12} md={12} lg={11} xl={11}>
            <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                <Stepper activeStep={3}>
                    <Step completed={true}>
                        <StepLabel>{`Why`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`What`}</StepLabel>
                    </Step>
                    <Step completed={true}>
                        <StepLabel>{`Who`}</StepLabel>
                    </Step>
                    <Step completed={isAbleToContinue()}>
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
                        <InputLabel htmlFor="permissions">What are the permissions enabled for this data?</InputLabel>
                        <Select
                            id="permissions-select"
                            value={permissions}
                            label="Permissions"
                            onChange={handlePermissionsChange}
                            input={<OutlinedInput label="Format" />}
                            MenuProps={MenuProps}
                            multiple
                        >
                            {possiblePermissions.map((permission) => (
                                <MenuItem
                                    key={permission}
                                    value={permission}
                                    style={getStyles(permission, permissions, theme)}
                                >
                                    {permission}
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

export default CreateTemplateAgreementStep4;