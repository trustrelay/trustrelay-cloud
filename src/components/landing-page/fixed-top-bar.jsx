import React, { useState, useEffect } from "react";
import { debounce, classList } from "../../utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import { NavLink, Link } from "react-router-dom";
import ScrollTo from "../ScrollTo";
import logo from '../../assets/illustrations/TrustRelayLogoMini.svg'
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {   Typography,   makeStyles } from "@material-ui/core";

const useStyles = makeStyles(({ palette, ...theme }) => ({
  topLink: {
      color: palette.primary.main,
      cursor:"pointer"
  }

})
);

const FixedTopBar = () => {

  

const css = useStyles();
  const [isTop, setIsTop] = useState(true);
  const [isClosed, setIsClosed] = useState(true);

  let scrollableElement = document.querySelector(".scrollable-content");
  if (!scrollableElement) scrollableElement = window;

  let handleScrollRef = null;
  let toggleIcon = isClosed ? <MenuIcon/>: <CloseIcon/>;

  const handleScroll = () => {
    return debounce(({ target: { scrollTop } }) => {
      let isCurrentTop = scrollTop < 100 || scrollableElement.scrollY < 100;
      setIsTop(isCurrentTop);
    }, 20);
  };

  handleScrollRef = handleScroll();

  const close = () => {
    setIsClosed(false);
  };

  useEffect(() => {
    if (scrollableElement) {
      scrollableElement.addEventListener("scroll", handleScrollRef);
    }

    return () => {
      if (scrollableElement) {
        scrollableElement.removeEventListener("scroll", handleScrollRef);
      }
    };
  }, [scrollableElement, handleScrollRef]);

  return (
    <section
    id='fixedtopmenu'
      className={classList({
        header: true,
        "header-fixed": !isTop,
        closed: isClosed,
      })}
    >
      <div className="container header-container">
        <div className="brand">
           
          <img src={logo} alt="" />
          <Typography variant="body1">TrustRelay</Typography>
          
        </div>
        <ul className="navigation">
        
          <li>
          <Link className={css.topLink} to="/#intro">
              Intro
              </Link>
          </li>
          <li>
          <Link className={css.topLink} to="/#who">
            Who could benefit?
            </Link>
          </li>

          <li>
          <Link className={css.topLink} to="/#empathy">
              Challenges we solve
              </Link>
          </li>
        
          <li>
          <Link className={css.topLink} to="/#why">
              Why TrustRelay?
              </Link>
          </li>
          <li>
          <Link className={css.topLink} to="/#howtostart">
              How to start?
              </Link>
          </li>
          <li>
             <Link className={css.topLink} to="/#contact">
             Contact us
             </Link>
              
            
          </li>
        </ul>
        <div className="m-auto" />
        {/* <ul className="navigation">
          <li>
            <a href="/dashboard">
              <PersonIcon/> Sign in
            </a>
          </li>
        </ul> */}
        
        <IconButton
          className="header__toggle"
          onClick={() => {
            setIsClosed(!isClosed);
          }}
        >
          <Icon>{toggleIcon}</Icon>
          
        </IconButton>
       
      </div>
    </section>
  );
};

export default FixedTopBar;
