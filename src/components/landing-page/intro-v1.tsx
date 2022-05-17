import React from "react";
import { Grid, Icon, Button, Avatar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import permissions from '../../assets/illustrations/theme1/permissions_2.svg'
import { css } from "@material-ui/styled-engine";
import PolicyIcon from '@material-ui/icons/Policy';
import WebIcon from '@material-ui/icons/Web';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import EmailIcon from '@material-ui/icons/Email';
import TodayIcon from '@material-ui/icons/Today';
import CalendlyDialog from "./calendly";
import trustRelayService from '../../api/trustrelay-service';
import DoneIcon from '@material-ui/icons/Done';
import { getToastMessageTypeByName, Toast } from "../toast";
import { useToast } from "../../hooks/toast-hook";


const useStyles = makeStyles(({ palette, ...theme }) => ({
  imageWrapper: {
    position: "relative",
    zIndex: 3,
    "& .price": {
      position: "absolute",
      right: 24,
      top: -12,
      height: 100,
      width: 100,
      borderRadius: "50%",
      boxShadow: "0px 10px 6px green",
    },
    "&:after": {
      content: '" "',
      position: "absolute",
      display: "block",
      height: 450,
      width: 450,
      background: "rgba(var(--primary),0)", //before rgba(var(--primary),0.15)
      borderRadius: "50%",
      zIndex: -1,
    },
    "&:before": {
      content: '" "',
      position: "absolute",
      display: "block",
      height: 390,
      width: 390,
      // background: "#F72585", //before rgba(var(--primary),0.2)
      borderRadius: "50%",
      zIndex: -2,
    },
    [theme.breakpoints.down("sm")]: {
      "&:after": {
        height: 350,
        width: 350,
      },
      "&:before": {
        height: 290,
        width: 290,
      },
      "& .price": {
        right: 0,
      },
    },
    [theme.breakpoints.down("xs")]: {
      "&:after": {
        height: 300,
        width: 300,
      },
      "&:before": {
        height: 240,
        width: 240,
      },
    },
  },
  white: {
    marginTop:"5rem"
  },
  blue: {
    backgroundColor: "#0090BF"
  },
  pink: {
    backgroundColor: "#F72585"
  }
}));

const IntroVersion1 = () => {
  const css = useStyles();
  const toast = useToast();

  const sendDetails = (email:string) =>{
   
     
      trustRelayService.subscribeToEarlyAccess(email,"Intro Contact us").then(()=>{
        toast.openToast(`info`, `Thanks for your details, we'll get in contact with you soon`, getToastMessageTypeByName('info'));
      }).catch((err)=>{
      
        toast.openToast(`error`, 'sorry we were uanble to send your details, please try later.', getToastMessageTypeByName('error'));
      })
    
  }
  

  return (
    /* className="section mt-12" */
    <section className={clsx("section", css.white)} id="intro">
       
      <div className="container">
      <Toast value={toast} close={toast.closeToast} />
        <Grid container spacing={10} >
          <Grid item sm={6} xs={12}>
            <div
              className={clsx(
                "flex-column justify-center items-center h-full",
                css.imageWrapper
              )}
            >
              <div className="relative">
                <img
                  src={permissions}
                  alt="TrustRelay"
                  className="w-full block mt-6"
                /> 
              </div>
            </div>
          </Grid>
          <Grid item sm={6} xs={12}>
            <Typography variant="h4">Trust Relay</Typography>
            <Typography variant="h5" >
              We provide a secure, flexible data-sharing platform with embedded data stewardship.
            </Typography>
           
            <div className="flex items-center">

              <DoneIcon className="mr-4" color="primary" />
              <p className="my-2">
                Use dataspaces as a trusted zone for data-sharing.
                </p>
            </div>

            <div className="flex items-center">

              <DoneIcon className="mr-4" color="primary" />
              <p className="my-2">
                No need to upload data to an intermediary, stay in control of your data.
             </p>
            </div>

            <div className="flex items-center">

              <DoneIcon className="mr-4" color="primary" />
              <p className="my-2">
               Use professional data governance tools in your data-sharing efforts.
             </p>
            </div>


            <div className="mt-12">
              <div className="mb-4"> 
                <CalendlyDialog 
                title="Contact us" 
                dialog="Choose a timeslot and we'll contact you." 
                url={process.env.REACT_APP_CALENDLY_URL!}
                />
              </div>
            
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default IntroVersion1;
