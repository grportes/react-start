import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    contatos: {
        display: 'flex',
        marginBottom: '10px',
        flexDirection: 'column'
    },
    linkContato: {
        textDecoration: 'none !important',
        display: 'flex',
        alignItems: 'stretch'
    }
}));
