import {  IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { AuditLogEntry, CommonSchema } from "../../api/models/models"; 
import { useTranslation } from "react-i18next";
import { formatDateTime } from "../../api/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import SchemaEllipsisMenu from './schema-ellipsis-menu';



const SchemaList = ({
    schemas,
    setSelectedSchemaEntry,
    toggleSchemaDetailsDrawer,
    toggleDeleteSchemaDrawer,
    jwt
}: {
    schemas: Array<CommonSchema>;
    setSelectedSchemaEntry:(entry:CommonSchema)=>void;
    toggleSchemaDetailsDrawer:()=>void;
    toggleDeleteSchemaDrawer:()=>void;
    jwt: string;
}) => {
    const { t } = useTranslation();


    const handleClickValidateQuery = (entry:CommonSchema) => {
        toggleSchemaDetailsDrawer();
        setSelectedSchemaEntry(entry);
    }

    const handleClickDelete = (entry:CommonSchema) => {
        toggleDeleteSchemaDrawer();
        setSelectedSchemaEntry(entry);
    }


    const renderSchemaEntry = (entry: CommonSchema) => {

        return <TableRow onClick={()=>handleClickValidateQuery(entry)} key={`entry_${entry.timestamp}`} style={{ cursor: "pointer" }}>

           
           
            {/* <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.id}
                </Typography>
            </TableCell> */}

            <TableCell >
                <Typography variant="body1" textAlign="left">
                   {entry.name}
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
            <SchemaEllipsisMenu id={entry.id} onDelete={()=>handleClickDelete(entry)} onCheck={()=>handleClickValidateQuery(entry)} />
            </TableCell>
        </TableRow>

    }

    return (

        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                        {/* <TableCell variant="head" align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.id')}</Typography></TableCell> */}
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.name')}</Typography></TableCell>
                       
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