import React, { useState } from 'react';
import { Typography, TextField, Button, InputLabel, Select, OutlinedInput, MenuItem, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import { ServiceConnection, TemplateAgreementSummary } from '../../api/models/models';
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

const NewCommonDrawer = ({
  templateAgreements,
  serviceConnections,
  open,
  handleClose,
  onAction
}: {
  open: boolean;
  handleClose: () => void;
  templateAgreements: Array<TemplateAgreementSummary>;
  serviceConnections: Array<ServiceConnection>;
  onAction: (commonName: string, serviceConnection: string, templateAgreement: string) => void;
}) => {

  const { t } = useTranslation(); 

  const [commonName, setCommonName] = useState('');
  const [serviceConnection, setServiceConnection] = useState('');
  const [templateAgreement, setTemplateAgreement] = useState('')

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setCommonName(''); 
    setServiceConnection('');
    setTemplateAgreement('');
    onAction(commonName, serviceConnection, templateAgreement)
    handleClose()
  }

  const handleCommonNameChange = (e: any) => {
    setCommonName(e.target.value);
  }

  const handleServiceConnectionChange = (e: any) => {
    setServiceConnection(e.target.value);
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
           
          <br /> <br />
          <InputLabel id="common-type-label">{t('labels.serviceConnection')}</InputLabel>

          <Select
            labelId="connection-label"
            id="connection-select"
            value={serviceConnection}
            label={t('labels.serviceConnection')}
            input={<OutlinedInput label="Format" />}
            onChange={handleServiceConnectionChange}
          >

            {(serviceConnections && serviceConnections.length > 0) ? serviceConnections.map((item) => <MenuItem value={item.id}>{item.name}</MenuItem>) : <></>}

          </Select>
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

            {t('labels.createNewCommon')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default NewCommonDrawer;