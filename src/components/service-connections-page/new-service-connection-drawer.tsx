import React, { useState } from 'react';
import { Typography, TextField, Button, InputLabel,  AppBar, Tabs, Tab, ToggleButtonGroup, ToggleButton, Tooltip, Input, Drawer, Toolbar, Theme } from '@mui/material'; 
import { useTranslation } from 'react-i18next'; 
import TabPanel from '../tab-panel'; 
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
  toggleGroup: {
    marginTop: "10px"
  },
  tabImage: {
    height: "40px",
    width: "40px"
  },
  toggleButtonImg: {
    height: "45px",
    width: "45px"
  }
}));

const NewServiceConnectionDrawer = ({
  open,
  handleClose,
  onAction
}: {
  open: boolean;
  handleClose: () => void;
  onAction: (serviceConnectionName: string,
    storageProvider: string,
    storageLocation: string,
    hostOrService: string, 
    databaseOrContainer: string,
    accountOrUserOrId: string,
    secret: string,
    hostPort: string
  ) => void;
}) => {



  const { t } = useTranslation(); 
  const css = useStyles();

  const [serviceConnectionName, setServiceConnectionName] = useState('');
  const [storageProvider, setStorageProvider] = useState<string>('az-stg-acc-table');
  const [storageLocation, setStorageLocation] = useState('switzerland-north');
  const [hostOrService, setHostOrService] = useState('');
  const [hostPort, setHostPort] = useState(443);
  const [databaseOrContainer, setDatabaseOrContainer] = useState('');
  const [accountOrUserOrId, setAccountOrUserOrId] = useState('');
  const [secret, setSecret] = useState('');

  const [value, setValue] = React.useState(0);
  const handleTabChange = (event: any, newValue: number) => {
    setValue(newValue);
  };

  const [displayHostOrService, setDisplayHostOrService] = useState(true);
  const [displayHostPort, setDisplayHostPort] = useState(true);



  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setServiceConnectionName(''); 
    setHostOrService(''); 
    setDatabaseOrContainer('');
    setAccountOrUserOrId('');
    setSecret('');
    setStorageLocation('CH');
    onAction(serviceConnectionName,
      storageProvider,
      storageLocation,
      hostOrService,
      databaseOrContainer,
      accountOrUserOrId,
      secret,
      hostPort.toString()
    )
    handleClose()
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }

  const handleServiceConnectionNameChange = (e: any) => {
    setServiceConnectionName(e.target.value);
  }

  const handleStorageProviderChange = (event: React.MouseEvent<HTMLElement>, value: string | null) => {
    if (value) {
      setStorageProvider(value);
      switch (value) {
        case "az-stg":
          setDisplayHostOrService(false)
          setHostPort(0)
          setDisplayHostPort(false)
          break
        case "aws-s3":
          setDisplayHostOrService(false)
          setHostPort(0)
          setDisplayHostPort(false)
          break
        case "gcp-stg":
          setDisplayHostOrService(false)
          setHostPort(0)
          setDisplayHostPort(false)
          break
          default:
            setDisplayHostOrService(true)
          setDisplayHostPort(true)
      }
    }
  }

  const handleStorageLocationChange = (e: any) => {
    setStorageLocation(e.target.value);
  }

  const handleHostOrServiceChange = (e: any) => {
    setHostOrService(e.target.value);
  }

  const handleHostPortChange = (e: any) => {
    setHostPort(e.target.value);
  }

  const handleDatabaseOrContainerChange = (e: any) => {
    setDatabaseOrContainer(e.target.value);
  }

  const handleAccountOrUserOrIdChange = (e: any) => {
    setAccountOrUserOrId(e.target.value);
  }

  const handleSecretChange = (e: any) => {
    setSecret(e.target.value);
  }

  //TODO: improve logic
  const disableContinueButton = () => {
    return (serviceConnectionName.length <= 0 ||
      storageProvider.length <= 0 ||
      secret.length <= 0 ||
      (displayHostOrService && databaseOrContainer.length <= 0) ||
      (displayHostPort && hostOrService.length <=0)
    )
  }


  function a11yProps(index: any) {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
  }
 
 

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createNewServiceConnection')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>

          <TextField
            autoFocus
            autoComplete="off"
            margin="dense"
            id="serviceConnectionName"
            label={t('labels.serviceConnectionName')}
            onChange={handleServiceConnectionNameChange}
            value={serviceConnectionName}
            fullWidth
          />

          <br /><br />
          <InputLabel id="storage-provider-toggle-button-group-label">{t('labels.storageProvider')}</InputLabel>
          <AppBar position="static">
            <Tabs
              id="storage-provider-toggle-button-group"
              value={value}
              variant="scrollable"
              scrollButtons={true}
              onChange={handleTabChange}
              aria-label="simple tabs example">
              <Tab icon={<img className={css.tabImage} alt="sql logo" src="https://cdn.trustrelay.io/media/sql.svg" />}   {...a11yProps(0)} />
              <Tab icon={<img className={css.tabImage} alt="documentdb logo" src="https://cdn.trustrelay.io/media/documentdb.svg"/>}   {...a11yProps(1)} />

              <Tab icon={<img className={css.tabImage} alt="azure logo" src="https://cdn.trustrelay.io/media/Microsoft_Azure.svg" />} {...a11yProps(2)} />

              <Tab icon={<img className={css.tabImage} alt="gcp logo" src="https://cdn.trustrelay.io/media/GCP.svg" />}   {...a11yProps(3)} />
              <Tab icon={<img className={css.tabImage} alt="aws logo" src="https://cdn.trustrelay.io/media/AWS.svg" />}   {...a11yProps(4)} />

              <Tab icon={<img className={css.tabImage} alt="all resources" src="https://cdn.trustrelay.io/media/all_resources.svg" />}   {...a11yProps(5)} />


            </Tabs>
          </AppBar>


          <TabPanel id="sql" value={value} index={0}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="sqlserver" aria-label="sql server">
                <Tooltip title={`${t('labels.sqlserver')}`}>
                  <img alt="sql server logo" src="https://cdn.trustrelay.io/media/sqlserver.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="postgres" aria-label="postgres">
                <Tooltip title={`${t('labels.postgres')}`}>
                  <img alt="postgres logo" src="https://cdn.trustrelay.io/media/postgresql.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="mysql" aria-label="mysql">
                <Tooltip title={`${t('labels.mysql')}`}>
                  <img alt="mysql logo" src="https://cdn.trustrelay.io/media/mysql.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </TabPanel>


          <TabPanel id="documentdb" value={value} index={1}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="mongodb" aria-label="mongodb">
                <Tooltip title={`${t('labels.mongodb')}`}>
                  <img alt="mongodb logo" src="https://cdn.trustrelay.io/media/mongodb.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>

            </ToggleButtonGroup>
          </TabPanel>


          <TabPanel id="microsoft" value={value} index={2}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="az-stg" aria-label="azure storage blob">
                <Tooltip title={`${t('labels.azureStorage')}`}>
                  <img alt="storage account logo" src="https://cdn.trustrelay.io/media/storage_account.svg" className={css.toggleButtonImg} />
                </Tooltip>

              </ToggleButton>
              <ToggleButton value="az-cosmos" aria-label="az-cosmos">
                <Tooltip title={`${t('labels.azureCosmosDb')}`}>
                  <img alt="cosmosdb logo" src="https://cdn.trustrelay.io/media/cosmosdb.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>

              <ToggleButton value="az-datalake" aria-label="azure data lake">
                <Tooltip title={`${t('labels.azureDataLake')}`}>
                  <img alt="azure data lake logo" src="https://cdn.trustrelay.io/media/azuredatalake.svg" className={css.toggleButtonImg} />
                </Tooltip>

              </ToggleButton>

            </ToggleButtonGroup>
          </TabPanel>


          <TabPanel id="google" value={value} index={3}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="gcp-stg" aria-label="GCP storage">
                <Tooltip title={`${t('labels.gcpStorage')}`}>
                  <img alt="gcp storage logo" src="https://cdn.trustrelay.io/media/gcp_storage.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </TabPanel>




          <TabPanel id="aws" value={value} index={4}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="aws-s3" aria-label="AWS S3">
                <Tooltip title={`${t('labels.awsS3Bucket')}`}>
                  <img alt="aws s3 logo" src="https://cdn.trustrelay.io/media/aws_s3_logo.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </TabPanel>

          <TabPanel id="others" value={value} index={5}>
            <ToggleButtonGroup className={css.toggleGroup} size="large" value={storageProvider} exclusive onChange={handleStorageProviderChange}>

              <ToggleButton value="http" aria-label="HTTP">
                <Tooltip title={`${t('labels.http')}`}>
                  <img alt="web source" src="https://cdn.trustrelay.io/media/web_resource.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
              <ToggleButton value="sap-hana" aria-label="sap-hana">
                <Tooltip title={`${t('labels.sapHana')}`}>
                  <img alt="sap logo" src="https://cdn.trustrelay.io/media/sap.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
              
              <ToggleButton value="snowflake" aria-label="snowflake">
                <Tooltip title={`${t('labels.snowflake')}`}>
                  <img alt="snowflake logo" src="https://cdn.trustrelay.io/media/Snowflake_Logo.svg" className={css.toggleButtonImg} />
                </Tooltip>
              </ToggleButton>
            </ToggleButtonGroup>
          </TabPanel>

          <br /> <br />

      {(displayHostOrService) ?    <TextField
            autoComplete="off"
            margin="dense"
            id="hostOrService"
            label={t('labels.hostOrService')}
            onChange={handleHostOrServiceChange}
            value={hostOrService}
            fullWidth
          /> : <></>}



          <br /><br />
          {(displayHostOrService) ?  <>   <InputLabel id="hostPort-label">{t('labels.hostPort')}</InputLabel>

          <Input
            type="number"
            autoComplete="off"
            margin="dense"
            rows={1}
            id="hostPort"
            onChange={handleHostPortChange}
            value={hostPort}
            fullWidth
          />
          <br /><br />
          </> : <></>}

          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="storageLocation"
            label={t('labels.storageLocation')}
            onChange={handleStorageLocationChange}
            value={storageLocation}
            fullWidth
          />
          <br /> <br />
        

          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="databaseOrContainer"
            label={t('labels.databaseOrContainer')}
            onChange={handleDatabaseOrContainerChange}
            value={databaseOrContainer}
            fullWidth
          />

          <br /> <br />
          <TextField
            autoComplete="off"
            margin="dense"
            rows={3}
            id="accountOrUserOrId"
            label={t('labels.accountOrUserOrId')}
            onChange={handleAccountOrUserOrIdChange}
            value={accountOrUserOrId}
            fullWidth
          />

          <br /> <br />
          <TextField
            autoComplete="off"
            margin="dense"
            rows={10}
            id="secret"
            label={t('labels.secret')}
            type="password"
            onChange={handleSecretChange}
            value={secret}
            fullWidth
          />

          <br /> <br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createNewServiceConnection')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default NewServiceConnectionDrawer;