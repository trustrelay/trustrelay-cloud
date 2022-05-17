import { AppBar, Button, Link,  Toolbar, Typography, useMediaQuery } from "@material-ui/core"; 
import {  createStyles,  makeStyles, Theme  } from "@material-ui/core";  

const demoLink = 'https://trustrelay.io/get-free-trial'


const useStyles = makeStyles((theme: Theme) =>
createStyles({

  topnav: {
    // height: "4em",
    paddingLeft: "0em",
    borderBottomColor: "#eeeeee",
    borderBottomWidth: "1px",
    borderBottomStyle: "solid",
    paddingBottom: "3px",
    paddingTop: "3px"
  },
  innernav: {
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "0",
    marginBottom: "0"
  },
  divider: {
    width: "100%"
  },
  home: {
    display: 'flex',
    minWidth: '100px',
    cursor: 'pointer',
  },
  homeText: {
    display: 'flex',
    margin: '0em 0em 0em 1em'
  },
  logo: {
    maxHeight: '2em',
    margin: '0 0 0 0em',

    flow: 'left'
  },
  logoText: {
    margin: "0",
    paddingBottom: "0.5em"
  },

  menuBox: {
    outline: 'none',
  },
  topIcon: {
    margin: "0",
    paddingRight: "0.1em"
  },

  heroButton: {
    minHeight: "60px",
    width: "200px",
  },
})
);



const TopMenu = () => {

    const css = useStyles(); 
  const biggerScreen = useMediaQuery('(min-width:800px)'); 


    return  <section id="menu">

    <AppBar position="fixed" color="transparent" className={css.topnav} >

      <Toolbar variant="dense" className={css.innernav}>



        <Link underline="none" href={`https://trustrelay.io`}>
          <div className={css.home}>
            <img className={css.logo} src="https://cdn.trustrelay.io/media/TrustRelayLogoMini.svg" alt="Logo" />
            <Typography style={{ float: "left", margin: "8px 0 0 -7px" }}>TrustRelay</Typography>
          </div>
        </Link>

        <div className={css.divider}></div>

        {/* <Button variant="contained" size="large" className={css.topIcon}>Signup</Button> */}
        {biggerScreen ? <Button size="large" color="primary" style={{ fontWeight: "bolder", fontSize: 21 }} variant="contained" className={css.heroButton} onClick={()=> window.location.href=demoLink} >Get free trial</Button> : <Button size="large" color="primary" style={{ fontWeight: "bolder", width:"300px"}} variant="contained" onClick={() => window.location.href=demoLink}>Get free trial</Button>}

      </Toolbar>
    </AppBar>

  </section>
}

export default TopMenu;