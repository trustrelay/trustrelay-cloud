import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import { useTranslation } from 'react-i18next';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, TimePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';

const useStyles = makeStyles({
  pad: {
    width: '1em',
  },
});

const UntilDateSelect = (
  { until, onChange }: { until: Date; onChange: any }) => {
  const { t } = useTranslation();
  const css = useStyles();

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Grid item container rowGap={1} columnGap={1} sx={{display:"flex"}}>
        <Grid item>
        <DatePicker value={until} onChange={onChange} label={t('labels.time.untilDate')} />
        </Grid>
        <Grid item>
        <TimePicker value={until} onChange={onChange} label={t('labels.time.untilTime')} />
        </Grid>
        </Grid> 
      
    </MuiPickersUtilsProvider>
  );
};

export default UntilDateSelect;
