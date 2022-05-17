import React from "react";
import Card from "@material-ui/core/Card"; 
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid"; 
import { makeStyles } from "@material-ui/core/styles"; 
import traceability from  '../../assets/illustrations/theme1/traceability.svg'
import accessDenied from '../../assets/illustrations/theme1/access_denied_2.svg'
import desk from '../../assets/illustrations/theme1/desk_3.svg'
const useStyles = makeStyles(({ palette, ...theme }) => ({}));

const Empathy = () => {
  const classes = useStyles();

  const difficultiesList = [
    {
      imageUrl: desk, 
      name: "A process to share data",
      description: `Like member onboarding and data sharing agreements makes it difficult to give a first step.`,
    },
    {
      imageUrl: traceability,
      name: "Traceability of data",
      description: `Not knowing where data is coming from makes it less trustworthy.`,
    },
    {
      imageUrl: accessDenied,
      name: "Safeguards to automate data protection",
      description: `To protect you against unauthorized access because once data is out it's not in our control.`,
    },
  ];

  return (
    <section className="section" id="empathy">
      <div className="container">
        <div className="section__header">
          <h2>Challenges we help you to solve</h2>
          {/* <p>
          We help you get the most out of it.
          </p> */}
        </div>
        <Grid container spacing={3}>
          {difficultiesList.map((portfolio, index) => (
            <Grid item xs={12} md={6} sm={4} lg={4} xl={4} key={index}>
              <Card variant="outlined" sx={{borderColor:"transparent"}} className="relative h-full card" key={index}>
                <img
                  className="w-full"
                  src={portfolio.imageUrl}
                  alt="portfolio"
                />
                <div className="flex-column justify-between">
                  <div className="px-4 pt-4">
                    <h3 className="m-0 font-bold">{portfolio.name}</h3>
                    <p className="mb-4">{portfolio.description}</p>
                   
                  </div> 
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
 
      </div>
    </section>
  );
};

export default Empathy;
