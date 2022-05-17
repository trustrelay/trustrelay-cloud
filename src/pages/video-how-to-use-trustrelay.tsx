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



const VideoHowToUseTrustRelay = () => {

    const css = useStyles(); 
 

    return (<LayoutLanding 
    title="TrustRelay | Video - How can I use TrustRelay?"
    description="Register to watch demo how to use TrustRelay"
    canonical="https://trustrelay.io/video-how-can-i-use-trustrelay"
    > 

<iframe   

src="https://0966d41f.sibforms.com/serve/MUIEAOgdYmy2t_zJhVZzUTlLkBEbJRvVNRK1kHB4quslHWyuA_9DIfgjCxmhmBxC-ne6mo9Esc79AfGFth81ZRv2YsK6PpAg7wuBxjpuNaenalCTGbtY7Av9IsRoDYw4YDULFrCwMr_AlvrwYtu3Vud5-IH0WHVwzwvBdjUYRT70iUy8NOQMRCuUkgtIhjHHWSl05W1B9oKFsqMF"
allowFullScreen 
className={css.responsiveIframe}></iframe>
     


        
    </LayoutLanding>
    )
}

export default VideoHowToUseTrustRelay;