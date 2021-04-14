import React from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {useHistory} from 'react-router-dom';
import Divider  from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import FinalizaPedidoContexto from 'Contexts/finalizaPedido';
import CarrinhoContexto from 'Contexts/carrinho';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import DadosCliente from '../DadosCliente';
import PrazoNew from '../CondicaoPagtoNew';
import Totais from '../Totais';
import BtnEnviarPedido from '../BtnEnviarPedido';
import ConfirmarNomeTelefone from '../ConfirmaNomeTelefone';
import ContatoSuporteComercial from '../ContatoSuporteComercial';
import VerificaPromocao from '../VerificaPromocao';

export default () => {
    const {setLoading} = useContext(LoadingContext);
    const {msgErro} = useContext(MessageContext);
    const {pedido, enviarPedido} = useContext(CarrinhoContexto);
    const {vlrBoleto, prazoEntrega} = useContext(FinalizaPedidoContexto);
    const [exibirConfirmarNomeTelefone, setExibirConfirmarNomeTelefone] = useState(false);
    const history = useHistory();
    return (
        <>
            <Paper elevation={5} style={{padding: 20}}>
                <Typography variant="h4" gutterBottom style={{fontWeight: 100, marginLeft: 12}}>
                    Checkout
                </Typography>
                <DadosCliente/>
                <List component='nav'>
                    <ListItem
                        style={{flexDirection: 'column', alignItems: 'baseline'}}>
                        <Typography variant='body2' gutterBottom style={{fontWeight: 300}}>
                            PRAZO DE PAGAMENTO
                        </Typography>
                        <PrazoNew/>
                    </ListItem>
                    <Totais/>
                    <Divider/>
                    {
                        pedido && pedido.promocoes && pedido.promocoes.length > 0 &&
                        <VerificaPromocao promocoes={pedido.promocoes}/>
                    }
                </List>
                <BtnEnviarPedido onClickConfirmar={() => setExibirConfirmarNomeTelefone(true)} />
                <ContatoSuporteComercial/>
            </Paper>
            <ConfirmarNomeTelefone
                exibir={exibirConfirmarNomeTelefone}
                onClickOk = { async (contatoCliente) => {
                    try {
                        setLoading(true);
                        setExibirConfirmarNomeTelefone(false);
                        const venda = {
                            ...contatoCliente,
                            vlrBoleto,
                            prazoEntrega
                        };
                        const { idPedido } = await enviarPedido(venda) || {};
                        history.push(`/resumo-pedido?id=${idPedido}`);
                    } catch (e) {
                        msgErro(e);
                    } finally {
                        setLoading(false);
                    }
                }}
                onClickCancel={() => setExibirConfirmarNomeTelefone(false)}
            />
        </>
    );
};