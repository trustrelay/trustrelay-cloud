import { createStyles,  makeStyles, Theme } from "@material-ui/core";
import LayoutLanding from "../components/layout-landing"; 

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



const GetFreeTrial = () => {

    const css = useStyles();
   
    return (<LayoutLanding 
    title="TrustRelay | Get a free trial account"
    description="Register to get a free trial account"
    canonical="https://trustrelay.io/get-free-trial"
    > 

<iframe   

src="https://0966d41f.sibforms.com/serve/MUIEAL5PgZvxaBNDXvQ9lZgPJR_XpkAHSKK_6WgFOy_mszckI8F0r6V3Wd-STrxmQVgWUEJG2tn8TzLNoPbSlrNu88hp3HJrefH7w9ZINJIymgBSnqXaKTfHf1Nr1KnvgO5dnkvhUESCoSyYCMAR3fMc9uhczHVg0v4wf13r7ZrDjY5v_wIOcFwwpEOl9G9h6x21W0PTSLB1chQS"
allowFullScreen 
className={css.responsiveIframe}></iframe>
        
    </LayoutLanding>
    )
}

export default GetFreeTrial;