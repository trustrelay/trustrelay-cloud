import React from "react";
import { IconButton, Menu, MenuItem } from '@mui/material';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { useTranslation } from "react-i18next";
import { CommonSchema } from "../../api/models/models";

const SchemaEllipsisMenu = ({
    id,
    onCheck,
    onDelete
}: {
    id: string;
    onCheck: () => void;
    onDelete: () =>void;
}) => {

    const { t } = useTranslation();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.stopPropagation(); 
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (e:any) => {
        e.stopPropagation(); 
        setAnchorEl(null);
    };

    const handleValidateQuery = (e:any) => {
        e.stopPropagation(); 
        setAnchorEl(null);
          onCheck()
    }

    const handleDelete = (e:any) => {
        e.stopPropagation(); 
        setAnchorEl(null);
        onDelete()
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
                <MenuItem onClick={handleValidateQuery}>{t('labels.validateQuery')}</MenuItem>
                <MenuItem onClick={handleDelete}>{t('labels.delete')}</MenuItem>

            </Menu>
        </>
    )
}

export default SchemaEllipsisMenu;