import React, { useEffect, useState } from 'react';
import { Typography, makeStyles, Button, TextField, InputLabel, Grid, FormControlLabel, Checkbox } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import ToggleFeedback from './toggle-feedback';


const FeedbackDrawer = ({
  open,
  handleClose,
  onAction
}: {

  open: boolean;
  handleClose: () => void;
  onAction: (satisfactionLevel:string, textFeedback:string, canEmailYou: boolean) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();


  const [feedbackText, setFeedbackText] = useState('');

  const [satisfaction, setSatisfaction] = useState('');

  const [canEmailYou, setCanEmailYou] = useState(false);

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onAction(satisfaction, feedbackText, canEmailYou);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleSatisfactionChange = (newValue: string) => {
    setSatisfaction(newValue);
  }

  const handleCanEmailYouChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCanEmailYou(event.target.checked);
  }

  const handleTextFeedbackChange = (e: any) => {
    setFeedbackText(e.target.value)
  }


  const disableContinueButton = () => {
    return (satisfaction.length <= 0)

  }


  const useStyles = makeStyles({
    root: {
      width: '350px',
      flexGrow: 1,
    },
    topnav: {
      height: "3em",
      paddingLeft: "0em"
    },
    innernav: {
      paddingTop: "0",
      paddingBottom: "0",
      marginTop: "0",
      marginBottom: "0"
    },
    drawerContainer: {
      width: "350px",
      padding: "0em 1em 1em 1em",
      backgroundColor: "transparent"
    },

  })


  const css = useStyles();



  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.sendFeedback')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>
          <Grid container rowGap={1}>
            <Grid item>
              <Typography variant="body1">{t('messages.thankYouFeedback')}</Typography>
            </Grid>
            <Grid item>
              <ToggleFeedback onChange={handleSatisfactionChange} />
            </Grid>
            <Grid item >
              <InputLabel htmlFor="textfeedback">{t('messages.tellUsAboutYourExperience')}</InputLabel>
              <TextField
                fullWidth
                style={{ minWidth: "300px" }}
                id="textfeedback"
                multiline
                rows={4}
                onChange={handleTextFeedbackChange}
              />
            </Grid>
            <Grid item>
            <FormControlLabel
            control={
              <Checkbox
                checked={canEmailYou}
                onChange={handleCanEmailYouChange}
                name="can-email-you"
                color="primary"
              />
            }
            label="We can email you about your feedback"
          />
              </Grid>
            <Grid item>

              <Button onClick={handleCancel} color="primary">
                {t('labels.cancel')}
              </Button>
              <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

                {t('labels.sendFeedback')}

              </Button>
            </Grid>
          </Grid>


        </form>
      </div>
    </Drawer>
  )
}

export default FeedbackDrawer;