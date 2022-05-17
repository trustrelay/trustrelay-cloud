import { Chip, Grid } from "@material-ui/core";
import TimerIcon from '@material-ui/icons/Timer';
import ViewWeekIcon from '@material-ui/icons/ViewWeek';
import ReorderIcon from '@material-ui/icons/Reorder';
import { DrillQueryResponse } from "../../api/models/models";
import { useTranslation } from "react-i18next";

const QueryStats = ({
    drillQueryResponse,
}:{
    drillQueryResponse: DrillQueryResponse;
}) => {

    const { t } = useTranslation();


    return (
        <Grid item container direction="row" justifyContent="flex-end"  spacing={1} xs={12} sm={12} md={12} lg={12} xl={12}>
         <Grid item>
          {(drillQueryResponse && drillQueryResponse.rows) ?  
                <Chip color="default" icon={<ReorderIcon />} label={`${drillQueryResponse.rows.length} ${t('labels.rows')}`} />
             :  <Chip color="default" icon={<ReorderIcon />} label={`0 ${t('labels.rows')}`} />}
           </Grid>
            <Grid item>
            {(drillQueryResponse && drillQueryResponse.columns) ?  
                <Chip color="default" icon={<ViewWeekIcon />} label={`${drillQueryResponse.columns.length} ${t('labels.columns')}`} />
                :   <Chip color="default" icon={<ViewWeekIcon />} label={`0 ${t('labels.columns')}`} />}
            </Grid>
            {/* <Grid item>
                <Chip color="default" icon={<TimerIcon />} label=" secs" />
            </Grid> */}
        </Grid>
    )
}

export default QueryStats;