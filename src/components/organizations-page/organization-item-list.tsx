import { useEffect, useState } from "react";
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { Organization } from "../../api/models/models"; 
import { useTranslation } from "react-i18next"; 
import OrganizationEllipsisMenu from "./organization-ellipsis-menu";

 

const OrganizationList = ({
    organizations,
    setSelectedOrganization,
    toggleOrganizationDrawer,
    onDelete,
    onSetAsMyOrganization
}: {
    organizations: Array<Organization>;
    setSelectedOrganization: (entry: Organization) => void;
    toggleOrganizationDrawer: () => void;
    onDelete: (org: string) => void;
    onSetAsMyOrganization: (org:string) => void;
}) => {
    const { t } = useTranslation();
    const emptyOrganization: Organization = {
        id: "",
        name: "",
        registry: "",
        admin: "",
        addressLine1: "",
        postalCode: "",
        city: "",
        country: "",
        website: "",
        isVerified: false,
        isAssessed: false,
        maturityUrl: "",
        scoreOverall: 0,
        scorePractice: 0,
        scorePurpose: 0,
        scorePeople: 0
    }

 

    useEffect(() => {
        
    }, [])

    const handleSelection = (org: Organization) => {
        toggleOrganizationDrawer();
        setSelectedOrganization(org);

    }



    const renderOrganization = (organization: Organization) => {

        return <TableRow key={`organization_${organization.id}`} style={{ cursor: "pointer" }}>

            <TableCell onClick={() => handleSelection(organization)} >
                <Typography variant="body1" textAlign="left">
                    {organization.name}
                </Typography>
            </TableCell>

            <TableCell onClick={() => handleSelection(organization)}>
                <Typography variant="body1" textAlign="left">
                    {organization.city}
                </Typography>
            </TableCell>

            <TableCell align="right" >
               <OrganizationEllipsisMenu id={organization.id} 
               onDelete={onDelete}
               onSetAsMyOrganization={onSetAsMyOrganization}
                />
            </TableCell>

        </TableRow>

    }

    return (
        <>
            <TableContainer>
                <Table size="small">
                    <TableHead>
                        <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                            <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.name')}</Typography></TableCell>
                            <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.city')}</Typography></TableCell>
                            <TableCell variant="head" sx={{ maxWidth: "200px" }}>&nbsp;</TableCell>

                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {organizations.map((organization) => renderOrganization(organization))}
                    </TableBody>
                </Table>

            </TableContainer>

        </>
    )
}

export default OrganizationList;