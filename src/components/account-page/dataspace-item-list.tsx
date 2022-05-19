import { useEffect } from "react";
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { DataspaceInfo } from "../../api/models/models"; 
import { useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";
import { formatDate } from "../../api/utils";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';



const DataspaceList = ({
    dataspaces,
    jwt
}: {
    dataspaces: Array<DataspaceInfo>,
    jwt: string
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

 
    const go = (dataspace: string) => {
        navigate(`/dataspaces/${dataspace}`)
    }



    const renderDataspace = (dataspace: DataspaceInfo) => {

        return <TableRow onClick={() => go(dataspace.id)} key={`dataspace_${dataspace.id}`} style={{ cursor: "pointer" }}>

            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {dataspace.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {dataspace.admin1}
                </Typography>
            </TableCell>
           
            <TableCell >
                <Typography variant="body1" textAlign="left">
                    {formatDate(dataspace.timestamp)}
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
                        <TableCell variant="head" align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.name')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.contact')}</Typography></TableCell>
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.created')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {dataspaces.map((dataspace) => renderDataspace(dataspace))}
                </TableBody>
            </Table>

        </TableContainer>

    )
}

export default DataspaceList;