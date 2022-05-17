import React, { useEffect } from "react";
import { Grid,  makeStyles } from "@material-ui/core";
import { Common } from "../../api/models/models";
import trustRelayService from '../../api/trustrelay-service'; 
import { useAccount, useMsal } from "@azure/msal-react";
import JoinCommonDialog from "./join-common-dialog"; 

import ArchiveIcon from '@material-ui/icons/Archive';
import CommonSummaryItem from "./common-summary-item";
import { useHistory } from "react-router";

const useStyles = makeStyles((theme) => ({

})
)


const CommonList = ({
    commons,
    agent,
    currentUser,
    dataspace,
    jwt
}: {
    commons: Array<Common>;
    agent: string;
    currentUser:string;
    dataspace: string,
    jwt: string;
}) => {

    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    const history = useHistory();

    useEffect(() => {
      


    }, [agent])

    

     

    const renderCommon = (common: Common) => {

        return <Grid item key={`common_${common.id}`} xl={3} lg={3} md={5} sm={5} xs={12} >

            <CommonSummaryItem
                avatarIcon={<ArchiveIcon />}
                currentUser={currentUser}
                common={common}
                onJoin={() => alert('tried to join!')}
            />
        </Grid>

    }

    return (

        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2}>
            {commons.map((common) => renderCommon(common))}
        </Grid>

    )
}

export default CommonList;