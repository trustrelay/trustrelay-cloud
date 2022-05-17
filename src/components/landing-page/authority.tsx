import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";
import { BatteryChargingFull, LinkedCamera } from "@material-ui/icons"; 
import logo from '../../assets/images/logo_black.png';
import BeachAccessIcon from '@material-ui/icons/BeachAccess';
import DeviceHubIcon from '@material-ui/icons/DeviceHub';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import AnnouncementIcon from '@material-ui/icons/Announcement';
import NaturePeopleIcon from '@material-ui/icons/NaturePeople';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  iconWrapper: {
    "&:after": {
      content: '" "',
      position: "absolute",
      top: -12,
      left: -4,
      height: 88,
      width: 88,
      background: "rgba(var(--primary), 0.1)",
      transform: "rotate(30deg)",
      borderRadius: 12,
      zIndex: -1,
    },
  },
}));

const Authority = () => {
  const classes = useStyles();
  const featureList = [
    {
      icon: NaturePeopleIcon,
      title: "Trustee",
      description:"Its responsibility is to look out for the interests of the beneficiaries."
    },
    {
      icon: HowToVoteIcon,
      title: "Conciliatory",
      description:"Encourages work for the benefit of the commons."
    },
    {
      icon: DeviceHubIcon,
      title: "Facilitator",
      description:"Executes the plan into the platform."
    }, 
    {
      icon: AnnouncementIcon,
      title: "Outsider",
      description:"Provides outsider perspective with expertise on data management."
    }, 
  ];

  return (
    <section className="section" id="features1">
      <div className="container">
        <div className="max-w-400 mb-24 mx-auto text-center">
          <h1 className="mt-0 font-normal text-44 text-primary">
            What's a data fiduciary?
          </h1>
          <p>
          The fiduciary has a responsibility to look out for the interests of the beneficiary, much like your doctor has a fiduciary responsibility to do what is best for you. <br/>
          That also means that the trustee is not allowed to have a profit motive or, more generally, a conflicting interest in the data or data rights under its custody.
          </p>
        </div>
        <Grid container spacing={8}>
          {featureList.map((item, ind) => (
            <Grid key={ind} item md={3} sm={6} xs={12}>
              <div className="text-center">
                <div
                  className={clsx(
                    "mb-8 inline-block relative",
                    classes.iconWrapper
                  )}
                >
                  <item.icon fontSize="large" color="primary" />
                </div>
                <h5 className="font-medium text-primary mt-0">{item.title}</h5>
                <p className="text-center">
                  {item.description}
                </p>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default Authority;
