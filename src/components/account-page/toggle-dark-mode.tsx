import { func, string } from 'prop-types';
import { FormControlLabel, Switch, ToggleButton, ToggleButtonGroup, Tooltip } from '@material-ui/core';
import { useState } from 'react';
import Brightness2Icon from '@material-ui/icons/Brightness2';
import Brightness7Icon from '@material-ui/icons/Brightness7';
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
        // <FormControlLabel
        //     control={
        //         <Switch
        //             checked={theme === 'dark'}
        //             onChange={() => toggleTheme()}
        //             name="darkmode"
        //             color="primary"
        //         />
        //     }
        //     label="Dark mode"
        // />
           
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

// ToggleDarkMode.propTypes = {
//     theme: string.isRequired,
//     toggleTheme: func.isRequired,
// }

export default ToggleDarkMode;