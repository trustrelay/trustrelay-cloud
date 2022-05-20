import { ToggleButton, ToggleButtonGroup, Tooltip } from '@mui/material';
import { useState } from 'react';
import Brightness2Icon from '@mui/icons-material/Brightness2';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ToggleDarkMode = (
  {
    theme,
    toggleTheme
  }: {
    theme: string;
    toggleTheme: () => void;
  }) => {

  const [selected, setSelected] = useState<string>(theme);

  const handleChange = (event: React.MouseEvent<HTMLElement>, newSelection: string) => {
    
    setSelected(newSelection);
    toggleTheme()
  };

  return (


    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleChange}
      aria-label="theme"
    >
      <ToggleButton value="light" size="large" aria-label="light">
        <Tooltip title="light">
          <Brightness7Icon />
        </Tooltip>
      </ToggleButton>
      <ToggleButton value="dark" size="large" aria-label="dark">
        <Tooltip title="dark">
          <Brightness2Icon />
        </Tooltip>
      </ToggleButton>
    </ToggleButtonGroup>

  );
};


export default ToggleDarkMode;