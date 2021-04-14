import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
    },
    paperMain: {
        padding: '40px',
        textAlign: 'center',
        maxWidth: '500px',
    },
    icone: {
        fontSize: '50pt',
        color: '#00a651',
        margin: '24px',
    },
    textConfirmacao: {
        marginTop: '0px',
        marginBottom: '30px',
        fontSize: '30px',
        textAlign: 'center',
    },
    tituloAtencao:{
        color: "red",
        fontSize: '20px',
        marginBottom: '2px',
    }
}));