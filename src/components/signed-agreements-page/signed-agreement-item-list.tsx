import React, { useEffect } from "react";
import { Grid, makeStyles, } from "@material-ui/core";
import { SignedAgreementSummary } from "../../api/models/models";
import { useAccount, useMsal } from "@azure/msal-react";

import LibraryAddCheckIcon from '@material-ui/icons/LibraryAddCheck';
import { useTranslation } from "react-i18next";
import SignedAgreementSummaryItem from "./signed-agreement-summary-item";


const useStyles = makeStyles((theme) => ({

})
)


const SignedAgreementList = ({
    dataspaceAgreements,
    dataspace
}: {
    dataspaceAgreements: Array<SignedAgreementSummary>
    dataspace?: string
}) => {
    const { t } = useTranslation();
    const { instance, accounts, inProgress } = useMsal();
    const account = useAccount(accounts[0] || {});



    useEffect(() => {
         
    }, [])

    const renderDataspaceAgreement = (agreement: SignedAgreementSummary) => {

        return <Grid item key={`agreement_${agreement.id}`} xl={3} lg={3} md={4} sm={5} xs={12}>
            <SignedAgreementSummaryItem
                avatarIcon={<LibraryAddCheckIcon />}
                signedAgreement={agreement}
            />
        </Grid>

    }

    return (
        <Grid container item xl={12} lg={12} md={12} sm={12} xs={12} rowGap={1} columnGap={1}>
            {dataspaceAgreements.map((agreement) => renderDataspaceAgreement(agreement))}
        </Grid>
    )
}

export default SignedAgreementList;