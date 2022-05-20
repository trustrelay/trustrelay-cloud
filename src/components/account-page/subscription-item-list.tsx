import {  Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import {  Subscription } from "../../api/models/models";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../api/utils";



const SubscriptionList = ({
    subscriptions,
    jwt
}: {
    subscriptions: Array<Subscription>,
    jwt: string
}) => {
    const { t } = useTranslation();
    const navigate = useNavigate();

 
 
    const go = (subscription: string) => {
        navigate(`/settings/subscriptions/${subscription}`)
    }

    const renderSubscription = (subscription: Subscription) => {

        return <TableRow  onClick={() => go(subscription.id)} key={`subscription_${subscription.id}`} style={{ cursor: "pointer" }}>
 
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {subscription.name}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {subscription.subscriptionType}
                </Typography>
            </TableCell>
            <TableCell >
                <Typography variant="body1" textAlign="left">
                    {formatDate(subscription.timestamp)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {formatDate(subscription.expires)}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {`${subscription.maxDataspaces-subscription.currentDataspaces}/${subscription.maxDataspaces}`}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                 
                  
                    {`${(subscription.currentMembers-subscription.currentDataspaces)}/${((subscription.maxMembers*subscription.maxDataspaces)-subscription.currentDataspaces)}`}
                </Typography>
            </TableCell>
            <TableCell>
                <Typography variant="body1" textAlign="left">
                    {`${subscription.currentCommons}/${subscription.maxCommons}`}
                </Typography>
            </TableCell>
            <TableCell >
                <Typography variant="body1" textAlign="left">
                    {subscription.isEnabled.toString()}
                </Typography>
            </TableCell>
        </TableRow>

    }

    return (

        <TableContainer>
            <Table size="small">
                <TableHead>
                    <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}> 
                         <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.name')}</Typography></TableCell>
                       
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.subscriptionType')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.created')}</Typography></TableCell> 
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.expires')}</Typography></TableCell>
                       
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.dataspaces')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.members')}</Typography></TableCell>
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.commons')}</Typography></TableCell> 
                        <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.isEnabled')}</Typography></TableCell> 
                  
                    </TableRow>
                </TableHead>
                <TableBody>
                    {subscriptions.map((subscription) => renderSubscription(subscription))}
                </TableBody>
            </Table>

        </TableContainer>

    )
}

export default SubscriptionList;