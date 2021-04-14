import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    barButtons: {
        flex: '0.20',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end'
    },
    iconeMinhaConta: {
        color: 'white !important',
        [theme.breakpoints.up('md')]: {
            marginRight: '12px'
        }
    }
}));