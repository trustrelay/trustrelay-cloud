import React from 'react';
import { Typography,  Button, TableContainer, Table, TableRow, TableCell, TableBody, Drawer, Toolbar, Theme } from '@mui/material'; 
import { useTranslation } from 'react-i18next';
import { AuditLogEntry  } from '../../api/models/models';
import { formatDateTime } from '../../api/utils';
import { makeStyles  } from '@mui/styles';

const useStyles = makeStyles((theme:Theme) => ({
  root: {
    width: '350px',
    flexGrow: 1,
  },
  topnav: {
    height: "3em",
    paddingLeft: "0em"
  },
  innernav: {
    paddingTop: "0",
    paddingBottom: "0",
    marginTop: "0",
    marginBottom: "0"
  },
  drawerContainer: {
    width: "350px",
    padding: "0em 1em 1em 1em",
    backgroundColor: "transparent"
  },
}));

const LogDetailsDrawer = ({
  logEntry,
  open,
  handleClose 
}: {
  logEntry: AuditLogEntry;
  open: boolean;
  handleClose: () => void; 
}) => {

  const { t } = useTranslation();


  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }
  
  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.auditLogDetails')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        
      <TableContainer>
            <Table size="small">
                
                <TableBody>
                <TableRow sx={{ "&:hover": { backgroundColor: "inherit" } }}>
                        <TableCell variant="head" align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.timestamp')}</Typography></TableCell>
                        <TableCell   align="left" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{formatDateTime(logEntry.timestamp)}</Typography></TableCell>
                        
                    </TableRow>
                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.activityType')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.activityType}</Typography></TableCell>
                     
                    </TableRow>
                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.target')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.target}</Typography></TableCell>
                        
                    </TableRow>
                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.category')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.category}</Typography></TableCell>
                        
                    </TableRow>

                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.status')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.status}</Typography></TableCell>
                        
                    </TableRow>

                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.statusReason')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.statusReason}</Typography></TableCell>
                        
                    </TableRow>
                    <TableRow>
                    <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.userAgent')}</Typography></TableCell>
                    <TableCell   sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{logEntry.userAgent}</Typography></TableCell>
                        
                    </TableRow>
                </TableBody>
            </Table>

        </TableContainer>

          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.close')}
          </Button>
          
        
      </div>
    </Drawer>
  )
}

export default LogDetailsDrawer;