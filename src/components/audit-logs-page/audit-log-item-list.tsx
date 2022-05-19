import {  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AuditLogEntry } from "../../api/models/models"; 
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



const AuditLogList = ({
    logs,
    setSelectedLogEntry,
    toggleLogDetailsDrawer,
    jwt
}: {
    logs: Array<AuditLogEntry>;
    setSelectedLogEntry:(entry:AuditLogEntry)=>void;
    toggleLogDetailsDrawer:()=>void;
    jwt: string;
}) => {
    const { t } = useTranslation();


    const handleSelection = (entry:AuditLogEntry) => {
        toggleLogDetailsDrawer();
        setSelectedLogEntry(entry);
    }


    const renderAuditLogEntry = (entry: AuditLogEntry) => {

        return <TableRow onClick={()=>handleSelection(entry)} key={`entry_${entry.timestamp}`} style={{ cursor: "pointer" }}>

            <TableCell>
                <Typography variant="body1" textAlign="left">
                {formatDateTime(entry.timestamp)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {entry.activityType}
                </Typography>
            </TableCell>
           
            <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.category}
                </Typography>
            </TableCell>

            <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.target}
                </Typography>
            </TableCell>
 
  

            <TableCell align="right">
                <IconButton size="small">
                    <MoreHorizIcon />
                </IconButton>
            </TableCell>
        </TableRow>

    }

    return (

        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                        <TableCell variant="head" align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.timestamp')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.activityType')}</Typography></TableCell>
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.category')}</Typography></TableCell>
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.target')}</Typography></TableCell>
                       
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {logs.map((entry) => renderAuditLogEntry(entry))}
                </TableBody>
            </Table>

        </TableContainer>

    )
}

export default AuditLogList;