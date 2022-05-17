import { func, string } from 'prop-types';
import { FormControlLabel, Switch, ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@material-ui/core';
import { useState } from 'react';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import { useTranslation } from 'react-i18next';

const ToggleFeedback = (
    { 
        onChange
    }: {
      onChange: (newValue:string) => void;
    }) => {
      const { t } = useTranslation();
       const [selected, setSelected] = useState<string>('');

  const handleChange = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
   setSelected(newSelection);
    onChange(newSelection)
  };
 
    return ( 
           
      <>

<Typography variant="body1">{t('messages.areYouSatisfied')}</Typography>
   
        <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="theme"
    >
      <ToggleButton value="very-satisfied" size="large" aria-label="yes">
      <Tooltip title="yes">
        <SentimentVerySatisfiedIcon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="very-dissatisfied" size="large" aria-label="no">
      <Tooltip title="no">
        <SentimentVeryDissatisfiedIcon />
        </Tooltip>
      </ToggleButton> 
    </ToggleButtonGroup>
    </>
    );
}; 

export default ToggleFeedback;