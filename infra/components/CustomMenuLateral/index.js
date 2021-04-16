import React from 'react';
import Drawer from '@material-ui/core/Drawer';

import useStyles from './styles';

export default ({
    open,
    children
}) => {

    const classes = useStyles();

    return (
        <Drawer
            className={classes.drawer}
            variant='persistent'
            anchor='left'
            open={open}
            classes={{
                paper: classes.drawerPaper
            }}
        />
    );
};