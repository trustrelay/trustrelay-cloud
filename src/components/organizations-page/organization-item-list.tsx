import React, { useEffect, useState } from "react";
import { Button, Grid, IconButton, makeStyles, Menu, MenuItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@material-ui/core";
import { DataspaceInfo, Organization, Subscription } from "../../api/models/models";
import { useHistory } from "react-router";
import { useTranslation } from "react-i18next";
import { formatDate } from "../../api/utils";
import OrganizationEllipsisMenu from "./organization-ellipsis-menu";

const useStyles = makeStyles((theme) => ({

})
)


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

    const [org, setOrg] = useState(emptyOrganization);

  

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