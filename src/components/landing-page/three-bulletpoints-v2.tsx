import React from "react";
import { Grid, Icon, Card } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { BatteryChargingFull } from "@material-ui/icons"; 
import CallIcon from '@material-ui/icons/Call';
import ChromeReaderModeIcon from '@material-ui/icons/ChromeReaderMode';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import FlashOnIcon from '@material-ui/icons/FlashOn';
import GroupIcon from '@material-ui/icons/Group';

const tubeStyle = {
  height: 64,
  width: 14,
  borderRadius: 300,
  marginTop: 12,
  marginRight: 6,
  transform: "rotate(28deg)",
  transformOrigin: "center center",
};

const useStyles = makeStyles(({ palette, ...theme }) => ({
  featureTitle: {},
  tube1: {
    ...tubeStyle,
    background: "rgba(var(--primary),0.1)",
  },
  tube2: {
    ...tubeStyle,
    background: "rgba(var(--primary),0.18)",
  },
  tube3: {
    ...tubeStyle,
    background: "rgba(var(--primary),0.25)",
  },
  card: {
    border: "1px solid rgba(0,0,0,0.1)",
    width: "100%",
    "& .icon-wrapper": {
      position: "relative",
      zIndex: 3,
      marginRight: 80,
      "&:after": {
        content: '" "',
        position: "absolute",
        height: 210,
        width: 203,
        left: -112,
        top: -83,
        background: "rgba(var(--primary), 0.1)",
        transform: "rotate(-30deg)",
        transformOrigin: "center center",
        borderRadius: 32,
        zIndex: -1,
      },
    },
    [theme.breakpoints.down("sm")]: {
      flexWrap: "wrap",
      margin: 0,
    },
  },
}));

const ThreeBulltpointsVersion2 = () => {
  const classes = useStyles();

  return (
    <section className="section"  id="service2">
      <div className="container">
        <Grid container spacing={4}>
          <Grid item sm={6} xs={12}>
            <div className="flex items-center">
              <h1 className="font-normal text-48 m-0 relative inline-bock text-primary">
                What success looks like with TrustRelay?
              </h1>
              <div className="flex ml--4">
                <div className={classes.tube1}></div>
                <div className={classes.tube2}></div>
                <div className={classes.tube3}></div>
              </div>
            </div>

            <p className="my-10 max-w-400">
              A succesful deployment of TrustRelay will enable you...
            </p> 
          </Grid>
          <Grid container item sm={6} xs={12} rowGap={1}>
          <Grid item>
           <Card
              elevation={0}
              className={clsx(
                "border-radius-8 p-6 flex items-center",
                classes.card
              )}
            >
              <div className="icon-wrapper">
                <GroupIcon color="primary" fontSize="large"  />
              </div>
              <div >
                <h4 >More confidence in your collective decisions.</h4>
                <p className="m-0">
                
                </p>
              </div>
            </Card> 
          
           </Grid>
           <Grid item>
           <Card
              elevation={0}
              className={clsx(
                "border-radius-8 p-6 flex items-center",
                classes.card
              )}
            >
              <div className="icon-wrapper">
                <FlashOnIcon color="primary" fontSize="large"  />
              </div>
              <div >
                <h4>Empowered to respond with agility.&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</h4>
                <p className="m-0">
                
                </p>
              </div>
            </Card> 
          
           </Grid>
            
           <Grid item>
           <Card
              elevation={0}
              className={clsx(
                "border-radius-8 p-6 flex items-center",
                classes.card
              )}
            >
              <div className="icon-wrapper">
                <SentimentVerySatisfiedIcon color="primary" fontSize="large"  />
              </div>
              <div >
                <h4 >Ready for sudden changes in your industry.&nbsp;&nbsp;&nbsp;</h4>
                <p className="m-0">
                
                </p>
              </div>
            </Card>
          </Grid>
        </Grid>
        </Grid>
      </div>
    </section>
  );
};

export default ThreeBulltpointsVersion2;
