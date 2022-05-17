import React from "react";
import { Grid, Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AlternateEmailIcon from '@material-ui/icons/AlternateEmail';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import CalendlyDialog from "./calendly";
import trustRelayService from '../../api/trustrelay-service';
import { useToast } from "../../hooks/toast-hook";
import { getToastMessageTypeByName, Toast } from "../toast";
import { collector, Producer, Transport } from "../../apm";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  footerSection: {
    "& h4:after": {
      content: '" "',
      position: "absolute",
      bottom: -8,
      left: 0,
      height: 2,
      width: 64,
      background: palette.secondary.main,
    },
  },
  link:{
    color:palette.primary.main
  }
}));

const ContactUs = () => {
  const toast = useToast();
  const classes = useStyles(); 


  const send = (email:string)=>{
    trustRelayService.subscribeToEarlyAccess(email,"Footer Contact us").then(()=>{
      toast.openToast(`info`, `Thanks for your details, we'll get in contact with you soon`, getToastMessageTypeByName('info'));
    }).catch((err)=>{
      
      toast.openToast(`error`, 'sorry we were unable to send your details, please try later.', getToastMessageTypeByName('error'));
    })
  }

  return (
    <section className={clsx("bg-light-dark", classes.footerSection)} id="contact">
      <Toast value={toast} close={toast.closeToast} />
      <div className="container">
        <Grid container>
          <Grid item lg={6} md={6} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">About Us</h4>
              <p className="text-inherit">
                We're a team working in the enterprise and we're obsessed about data governance and data sharing for the enterprise.
              </p>
              <CalendlyDialog 
              title="Contact us" 
              dialog="Choose a timeslot and we'll contact you." 
              variant="contained" 
              primaryColor={false} 
              url={process.env.REACT_APP_CALENDLY_URL!}
              />
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              <h4 className="text-20 mb-6 relative">Contact</h4>
              <div className="px-4 my-8 flex items-center mx--4">
                <AlternateEmailIcon className="text-secondary"/>
                <div className="pl-4">
                  <h5 className="m-0 p-0 text-16">Email</h5>
                  <p className="m-0 p-0 text-inherit"><a className={classes.link} href="mailto:hello@web.trustrelay.io">hello@web.trustrelay.io</a></p>
                </div>
              </div>
              <div className="px-4 mt-8 flex items-center mx--4">
                <LocationOnIcon className="text-secondary"/>
                <div className="pl-4">
                  <h5 className="m-0 p-0 text-16">Adress</h5>
                  <p className="m-0 p-0 text-inherit">
                    Zürich, Switzerland
                  </p>
                </div>
              </div>
            </div>
          </Grid>
          <Grid item lg={3} md={3} sm={12}>
            <div className="p-8 h-full elevation-z3">
              {/* <h4 className="text-20 mb-6 relative">Disclaimer</h4>
              <p className="text-inherit">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Officiis perferendis rem, aut aliquam neque nam?
              </p> */}

              {/* <div className="mt-8">
                <a href="#linkedin" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-linkedin.png"
                    alt=""
                  />
                </a>
                <a href="#twitter" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-twitter.png"
                    alt=""
                  />
                </a>
                <a href="#facebook" className="px-2">
                  <img
                    className="h-24 w-24"
                    src="./assets/images/social-facebook.png"
                    alt=""
                  />
                </a>
              </div> */}
            </div>
          </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default ContactUs;
