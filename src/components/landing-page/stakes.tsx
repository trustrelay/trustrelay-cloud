import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Button, Icon, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LightTheme from '../../assets/themes/TrustRelay/light';
import { theme } from "@cloudinary/url-gen/actions/effect";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    // borderTop: "2px solid black",

    "& .icon": {
      fontSize: 64,
      // color: palette.primary.main,
      color:"#ffffff"
    },

    "&:hover": {
      backgroundColor: '#0090BF',
      elevation:0,
      boxShadow: "none",
      // borderTop: "2px solid rgba(var(--primary), 1)",
      "& .icon": {
        // color: "rgba(var(--primary),1)",
        color:"#ffffff"
      },
    },
  },
}));

const Stakes = () => {
  const css = useStyles();

  const serviceList = [
    {
      icon: AccountTreeIcon,
      title: "Missing new potential services",
      text: "",
    },
    {
      icon: HourglassEmptyIcon,
      title: "Cumbersome, expensive business costs",
      text: "",
    },
    {
      icon: VisibilityOffIcon,
      title: "Ineffective regulatory compliance",
      text: "",
    },
  ];

  return (
    <section className={clsx("section")} style={{backgroundColor:"#0090BF"}} id="stakes">
      {/* <div className="container"> */}
        <div className="section__header">
         <Grid item xs={12} sm={12} md={12} lg={12} xl={12} alignContent="center" alignItems="center" textAlign="center">
         <Typography variant="h3" style={{  fontWeight: "bolder", color:"#ffffff", textAlign:"center", paddingLeft:"15px", paddingRight:"20px" }}>How much is unclear, incomplete or missed use of data costing you?</Typography>

         </Grid>
        </div>

        <Grid container alignContent="stretch" columnGap={3} xs={12} sm={12} md={12} lg={12} xl={12} alignItems="center" justifyContent="center">
          {serviceList.map((service) => (
            <Grid item xs={5} sm={3} md={3} lg={3} xl={3} textAlign="center" key={service.title}>
              <Card elevation={0} variant="outlined" sx={{ borderColor: "transparent", backgroundColor:"#0090BF"}}  className={clsx("card h-full", css.card)}>
                <CardContent className="flex-column justify-between min-h-full">
                  <article className="flex-grow">
                    <div className="text-center mb-4">
                      <service.icon className="icon" />
                    </div>
                    <Typography variant="h4" style={{fontSize:20, fontWeight:"bolder", color:"#ffffff"}} >{service.title}</Typography>
                    {/* <p>{service.text}</p> */}
                  </article>
                  {/* <div className="pt-4">
                    <Button>READ MORE</Button>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        
          <Grid item container textAlign="center" xs={12} sm={12} md={12} lg={12} xl={12}  >
          <Grid item>&nbsp;</Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12} >
              <Typography variant="subtitle1" style={{ fontWeight: "bold", color:"#ffffff", paddingLeft:"15px", paddingRight:"15px"  }}>Can partners understand the risks, rights and responsibilities of sharing data with you and vice versa?</Typography>

            </Grid>
            <Grid item xs={12} sm={12} md={12} lg={12} xl={12}  >
              <Typography variant="subtitle2" style={{ fontWeight:"normal",  color:"#ffffff", paddingLeft:"15px", paddingRight:"15px" }}>A lack of process and poor interoperability may already be costing you a great deal.</Typography>

            </Grid>
            <Grid item>&nbsp;</Grid>
          </Grid>
        </Grid>
      {/* </div> */}
    </section>
  );
};

export default Stakes;
