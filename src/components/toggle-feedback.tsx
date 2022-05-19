import {  ToggleButton, ToggleButtonGroup, Tooltip, Typography } from '@mui/material';
import { useState } from 'react';
import SentimentVerySatisfiedIcon from '@mui/icons-material/SentimentVerySatisfied';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
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