import { Card, CardContent, createStyles, Grid, makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core";

import unilu from '../../assets/illustrations/unilu.webp';
import unifr from '../../assets/illustrations/unifr.webp';
import stadtLuzern from '../../assets/illustrations/stadt_luzern.webp';
import innosuisse from '../../assets/illustrations/innosuisse.webp';
import swisscom from '../../assets/illustrations/swisscom.webp';
import clsx from "clsx";



const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    
    sectionLogos: {
      paddingTop: "5px",
      marginTop: "5px",
      backgroundColor: "#ffffff"
    },
    card: {
      // borderTop: "2px solid black",

      "& .icon": {
        fontSize: 64,
        // color: palette.primary.main,
        color: "#ffffff"
      },

      "&:hover": {
        backgroundColor: '#ffffff',
        // boxShadow: "10px 5px 5px red",
        boxShadow:"none",
        // elevation:0,
        // borderTop: "2px solid rgba(var(--primary), 1)",
        "& .icon": {
          // color: "rgba(var(--primary),1)",
          color: "#ffffff"
        },
      },
    },
  })
);

const Logos = () => {

    const css = useStyles();
    const biggerScreen = useMediaQuery('(min-width:800px)');

    return   <section className={css.sectionLogos}>
    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} alignContent="center" alignItems="center" textAlign="center">
      <Grid item>&nbsp;</Grid>
      <Grid item textAlign="center" xs={12} sm={12} md={12} lg={12} xl={12}  >
        <Typography variant="h3" style={{ color: "#0090BF", fontWeight: "bolder", paddingLeft:"15px", paddingRight:"15px" }}>We started our journey with a public-private partnership</Typography>
      </Grid>
      <Grid item container spacing={1} alignItems="center" alignContent="center" textAlign="center" justifyContent="center">
        <Grid item xs={6} sm={6} md={6} lg={4} xl={4}>
          <Card elevation={0}  variant="outlined" sx={{ borderColor: "transparent" }} className={clsx("card h-full", css.card)}> 
            <CardContent>
              <img src="https://cdn.trustrelay.io/media/unilu.webp" 
              alt="universität luzern logo" 
              style={{ maxHeight: biggerScreen ? "100px" : "50px" }} 
              width="50%"
              height="auto"
              />
            </CardContent>
          </Card>
        </Grid>
      
        <Grid item xs={6} sm={4} md={3} lg={4} xl={2} >
          <Card elevation={0}  variant="outlined" sx={{ borderColor: "transparent" }} className={clsx("card h-full", css.card)}>
            <CardContent>
              <img src="https://cdn.trustrelay.io/media/stadt_luzern.webp" 
              alt="stadt luzern logo" 
              style={{ maxHeight: biggerScreen ? "100px" : "50px" }}
              width="50%"
              height="auto"
               />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={6} md={6} lg={4} xl={4} >
          <Card elevation={0}  variant="outlined" sx={{ borderColor: "transparent" }} className={clsx("card h-full", css.card)}>
            <CardContent>
              <img src="https://cdn.trustrelay.io/media/unifr.webp" 
              alt="universität freiburg logo"  
              style={{ maxHeight: biggerScreen ? "100px" : "50px" }}
              width="50%"
              height="auto"
               />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={3} lg={4} xl={2}>
          <Card elevation={0}  variant="outlined" sx={{ borderColor: "transparent" }} className={clsx("card h-full", css.card)}>
            <CardContent>
              <img src="https://cdn.trustrelay.io/media/innosuisse.webp" 
              alt="innosuisse logo"  
              style={{ maxHeight: biggerScreen ? "100px" : "50px" }}
              width="50%"
              height="auto"
               />
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6} sm={4} md={4} lg={4} xl={3}>
          <Card elevation={0}  variant="outlined" sx={{ borderColor: "transparent" }} className={clsx("card h-full", css.card)}>
            <CardContent>
              <img src="https://cdn.trustrelay.io/media/swisscom.webp" 
              alt="swisscom logo"  
              style={{ maxHeight: biggerScreen ? "100px" : "50px" }}
              width="50%"
              height="auto"
               />
            </CardContent>
          </Card>
        </Grid>

      </Grid>
      <Grid item>&nbsp;</Grid>

    </Grid>
  </section>
}

export default Logos;