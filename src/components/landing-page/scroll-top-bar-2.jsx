import React, { useState, useEffect } from "react";
import { debounce, classList } from "../../utils";
import Icon from "@material-ui/core/Icon";
import IconButton from "@material-ui/core/IconButton";
import Button from "@material-ui/core/Button"; 
import { NavLink } from "react-router-dom";
import ScrollTo from "../ScrollTo";
import logo from '../../assets/illustrations/TrustRelayLogoMini.svg'
import PersonIcon from '@material-ui/icons/Person';
import MenuIcon from '@material-ui/icons/Menu';
import CloseIcon from '@material-ui/icons/Close';
import {   Typography, Link } from "@material-ui/core";

const ScrollTopBar2 = () => {
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
    id="scrolltopbar"
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
        
        <div className="m-auto" />
        
        <Button variant="contained">Sign up</Button>
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

export default ScrollTopBar2;
