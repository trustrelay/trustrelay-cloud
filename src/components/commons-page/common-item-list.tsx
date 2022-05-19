import { useEffect } from "react";
import { Grid } from '@mui/material';
import { Common } from "../../api/models/models";
import { useAccount, useMsal } from "@azure/msal-react";

import ArchiveIcon from '@mui/icons-material/Archive';
import CommonSummaryItem from "./common-summary-item"; 

const CommonList = ({
    commons,
    agent,
    currentUser,
    dataspace,
    jwt
}: {
    commons: Array<Common>;
    agent: string;
    currentUser: string;
    dataspace: string,
    jwt: string;
}) => {

    const { instance, accounts, inProgress } = useMsal();
    

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