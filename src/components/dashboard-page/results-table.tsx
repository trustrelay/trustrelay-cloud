import { Accordion, AccordionDetails, AccordionSummary, AppBar, Grid, IconButton, Tab, Tabs, Theme, Typography } from '@mui/material';
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { QueryHistoryEntry } from "../../api/models/models";
import TabPanel from "../tab-panel";
import { DataGridPremium, GridColDef, GridRowsProp, GridToolbar } from '@mui/x-data-grid-premium'; 
import { formatDateTime } from "../../api/utils";
import Prism from 'prismjs'
import "prismjs/components/prism-sql";
import 'prismjs/components/prism-css';
import 'prismjs/themes/prism-funky.css';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileCopyIcon from '@mui/icons-material/FileCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    tableColor: {
        // color: "#0090BF"
    },
    code: {
        fontSize: theme.typography.pxToRem(12),
        'overflow-x': 'auto',
        'white-space': 'pre-wrap',
        // 'white-space': '-moz-pre-wrap',
        // 'white-space': '-pre-wrap',
        // 'white-space': '-o-pre-wrap',
        'word-wrap': 'break-word',
    },
}));

function sortEntry() {
    return function (a: QueryHistoryEntry, b: QueryHistoryEntry) {
        if (a.timestamp > b.timestamp) {
            return -1;
        } else if (a.timestamp < b.timestamp) {
            return 1;
        }
        return 0;
    };
}

const ResultsTable = ({
    rows,
    columns,
    queryHistory
}: {
    rows: any;
    columns: Array<GridColDef>;
    queryHistory: Array<QueryHistoryEntry>;
}) => {



    const { t } = useTranslation();
    const css = useStyles();

    const [value, setValue] = useState(0);
    const handleTabChange = (event: any, newValue: number) => {
        setValue(newValue);
    };

    const [expanded, setExpanded] = useState<string | false>(false);

    const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };


    function a11yProps(index: number) {
        return {
            id: `simple-tab-${index}`,
            'aria-controls': `simple-tabpanel-${index}`,
        };
    }

    useEffect(() => {

        Prism.highlightAll();

    })

    return (
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
            <AppBar position="static">
                <Tabs
                    variant="standard"
                    scrollButtons={true}
                    value={value}
                    onChange={handleTabChange}
                    aria-label="query tabs">
                    <Tab label={t('labels.results')} {...a11yProps(0)} />
                    <Tab label={t('labels.queryHistory')} {...a11yProps(1)} />
                </Tabs>
            </AppBar>



            <TabPanel id="results" value={value} index={0}>
                <Grid item container spacing={2} rowGap={1}>
                    <Grid item container>
                        &nbsp;
                    </Grid>
                    <Grid item xl={12} lg={12} md={12} sm={12} xs={12}>

                        <div style={{ height: '500px', width: '100%' }}>
                            <DataGridPremium className={css.tableColor} rows={rows} columns={columns} components={{ Toolbar: GridToolbar }}  />
                        </div>
                    </Grid>
                </Grid>
            </TabPanel>



            <TabPanel id="history" value={value} index={1}>
                <Grid item container rowGap={1} >
                    <Grid item container>
                        &nbsp;
                    </Grid>
                    <Grid container item direction="column" xl={12} lg={12} md={12} sm={12} xs={12} columnGap={1}>
                        <div className={css.root}>
                            {(queryHistory && queryHistory.length > 0) ? queryHistory.sort(sortEntry()).map((item, index) =>

                                <Accordion key={`accordion_${index}`} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}>
                                    <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1bh-content"
                                        id="panel1bh-header"
                                    >
                                        <Typography className={css.heading}>{index + 1}</Typography>
                                        <Typography className={css.secondaryHeading}>{formatDateTime(item.timestamp)}</Typography>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                        <CopyToClipboard text={item.query}>
                                            <IconButton size="small">
                                                <FileCopyIcon />
                                            </IconButton>
                                        </CopyToClipboard>
                                        <pre className={css.code}>{item.query}</pre>
                                    </AccordionDetails>
                                </Accordion>

                            ) : <></>}
                        </div>
                    </Grid>

                </Grid>
            </TabPanel>

        </Grid>)
}

export default ResultsTable;