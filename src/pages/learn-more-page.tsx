import { Button, Card, CardContent, createStyles, CssBaseline, Grid, makeStyles, MuiThemeProvider, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";

import LearMoreDialog from "../components/landing-page/learn-more-dialog"; 
import trustRelayService from '../api/trustrelay-service';
import { useToast } from "../hooks/toast-hook";
import { getToastMessageTypeByName } from "../components/toast";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet";
import LightTheme from '../assets/themes/TrustRelay/light';
import TopMenu from "../components/landing-page/top-menu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({


        card: {

            "&:hover": {

                elevation: 0,


            },
        },


    })
);



const LearnMorePage = () => {

    const css = useStyles();
    const toast = useToast();
    let history = useHistory();

    const send = (input: string) => {
        trustRelayService.submitLearnMoreIdea(input).then(() => {
            toast.openToast(`info`, `Thanks for your idea, we'll consider your feedback!`, getToastMessageTypeByName('info'));
        }).catch((err) => {

            toast.openToast(`error`, 'sorry we were unable to send your idea, please try later.', getToastMessageTypeByName('error'));
        })
    }


    return ( <MuiThemeProvider theme={LightTheme}>
        <CssBaseline />
        <div id="landingpage" className="landing">
          <Helmet>
            <title>TrustRelay | Learn more</title>
            <meta name="description" content="Learn more about TrustRelay and dataspaces" />
            <meta name="robots" content="noindex" />
          </Helmet>
          <TopMenu />
        <Grid container xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "80px" }}>
            <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>&nbsp;</Grid>
            <Grid item container xs={9} sm={9} md={8} lg={6} xl={6} flexDirection="column">
                <Grid item>
                    <Button variant="text" onClick={()=>window.location.href = 'https://trustrelay.io'}>Go back</Button>
                    <br/>
                    <Typography variant="h1">Latest content in our library</Typography>
                    <br/>
                </Grid>
                <Grid item container flexDirection="row" spacing={2}>
                    <Grid item xs={9} sm={5} md={4} lg={4} xl={4}>
                        <Card elevation={0} variant="outlined" sx={{ borderColor: "transparent", "&:hover": { backgroundColor: "none" } }} onClick={()=>window.location.href = 'https://0966d41f.sibforms.com/serve/MUIEAFAHzWCkpgFQI-gB42AOLelTU2T3_Iop0lCIX8dD2vGmUmMrTMnnuiNRK03TNTRKLU7CSpHEGHCdPA4lrWLNwZNLhTMVOiAFLMUO7f1GubSKfKvxoKIsVYJDUvdFb8vT7CF9KBjNbELun9r8Yoj1Q9nl2AAas8B-BeF5tWwNTWP_xT8BJRE2Rkb_gLSUHInMhhUx0Zr0W2lJ'} className={clsx("relative h-full card", css.card)}>

                            <CardContent style={{ cursor: "pointer" }}>
                                <img
                                    className="w-full"
                                    src="https://cdn.trustrelay.io/media/6_steps_to_setup_a_unique_dataspace_in_your_industry.webp"
                                    alt="6 steps to setup a unique dataspace in your industry"
                                />
                                <div className="flex-column justify-between">
                                    <div className="px-1 pt-1">
                                        <Typography variant="subtitle1" className="m-0 font-bold">6 steps to setup a unique dataspace in your industry</Typography>


                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Grid>

                   
                </Grid>
                <Grid item>
                    &nbsp;
                </Grid>
                <Grid item container flexDirection="row" spacing={2}>
                    <Grid item >
                    </Grid>
                    <Grid item textAlign="center" alignItems="center" justifyItems="center"  justifyContent="center">
                        <Typography variant="body1">
                            Not finding what you were looking for? You can submit ideas for us to write about!
                        </Typography>
                    </Grid>
                    <Grid item textAlign="center" alignItems="center" justifyItems="center" justifyContent="center">
                        <LearMoreDialog
                            title="Submit your idea"
                            dialog="Thanks! We will consider how to approach this topic!"
                            inputName="Your idea"
                            variant="contained"
                            primaryColor={false}
                            sendDetails={send}
                        />
                        <br/><br/>
                    </Grid>
                    <Grid item >
                    </Grid>
                </Grid>
                <Grid item>
                    &nbsp;
                </Grid>
            </Grid>

        </Grid>


        </div>
    </MuiThemeProvider>
    )
}

export default LearnMorePage;