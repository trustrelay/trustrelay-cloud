import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useToast } from "../../hooks/toast-hook";
import { Toast } from "../toast";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  sectionBG: () => ({
    // background: `url(${backgroundImg}) center center/cover no-repeat`,
    backgroundColor:"#0090BF",
    marginTop:"5px",
    paddingTop:"30px",
    paddingBottom:"40px"
  }),
}));

const CallToActionVersion2 = ( ) => {
  const classes = useStyles();
  const toast = useToast();
 


  // const send = (email:string)=>{
  //   trustRelayService.subscribeToEarlyAccess(email,"Schedule a call").then(()=>{
  //     toast.openToast(`info`, `Thanks for your details, we'll get in contact with you soon`, getToastMessageTypeByName('info'));
  //   }).catch((err)=>{
 
  //     toast.openToast(`error`, 'sorry we were unable to send your details, please try later.', getToastMessageTypeByName('error'));
  //   })
  // }

  return (
    <section className={clsx("section text-white", classes.sectionBG)} id="cta2">
      <Toast value={toast} close={toast.closeToast} />
      <div className="container">
        <Grid
          container
          spacing={3}
          direction="row"
          alignItems="center" 
        >
          <Grid item lg={8} md={8} sm={12} xs={12}>
            <Typography variant="h5" style={{color:"#ffffff", fontWeight:"bolder"}}>We understand the complexities of sharing data.</Typography>
            <Typography variant="h6" style={{color:"#ffffff"}}>
              We have created a library of useful resources to guide you on your data-sharing journey.
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} className="text-center">
           <Button variant="contained" color="secondary" href="/learn-more">Check resources</Button>
        {/* <Link style={{backgroundColor:"#ffffff"}} href="/learn-more">Download whitepaper</Link>  */}
          </Grid>
        </Grid>
       
      </div>
    </section>
  );
};

export default CallToActionVersion2;
