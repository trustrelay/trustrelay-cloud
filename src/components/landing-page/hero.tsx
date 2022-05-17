import { Button, createStyles, Grid, makeStyles, Theme, Typography, useMediaQuery } from "@material-ui/core"; 

const demoLink = 'https://trustrelay.io/get-free-trial'

const useStyles = makeStyles((theme: Theme) =>
createStyles({
    video: {
        minWidth: "100%",
        // minHeight: "80%",
  
      },
    heroSmall: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "60vh"
      },
      heroBig: {
        position: "relative",
        width: "100%",
        overflow: "hidden",
        minHeight: "20vh"
      },
      heroOverlaySmall: {
        backgroundColor: "#C4C4C4DD",
        width: "100%",
        minHeight: "50px",
        position: "absolute",
        bottom: "5px",
        paddingTop: "5px",
        paddingBottom: "0px"
  
      },
      heroOverlayBig: {
        backgroundColor: "#C4C4C4DD",
        width: "100%",
        // minHeight: "150px",
        position: "absolute",
        bottom: "25vh",
        paddingTop: "20px",
        paddingBottom: "5px"
  
      },
      heroH1: {
        color: "#0090BF",
        fontWeight: "bolder",
        textAlign: "center"
      },
      heroH5: {
        color: "#000000",
        fontWeight: "bolder",
        textAlign: "center"
      },
      heroButton: {
        minHeight: "60px",
        width: "200px",
      },
  
})
);

const Hero = () => {

    const css = useStyles();
    const biggerScreen = useMediaQuery('(min-width:800px)');

   

    return  <section className={biggerScreen ? css.heroBig : css.heroSmall}>
    {biggerScreen ? <video
      autoPlay
      muted
      loop
      className={css.video}
    >
      <source src="https://cdn.trustrelay.io/media/payed_hero_video.mp4" type='video/mp4' />
      Your device does not support playing 'video/mp4' videos
    </video> : <img src="https://cdn.trustrelay.io/media/video_background.webp" alt="hero video trustrelay" width="100%" height="auto" style={{ overflow: "hidden", objectFit: "cover", zIndex: -1 }} />}


    <div className={biggerScreen ? css.heroOverlayBig : css.heroOverlaySmall}>
      <Grid container flexDirection="column">
        <Grid item>
          <Typography variant="h1" className={css.heroH1} style={{ fontWeight: "bolder" }}>A platform to manage data-sharing between organizations.</Typography>
        </Grid>
        <Grid item>
          <Typography variant="h2" className={css.heroH5} style={{ fontWeight: "bolder" }}>Realize the opportunities of data collaboration</Typography>
        </Grid>
        <Grid item container flexDirection="row"   >
          <Grid item xs={1} sm={1} md={3} lg={4} xl={4} >&nbsp;</Grid>
          <Grid item xs={5} sm={5} md={3} lg={2} xl={2} textAlign="center">{biggerScreen ? <Button size="large" color="primary" style={{ fontWeight: "bolder", fontSize: 21 }} variant="contained" className={css.heroButton} onClick={()=>window.location.href=demoLink} >Get free trial</Button> : <Button size="large" color="primary" style={{ fontWeight: "bolder" }} variant="contained" onClick={() => window.location.href = demoLink}>Get free trial</Button>}</Grid>
          <Grid item xs={5} sm={5} md={3} lg={2} xl={2} textAlign="center" >{biggerScreen ? <Button size="large" color="secondary" style={{ fontWeight: "bolder", fontSize: 21 }} variant="contained" className={css.heroButton} href="/learn-more" >Data sharing?</Button> : <Button size="large" color="secondary" style={{ fontWeight: "bolder" }}  variant="contained" href="/learn-more">Data sharing?</Button>}</Grid>
          <Grid item xs={1} sm={1} md={3} lg={4} xl={4}  >&nbsp;</Grid>
        </Grid>
      </Grid>
    </div>
  </section>
}

export default Hero;