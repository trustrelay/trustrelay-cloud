import React, { useEffect, useState } from "react";
import { IconButton, Menu, MenuItem } from "@material-ui/core";
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import { useTranslation } from "react-i18next";

const AgreementEllipsisMenu = ({
    id,
    onTerminate
}: {
    id: string;
    onTerminate: (id: string) => void;
}) => {

    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


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
                <MenuItem onClick={() => onTerminate(id)}>{t('labels.terminate')}</MenuItem>
            </Menu>
        </>
    )
}

export default AgreementEllipsisMenu;