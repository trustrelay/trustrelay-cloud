import { createStyles, Grid, Link, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx"; 

const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    
    sectionFooter: {
        paddingTop: "10px",
        marginTop: "10px",
        backgroundColor: "transparent"
      },
    card: {
      borderTop: "2px solid black",

      "& .icon": {
        fontSize: 64,
        // color: palette.primary.main,
        color: "#ffffff"
      },

      "&:hover": {
        backgroundColor: '#ffffff',
        boxShadow: "none",
        // borderTop: "2px solid rgba(var(--primary), 1)",
        "& .icon": {
          // color: "rgba(var(--primary),1)",
          color: "#ffffff"
        },
      },
    },
  })
);

const Footer = () => {

    const css = useStyles();
    
    return  <footer className={clsx("section", css.sectionFooter)} >
   
    
      <Grid item container xs={12} sm={12} md={12} lg={12} xl={12} spacing={1} flexDirection="row" >

      <Grid item xs={1} sm={1} md={2} lg={3} xl={3} >&nbsp;</Grid>
        <Grid item container xs={3} sm={3} md={3} lg={3} xl={3} flexDirection="column" >
          <Grid item container flexDirection="row">
            <Grid item><img alt="TrustRelay logo blue" src="https://cdn.trustrelay.io/media/trust_relay_blue.svg" height="50px" width="auto"/></Grid>
            <Grid item><Typography variant="subtitle1" style={{ paddingTop: "15px", fontWeight: "bolder", color:"#0090BF" }}>TrustRelay</Typography></Grid>
          </Grid>
          <Grid item>
            <Typography variant="body1" >&copy;Copyright 2022</Typography>
          </Grid>
        </Grid>

        <Grid item xs={3} sm={3} md={3} lg={3} xl={3}  >
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>ABOUT</Typography>
          <Link href="https://blog.trustrelay.io" style={{ fontSize: 12, textDecoration: "underline" }}>Check our blog</Link>
        </Grid>
        <Grid item xs={3} sm={3} md={3} lg={3} xl={3} flexDirection="column">
          <Typography variant="subtitle1" style={{ fontWeight: "bold" }}>LEGAL</Typography>
          <Link href="/privacy-policy-and-terms-of-use" style={{ fontSize: 12, textDecoration: "underline" }}>Privacy policy &amp; terms of use</Link>
          <br /><Link href="/cookie-policy" style={{ fontSize: 12, textDecoration: "underline" }}>Cookie policy</Link>

        </Grid>

        <Grid item xs={1} sm={1} md={2} lg={3} xl={3} >&nbsp;</Grid>
      </Grid>

      <br/>

    
  </footer>
}

export default Footer;