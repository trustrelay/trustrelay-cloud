import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { Common, CommonAgreementSummary, SignedAgreementSummary, Task } from "../../api/models/models";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useTranslation } from "react-i18next";
import AgreementEllipsisMenu from "./agreement-ellipsis-menu";

const SignedAgreementList = ({
    signedAgreements,
    onTerminate
}: {
    signedAgreements: Array<CommonAgreementSummary>; 
    onTerminate: (agreement: string) => void;
}) => {

    const { t } = useTranslation();

    
    return (
        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.id')}</Typography></TableCell> 
                       
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.name')}</Typography></TableCell> 
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.terminated')}</Typography></TableCell> 
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.terminatedBy')}</Typography></TableCell> 

                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.timestamp')}</Typography></TableCell>
                        
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(signedAgreements && signedAgreements.length > 0) ? signedAgreements.map((agreementItem) => <TableRow key={agreementItem.email} style={{ cursor: "pointer" }}>

                    <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {agreementItem.agreement}
                            </Typography>
                        </TableCell> 

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {agreementItem.email}
                            </Typography>
                        </TableCell> 

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {agreementItem.isTerminated.toString()} 
                            </Typography>
                        </TableCell> 

                        <TableCell>
                            <Typography variant="body1" textAlign="left">
                                {agreementItem.terminatedBy}
                            </Typography>
                        </TableCell> 
                       
                        <TableCell >
                            <Typography variant="body1" textAlign="left">
                                {formatDateTime(agreementItem.timestamp)}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            {(agreementItem.isTerminated) ? <></> : <AgreementEllipsisMenu id={agreementItem.agreement} onTerminate={onTerminate} />} 
                        </TableCell>
                    </TableRow>)

                        : <></>}
                </TableBody>
            </Table>

        </TableContainer>
    )
}

export default SignedAgreementList;