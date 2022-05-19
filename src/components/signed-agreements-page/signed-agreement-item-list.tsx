import { Grid, } from '@mui/material';
import { SignedAgreementSummary } from "../../api/models/models";
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import SignedAgreementSummaryItem from "./signed-agreement-summary-item";



const SignedAgreementList = ({
    dataspaceAgreements,
    dataspace
}: {
    dataspaceAgreements: Array<SignedAgreementSummary>
    dataspace?: string
}) => {



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