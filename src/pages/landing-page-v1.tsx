import React, { useEffect, useState } from "react";
import { scrollTo } from "../utils";
import WhoShouldUseItVersion1 from "../components/landing-page/who-should-use-it";
import WhyTrustRelay from "../components/landing-page/why-trustrelay";
import CallToActionVersion1 from "../components/landing-page/call-to-action-v1";
import ContactUs from "../components/landing-page/contact-us";
import IntroVersion1 from "../components/landing-page/intro-v1";
import Empathy from "../components/landing-page/difficulties";
import CallToActionVersion2 from "../components/landing-page/call-to-action-v2";
import ScrollTopBar from "../components/landing-page/scroll-top-bar";
import LightTheme from '../assets/themes/TrustRelay/light';
import { MuiThemeProvider } from "@material-ui/core/styles";
import { CssBaseline, Grid } from "@material-ui/core";
import WorkProcess from "../components/landing-page/work-process";
import { Toast } from "../components/toast";
import { useToast } from "../hooks/toast-hook";
import Cookies from 'universal-cookie';
import CookieBanner from "../components/landing-page/cookie-banner";
const LandingPageV1 = () => {

  const toast = useToast();

  const cookies = new Cookies();

  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    scrollTo("root");

   

    let mainCookie = cookies.get('trustrelay')
    if (mainCookie) {
      setCookieAccepted(true)
    }


  }, [scrollTo]);

  const addDays = (date: Date, days: number) => {
    var result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }

  const handleAcceptAll = () => {
    setCookieAccepted(true);
    let data = {
      strictlyNecessary: true,
      basicInteractions: true,
      experienceEnhancement: true,
      measurement: true
    }
    cookies.set('trustrelay', JSON.stringify(data), { path: '/', expires: addDays(new Date(), 365) })
  }



  const handleCustomize = (strictlyNecessary: boolean, basicInteractions: boolean, experienceEnhancement: boolean, measurement: boolean) => {
    setCookieAccepted(true);
    let data = {
      strictlyNecessary,
      basicInteractions,
      experienceEnhancement,
      measurement
    }
    cookies.set('trustrelay', JSON.stringify(data), { path: '/' })
  }

  return (
    <MuiThemeProvider theme={LightTheme}>
      <CssBaseline />
      <Toast value={toast} close={toast.closeToast} />
      {(!cookieAccepted) ? <CookieBanner
        isOpen={!cookieAccepted}
        anchorEl={document.getElementById('scrolltopbar')}
        onAcceptAll={handleAcceptAll}
        onCustomize={handleCustomize}
      /> : <></>}
      <div id="landingpage" className="landing">


        <ScrollTopBar />
        <IntroVersion1 />
        <WhoShouldUseItVersion1 />
        <Empathy />


        <WhyTrustRelay />
        <CallToActionVersion2  />
        <WorkProcess />
        <CallToActionVersion1 />

        <ContactUs />
      </div>
    </MuiThemeProvider>
  );
};

export default LandingPageV1;
