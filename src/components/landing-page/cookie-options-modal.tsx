import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, Switch, Typography } from '@material-ui/core';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const CookieOptionsModal = (
  {
    isOpen,
    onClose,
    onSubmit
  }: {
    isOpen: boolean;
    onClose: () => void;
    onSubmit:(strictlyNecessary:boolean, basicInteractions:boolean, experienceEnhancement:boolean, measurement:boolean)=>void;
  }) => {
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);

  const [choices, setChoices] = React.useState({
    strictlyNecessary: true,
    basicInteractions: false,
    experienceEnhancement: false,
    measurement:false
  });

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChoices({ ...choices, [event.target.name]: event.target.checked });
  };

  const handleSubmit = () => {
    onSubmit(choices.strictlyNecessary, choices.basicInteractions, choices.experienceEnhancement, choices.measurement)
  }

  return (

    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >

      <div style={modalStyle} className={classes.paper} >

        <Grid container flexDirection="column">
          <Grid item>
            <Typography id="simple-modal-title" variant="h5">Customize your cookies</Typography>
          </Grid>
          <Grid item>
            <FormControl component="fieldset">
              {/* <FormLabel component="legend">Customize your cookie settings</FormLabel> */}
              <FormGroup>
                <FormControlLabel
                  control={<Switch checked={true}  name="strictlyNecessary" />}
                  label="Strictly necessary"
                />
                <FormControlLabel
                  control={<Switch checked={choices.basicInteractions} onChange={handleChange} name="basicInteractions" />}
                  label="Basic interactions"
                />
                <FormControlLabel
                  control={<Switch checked={choices.experienceEnhancement} onChange={handleChange} name="experienceEnhancement" />}
                  label="Experience enhancement"
                />
                  <FormControlLabel
                  control={<Switch checked={choices.measurement} onChange={handleChange} name="measurement" />}
                  label="Measurement"
                />
              </FormGroup>
              <FormHelperText>Click submit to save your preferred settings.</FormHelperText>
            </FormControl>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleSubmit}>Submit</Button>
          </Grid>
        </Grid>
      </div>


    </Modal>
  );
}

export default CookieOptionsModal;