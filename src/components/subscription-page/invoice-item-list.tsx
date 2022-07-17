import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {  Invoice } from "../../api/models/models";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../api/utils"; 



const InvoiceList = ({
    invoices,
    
}: {
    invoices: Array<Invoice>,
   
}) => {
    const { t } = useTranslation(); 
  

    const renderInvoice = (invoice: Invoice) => {

        return <TableRow   key={`invoice_${invoice.id}`} style={{ cursor: "pointer" }}>
 
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {invoice.id}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {invoice.amount}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {invoice.currency}
                </Typography>
            </TableCell>
            <TableCell >
                <Typography variant="body1" textAlign="left">
                    {formatDate(invoice.timestamp)}
                </Typography>
            </TableCell>
            
        </TableRow>

    }

    return (

        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}> 
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.id')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.amount')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.currency')}</Typography></TableCell> 
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.timestamp')}</Typography></TableCell>
                        
                    </TableRow>
                </TableHead>
                <TableBody>
                    {invoices.map((invoice) => renderInvoice(invoice))}
                </TableBody>
            </Table>

        </TableContainer>

    )
}

export default InvoiceList;