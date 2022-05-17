import { Button, Card, CardContent, createStyles, Grid, makeStyles, TextField, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";
import img_6_steps_to_setup_a_unique_dataspace_in_your_industry from "../assets/illustrations/6_steps_to_setup_a_unique_dataspace_in_your_industry.png"
import LearMoreDialog from "../components/landing-page/learn-more-dialog";
import LayoutLanding from "../components/layout-landing";
import trustRelayService from '../api/trustrelay-service';
import { useToast } from "../hooks/toast-hook";
import { getToastMessageTypeByName } from "../components/toast";
import { useState } from "react";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({


        card: {

            "&:hover": {

                elevation: 0,


            },
        },

        container: {
            position: "relative",
            overflow: "hidden",
            width: "100%",
            paddingTop: "66.66%" /* 16:9 Aspect Ratio (divide 9 by 16 = 0.5625) */
          },
          
          /* Then style the iframe to fit in the container div with full height and width */
          responsiveIframe: {
            position: "absolute",
            top: 10,
            left: 0,
            bottom: 0,
            right: 0,
            width: "100%",
            height: "100%"
          }


    })
);



const Whitepaper6StepsToSetupAUniqueDataspaceInYourIndustry = () => {

    const css = useStyles();
    const toast = useToast();

    // const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');

    const handleEmailChange = (e: any) => {
        setEmail(e.target.value)
    }


    const sendRequestToDownloadContent = (event: React.MouseEvent<HTMLElement>) => {
        event.preventDefault();
        const resource = '6-steps-to-setup-a-unique-dataspace-in-your-industry'
        trustRelayService.sendRequestToGetResource(resource, email).then(() => {
            // toast.openToast(`info`, `Thanks for your interest! The download will start immediately.`, getToastMessageTypeByName('info'));
            alert('request sent!')
        }).catch((err: any) => {
            console.debug(err)
            toast.openToast(`error`, 'sorry we were unable to send your idea, please try later.', getToastMessageTypeByName('error'));
        })
    }


    return (<LayoutLanding 
    title="TrustRelay | Whitepaper - 6 steps to setup a unique dataspace in your industry"
    description="Register to download whitepaper 6 steps to setup a unique dataspace in your industry"
    canonical="https://trustrelay.io/whitepaper-6-steps-to-setup-a-unique-dataspace-in-your-industry"
    > 

<iframe   

src="https://0966d41f.sibforms.com/serve/MUIEAC2Jx2-MlT7vOFCAEpjrk0d5c79nYoi0Qg7jqqbYrGmAP5TWG1-8bJJb483YkhVhXSsgp-5lMalAwNixoajT1rirti4S-oeVcTxHAo2d8HTw7BoUAsXAUy4j9ccxgOieHV7WEOsZBi609Pdk4ENAPQP7Z0rDDnkN5cBIJCAgYeCfbFVzWoI49EOMaEW0R4NZsFzWQRMaEa6E"
allowFullScreen 
className={css.responsiveIframe}></iframe>
     


        
    </LayoutLanding>
    )
}

export default Whitepaper6StepsToSetupAUniqueDataspaceInYourIndustry;