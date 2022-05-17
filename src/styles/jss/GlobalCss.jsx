import React from "react";
import { variableStyles } from "./_variables.js";
import { positioningStyles } from "./utilities/_positionings.js";
import { spacingStyles } from "./utilities/_spacing.js";
import { borderStyles } from "./utilities/_border.js";
// import { shadowStyles } from "./utilities/_shadows.js.txt";
// import { colorStyles } from "./utilities/_color.js.txt";
 import { typographyStyles } from "./utilities/_typography.js";
import { commonStyles } from "./utilities/_common.js";
// import { animationStyles } from "./utilities/_animations.js";
import { layoutStyles } from "./utilities/_layout.js";
import { landingStyles } from "./utilities/_landing.js";

const GlobalCss = ({ children }) => {
  variableStyles();
  positioningStyles();
  spacingStyles();
  borderStyles();
  // colorStyles();
  // shadowStyles();
   typographyStyles();
  commonStyles();
  // animationStyles();
  layoutStyles();
  landingStyles();

  return children;
};

export default GlobalCss;
