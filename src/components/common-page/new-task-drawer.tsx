import React, { useState } from 'react';
import { Typography, Button, InputLabel, Select, MenuItem, OutlinedInput, Drawer, Toolbar, Theme } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { Common } from '../../api/models/models';
import { makeStyles } from '@mui/styles';

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

const NewTaskDrawer = ({
  dataspace,
  open,
  handleClose,
  onAction,
  sources,
}: {
  dataspace: string;
  open: boolean;
  handleClose: () => void;
  onAction: (dataspace: string, taskType: string, source: string) => void;
  sources: Array<Common>;
}) => {

  const { t } = useTranslation();

  const [taskType, setTaskType] = useState('');
  const [selectedSource, setSelectedSource] = useState('');



  const handleContinue = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    setSelectedSource('')
    onAction(dataspace, taskType, selectedSource);
    handleClose();
  }

  const handleCancel = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    handleClose();
  }



  const handleSelectedSourceChange = (e: any) => {
    setSelectedSource(e.target.value)
  }

  const disableContinueButton = () => {
    return (taskType.length <= 0 || selectedSource.length <= 0)

  }

  const css = useStyles();

  return (
    <Drawer className={css.root} variant="temporary" anchor="right" open={open} onClose={handleClose} >

      <Toolbar className={css.innernav}>

        <Typography variant="h5">{t('labels.createNewTask')}</Typography>
      </Toolbar>

      <div className={css.drawerContainer}>
        <form>


          <InputLabel htmlFor="source-select" id="source-label">{t('labels.resource')}</InputLabel>
          <Select
            labelId="source-label"
            id="source-select"
            value={selectedSource}
            onChange={handleSelectedSourceChange}
            input={<OutlinedInput label="Format" />}
            label={t('labels.source')} >
            {(sources && sources.length > 0) ? sources.map((sourceItem) => <MenuItem key={`item_${sourceItem.id}`} value={sourceItem.id}>{sourceItem.name}</MenuItem>) : <></>}


          </Select>
          <br /><br />
          <Button onClick={handleCancel} color="primary">
            {t('labels.cancel')}
          </Button>
          <Button onClick={handleContinue} disabled={disableContinueButton()} color="primary">

            {t('labels.createNewTask')}

          </Button>
        </form>
      </div>
    </Drawer>
  )
}

export default NewTaskDrawer;