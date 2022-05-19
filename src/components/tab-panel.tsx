import React from 'react';
import { Box } from '@mui/material';

interface TabPanelProps {
    children?: React.ReactNode;
    index: any;
    value: any;
    id:string;
}

const TabPanel = (props: TabPanelProps) => {
    const { children, value, index, id } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={id}
            key={id}
            aria-labelledby={`simple-tab-${index}`}
        >
            {value === index && (<Box key={`tabPanelContent${id}`}>  {children}  </Box>)}
        </div>
    );
}

export default TabPanel;
