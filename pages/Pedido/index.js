import React from 'react';
import {useContext} from "react";
import Grid from '@material-ui/core/Grid';

import './styles.css';
import DescricaoFiltroMercadoria from './components/DescricaoFiltroMercadoria';
import FiltroMapex from './components/FiltroMapex';
import ListaMercadorias from './components/ListaMercadorias';
import TermoDeUso from "./components/TermoDeUso";
import ClienteContext from "../../contexts/cliente";

const Componente = () => {

    const {cliente} = useContext(ClienteContext);
    const {termoDeUso = true} = cliente;

    return (
        <>
            <div className="full__width">
                <img className="page_pedido___banner"
                    src="https://compre.arcom.com.br/imagens/produtos/banner.jpg"
                    alt={"Compre Arcom"}/>
            </div>
            <Grid container spacing={1}>
                <Grid item xs={12} md={2}>
                    <FiltroMapex/>
                </Grid>
                <Grid item xs={12} md={10}>
                    <DescricaoFiltroMercadoria/>
                    <ListaMercadorias/>
                </Grid>
            </Grid>
            <TermoDeUso
                exibir={!termoDeUso}
            />
        </>
    );
};

export default Componente;