import React from 'react';
import {useContext} from 'react';
import {useRef} from 'react';
import {useEffect} from 'react';
import Paper from '@material-ui/core/Paper';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import './index.css';
import useStyles from './styles';
import Contexto from 'Contexts/carrinho';
import toCamelCase from 'Util/String/toCamelCase';
import isEmpty from 'Util/isEmpty';

const dados = [
    {marca: "BANANA BOAT", src: "https://compre.arcom.com.br/imagens/produtos/bananaboat.png"},
    {marca: "BOZZANO", src: "https://compre.arcom.com.br/imagens/produtos/bozzano.png"},
    {marca: "DENTIL", src: "https://compre.arcom.com.br/imagens/produtos/dentil.png"},
    {marca: "ENERGIZER", src: "https://compre.arcom.com.br/imagens/produtos/energizer.png"},
    {marca: "EVEREADY", src: "https://compre.arcom.com.br/imagens/produtos/eveready.png"},
    {marca: "FRUCTIS", src: "https://compre.arcom.com.br/imagens/produtos/fructis.png"},
    {marca: "HERSHEYS", src: "https://compre.arcom.com.br/imagens/produtos/hersheys.png"},
    {marca: "ISABABY", src: "https://compre.arcom.com.br/imagens/produtos/isababy.png"},
    {marca: "ISACARE", src: "https://compre.arcom.com.br/imagens/produtos/isacare.png"},
    {marca: "SCHICK", src: "https://compre.arcom.com.br/imagens/produtos/schick.png"},
    {marca: "STARLUX", src: "https://compre.arcom.com.br/imagens/produtos/starlux.png"},
    {marca: "STARSCHOOL", src: "https://compre.arcom.com.br/imagens/produtos/starschool.png"},
    {marca: "TRIM", src: "https://compre.arcom.com.br/imagens/produtos/trim.png"},
    {marca: "WINNER", src: "https://compre.arcom.com.br/imagens/produtos/winner.png"}
];

const Componente = () => {

    const {
        pesquisarMercadoriaPorDescricao,
        pesquisarMercadoriaPorSubCategoria,
        subCategorias,
        listaMercadoria
    } = useContext(Contexto);

    const subCategoriasRef = useRef(null);
    const classes = useStyles();

    useEffect(() => {
        if (isEmpty(listaMercadoria)) return;
        const {query} = listaMercadoria;
        subCategoriasRef.current.hidden = query.hasOwnProperty('descricaoMercadoria');
    },[listaMercadoria]);

    return (
        <>
            <div ref={subCategoriasRef}>
                {
                    subCategorias && (
                    <List className="subcategorias" component="nav">
                        {subCategorias.map((sub) => (
                            <ListItem
                                key={sub}
                                button
                                onClick={() => pesquisarMercadoriaPorSubCategoria(sub)}>
                                <span className="subcategoria-text">
                                    {toCamelCase(sub.toLowerCase())}
                                </span>
                            </ListItem>
                        ))}
                    </List>
                )}
            </div>
            <Paper className={classes.paper}>
                <Typography variant="overline" display="block" gutterBottom>
                    Produtos MAPEX
                </Typography>
                <MenuList className="menu-list">
                    {
                        dados.map((row) => (
                            <MenuItem
                                key={row.marca}
                                className="menu-list-item"
                                onClick={() => {
                                    subCategoriasRef.current.hidden = true;
                                    pesquisarMercadoriaPorDescricao("*" + row.marca + "*");
                                }}>
                                <div
                                    key={row.marca}
                                    className="menu-list-item"
                                >
                                    <img
                                        className={classes.img}
                                        alt={row.marca}
                                        src={row.src}
                                    />
                                </div>
                            </MenuItem>
                        ))
                    }
                </MenuList>
            </Paper>
        </>
    );
};

export default Componente;
