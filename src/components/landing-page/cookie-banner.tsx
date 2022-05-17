import React, { useEffect, useState } from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Popper, { PopperProps } from '@material-ui/core/Popper';
import zIndex from '@material-ui/core/styles/zIndex';
import { Button, Grid, Typography } from '@material-ui/core';
import { classList } from '../../utils';
import clsx from 'clsx';
import CookieOptionsModal from './cookie-options-modal';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            paddingTop: '5px',
            backgroundColor: 'transparent',
            zIndex: 9
        },
        cookieInfo: {
            marginTop: '80px',
            border: '1px solid',
            padding: theme.spacing(1),
            backgroundColor: theme.palette.primary.light,
            // width: "100%"
        }
    }),
);

type MyCustomPopperProps = {
} & PopperProps;

const CookieBanner = ({
    anchorEl,
    isOpen,
    onAcceptAll, 
    onCustomize
}: {
    isOpen: boolean;
    anchorEl?: HTMLElement | null;
    onAcceptAll: () => void; 
    onCustomize:(strictlyNecessary:boolean, basicInteractions:boolean, experienceEnhancement:boolean, measurement:boolean)=>void;
}) => {

    useEffect(() => {

    })

    const css = useStyles();

    const id = isOpen ? 'simple-popper' : undefined;

    const handleLearnMore = () => {
        setIsOpenOptions(true)
    }

    const [isOpenOptions, setIsOpenOptions] = useState(false);

    const handleCloseModal = () => {
        setIsOpenOptions(false)
    }

    

    //     const myCustomPopperProps : MyCustomPopperProps = {
    // open:isOpen,
    // anchorEl:anchorEl,
    // disablePortal:true,
    // placement:'top', 
    //     }

    return (

        <Popper id={id}
            open={isOpen}
            anchorEl={anchorEl}
            placement='bottom-end'
            disablePortal={true}
            className={clsx(classList({
                header: false,
                "header-fixed": true
            }), css.root)}

        // {...myCustomPopperProps}
        >
            <Grid className={css.cookieInfo} container xs={12} sm={12} md={12} lg={12} xl={12}>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="h6">Notice</Typography>
                </Grid>
                <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Typography variant="body1">We use cookies and similar technologies for technical purposes and, with your consent, for other purposes as specified in the cookie policy.</Typography>
                </Grid>
                <Grid item container spacing={2} xs={12} sm={12} md={12} lg={12} xl={12}>
                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={() => onAcceptAll()}>Accept all</Button>
                    </Grid>

                    <Grid item>
                        <Button variant="contained" color="secondary" onClick={handleLearnMore}>Learn more and customize</Button>
                        <CookieOptionsModal isOpen={isOpenOptions} onClose={handleCloseModal} onSubmit={onCustomize} />
                    </Grid>
                </Grid>
            </Grid>
        </Popper>

    );
}

export default CookieBanner;