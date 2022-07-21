import {  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AuditLogEntry, CommonSchema } from "../../api/models/models"; 
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



const SchemaList = ({
    schemas,
    setSelectedSchemaEntry,
    toggleSchemaDetailsDrawer,
    jwt
}: {
    schemas: Array<CommonSchema>;
    setSelectedSchemaEntry:(entry:CommonSchema)=>void;
    toggleSchemaDetailsDrawer:()=>void;
    jwt: string;
}) => {
    const { t } = useTranslation();


    const handleSelection = (entry:CommonSchema) => {
        toggleSchemaDetailsDrawer();
        setSelectedSchemaEntry(entry);
    }


    const renderSchemaEntry = (entry: CommonSchema) => {

        return <TableRow onClick={()=>handleSelection(entry)} key={`entry_${entry.timestamp}`} style={{ cursor: "pointer" }}>

           
           
            <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.id}
                </Typography>
            </TableCell>

            <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.url}
                </Typography>
            </TableCell>
 
            <TableCell>
                <Typography variant="body1" textAlign="left">
                {formatDateTime(entry.timestamp)}
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
                        <TableCell variant="head" align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.id')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.url')}</Typography></TableCell>
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.timestamp')}</Typography></TableCell>
                         
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {schemas.map((entry) => renderSchemaEntry(entry))}
                </TableBody>
            </Table>

        </TableContainer>

    )
}

export default SchemaList;