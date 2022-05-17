import React, { ReactNode, useState, useEffect } from 'react';
import { CssBaseline, MuiThemeProvider } from '@material-ui/core';
import { collector, Producer, Transport } from '../apm';
import LightTheme from '../assets/themes/TrustRelay/light';
import TopMenu from './landing-page/top-menu';
import Footer from './landing-page/footer';
import { Helmet } from "react-helmet";

const LayoutLanding = ({
  description,
  title,
  canonical,
  children
}: {
  description?: string;
  title?: string;
  canonical?:string;
  children: ReactNode;
}) => {

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




  return (


    <MuiThemeProvider theme={LightTheme}>
      <CssBaseline />
      <div id="landingpage" className="landing">
        <Helmet>
          <title>{title}</title>
          <link rel="canonical" href={canonical} />
          <meta name="description" content={description} />
 
       

<script>
  {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-NCXD5Z5');
  `}
</script>

        </Helmet>
        <TopMenu />
        {children}
        <Footer />
      </div>


    </MuiThemeProvider>

  );
};
export default LayoutLanding;
