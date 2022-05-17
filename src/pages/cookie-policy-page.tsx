import { createStyles, CssBaseline, Grid, makeStyles, MuiThemeProvider, Theme, Typography } from "@material-ui/core";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { collector, Producer, Transport } from "../apm";
import LightTheme from '../assets/themes/TrustRelay/light';

import Footer from "../components/landing-page/footer";
import TopMenu from "../components/landing-page/top-menu";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({


    })
);



const CookiePolicyPage = () => {

    const [apmSent, setApmSent] = useState(false);

    useEffect(() => {
      
      if (!apmSent) {
      
        const targetUrl = process.env.REACT_APP_APM_BASE_URL;
        const transport = new Transport(targetUrl);
        const defaults = collector.defaultCollectors;
  
        const producer = new Producer(transport, defaults);
        (async function send() {
          try {
            // Step 5: Collect and send the event
            await producer.collect();
            setApmSent(true)
          } catch (cause) {
            console.log('Error processing event', cause);
          }
        })();
      }
  
    }, [])
    
    return (<MuiThemeProvider theme={LightTheme}>
        <CssBaseline />

        <div id="landingpage" className="landing">
            <Helmet>
                <title>TrustRelay | Cookie policy</title>
                <meta name="description" content="Learn more about our cookie policy." />
                <meta name="robots" content="noindex" />
            </Helmet>
            <TopMenu />
            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "50px" }}>
                <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>&nbsp;</Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6} flexDirection="column">
                    <br />
                    <Typography variant="h1">
                        Cookies Policy

                    </Typography>
                    <Typography variant="subtitle1">
                        Last updated: 24.04.2022
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                        TrustRelay ("us", "we", or "our") uses cookies on the trustrelay.io website (the "Service"). By using the Service, you consent to the use of cookies.
                        Our Cookies Policy explains what cookies are, how we use cookies, how third-parties we may partner with may use cookies on the Service, your choices regarding cookies and further information about cookies.


                    </Typography>
                    <br />
                    <Typography variant="body1">


                        <strong>What are cookies</strong><br />

                        Cookies are small pieces of text sent by your web browser by a website you visit. A cookie file is stored in your web browser and allows the Service or a third-party to recognize you and make your next visit easier and the Service more useful to you.
                        Cookies can be "persistent" or "session" cookies. Persistent cookies remain on your personal computer or mobile device when you go offline, while session cookies are deleted as soon as you close your web browser.

                    </Typography>
                    <br />
                    <Typography variant="body1">

                        <strong>How TrustRelay uses cookies</strong><br />
                        When you use and access the Service, we may place a number of cookies files in your web browser.
                        We use cookies for the following purposes:

                        To enable certain functions of the Service
                        To provide analytics
                        To store your preferences

                        We use both session and persistent cookies on the Service and we use different types of cookies to run the Service:

                        <ul>
                            <li>Essential cookies. We may use essential cookies to authenticate users and prevent fraudulent use of user accounts.</li>


                            <li>Preferences cookies. We may use preferences cookies to remember information that changes the way the Service behaves or looks, such as the "remember me" functionality of a registered user or a user's language preference.</li>


                            <li>Analytics cookies. We may use analytics cookies to track information how the Service is used so that we can make improvements. We may also use analytics cookies to test new advertisements, pages, features or new functionality of the Service to see how our users react to them.</li>


                            <li>Third-party cookies. In addition to our own cookies, we may also use various third-parties cookies to report usage statistics of the Service, deliver advertisements on and through the Service, and so on.</li>
                        </ul>

                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>What are your choices regarding cookies</strong><br />
                        If you'd like to delete cookies or instruct your web browser to delete or refuse cookies, please visit the help pages of your web browser.
                        Please note, however, that if you delete cookies or refuse to accept them, you might not be able to use all of the features we offer, you may not be able to store your preferences, and some of our pages might not display properly.

                    </Typography>
                    <br />
                    <Typography variant="body1">


                        For the Chrome web browser, please visit this page from Google: https://support.google.com/accounts/answer/32050 <br />
                        For the Internet Explorer web browser, please visit this page from Microsoft: http://support.microsoft.com/kb/278835 <br />
                        For the Firefox web browser, please visit this page from Mozilla: https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored <br />
                        For the Safari web browser, please visit this page from Apple: https://support.apple.com/kb/PH21411?locale=en_US <br />
                        For any other web browser, please visit your web browser's official web pages. <br />



                    </Typography>
                    <br />
                    <Typography variant="body1">
                        Where can you find more information about cookies
                        You can learn more about cookies and the following third-party websites:


                        AllAboutCookies: http://www.allaboutcookies.org/
                        Network Advertising Initiative: http://www.networkadvertising.org/

                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>&nbsp;</Grid>
            </Grid>
            <Footer />
        </div>
    </MuiThemeProvider>
    )
}

export default CookiePolicyPage;