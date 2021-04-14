import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import "./index.css";
import formatBR from "Util/BR/formatBR";
import formatDatePedido from "Util/BR/formatDatePedido";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

const formaPagamentos = {
    1: "CHEQUE",
    3: "BOLETO",
    4: "DEPOSITO BANCARIO",
    5: "CARTAO DE CREDITO"
}
const condVendas = {
    1: "30",
    3: "15",
    4: "45",
    5: "60",
    6: "30/45/60",
    7: "90",
    8: "00",
    10: "30/60/90",
    11: "ANTECIPADO",
    12: "30",
    15: "75",
    20: "35",
    21: "21",
    22: "35",
    25: "80",
    32: "65",
    34: "30/45/60",
    37: "15/30/45",
    38: "07/14/21",
    39: "49",
    46: "35",
    47: "120",
    49: "30",
    50: "15/30/45",
    51: "07",
    52: "150",
    91: "30",
    92: "35",
    94: "35",
    95: "15/30/45",
    96: "30",
}

export default (props) => {
    const history = useHistory();
    const { detalhePedido } = props
    const getFormaPagamento = (formaPagamento, condVenda) => {
        return `${formaPagamentos[formaPagamento]} - ${condVendas[condVenda]}`
    }

    if (Object.keys(detalhePedido).length === 0) { history.push('/minha-conta') }
    else return (
        <Grid
            item
        >
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>DETALHES</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody className='detalhe__info'>
                        <TableRow>
                            <TableCell>
                                <p>NUMERO DO PEDIDO: <span>{
                                    detalhePedido.nroPedido
                                        ? detalhePedido.nroPedido
                                        : detalhePedido.id.split('-')[1]
                                }</span></p>
                                <p>DATA DA PEDIDO: <span>{
                                    detalhePedido.dataPedido.includes('T')
                                        ? formatDatePedido(detalhePedido.dataPedido)
                                        : detalhePedido.dataPedido
                                }</span></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>STATUS: <span>{
                                    detalhePedido.dataEntrega
                                        ? "ENTREGUE"
                                        : detalhePedido.descricaoStatus
                                            ? detalhePedido.descricaoStatus
                                            : "EM PROCESSAMENTO"
                                }</span></p>
                                <p>ÚLTIMA ATUALIZAÇÃO: <span>{
                                    detalhePedido.dataEntrega
                                        ? detalhePedido.dataEntrega
                                        : detalhePedido.dataUltimaAtualizacao
                                            ? detalhePedido.dataUltimaAtualizacao
                                            : formatDatePedido(detalhePedido.dataPedido)
                                }</span></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>TOTAL DE ITENS: <span>{detalhePedido.itens.length}</span></p>
                                <p>TOTAL DE QUANTIDADES: <span>{detalhePedido.itens.reduce((total, item) => total + item.qtdVendida, 0)}</span></p>
                            </TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>
                                <p>FORMA DE PAGAMENTO: <span>{
                                    detalhePedido.formaPagamento
                                        ? getFormaPagamento(detalhePedido.formaPagamento, detalhePedido.condVenda)
                                        : getFormaPagamento(detalhePedido.idFormaPagamento, detalhePedido.idCondVenda)
                                }</span></p>
                            </TableCell>
                        </TableRow>
                        {detalhePedido.itens.length === 0 ? <></> :
                            <TableRow>
                                <TableCell>
                                    {detalhePedido.valor
                                        ? <p className='detalhe__info__total'>TOTAL: <span>{formatBR(detalhePedido.valor)}</span></p>
                                        : <p className='detalhe__info__total'>TOTAL: <span>{formatBR(detalhePedido.vlrTotal)}</span></p>
                                    }
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    );
};
