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



const PrivacyPolicyPage = () => {

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
                <title>TrustRelay | Privacy policy</title>
                <meta name="description" content="Learn more about our privacy policy." />
                <meta name="robots" content="noindex" />
            </Helmet>
            <TopMenu />
            <Grid container xs={12} sm={12} md={12} lg={12} xl={12} style={{ paddingTop: "50px" }}>
                <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>&nbsp;</Grid>
                <Grid item xs={10} sm={10} md={6} lg={6} xl={6} flexDirection="column">
                    <br />
                    <Typography variant="h1">
                        Privacy Policy 
                    </Typography>
                    <Typography variant="subtitle1">
                        Last updated: 24.04.2022
                    </Typography>
                    <hr />
                    <Typography variant="body1">
                        TrustRelay ("us", "we", or "our") uses cookies on the trustrelay.io website (the "Service"). This page informs you of our policies regarding the collection, use and disclosure of Personal Information when you use our Service.
                        We will not use or share your information with anyone except as described in this Privacy Policy.


                    </Typography>
                    <br />
                    <Typography variant="body1">
                        We use your Personal Information for providing and improving the Service. By using the Service, you agree to the collection and use of information in accordance with this policy. Unless otherwise defined in this Privacy Policy, terms used in this Privacy Policy have the same meanings as in our Terms and Conditions, accessible at trustrelay.io
                    </Typography>
                    <br />
                    <Typography variant="body1">


                        <strong>Information Collection And Use</strong><br />

                        While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you. Personally identifiable information may include, but is not limited to, your email address, name, phone number, postal address, other information ("Personal Information").


                        We collect this information for the purpose of providing the Service, identifying and communicating with you, responding to your requests/inquiries, servicing your purchase orders, and improving our services.
                    </Typography>
                    <br />
                    <Typography variant="body1">

                        <strong>Log Data</strong><br />
                        We may also collect information that your browser sends whenever you visit our Service ("Log Data"). This Log Data may include information such as your computer's Internet Protocol ("IP") address, browser type, browser version, the pages of our Service that you visit, the time and date of your visit, the time spent on those pages and other statistics.
                        In addition, we may use third party services that collect, monitor and analyze this type of information in order to increase our Service's functionality. These third party service providers have their own privacy policies addressing how they use such information.


                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Cookies</strong><br />
                        Cookies are files with a small amount of data, which may include an anonymous unique identifier. Cookies are sent to your browser from a web site and transferred to your device. We use cookies to collect information in order to improve our services for you.
                        You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent. The Help feature on most browsers provide information on how to accept cookies, disable cookies or to notify you when receiving a new cookie.
                        If you do not accept cookies, you may not be able to use some features of our Service and we recommend that you leave them turned on.

                    </Typography>
                    <br />
                    <Typography variant="body1">

                        <strong>Do Not Track Disclosure</strong><br />
                        We support Do Not Track ("DNT"). Do Not Track is a preference you can set in your web browser to inform websites that you do not want to be tracked.
                        You can enable or disable Do Not Track by visiting the Preferences or Settings page of your web browser.


                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Service Providers</strong><br />

                        We may employ third party companies and individuals to facilitate our Service, to provide the Service on our behalf, to perform Service-related services and/or to assist us in analyzing how our Service is used.
                        These third parties have access to your Personal Information only to perform specific tasks on our behalf and are obligated not to disclose or use your information for any other purpose.


                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Communications</strong><br />
                        We may use your Personal Information to contact you with newsletters, marketing or promotional materials and other information that may be of interest to you. You may opt out of receiving any, or all, of these communications from us by following the unsubscribe link or instructions provided in any email we send or by contacting us.

                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <strong>Compliance With Laws</strong><br />
                        We will disclose your Personal Information where required to do so by law or subpoena or if we believe that such action is necessary to comply with the law and the reasonable requests of law enforcement or to protect the security or integrity of our Service.
                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <strong>Business Transaction</strong><br />

                        If TrustRelay is involved in a merger, acquisition or asset sale, your Personal Information may be transferred as a business asset. In such cases, we will provide notice before your Personal Information is transferred and/or becomes subject to a different Privacy Policy.
                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <strong>Security</strong><br />
                        The security of your Personal Information is important to us, and we strive to implement and maintain reasonable, commercially acceptable security procedures and practices appropriate to the nature of the information we store, in order to protect it from unauthorized access, destruction, use, modification, or disclosure.
                        However, please be aware that no method of transmission over the internet, or method of electronic storage is 100% secure and we are unable to guarantee the absolute security of the Personal Information we have collected from you.
                    </Typography>
                    <br />

                    <Typography variant="body1">
                        <strong>Links To Other Sites</strong><br />
                        Our Service may contain links to other sites that are not operated by us. If you click on a third party link, you will be directed to that third party's site. We strongly advise you to review the Privacy Policy of every site you visit.
                        We have no control over, and assume no responsibility for the content, privacy policies or practices of any third party sites or services.

                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Children's Privacy</strong><br />
                        Only persons age 18 or older have permission to access our Service. Our Service does not address anyone under the age of 13 ("Children").
                        We do not knowingly collect personally identifiable information from children under 13. If you are a parent or guardian and you learn that your Children have provided us with Personal Information, please contact us. If we become aware that we have collected Personal Information from a children under age 13 without verification of parental consent, we take steps to remove that information from our servers.

                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Changes To This Privacy Policy</strong><br />
                        This Privacy Policy is effective as of 24.04.2022 and will remain in effect except with respect to any changes in its provisions in the future, which will be in effect immediately after being posted on this page.
                        We reserve the right to update or change our Privacy Policy at any time and you should check this Privacy Policy periodically. Your continued use of the Service after we post any modifications to the Privacy Policy on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Privacy Policy.
                        If we make any material changes to this Privacy Policy, we will notify you either through the email address you have provided us, or by placing a prominent notice on our website.

                    </Typography>
                    <br />
                    <Typography variant="body1">
                        <strong>Contact Us</strong><br />
                        If you have any questions about this Privacy Policy, please contact us.
                    </Typography>
                </Grid>
                <Grid item xs={1} sm={1} md={3} lg={3} xl={3}>&nbsp;</Grid>
            </Grid>
            <Footer />
        </div>
    </MuiThemeProvider>
    )
}

export default PrivacyPolicyPage;