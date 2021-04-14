import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginLeft: theme.spacing(2),
        },
    },
    containerPopper: {
        zIndex: 99,
    },
    containerSubCategoria: {
        padding: '20px'
    },
    nav_barr_subCategoria___item: {
        fontSize: '12px'
    }
}));


