import  { useEffect } from "react";
import { Grid  } from '@mui/material';
import {  TemplateAgreementSummary } from "../../api/models/models"; 
import BallotIcon from '@mui/icons-material/Ballot';
import TemplateAgreementSummaryItem from "./template-agreement-summary-item";


const TemplateAgreementList = ({ 
    templateAgreements 
}: { 
    templateAgreements: Array<TemplateAgreementSummary> 
}) => {

    useEffect(() => {
      


    }, [templateAgreements])



    const renderTemplateAgreement = (templateAgreement: TemplateAgreementSummary) => {

        return <Grid item
            key={`selectable_${templateAgreement.id}`}  xl={3} lg={3} md={5} sm={5} xs={12} >
            <TemplateAgreementSummaryItem
                avatarIcon={<BallotIcon />}
                templateAgreement={templateAgreement}
            />
        </Grid>

    }

    return (

        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} spacing={2}>
            {templateAgreements.map((agreement) => renderTemplateAgreement(agreement))}

        </Grid>
    )
}

export default TemplateAgreementList;