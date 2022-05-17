import React from "react";
import Card from "@material-ui/core/Card"; 
import Grid from "@material-ui/core/Grid"; 
import { makeStyles } from "@material-ui/core/styles";  
import { Typography } from "@material-ui/core";
import clsx from "clsx";

const useStyles = makeStyles(({ palette, ...theme }) => ({


  card: {
    
    "&:hover": {
     
      elevation:0, 
     
    },
  },

}));

const ActNow = () => { 

  const css = useStyles();

  const portfolioList = [
    {
      imageUrl: "https://cdn.trustrelay.io/media/contract.webp",
      name: "CLEAR AND CONCISE LEGAL CONTEXT FOR DATA SHARING",
      description: `Use our data-sharing contract frameworks to define a pragmatic legally binded agreement for your data.`,
    },
    {
      imageUrl: "https://cdn.trustrelay.io/media/discoverability.webp",
      name: "TRANSPARENCY, PROVENANCE, BUILT-IN",
      description: `Visualize provenance and usage of data, legal agreements between partners and jurisdictions involved.`,
    },
    {
      imageUrl: "https://cdn.trustrelay.io/media/sharing.webp",
      name: "PRIVACY ENHANCING TECH TO CONTROL DATA DISCLOSURES",
      description: `Not all data can be shared as-is, therefore synthetic copies, data visiting and trusted execution environments are excellent complements.`,
    },
    {
      imageUrl: "https://cdn.trustrelay.io/media/reuse.webp",
      name: "COMPATIBLE WITH MODERN DATA TECHNOLOGIES",
      description: `There is myriad of technologies that you and your partners may be already using, we help you interoperate with most of those storage technologies.`,
    },
  ];

  return (
    <section className="section" style={{paddingTop:"10px"}}>
      <div className="container">
        <div className="section__header">
          <Grid item xs={12} sm={12} md={12} lg={12} xl={12} textAlign="center" alignContent="center" alignItems="center">
          <Typography style={{textAlign:"center", fontWeight:"bolder"}} variant="h3">Act now and avoid the hassless</Typography>
          </Grid>
          
        </div>
        <Grid container spacing={1} justifyContent="center">
          {portfolioList.map((portfolio, index) => (
            <Grid item xs={6} sm={5} md={4} lg={3} xl={3} key={index}>
              <Card elevation={0} variant="outlined" sx={{borderColor:"transparent", "&:hover":{backgroundColor:"none"}}} className={clsx("relative h-full card", css.card)} key={index}>
                <img
                  className="w-full"
                  src={portfolio.imageUrl}
                  alt="portfolio"
                  width="100%"
                  height="auto"
                />
                <div className="flex-column justify-between">
                  <article className="px-4 pt-4">
                    <Typography variant="h4" style={{fontSize:20}} className="m-0 font-bold">{portfolio.name}</Typography>
                    <br/>
                    <Typography variant="body1" style={{fontSize:15}} className="mb-4">{portfolio.description}</Typography>
                    {/* <Divider /> */}
                  </article>
                  {/* <div className="px-4 py-2">
                    <IconButton>
                    <AcUnitIcon/>
                    </IconButton>
                    <IconButton>
                    <AcUnitIcon/>
                    </IconButton>
                  </div> */}
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* <div className="text-center pt-9">
          <Button variant="contained" size="large" color="secondary">
            load more
          </Button>
        </div> */}
      </div>
    </section>
  );
};

export default ActNow;
 