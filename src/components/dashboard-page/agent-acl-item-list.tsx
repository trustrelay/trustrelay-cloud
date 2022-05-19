import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'; 
import { Acl } from "../../api/models/models"

import BlockIcon from '@mui/icons-material/Block';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useTranslation } from "react-i18next";

const AgentAclList = (
    {
        dataspace,
        acls
    }: {
        dataspace:string;
        acls: Array<Acl>;
    }) => {

    const { t } = useTranslation();

    const getAllowIcon = (allow: boolean) => {
        if (allow) {
            return <CheckCircleOutlineIcon style={{ color: "green" }} />
        } else {
            return <BlockIcon style={{ color: "#aaaaaa" }} />
        }
    }



    return (
        <TableContainer >
            <Table size="small" aria-label="access control table">
                <TableHead>
                <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}> 
                        <TableCell><Typography variant="body1" textAlign="left">{t('labels.common')}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="body1" textAlign="left">{t('labels.allowRead')}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="body1" textAlign="left">{t('labels.allowWrite')}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="body1" textAlign="left">{t('labels.allowCopy')}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="body1" textAlign="left">{t('labels.allowScript')}</Typography></TableCell>
                        <TableCell align="left"><Typography variant="body1" textAlign="left">{t('labels.allowExport')}</Typography></TableCell>

                    </TableRow>
                </TableHead>
                <TableBody>
                    {acls.map((aclItem, index) => (
                        <TableRow key={`acl_${index}`} style={{cursor:"pointer"}}>
                            <TableCell component="th" scope="row">
                                {/* <Link to={`/dataspaces/${dataspace}/commons/${aclItem.common}`}>{aclItem.commonName}</Link> */}
                                {aclItem.commonName}
                            </TableCell>
                            <TableCell align="left">{getAllowIcon(aclItem.allowRead)}</TableCell>
                            <TableCell align="left">{getAllowIcon(aclItem.allowWrite)}</TableCell>
                            <TableCell align="left">{getAllowIcon(aclItem.allowCopy)}</TableCell>
                            <TableCell align="left">{getAllowIcon(aclItem.allowScript)}</TableCell>
                            <TableCell align="left">{getAllowIcon(aclItem.allowExport)}</TableCell>

                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default AgentAclList;