import React from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

import useStyles from './styles';
import { Api } from 'Services/api';
import ClienteContext from 'Contexts/cliente';
import LoadingContext from 'Contexts/loading';
import MessageContext from "Contexts/message";
import formatDatePedido from "Util/BR/formatDatePedido";
import formataHistoricoPedido from './util/formataHistoricoPedido'
import sortHistoricoPedido from './util/sortHistoricoPedido'

const pedidoService = Api.Pedido;
const vendaService = Api.Venda;

const Componente = () => {

    const classes = useStyles();

    const [historicoPedido, setHistoricoPedido] = useState([]);
    const [historicoPedidoNaoProcessado, setHistoricoPedidoNaoProcessado] = useState([]);
    const { cliente } = useContext(ClienteContext);
    const { msgErro } = useContext(MessageContext);
    const { msgSucesso } = useContext(MessageContext);
    const { setLoading } = useContext(LoadingContext);

    useEffect(() => {
        (async () => {
            try {
                setLoading(true);
                const historicoPedidos = await pedidoService.historico(cliente.cnpj) || [];
                const historicoPedidosNP = await pedidoService.historicoNP(cliente.cnpj) || [];
                
                const historicoSemBrinde = historicoPedidos.filter((pedido) => pedido.tipoPedido === 1 || pedido.tipoPedido === null);
                const historicoPedidosFormatado = formataHistoricoPedido(historicoSemBrinde);
                
                sortHistoricoPedido(historicoPedidosFormatado);
                sortHistoricoPedido(historicoPedidosNP);

                setHistoricoPedido(historicoPedidosFormatado);
                setHistoricoPedidoNaoProcessado(historicoPedidosNP);
            } catch (e) {
                msgErro(e);
            } finally {
                setLoading(false);
            }
        })();
    }, []);


    const solicitaBoleto = async (notaFiscal) => {
        try {
            setLoading(true);
            const msg = await vendaService.segundaViaBoleto(cliente.cnpj, notaFiscal);
            msgSucesso(msg);
        } catch (e) {
            msgErro(e);
        } finally {
            setLoading(false);
        }
    };

    const solicitaXml = async (notaFiscal) => {
        try {
            setLoading(true);
            const msg = await vendaService.segundaViaXml(cliente.cnpj, notaFiscal);
            msgSucesso(msg);
        } catch (e) {
            msgErro(e);
        } finally {
            setLoading(false);
        }
    };

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Pedido</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Ultima Atualização</TableCell>
                        <TableCell>Nota Fiscal</TableCell>
                        <TableCell>Solicitar 2ª via Boleto</TableCell>
                        <TableCell>Solicitar 2ª via Xml</TableCell>
                        <TableCell>Detalhes do Pedido</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {/* Lista Pedidos Não-Processados */}
                    {historicoPedidoNaoProcessado.map(row => (
                        row.situacaoPedido && row.situacaoPedido === 1
                            ? <TableRow key={row.id.split("-")[1]}>
                                <TableCell component="th" scope="row">{row.id.split("-")[1]}</TableCell>
                                <TableCell>{'EM PROCESSAMENTO'}</TableCell>
                                <TableCell>{formatDatePedido(row.dataPedido)}</TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell></TableCell>
                                <TableCell>
                                    <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        className={classes.btnSolicitar}
                                        component={Link}
                                        to={{pathname: '/detalhes-pedido', state: row}}
                                        style={{ textDecoration: 'none' }}
                                    >Ver Detalhes</Button>
                                </TableCell>
                            </TableRow>
                            : <React.Fragment key={row.id.split("-")[1]}></React.Fragment>
                    ))}
                    {/* Lista Pedidos Processados */}
                    {historicoPedido.map(row => (
                        <TableRow key={row.nroPedido}>
                            <TableCell component="th" scope="row">{row.nroPedido}</TableCell>
                            <TableCell>{row.dataEntrega ? "ENTREGUE" : row.descricaoStatus}</TableCell>
                            <TableCell>{row.dataEntrega ? row.dataEntrega : row.dataUltimaAtualizacao}</TableCell>
                            <TableCell>{row.notaFiscal ? row.notaFiscal : ''}</TableCell>
                            <TableCell>{
                                row.notaFiscal
                                    ? <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        className={classes.btnSolicitar}
                                        onClick={() => {
                                            solicitaBoleto(row.notaFiscal);
                                        }}>Solicitar</Button>
                                    : ''
                            }
                            </TableCell>
                            <TableCell>{
                                row.notaFiscal
                                    ? <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        className={classes.btnSolicitar}
                                        onClick={() => {
                                            solicitaXml(row.notaFiscal);
                                        }}>Solicitar</Button>
                                    : ''
                            }
                            </TableCell>
                            <TableCell>{
                                row.dataPedido
                                    ? <Button
                                        size="small"
                                        variant="contained"
                                        color="primary"
                                        className={classes.btnSolicitar}
                                        component={Link}
                                        to={{pathname: '/detalhes-pedido', state: row}}
                                        style={{ textDecoration: 'none' }}
                                    >Ver Detalhes</Button>
                                    : <></>
                            }
                            </TableCell>
                        </TableRow>
                    ))}

                </TableBody>
            </Table>
        </TableContainer>
    );

};

export default Componente;