import React from 'react';
import {useEffect} from 'react';
import {useState} from "react";
import {useContext} from "react";
import PropTypes from 'prop-types';
import Popper from '@material-ui/core/Popper';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Pagination from '@material-ui/lab/Pagination';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import MenuItem from '@material-ui/core/MenuItem';

import useStyles from './styles';
import {chunk} from 'Util/Array';
import isEmpty from 'Util/isEmpty';
import Contexto from 'Contexts/carrinho';


const useSubCategoria = () => {

    const {
        categoria,
        subCategorias,
        pesquisarMercadoriaPorSubCategoria
    } = useContext(Contexto);
    const [mapSubCategorias, setMapSubCategorias] = useState(new Map());
    const [page, setPage] = useState([]);

    useEffect(() => {
        buscar();
    },[subCategorias]);

    const buscar = () => {
        if (isEmpty(subCategorias)) return;
        const dadosParticionados = chunk( subCategorias, 10 );
        const dadosPaginados = new Map( dadosParticionados.map((value,index) => [index+1, value]) );
        setMapSubCategorias(dadosPaginados);
        setPage(dadosPaginados.get(1));
    };

    const filtrar = page => setPage(mapSubCategorias.get(page));

    return [
        chunk(page,5),
        mapSubCategorias.size,
        filtrar,
        categoria,
        pesquisarMercadoriaPorSubCategoria
    ]

};

const Componente = ({
    elementoAncora,
    onClose
}) => {

    const [
        mapSubCategorias,
        qtde,
        filtrar,
        categoria,
        buscarMercadoria
    ] = useSubCategoria(elementoAncora);

    const open = Boolean(elementoAncora);
    const id = open ? 'filtraSubCategoriaMercadoria' : undefined;
    const classes = useStyles();
    const menu1 = mapSubCategorias[0];
    const menu2 = mapSubCategorias[1];

    return (
        <Popper
            id={id}
            open={open}
            anchorEl={elementoAncora}
        >
            <ClickAwayListener onClickAway={onClose}>
                <Paper className={classes.containerSubCategoria}>
                    <Grid
                        container
                        direction='row'
                        spacing={2}
                    >
                        <Grid item>
                            {
                                menu1 &&
                                menu1.map((mapSubCategoria,index) => (
                                    <MenuItem
                                        className={classes.nav_barr_subCategoria___item}
                                        key={index}
                                        onClick={()=>{
                                            buscarMercadoria(mapSubCategoria);
                                            onClose();
                                        }}
                                    >
                                        {mapSubCategoria}
                                    </MenuItem>
                                ))
                            }
                        </Grid>
                        <Grid item>
                            {
                                menu2 &&
                                menu2.map((mapSubCategoria,index) => (
                                    <MenuItem
                                        className={classes.nav_barr_subCategoria___item}
                                        key={index}
                                        onClick={()=>{
                                            buscarMercadoria(mapSubCategoria);
                                            onClose();
                                        }}
                                    >
                                        {mapSubCategoria}
                                    </MenuItem>
                                ))
                            }
                        </Grid>
                    </Grid>
                    <Pagination
                        count={qtde}
                        color='primary'
                        onChange={(ev,page) => filtrar(page)}
                    />
                </Paper>
            </ClickAwayListener>

        </Popper>
    );
};

Componente.propType = {
    elementoAncora: PropTypes.element,
    onClose: PropTypes.func
};

Componente.defaultProps = {
    elementoAncora: undefined,
    onClose: () => {},
};

export default Componente;