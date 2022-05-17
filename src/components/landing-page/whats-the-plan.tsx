import React from "react";
import { Grid,  Card, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx"; 

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
    background: "rgba(var(--primary),0.3)",
  },
  tube2: {
    ...tubeStyle,
    background: "rgba(var(--primary),0.6)",
  },
  tube3: {
    ...tubeStyle,
    background: "rgba(var(--primary),1)",
  },
  card: {
    border: "1px solid rgba(0,0,0,0.1)",

    "& .icon-wrapper": {
      position: "relative",
      zIndex: 1,
      marginRight: 80,
      "&:after": {
        content: '" "',
        position: "absolute",
        height: 210,
        width: 203,
        left: -112,
        top: -83,
        background: "rgba(var(--primary), 1)",
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

const WhatsThePlan = () => {
  const classes = useStyles();

  return (
    <section className="section" id="plan" style={{paddingTop:"5px"}}>
      <div className="container">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6}>
            <div className="flex items-center">
              <Typography variant="h3" className="font-normal text-48 m-0 relative inline-bock text-primary">
                What's the plan?
              </Typography>
              <div className="flex ml--4">
                <div className={classes.tube1}></div>
                <div className={classes.tube2}></div>
                <div className={classes.tube3}></div>
              </div>
            </div>

            <Typography variant="h4" className="my-10 max-w-400">
              Follow this steps to start your new data sharing journey.
            </Typography>
          </Grid>
          <Grid container item xs={12}  sm={6} rowGap={1}>
            <Grid item>
              <Card
                elevation={0}
                className={clsx(
                  "border-radius-8 p-6 flex items-center",
                  classes.card
                )}
              >
                <div className="icon-wrapper my-4" >
                  {/* <Filter1Icon style={{ color: "#ffffff" }} fontSize="large" /> */}
                  <Typography variant="h4" style={{color:"#ffffff"}}>1</Typography>
                </div>
                <div className="max-w-400" style={{zIndex:3}}>
                  <h4 className="mt-0 mb-4" style={{fontWeight:"bolder"}}>Sign-up to create your dataspace</h4>
                  <p className="m-0" style={{paddingLeft:"20px"}}>
                    Create your trial account, it will automatically create a dataspace for you.
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
                <div className="icon-wrapper my-4" >
                  {/* <ChromeReaderModeIcon color="primary" fontSize="large"  /> */}
                  {/* <Filter2Icon style={{ color: "#ffffff" }} fontSize="large" />  */}
                  <Typography variant="h4" style={{color:"#ffffff"}}>2</Typography>
                </div>
                <div className="max-w-400" style={{zIndex:3}}>
                  <h4 className="mt-0 mb-4" style={{fontWeight:"bolder"}}>Invite your peer organizations to connect and quey</h4>
                  <p className="m-0" style={{paddingLeft:"20px"}}>
                    You and your peers can now send decentralized queries.
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
                <div className="icon-wrapper my-4">
                  {/* <Filter3Icon style={{ color: "#ffffff" }} fontSize="large" /> */}
                  <Typography variant="h4" style={{color:"#ffffff"}}>3</Typography>
                </div>
                <div className="max-w-400" style={{zIndex:3}}>
                  <h4 className="mt-0 mb-4" style={{fontWeight:"bolder"}}>Get stuff done</h4>
                  <p className="m-0" style={{paddingLeft:"20px"}}>
                    Start with purpose, share responsibly, collaborate and take better decisions.
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

export default WhatsThePlan;
