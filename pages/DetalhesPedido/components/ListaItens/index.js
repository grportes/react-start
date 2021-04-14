import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';

import "./index.css";
import FotoMercadoria from "Components/CustomFotoMercadoria";
import formatBR from "Util/BR/formatBR";

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import TableContainer from '@material-ui/core/TableContainer';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';

export default (props) => {

    const history = useHistory();

    const { detalhePedido } = props

    if (Object.keys(detalhePedido).length === 0) { history.push('/minha-conta') }

    else return (
        <Grid item>
            <TableContainer component={Paper}>
                {detalhePedido.itens && detalhePedido.itens.length === 0 ? <></> :
                    <Table aria-label="simple table">
                        <TableHead>
                            <TableRow>
                                <TableCell>ITENS</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {detalhePedido.itens && detalhePedido.itens.map((item, index) => (
                                <TableRow key={item.idMercadoria ? item.idMercadoria : index}>
                                    <TableCell>
                                        <Grid container direction="row">
                                            <div className='item__pedido'>
                                                <FotoMercadoria
                                                    codigoFoto={item.codigoFoto}
                                                    style={{ width: 110, height: 110, padding: 22, margin: 0 }}
                                                />
                                                <div className='item__info'>
                                                    <p className='item__info__desc'> {
                                                        item.descricaoCompleta
                                                            ? item.descricaoCompleta
                                                            : 'NULL'
                                                    }</p>
                                                    <p>QUANTIDADE: <span>{
                                                        item.qtdVendida
                                                            ? item.qtdVendida
                                                            : 'NULL'
                                                    }</span></p>
                                                    <p className='item__info__total'>{
                                                        item.vlrPrecoBase
                                                            ? formatBR(item.vlrPrecoBase)
                                                            : 'NULL'
                                                    }</p>
                                                </div>
                                            </div>
                                        </Grid>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                }
            </TableContainer>
        </Grid>
    );
};