import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import {useState} from "react";
import TablePagination from "@material-ui/core/TablePagination";
import Grid from '@material-ui/core/Grid';

import './index.css';
import CarrinhoContext from 'Contexts/carrinho';
import ClienteContext from 'Contexts/cliente';
import ItemMercadoria from './components/ItemMercadoria';
import ImagemDialog from "Components/CustomImagemDialog";

import isEmpty from 'Util/isEmpty';

const Componente = () => {

    const {cliente} = useContext(ClienteContext);
    const {listaMercadoria, paginarListaMercadorias, mercadoriaSelecionada, openImagemDialog, setOpenImagemDialog} = useContext(CarrinhoContext);
    const [mercadorias, setMercadorias] = useState([]);
    const [totalMercadorias, setTotalMercadorias] = useState(0);
    const [nroPagina, setNroPagina] = useState(0);

    useEffect(() => {
        if (isEmpty(listaMercadoria)) return;
        setMercadorias(listaMercadoria.mercadorias);
        setTotalMercadorias(listaMercadoria.total);
        setNroPagina(listaMercadoria.pagina);
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    }, [listaMercadoria]);

    return (
        <>
            <Grid
                container
                spacing={3}
            >
                {
                    mercadorias.map(mercadoria => (
                        <Grid
                            key={mercadoria.idMercadoria}
                            container
                            item
                            xs={12} sm={6} md={4} lg={3}
                        >
                            <ItemMercadoria
                                mercadoria={mercadoria}
                                itemPromocao={!isEmpty(cliente) && cliente.promocaoAtiva && mercadoria.ehMapex}
                            />
                        </Grid>
                    ))}
                    <ImagemDialog
                        mercadoriaSelecionada={mercadoriaSelecionada}
                        openImagemDialog={openImagemDialog}
                        setOpenImagemDialog={setOpenImagemDialog}
                    />
            </Grid>

            <TablePagination
                component='div'
                rowsPerPage={24}
                page={nroPagina}
                count={totalMercadorias}
                onChangePage={(event, newPage) => {
                    setNroPagina(newPage);
                    paginarListaMercadorias(newPage);
                }}
                rowsPerPageOptions={[]}
            />
        </>
    );
};

export default Componente;