import { Grid, TextField, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { DatePicker, TimePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
  pad: {
    width: '1em',
  },
}));

const UntilDateSelect = (
  { until, onChange }: { until: Date; onChange: any }) => {
  const { t } = useTranslation();
  const css = useStyles();

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Grid item container rowGap={1} columnGap={1} sx={{ display: "flex" }}>
        <Grid item>
          <DatePicker value={until} onChange={onChange} label={t('labels.time.untilDate')} renderInput={props => <TextField label={t('labels.time.untilDate')} helperText={t('labels.time.untilDate')} />} />
        </Grid>
        <Grid item>
          <TimePicker value={until} onChange={onChange} label={t('labels.time.untilTime')} renderInput={props => <TextField label={t('labels.time.untilTime')} helperText={t('labels.time.untilTime')} />} />
        </Grid>
      </Grid>

    </LocalizationProvider>
  );
};

export default UntilDateSelect;
