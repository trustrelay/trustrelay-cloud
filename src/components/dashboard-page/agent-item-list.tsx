import React, { useEffect, useState } from "react";
import { Grid, makeStyles } from "@material-ui/core";
import { Agent } from "../../api/models/models";
import { useMsal, useAccount } from '@azure/msal-react';
import SettingsInputAntennaIcon from '@material-ui/icons/SettingsInputAntenna';
import AgentSummaryItem from "./agent-summary-item";

const useStyles = makeStyles((theme) => ({
    
})
)


const AgentList = ({
    agents
}: {
    agents: Array<Agent>
}) => {
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});

    useEffect(() => {
      
    }, [])

 

    const renderAgent = (agent: Agent) => {
      
            return <Grid item 
            key={`agent_${agent.id}`}  
            xs={12} sm={5} md={4} lg={3} xl={3}>
                <AgentSummaryItem 
                agent={agent} 
                avatarIcon={<SettingsInputAntennaIcon />} 
                 />
                </Grid>
        
    }

    return (

        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2}>

            {agents.map((agent) =>   renderAgent(agent))}
        </Grid>

    )
}

export default AgentList;