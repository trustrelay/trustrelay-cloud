import { makeStyles  } from '@mui/styles'; 

export const shadowStyles = makeStyles((theme) => ({
  "@global": {
    ...generateShadows(theme),
  },
}));

const generateShadows = (theme) => {
  let classList = {};

  theme.shadows.map((shadow, ind) => {
    classList[`.elevation-z${ind}`] = {
      boxShadow: `${shadow} !important`,
    };
  });

  return classList;
};
