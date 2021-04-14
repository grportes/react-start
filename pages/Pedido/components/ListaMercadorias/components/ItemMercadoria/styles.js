import {makeStyles} from '@material-ui/core/styles';

export default makeStyles((theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        flex: '1',
        padding: '20px',
        margin: '12px',
        textAlign: 'center',
        alignSelf: 'stretch',
        justifyContent: 'space-between'
    },
    nomeProduto: {
        display: 'block',
        fontSize: '0.9rem !important',
        fontWeight: '400 !important',
        marginTop: '16px !important',
        marginBottom: '16px !important'
    },
    boxImage: {
        display: 'flex',
        height: '100px',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative'
    },
    infoProduto: {
        display: 'flex',
        flex: '1',
        flexDirection: 'column',
        justifyContent: 'space-between'
    },
    boxIcon: {
        position: 'absolute',
        top: '-10px',
        right: '-10px'
    },
    valorProduto: {
        display: 'block',
        marginBottom: '4px !important',
        fontSize: '1.1rem !important'
    },
    valorProdutoUni: {
        display: 'block',
        marginTop: '-8px',
        marginBottom: '4px !important',
        fontSize: '0.8rem !important',
        color: 'gray'
    }
}));