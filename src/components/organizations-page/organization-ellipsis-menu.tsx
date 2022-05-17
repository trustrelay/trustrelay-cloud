import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useTranslation } from "react-i18next";

const OrganizationEllipsisMenu = ({
    id,
    onDelete,
    onSetAsMyOrganization
}: {
    id: string;
    onDelete: (id: string) => void;
    onSetAsMyOrganization:(id:string) =>void;
}) => {

    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleDelete = () => {
        setAnchorEl(null);
        onDelete(id)
    }

    const handleSetAsMyOrganization = () => {
        setAnchorEl(null);
        onSetAsMyOrganization(id)
    }

    return (
        <>
            <IconButton size="small" aria-controls={`simple-menu-${id}`} aria-haspopup="true" onClick={handleClick}>
                <MoreHorizIcon />
            </IconButton>
            <Menu
                id={`simple-menu-${id}`}
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <MenuItem onClick={handleDelete}>{t('labels.delete')}</MenuItem>
                <MenuItem onClick={handleSetAsMyOrganization}>{t('labels.setAsMyOrganization')}</MenuItem>

            </Menu>
        </>
    )
}

export default OrganizationEllipsisMenu;