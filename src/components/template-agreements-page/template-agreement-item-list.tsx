import React, { useEffect, useState } from "react";
import { Grid, IconButton, makeStyles  } from "@material-ui/core";
import {  TemplateAgreementSummary } from "../../api/models/models"; 
import BallotIcon from '@material-ui/icons/Ballot';
import TemplateAgreementSummaryItem from "./template-agreement-summary-item";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
     
})
)


const TemplateAgreementList = ({ 
    templateAgreements 
}: { 
    templateAgreements: Array<TemplateAgreementSummary> 
}) => {

    const { t } = useTranslation();


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