import React, { useEffect, useState } from "react";
import {
    Grid,
    Card,
    TextField,
    Button,
    MenuItem,
    FormControlLabel,
    Checkbox,
    makeStyles,
    Typography,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import clsx from "clsx";
import validator from 'validator'
import PasswordChecklist from "react-password-checklist"

const inputProps = {
    style: {
        borderRadius: 8,
    },
};


const useStyles = makeStyles(({ palette, ...theme }) => ({

    top: {
        marginTop: "6rem"
    },
    link: {
        color: palette.primary.main
    },
    smalllink: {
        color: palette.primary.main,
        fontSize:"12px"
    },
    error: {
        color: 'red'
    }
}));

const SignupForm = () => {

    const css = useStyles();

    const [accepted, setAccepted] = useState(false);
    const [email, setEmail] = useState<string>('');
    const [emailError, setEmailError] = useState('');
    const [password, setPassword] = useState('')
    const [passwordAgain, setPasswordAgain] = useState('')
    const [passwordValid, setPasswordValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);

    const handleAcceptedChange = (e: React.ChangeEvent<HTMLInputElement>, newValue: boolean) => {
        setAccepted(newValue)
    }

    const handleEmailChange = (e: any) => {
        var currentValue = e.target.value
        if (currentValue.length > 4) {
            if (validator.isEmail(currentValue)) {
                setEmailError('')
                setEmailValid(true)
            } else {
                setEmailError('Enter valid Email!')
                setEmailValid(false)
            }
        } else {
            setEmailError('')
            setEmailValid(false)
        }
        setEmail(currentValue)
    }

    const handlePasswordChange = (e: any) => {
        var currentValue = e.target.value

        setPassword(currentValue)
    }

    const handlePasswordAgainChange = (e: any) => {
        var currentValue = e.target.value

        setPasswordAgain(currentValue)
    }

    const handlePasswordValidity = (isValid: boolean) => {
        setPasswordValid(isValid)
    }

    const shouldDisable = () => {
        return !(accepted && email.length > 0 && password.length > 7)
    }

    useEffect(() => {

    })

    return (
        <section className={clsx("section section-bg-light-primary", css.top)} id="signup">
            <div className="container">


                <Grid
                    alignContent="center"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    justifyItems="center"
                    item
                    xl={12} lg={12} md={12} sm={12} xs={12}>
                    <h1 className="font-normal text-primary text-48 mb-4">
                        Signup for a 30-day trial!
                    </h1>
                </Grid>
                <Grid style={{ height: "600px" }} container
                    alignContent="center"
                    alignItems="center"
                    textAlign="center"
                    justifyContent="center"
                    justifyItems="center"
                    item
                    xl={12} lg={12} md={12} sm={12} xs={12}>
                    <Grid item xl={3} lg={3} md={3} sm={1} xs={1}>&nbsp;</Grid>
                    <Grid container item xl={6} lg={6} md={6} sm={10} xs={10}>

                        <Card className="p-8 border-radius-8" elevation={3}>
                            <form>
                                <Grid container spacing={2}>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            className="mb-4"
                                            label="Email"
                                            placeholder="Email"
                                            size="small"
                                            variant="outlined"
                                            onChange={handleEmailChange}
                                            InputProps={inputProps}
                                            fullWidth
                                        />
                                        <Typography variant="overline" className={css.error} >{emailError}</Typography>
                                    </Grid>


                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            className="mb-4"
                                            label="Password"
                                            placeholder="Password"
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            onChange={handlePasswordChange}
                                            InputProps={inputProps}
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <TextField
                                            className="mb-4"
                                            label="Repeat Password"
                                            placeholder="Repeat Password"
                                            size="small"
                                            type="password"
                                            variant="outlined"
                                            onChange={handlePasswordAgainChange}
                                            InputProps={inputProps}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <PasswordChecklist
                                            rules={["minLength", "specialChar", "number", "capital", "match"]}
                                            minLength={5}
                                            value={password}
                                            valueAgain={passwordAgain}
                                            onChange={handlePasswordValidity}
                                        />
                                    </Grid>


                                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>
                                        <FormControlLabel
                                            className="mb-0 w-full ml--3"
                                            control={<Checkbox onChange={handleAcceptedChange} />}
                                            label={
                                                <p>
                                                    I accept the&nbsp;
                                                    <Link className={css.link} to="/terms">
                                                        Terms and Conditions
                                                    </Link>
                                                </p>
                                            }
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            className="w-full"
                                            variant="contained"
                                            color="primary"
                                            disabled={shouldDisable()}
                                        >
                                            SIGN UP
                                        </Button>
                                        {/* <Grid item xs={12} container flexDirection="row" >
                                            &nbsp;
                                            </Grid> */}
                                        <Grid item xs={12} container flexDirection="row" >
                                            <Typography variant="body1">Already have an account?</Typography>&nbsp;
                                            <Link to="/dashboard" className={css.smalllink}>Sign in</Link>
                                            </Grid>
                                    </Grid>
                                </Grid>
                            </form>
                        </Card>


                    </Grid>
                    <Grid item xl={3} lg={3} md={3} sm={1} xs={1}>&nbsp;</Grid>
                </Grid>
                {/* </Grid> */}
            </div>
        </section>
    );
};

export default SignupForm;
