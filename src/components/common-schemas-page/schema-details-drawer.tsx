import React, { useState } from 'react';
import { Typography, Drawer, Toolbar, Theme, Button, TableContainer, Table, TableBody, TableRow, TableCell, TextField, Paper, InputLabel } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { makeStyles } from '@mui/styles';
import { CommonSchema } from '../../api/models/models'; 
import Editor from "react-simple-code-editor";
import Prism, { languages } from 'prismjs'
import "prismjs/components/prism-sql"; 
import 'prismjs/themes/prism-funky.css';

const useStyles = makeStyles((theme: Theme) => ({
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

const MyEditor : any = Editor;

const SchemaDetailsDrawer = ({
  schema,
  open,
  handleClose,
  onAction
}: {
  schema: CommonSchema;
  open: boolean;
  handleClose: () => void;
  onAction: (schemaId:string, query:string) => void;
}) => {

  const { t } = useTranslation();

  const [query, setQuery] = useState('');


  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();

    setQuery('');
    onAction(schema.id, query);
    handleClose()
  }


  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleChange = (code:string) => {
    
    setQuery(code)
  }

  const disableContinueButton = () => {
    return (query.length <= 0)
  }

  const css = useStyles();


  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.validateQuery')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <TableContainer>
          <Table size="small">

            <TableBody>


              <TableRow>
                <TableCell variant="head" sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{t('labels.schemaName')}</Typography></TableCell>
                <TableCell sx={{ maxWidth: "200px" }}><Typography variant="body1" textAlign="left">{schema.name}</Typography></TableCell>
              </TableRow>


            </TableBody>
          </Table>

        </TableContainer>
        <form>
          {/* <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="query"
            label={t('labels.query')}
            onChange={handleChange}
            multiline
            rows={4}
            value={query}
            fullWidth
          /> */}
          <br/>
          <InputLabel>{t('labels.query')}</InputLabel>
           <Paper variant="outlined"  >
                            <MyEditor
                                value={query}
                                onValueChange={(code:string)=>handleChange(code)}
                                highlight={(code:string) => Prism.highlight(code, languages.sql, 'sql')}
                                padding={10}

                                style={{
                                    fontFamily: '"Fira code", "Fira Mono", monospace',
                                    fontSize: 12,
                                    width: "100%", 
                                    height: "150px",
                                    backgroundColor: "rgba(var(--body), 0.1)" 
                                }}
                            />
                            
                        </Paper>

          <br /><br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.validateQuery')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default SchemaDetailsDrawer;