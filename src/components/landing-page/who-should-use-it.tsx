import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Grid from "@material-ui/core/Grid";
import { Button, Icon } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import AcUnitIcon from '@material-ui/icons/AcUnit';
import ShareIcon from '@material-ui/icons/Share';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import AccountTreeIcon from '@material-ui/icons/AccountTree';
import HourglassEmptyIcon from '@material-ui/icons/HourglassEmpty';
import LightTheme from '../../assets/themes/TrustRelay/light';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  card: {
    // borderTop: "2px solid black",
    "& .icon": {
      fontSize: 64,
      color: palette.primary.main,
    },

    // "&:hover": {
    //   borderTop: "2px solid rgba(var(--primary), 1)",
    //   "& .icon": {
    //     color: "rgba(var(--primary),1)",
    //   },
    // },
  },
}));

const WhoShouldUseItVersion1 = () => {
  const classes = useStyles();

  const serviceList = [
    {
      icon: ShareIcon,
      title: "You're sharing data already",
      text: "You and your business partners need to share data on a common basis but your current tools feel inadequate",
    },
    {
      icon: VisibilityOffIcon,
      title: "You must comply with data-related regulations",
      text: "You want to share data among partners but safety measures must be set in place.",
    },
    {
      icon: AccountTreeIcon,
      title: "You need to aggregate data",
      text:  "You want to combine data from multiple parties, verify the data sources and share results with fine-grained access.",
    },
    {
      icon: HourglassEmptyIcon,
      title: "You're overloaded with bureaucratic paperwork",
      text: "You feel slowed down by the amount of paperwork needed to start sharing data.",
    },
  ];

  return (
    <section className="section bg-light-gray" id="who">
      <div className="container">
        <div className="section__header">
          <h2>Who could benefit from TrustRelay?</h2>
          <p>
            Do you recognize your  organization in these situations?
          </p>
        </div>

        <Grid container spacing={3} alignContent="stretch">
          {serviceList.map((service) => (
            <Grid item md={3} sm={6} key={service.title}>
              <Card variant="outlined" sx={{borderColor:"transparent"}} className={clsx("card h-full", classes.card)}>
                <CardContent className="flex-column justify-between min-h-full">
                  <div className="flex-grow">
                    <div className="text-center mb-4">
                    <service.icon className="icon"  />
                    </div>
                    <h3 className="font-light text-24">{service.title}</h3>
                    <p>{service.text}</p>
                  </div>
                  {/* <div className="pt-4">
                    <Button>READ MORE</Button>
                  </div> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default WhoShouldUseItVersion1;
