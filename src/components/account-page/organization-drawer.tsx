import React, { useEffect, useState } from 'react';
import { Typography, TextField, Button, Switch, InputLabel, Select, OutlinedInput, MenuItem,  FormControlLabel, IconButton, Grid, AppBar, Tabs, Tab, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import Countries from '../../api/models/iso3-countries'
import { Organization } from '../../api/models/models';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import BusinessIcon from '@mui/icons-material/Business';
import TabPanel from '../tab-panel';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
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
    width: "290px",
    padding: "0em 0em 0em 0.5em",
    backgroundColor: "transparent"
  },
  tabImage: {
    height: "40px",
    width: "40px"
  },
}));

function a11yProps(index: any) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}


const OrganizationDrawer = ({
  organization,
  open,
  handleClose,
  onVerify,
  onAssess
}: {
  organization: Organization;
  open: boolean;
  handleClose: () => void;
  onAssess: (maturityUrl: string) => void;
  onVerify: (registryIdentifier: string,
    organizationName: string,
    organizationLegalAddressLine1: string,
    organizationLegalAddressPostalCode: string,
    setOrganizationLegalAddressCity: string,
    country: string,
    organizationWebsite: string) => void;
}) => {

  const { t } = useTranslation(); 
  
  const [organizationName, setOrganizationName] = useState(organization.name);
  const [addressLine1, setAddressLine1] = useState(organization.addressLine1);
  const [city, setCity] = useState(organization.city);
  const [postalCode, setPostalCode] = useState(organization.postalCode);
  const [website, setWebsite] = useState(organization.website)
  const [registryIdentifier, setRegistryIdentifier] = useState(organization.registry);
  const [country, setCountry] = useState(organization.country);

  const [maturityUrl, setMaturityUrl] = useState(organization.maturityUrl);
  const [scoreOverall, setScoreOverall] = useState(organization.scoreOverall);
  const [scorePurpose, setScorePurpose] = useState(organization.scorePurpose);
  const [scorePractice, setScorePractice] = useState(organization.scorePractice);
  const [scorePeople, setScorePeople] = useState(organization.scorePeople);

  useEffect(() => { 

    setOrganizationName(organization.name)
    setAddressLine1(organization.addressLine1)
    setCity(organization.city)
    setPostalCode(organization.postalCode)
    setWebsite(organization.website)
    setRegistryIdentifier(organization.registry)
    setCountry(organization.country)
    setMaturityUrl(organization.maturityUrl)
    setScoreOverall(organization.scoreOverall)
    setScorePurpose(organization.scorePurpose)
    setScorePractice(organization.scorePractice)
    setScorePeople(organization.scorePeople)

  }, [organization])

  const handleOrganizationNameChange = (e: any) => {
    setOrganizationName(e.target.value);
  }

  const handleOrganizationLegalAddressLine1Change = (e: any) => {
    setAddressLine1(e.target.value);
  }

  const handleOrganizationLegalAddressPostalCodeChange = (e: any) => {
    setPostalCode(e.target.value);
  }

  const handleOrganizationLegalAddressCityChange = (e: any) => {
    setCity(e.target.value);
  }

  const handleOrganizationWebsiteChange = (e: any) => {
    setWebsite(e.target.value)
  }


  const handleRegistryIdentifierChange = (e: any) => {
    setRegistryIdentifier(e.target.value)
  }

  const handleCountryChange = (event: any) => {
    setCountry(event.target.value);
  }



  const handleVerify = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onVerify(registryIdentifier,
      organizationName,
      addressLine1,
      postalCode,
      city,
      country,
      website)
    handleClose()
  }

  const handleAssess = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    onAssess(maturityUrl)
    handleClose()
  }

  const handleMaturityUrlChange = (e: any) => {
    setMaturityUrl(e.target.value);
  }

  const disableContinueButton = () => {
    return (!maturityUrl || maturityUrl.length <= 0 || maturityUrl === organization.maturityUrl)
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setValue(newValue);
  };


  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{organization.name}</Typography>
      </Toolbar>



      <div className={css.drawerContainer}>

        <AppBar position="static">
          <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
            <Tab icon={<BusinessIcon />}   {...a11yProps(0)} />
            <Tab icon={<EmojiEventsIcon />}   {...a11yProps(1)} />

          </Tabs>
        </AppBar>
        <TabPanel id="verify" value={value} index={0}>
          <Toolbar className={css.innernav}>

            <Typography variant="h6">{t('labels.verifyOrganization')}</Typography>
          </Toolbar>

          <div className={css.drawerContainer}>
            <form>

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="registryIdentifier"
                label={t('labels.registryIdentifier')}
                onChange={handleRegistryIdentifierChange}
                value={registryIdentifier}
                fullWidth
              />

              <br /> <br />

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="organizationName"
                label={t('labels.organizationName')}
                onChange={handleOrganizationNameChange}
                value={organizationName}
                fullWidth
              />

              <br /> <br />
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="organizationLegalAddressLine1"
                label={t('labels.addressLine1')}
                onChange={handleOrganizationLegalAddressLine1Change}
                value={addressLine1}
                fullWidth
              />

              <br /> <br />
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="organizationLegalAddressPostalCode"
                label={t('labels.postalCode')}
                onChange={handleOrganizationLegalAddressPostalCodeChange}
                value={postalCode}
                fullWidth
              />

              <br /> <br />
              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="organizationLegalAddressCity"
                label={t('labels.city')}
                onChange={handleOrganizationLegalAddressCityChange}
                value={city}
                fullWidth
              />



              <br /> <br />

              <InputLabel htmlFor="country">Country</InputLabel>
              <Select
                id="country-select"
                value={country}
                label="Country"
                size="small"
                input={<OutlinedInput label="Format" />}
                onChange={handleCountryChange}
              >
                {Countries.map((c,index) => <MenuItem key={`item_${index}`} value={c.code}>{c.name}</MenuItem>)}


              </Select>
              <br /> <br />

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="organizationWebsite"
                label={t('labels.website')}
                onChange={handleOrganizationWebsiteChange}
                value={website}
                fullWidth
              />
              <br /> <br />

              <Button onClick={handleCancel} color="primary">
                {t('labels.cancel')}
              </Button>
              <Button onClick={handleVerify} disabled={disableContinueButton()} color="primary">

                {t('labels.verify')}

              </Button>
            </form>
          </div>
        </TabPanel>
        <TabPanel id="assess" value={value} index={1}>
          <Toolbar className={css.innernav}>

            <Typography variant="h6">{t('labels.assessOrganizationMaturity')}</Typography>
          </Toolbar>

          <div className={css.drawerContainer}>
            <form>

              <FormControlLabel control={<Switch size="medium" checked={organization.isAssessed} />} label={t('labels.isAssessed')} />


              <br /><br />

              <Grid container flexDirection="row">
                <Grid item >
                  <TextField
                    autoFocus
                    autoComplete="off"
                    size="small"
                    margin="dense"
                    id="maturityUrl"
                    label={t('labels.maturityUrl')}
                    onChange={handleMaturityUrlChange}
                    value={maturityUrl}
                    fullWidth
                  />

                </Grid>
                <Grid item   >

                  {(organization.maturityUrl && organization.maturityUrl.length > 0) ? <IconButton onClick={() => window.open(maturityUrl, "_blank")}   >
                    <OpenInNewIcon />
                  </IconButton> : <></>}

                </Grid>
              </Grid>

              <br /><br />


              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="scoreOverall"
                label={t('labels.scoreOverall')}
                value={scoreOverall}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <br /><br />

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="scorePurpose"
                label={t('labels.scorePurpose')}
                value={scorePurpose}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <br /><br />

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="scorePractice"
                label={t('labels.scorePractice')}
                value={scorePractice}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <br /><br />

              <TextField
                autoFocus
                autoComplete="off"
                margin="dense"
                size="small"
                id="scorePeople"
                label={t('labels.scorePeople')}
                value={scorePeople}
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <br /><br />


              <Button onClick={handleCancel} color="primary">
                {t('labels.cancel')}
              </Button>
              <Button onClick={handleAssess} disabled={disableContinueButton()} color="primary">

                {t('labels.assess')}

              </Button>
            </form>
          </div>
        </TabPanel>

 
      </div>
    </Drawer>
  )
}

export default OrganizationDrawer;