import React from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Container from '@material-ui/core/Container';

import useStyles from './styles';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import ClienteContext from 'Contexts/cliente';
import {CarrinhoProvider} from 'Contexts/carrinho';
import BarraNavegacao from './components/BarraNavegacao';
import BarraNavegacaoSimples from './components/BarraNavegacaoSimples';
import Routes from '../../../../routes';
import isEmpty from 'Util/isEmpty';

const Componente = ({
    idClienteSession,
    onLogout
} ) => {

    const classes = useStyles();
    const {setLoading} = useContext(LoadingContext);
    const {cliente, reloadCliente} = useContext(ClienteContext);
    const {msgErro} = useContext(MessageContext);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                await reloadCliente(idClienteSession);
            } catch (e) {
                msgErro(e);
            } finally {
                setLoading(false);
            }
        })();
    },[idClienteSession]);

    if (isEmpty(cliente)) return (<h3>Carregando...</h3>);

    const {acessoLimitado = false} = cliente;

    
    if (acessoLimitado)
        return (
            <>
                <BarraNavegacaoSimples onLogoutSuccess={onLogout} />
                <Container className={classes.pageContainer}>
                    <Routes acessoRestrito={acessoLimitado}/>
                </Container>
            </>
        );

    return (
        <CarrinhoProvider>
            <BarraNavegacao onLogoutSuccess={onLogout} />
            <Container className={classes.pageContainer}>
                <Routes acessoRestrito={acessoLimitado}/>
            </Container>
        </CarrinhoProvider>
    );

};

Componente.propType = {
    onLogout: PropTypes.func,
    idClienteSession: PropTypes.string,
};

Componente.defaultProps = {
    onLogout: () => {},
    idClienteSession: '',
};

export default Componente;