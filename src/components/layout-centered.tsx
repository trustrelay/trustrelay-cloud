import { ReactNode, useEffect } from 'react';
import { Box, makeStyles, useMediaQuery } from '@material-ui/core';


const useStyles = makeStyles({
  pageContainer: {
    marginTop: '0em',
    paddingTop:'4em', 
    width: "100%",
    height: "100%",
    // backgroundColor:"#ffffff", 
    // backgroundColor:"#f3f2ef", 

    display: 'flex',
    flexWrap: 'nowrap',
  },
  leftPadlgUp: { 
    flexGrow: 0,
    flexShrink: 1,
    padding:"0 0 0 20em"
  },
  leftPadmd: { 
    flexGrow: 0,
    flexShrink: 1,
    padding:"0 0 0 3em"
  },
  leftPadsmDown: { 
    flexGrow: 0,
    flexShrink: 1,
    padding:"0 0 0 0em"
  },
  rightPad: { 
    flexGrow: 0,
    flexShrink: 1,
    padding:"0 0em 0 0"
  },
  center: {
    padding: "0em 0em 0em 0em", 
    flexGrow: 1,
  }, 
   
});

const LayoutCentered = ({
  fullHeight,
  children,
}: {
  fullHeight?: boolean;
  children: ReactNode;
}) => {
  const css = useStyles();
  const smDown = !useMediaQuery('(min-width:600px)');
  const lgUp = useMediaQuery('(min-width:1000px)');

  const getLeftPageSize = () => {
    if(smDown) return css.leftPadsmDown;
    if (lgUp) return css.leftPadlgUp;
    return css.leftPadmd;
}


  useEffect(()=>{
  
  })

  return (
    <Box className={css.pageContainer}>
      <Box className={getLeftPageSize()}>&nbsp;</Box>
      <Box className={css.center}>
        {children}
      </Box>
      <Box className={css.rightPad}>&nbsp;</Box>
    </Box>
    
  );
};
export default LayoutCentered;
