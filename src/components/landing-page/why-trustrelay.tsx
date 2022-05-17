import React from "react";
import Card from "@material-ui/core/Card";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid"; 
import { makeStyles } from "@material-ui/core/styles"; 
import datastewardship from '../../assets/illustrations/theme1/datastewardship.svg';
import discoverability from '../../assets/illustrations/theme1/discoverability.svg'
import usability from '../../assets/illustrations/theme1/usability.svg'

const useStyles = makeStyles(({ palette, ...theme }) => ({}));

const WhyTrustRelay = () => { 

  const portfoioList = [
    {
      imageUrl: datastewardship,
      name: "Data stewardship",
      description: `TrustRelay introduces dataspaces, task boards and data-sharing agreements to support your data stewardship efforts.`,
    },
    {
      imageUrl: discoverability,
      name: "Data discovery",
      description: `We improve observability of data with data lineage analysis, data tagging, data geolocation and data metrics.`,
    },
    {
      imageUrl: usability,
      name: "Data usability",
      description: `Use familiar languages like SQL to query almost any type of structured and semi-structured data across organizational boundaries.`,
    },
  ];

  return (
    <section className="section" id="why">
      <div className="container">
        <div className="section__header">
          <h2>Why TrustRelay?</h2>
          <p>
          We're the first data mesh platform focused on supporting your data stewardship efforts.
          </p>
        </div>
        <Grid container spacing={3}>
          {portfoioList.map((portfolio, index) => (
            <Grid item md={4} sm={4} key={index}>
              <Card variant="outlined" sx={{borderColor:"transparent", "&:hover":{backgroundColor:"none"}}} className="relative h-full card" key={index}>
                <img
                  className="w-full"
                  src={portfolio.imageUrl}
                  alt="portfolio"
                />
                <div className="flex-column justify-between">
                  <div className="px-4 pt-4">
                    <h3 className="m-0 font-bold">{portfolio.name}</h3>
                    <p className="mb-4">{portfolio.description}</p>
                    {/* <Divider /> */}
                  </div>
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

export default WhyTrustRelay;
