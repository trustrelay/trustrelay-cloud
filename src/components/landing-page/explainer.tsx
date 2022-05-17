import { createStyles, Grid, makeStyles, Theme, Typography } from "@material-ui/core";
import clsx from "clsx";


const useStyles = makeStyles((theme: Theme) =>
  createStyles({

    sectionText: {
      paddingTop: "10px",
      marginTop: "10px",
      backgroundColor: "#ffffff"
    },
  })
)

const Explainer = () => {

  const css = useStyles();

  return <main className={clsx("section", css.sectionText)} style={{ backgroundColor: "#ffffff" }}>
    <Grid container xs={12} sm={12} md={12} lg={12} xl={12} flexDirection="row">
      <Grid item xs={1} sm={2} md={3} lg={2} xl={2}>&nbsp;</Grid>
      <Grid item container xs={10} sm={8} md={6} lg={8} xl={8} flexDirection="column" justifyContent="center" >

        <Typography variant="h3" style={{ fontWeight: "bold" }}>Most companies and organizations don't know how to establish data collaboration with their partners, <br/> <br/> so we created a platform that creates clear, actionable data-sharing agreements and a data engine to easily collaborate with external data.</Typography>
        <br />
 
        <Typography variant="h6" style={{ textAlign: "left" }}>At trustrelay we help organizations that want to be recognized as a strategic partner.
          In order to be that way, organizations need to convince their partners, customers and suppliers to trust them and trust the process.

          <br /><br/>
          The problem is, sharing data is a risky and complex business, legal documents such as data-sharing agreements must be clear and concise, and the technologies are too different in each organization.
          This makes your partners uneasy and it makes you frustrated with the slow progress.
          <br /><br/>
          We believe is just plain wrong to not sharing data  when there are so many benefits from it. 
          <br/>
          That's why we interviewed many data and policy experts and used our expertise to design a solution that will help you and others to share data with trust.
          <br /><br/>
          </Typography>
          <Typography variant="h3" style={{ fontWeight: "bold" }}>Here's how it works:<br /></Typography>
          <Typography variant="h6" style={{ textAlign: "left" }}>
          <ol>
            <li>Create a dataspace</li>
            <li>Invite partner organizations</li>
            <li>Start your data collaboration</li>

          </ol> 
          <br />
          So sign up now to stop worrying about legal and technical questions and start taking better decisions with collaborative data.
          <br /><br/>
        </Typography>

      </Grid>

    </Grid>
  </main>
}

export default Explainer;