import React from 'react';
import {useEffect} from "react";
import {useState} from "react";
import {useContext} from 'react';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from "@material-ui/core/Breadcrumbs";

import Contexto from 'Contexts/carrinho';
import isEmpty from 'Util/isEmpty';

const Componente = () => {

    const {
        listaMercadoria
    } = useContext(Contexto);
    const [filtro, setFiltro] = useState([]);

    useEffect(() => {
        if (isEmpty(listaMercadoria)) return;
        setFiltro(listaMercadoria.query);
    }, [listaMercadoria]);

    return (
        <Breadcrumbs
            maxItems={2}
            aria-label='breadcrumb'
            // style={categoria !== '' ? {display: ""} : {display: "none"} }
            style={{ color: '#6A5892' }}
        >
            <Typography variant='h6' gutterBottom>
                {isEmpty(filtro.categoria) ? 'FILTRO' : filtro.categoria}
            </Typography>
            <Typography variant='h6' gutterBottom>
                {!isEmpty(filtro.subCategoria) ? filtro.subCategoria : isEmpty(filtro.descricaoMercadoria) ? '' : filtro.descricaoMercadoria}
            </Typography>
        </Breadcrumbs>
    );
};

export default Componente;