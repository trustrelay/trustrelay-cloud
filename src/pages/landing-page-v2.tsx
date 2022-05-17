import  { useEffect, useState } from "react"; 
import Cookies from 'universal-cookie';
import CookieBanner from "../components/landing-page/cookie-banner";
import Stakes from "../components/landing-page/stakes";
import ActNow from "../components/landing-page/act-now";
import WhatsThePlan from "../components/landing-page/whats-the-plan";
import Explainer from "../components/landing-page/explainer"; 
import Logos from "../components/landing-page/logos";
import Hero from "../components/landing-page/hero"; 
import CallToActionVersion1 from "../components/landing-page/call-to-action-v1";
import CallToActionVersion2 from "../components/landing-page/call-to-action-v2"; 
import LayoutLanding from "../components/layout-landing";


const LandingPageV2 = () => {
  
  const cookies = new Cookies();

  const [cookieAccepted, setCookieAccepted] = useState(false);

  useEffect(() => {
    // scrollTo("root");

 

    let mainCookie = cookies.get('trustrelay')
    if (mainCookie) {
      setCookieAccepted(true)
    }


  }, []);

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
    <LayoutLanding
    title="TrustRelay | Manage data-sharing between organizations" 
    description="Create dataspace for data collaboration"
    canonical="https://trustrelay.io"
    >
      {(!cookieAccepted) ? <CookieBanner
        isOpen={!cookieAccepted}
        anchorEl={document.getElementById('scrolltopbar')}
        onAcceptAll={handleAcceptAll}
        onCustomize={handleCustomize}
      /> : <></>}
      

    
        <Hero />
        <Stakes />
        <ActNow />
        <CallToActionVersion1 />
        <Logos />
        <WhatsThePlan />
        <Explainer />
        <CallToActionVersion2  /> 
      
      </LayoutLanding> 
  );
};

export default LandingPageV2;
