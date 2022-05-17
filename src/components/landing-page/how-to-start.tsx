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
import MemoryIcon from '@material-ui/icons/Memory';
import TimelineIcon from '@material-ui/icons/Timeline';
import ContactMailIcon from '@material-ui/icons/ContactMail';
import AddIcCallIcon from '@material-ui/icons/AddIcCall';
import DeveloperModeIcon from '@material-ui/icons/DeveloperMode';
import SystemUpdateAltIcon from '@material-ui/icons/SystemUpdateAlt';
import VerticalSplitIcon from '@material-ui/icons/VerticalSplit';
import CreateIcon from '@material-ui/icons/Create';
import GroupWorkIcon from '@material-ui/icons/GroupWork';

const useStyles = makeStyles(({ palette, ...theme }) => ({
  sectionMargin:{
marginTop:"8px"
  },
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

const HowToStart = () => {
  const css = useStyles();
  const featureList = [
    {
      icon: CreateIcon,
      title: "1. Register",
      description:"Create your account free of charge."
    }, 
    {
      icon: ContactMailIcon,
      title: "2. Invite your peers",
      description:"Choose the right partners to share data with."
    },
    {
      icon: SystemUpdateAltIcon,
      title: "3. Connect and query",
      description:"Connect the data sources to/from peers."
    },  
    {
      icon: DeveloperModeIcon,
      title: "4. Build awesome apps",
      description:"with trusted and enriched data."
    }, 
  ];
 
  return (
    <section className={clsx("section", css.sectionMargin)} id="howtostart">
      <div className="container">
        <div className="max-w-400 mb-24 mx-auto text-center">
          <h1 className="mt-0 font-normal text-44 text-primary">
            How to start sharing data?
          </h1>
          {/* <p>
          The fiduciary has a responsibility to look out for the interests of the beneficiary, much like your doctor has a fiduciary responsibility to do what is best for you. <br/>
          That also means that the trustee is not allowed to have a profit motive or, more generally, a conflicting interest in the data or data rights under its custody.
          </p> */}
        </div>
        <Grid container spacing={1}>
          {featureList.map((item, ind) => (
            <Grid key={ind} item xl={3} lg={3} md={4} sm={5} xs={5}>
              <div className="text-center">
                <div
                  className={clsx(
                    "inline-block relative",
                    css.iconWrapper
                  )}
                > 
                  <item.icon fontSize="large" style={{ color: "#0090BF" }}/>
                </div>
                <h2 className="text-primary">{item.title}</h2>
                <h4 className="text-center">
                  {item.description}
                </h4>
              </div>
            </Grid>
          ))}
        </Grid>
      </div>
    </section>
  );
};

export default HowToStart;
