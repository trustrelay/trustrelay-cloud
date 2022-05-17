import React from "react";
import { Grid, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import CalendlyDialog from "./calendly";
import trustRelayService from '../../api/trustrelay-service';
import { useToast } from "../../hooks/toast-hook";
import { getToastMessageTypeByName, Toast } from "../toast";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  sectionBG: () => ({
    // background: `url(${backgroundImg}) center center/cover no-repeat`,
    backgroundColor:"#21252b",
    marginTop:"5px",
    paddingTop:"30px",
    paddingBottom:"40px"
  }),
}));


const CallToActionVersion1 = () => {

  const toast = useToast();
  
  const classes = useStyles();

  const send = (email:string)=>{
    trustRelayService.subscribeToEarlyAccess(email,"Start here").then(()=>{
      toast.openToast(`info`, `Thanks for your details, we'll get in contact with you soon`, getToastMessageTypeByName('info'));
    }).catch((err)=>{
   
      toast.openToast(`error`, 'sorry we were unable to send your details, please try later.', getToastMessageTypeByName('error'));
    })
  }
  

  return (
    <aside className={clsx("section", classes.sectionBG)} id="cta1">
      <Toast value={toast} close={toast.closeToast} />
      <div className="container">
        <Grid
          container
          spacing={3}
          direction="column"
          alignItems="center" 
        >
          <Grid item lg={8} md={8} sm={12} xs={12} textAlign="center">
            <Typography  sx={{color:"#FFFFFF"}} variant="h5">Dont miss an opportunity to improve your decisions.</Typography>
            <Typography variant="h6" sx={{color:"#FFFFFF"}}>
              We can help you identify the potential opportunities of sharing data in your ecosystem.
            </Typography>
          </Grid>
          <Grid item lg={4} md={4} sm={12} xs={12} className="text-center">
          <CalendlyDialog 
          title="Schedule a free call" 
          dialog="Choose a timeslot and we'll contact you." 
          variant="contained" 
          primaryColor={true} 
          url={process.env.REACT_APP_CALENDLY_URL!}
          />
          </Grid>
        </Grid>
       
      </div>
    </aside>
  );
};

export default CallToActionVersion1;
