import React from "react";
import { Grid, Icon, Button, Avatar, Hidden, Link, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import trustRelayLogo from '../../assets/images/logo_pink.png'
import { css } from "@material-ui/styled-engine";
import PolicyIcon from '@material-ui/icons/Policy';
import WebIcon from '@material-ui/icons/Web';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import EmailIcon from '@material-ui/icons/Email';
import TodayIcon from '@material-ui/icons/Today';
import CalendlyDialog from "./calendly";
import swisscomService from '../../api/trustrelay-service';
import Typical from 'react-typical';
import whiteboard from '../../assets/images/whiteboard.jpg';
import { PathNames } from '../../CustomRouter';

const sendDetails = (email:string) =>{
 
   
    swisscomService.subscribeToEarlyAccess(email,"Contact us")
  
}

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
      background: "#F72585", //before rgba(var(--primary),0.2)
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
    backgroundColor: "transparent",
    backgroundImage:`url(${whiteboard});background-repeat:no-repeat;background-position-x:-20em`,
    backgroundPositionY:"center",
    // backgroundPositionX:"center"
  },
  blue: {
    backgroundColor: "#0090BF"
  },
  pink: {
    backgroundColor: "#F72585"
  }
}));

const IntroVersion2 = () => {
  const classes = useStyles();

  return (
    /* className="section mt-12" */
    <section className={clsx(classes.white)} id="intro2">
      {/* <div className="container"> */}
        <Grid container >
        
        <Grid item sm={1} xs={1} md={1} lg={1} xl={1} >
            </Grid>
            <Grid item sm={12} xs={12} md={1} lg={1} xl={1} style={{backgroundColor:"transparent", paddingLeft:"1em"}}>
            {/* <div
              className={clsx(
                "flex-column justify-center items-center h-full",
                classes.imageWrapper
              )}
            > */}
              {/* <div className="relative"> */}
              <h1>Trust Relay</h1>
               <Hidden mdDown>
               <img
                  src={trustRelayLogo}
                  alt="logo" 
                  className="w-full block"
                />
               </Hidden> 
          </Grid> 
         
          <Grid item sm={2} xs={3} md={5} lg={5}  xl={5}  style={{backgroundColor:"transparent"}}>
            </Grid>

            <Grid item sm={12} xs={12} md={5} lg={5} xl={5}  style={{backgroundColor:"transparent", paddingLeft:"1em"}}>
           
            <div >
              Embrace the promise of<Typical
        steps={['    an open world', 1000, '    shared data', 1000, '    data governance', 1000]}
        loop={Infinity}
        wrapper="h2"
      />
            </div>
 
            <div className="flex"> 
              <PolicyIcon className="mr-4" color="primary" />
              <h3 className="my-2">
                Sharing data shouldn't feel scary.
                </h3>
            </div> 
            <div className="flex items-center"> 
              <WebIcon className="mr-4" color="primary" />
              <h3 className="my-2">
                Trust should eliminate boundaries between organizations.
             </h3>
            </div> 
            <div className="mt-12">
              <div className="mb-4"> 
                <CalendlyDialog 
                title="Contact us" 
                variant="contained"
                dialog="Choose a timeslot and we'll contact you." 
                url={process.env.REACT_APP_CALENDLY_URL!}
                />
              </div> 
            
            </div>
            <div>
              <Link style={{color:"#0090BF"}} variant="h6" href={PathNames.Dashboard}>Already have an account?</Link>
              </div>
          </Grid>
         
        </Grid>
      {/* </div> */}
    </section>
  );
};

export default IntroVersion2;
