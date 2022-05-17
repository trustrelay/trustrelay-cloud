import React from "react";
import { Grid, Card, CardHeader, CardContent, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { useHistory } from "react-router-dom";

const useStyles = makeStyles(({ palette, ...theme }) => ({
    sectionMargin:{
        marginTop:"8px"
          },
  card: {
    borderRadius: 8,
    "&:hover $cardHeader": {
      background: palette.primary.main,
      color: "white",
    },
    "&:hover $largeText": {
      color: "rgba(var(--primary),0.3)",
    },
  },
  cardHeader: {
    padding: "1.25rem 2rem",
    fontSize: "1rem",
    fontWeight: 500,
    background: "rgba(var(--primary),0.3)",
    transition: "all 250ms ease",
  },
  cardContent: {
    padding: "1.5rem 2rem",
  },
  largeText: {
    textAlign: "right",
    fontSize: "8rem",
    fontWeight: 400,
    lineHeight: 1,
    marginTop: "1.5rem",
    color: "rgba(var(--primary),0.1)",
    transition: "all 250ms ease",
  },
}));

interface step {
    title:string;
    description:string;
    link:string;
}

const WorkProcess = () => {
  const classes = useStyles();

  const history = useHistory();
  
  const steps : Array<step> = [
    {title:"Sign-up to create your dataspace", description:"Create your account free of charge. You will then be able to create your first dataspace.", link:"https://trustrelay.io/signup"},
    {title:"Invite your peers to connect and query",description:"Connect to the data you need whenever, wherever, with the help of a data sharing agreement.", link:"https://trustrelay.io/signup"},
    {title:"Get better insights", description:"Create better insights with more trusted data, start with purpose, share responsibly.", link:"https://trustrelay.io/data-with-purpose"},
  ];

  return (
    <section className={clsx("section", classes.sectionMargin)} id="howtostart">
      <div className="container">
        <div>
          <h1 className="font-normal text-44 mt-0">How to start</h1>
          <p className="max-w-400 mb-16">
            Sharing data is not an easy process but we can help you lower the barriers in 3 simple steps.
          </p>
        </div>

        <Grid container spacing={3}>
          {steps.map((item, ind) => (
            <Grid key={ind} item sm={4} xs={12}>
              <Card elevation={3} className={clsx(classes.card, "card")}>
                <div className={classes.cardHeader}>{item.title}</div>
                <div className={classes.cardContent}>
                  <p className="mb-8 mt-0">
                  {item.description}
                  </p>
                  {/* <Button variant="text" color="primary" onClick={()=>history.push(item.link)}>
                    CLICK TO VIEW MORE
                  </Button> */}
                  <div className={classes.largeText}>{ind + 1}</div>
                </div>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default WorkProcess;
