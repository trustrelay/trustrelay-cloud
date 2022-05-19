import React, { useState } from 'react';
import { Typography, Button, InputLabel, Select, OutlinedInput, MenuItem, Checkbox, Drawer, Toolbar, Theme } from '@mui/material';  
import { useTranslation } from 'react-i18next';
import { Common } from '../../api/models/models';
import {Link} from 'react-router-dom'
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
  drawerLink: {
    color: theme.palette.primary.main
  }
}));


const JoinCommonDrawer = ({
  commons,
  account,
  myOrganizationId,
  open,
  handleClose,
  onAction
}: {
  commons: Array<Common>;
  account: string;
  myOrganizationId: string;
  open: boolean;
  handleClose: () => void;
  onAction: (commonId: string) => void;
}) => {

  const { t } = useTranslation(); 

  const [accepted, setAccepted] = useState(false);
  const [selectedCommonId, setSelectedCommonId] = useState('');
  const [mustAcceptAgreement, setMustAcceptAgreement] = useState(true);

 
  const emptyCommon: Common = {
    name: "",
    accessValidFrom: "",
    accessValidUntil: "",
    allowRead: false,
    allowWrite: false,
    allowCopy: false,
    allowScript: false,
    allowExport: false,
    id: "",
    serviceConnectionId: "",
    serviceConnectionName: "",
    storageLocation: "",
    timestamp: "",
    userAgent: "",
    adminAgent: "",
    dataExpert: "",
    dataOwner: "",
    dataspace: "",
    agreementTemplate: "",
    signedAgreement: "",
    createdBy: "",
    hasAccepted: false,
    tags: [],
    organization:"",
    organizationDomain:"",
    sourceType:"",
    sourceQuery:"",
    agreementIsTerminated:false,
    agreementTimestamp:""
};

  const [selectedCommon, setSelectedCommon] = useState(emptyCommon);

  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSelectedCommonId('');
    onAction(selectedCommonId);
    setMustAcceptAgreement(true);
    handleClose()
  }


  const disableContinueButton = () => {
    return ((mustAcceptAgreement && !accepted) || selectedCommonId.length <= 0)
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }


  const handleCheck = (e: any) => {
    setAccepted(e.target.checked)
  }

  const handleSelectedCommonChange = (e: any) => {
    setSelectedCommonId(e.target.value);
    const thisCommon = commons.find(x => x.id === e.target.value)
    if (thisCommon) {
      setSelectedCommon(thisCommon);
      setAccepted(thisCommon.organization === myOrganizationId);
      setMustAcceptAgreement(thisCommon.organization !== myOrganizationId)
      }
  }




  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.requestAccessToCommon')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>


          <InputLabel id="common-label">{t('labels.common')}</InputLabel>

          <Select
            labelId="common-label"
            id="common-select"
            value={selectedCommonId}
            onChange={handleSelectedCommonChange}
            label={t('labels.common')}
            input={<OutlinedInput label="Format" />}
          >
            {(commons && commons.length > 0) ? (commons.filter(x => !x.hasAccepted && x.createdBy !== account).map((commonItem) => <MenuItem key={commonItem.id} value={commonItem.id}>{commonItem.name}</MenuItem>)) : <></>}
          </Select>
          <br /> <br />
          {mustAcceptAgreement ? <><Checkbox onChange={handleCheck} checked={accepted} /><Link target="_blank" rel="noopener"   className={css.drawerLink} to={`/dataspaces/${selectedCommon.dataspace}/template-agreements/${selectedCommon.agreementTemplate}`}>{t('labels.acceptAgreement')} </Link></> : <></>}
            <br /> <br />

          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.requestAccessToCommon')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default JoinCommonDrawer;