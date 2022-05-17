import React, { useContext, useState } from 'react';
import { Typography, makeStyles, TextField, Button, InputLabel, Select, OutlinedInput, MenuItem, Paper, Theme, createStyles, Grid } from '@material-ui/core';
import Drawer from '@material-ui/core/Drawer';
import Toolbar from '@material-ui/core/Toolbar';
import { useHistory } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import { ServiceConnection, TemplateAgreementSummary } from '../../api/models/models';
import Editor from "react-simple-code-editor";
import Prism, { languages } from 'prismjs'
// import "prismjs/components/prism-sql";
// import 'prismjs/components/prism-css';
// import 'prismjs/themes/prism-funky.css';

const ExportToCommonDrawer = ({
  templateAgreements,
  query,
  open,
  handleClose,
  onAction
}: {
  templateAgreements: Array<TemplateAgreementSummary>;
  query: string;
  open: boolean;
  handleClose: () => void;
  onAction: (commonName: string, templateAgreement: string) => void;
}) => {

  const { t } = useTranslation();
  let history = useHistory();



  const [commonName, setCommonName] = useState('');

  const [templateAgreement, setTemplateAgreement] = useState('')

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCommonName('');
    setTemplateAgreement('');
    onAction(commonName, templateAgreement)
    handleClose()
  }

  const handleCommonNameChange = (e: any) => {
    setCommonName(e.target.value);
  }


  const handleAgreementTemplateChange = (e: any) => {
    setTemplateAgreement(e.target.value)
  }

  const disableContinueButton = () => {
    return (templateAgreement.length <= 0 || commonName.length <= 0)
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const useStyles = makeStyles((theme: Theme) =>
    createStyles({
      root: {
        width: '320px',
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
      code: {
        fontSize: theme.typography.pxToRem(12),
        'overflow-x': 'auto',
        'white-space': 'pre-wrap',
        // 'white-space': '-moz-pre-wrap',
        // 'white-space': '-pre-wrap',
        // 'white-space': '-o-pre-wrap',
        'word-wrap': 'break-word',
      },
    })
  );

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createNewCommon')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="commonName"
            label={t('labels.commonName')}
            onChange={handleCommonNameChange}
            value={commonName}
            fullWidth
          />

          <br /><br />

          <InputLabel id="query-label">{t('labels.query')}</InputLabel>
            <Grid item>
              <Paper variant="outlined" className={css.root}>
                <pre className={css.code}>{query}</pre>
              </Paper>
            </Grid>
       


          <br /> <br />

          <InputLabel id="agreement-template-label">{t('labels.templateAgreement')}</InputLabel>
          {(templateAgreements && templateAgreements.length > 0) ? (
            <Select
              labelId="agreement-template-label"
              id="agreement-template-select"
              value={templateAgreement}
              onChange={handleAgreementTemplateChange}
              input={<OutlinedInput label="Format" />}
              label={t('labels.agreement')} >
              {templateAgreements.map((agreementTemplate) => <MenuItem key={`item_${agreementTemplate.id}`} value={agreementTemplate.id}>{agreementTemplate.title}</MenuItem>)}

            </Select>

          ) : <></>}
          <br /> <br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createNewDataspace')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default ExportToCommonDrawer;