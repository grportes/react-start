import React from 'react';
import {useContext} from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

import useStyles from './styles';
import Contexto from 'Contexts/carrinho';
import isEmpty from 'Util/isEmpty';

const Componente = ({
    categoria,
    onClickFechar,
    onClickSubCategoria
}) => {

    const {setIdCategoriaSelecionada, subCategorias} = useContext(Contexto);

    useEffect(() => {
        if (isEmpty(categoria)) return;
        setIdCategoriaSelecionada(categoria['id']);
    },[categoria]);

    const classes = useStyles();

    if (isEmpty(categoria)) return (<></>);

    return (
        <>
            <List className={classes.titulo}>
                <ListItem
                    button
                    onClick={onClickFechar}
                >
                    <ListItemIcon><ChevronLeftIcon style={{color: 'white'}} /></ListItemIcon>
                    <ListItemText primary={categoria['descricao']} />
                </ListItem>
            </List>
            <Divider />
            <List>
                {subCategorias.map((descricao, index) => (
                    <ListItem
                        button
                        key={index}
                        onClick={_ => onClickSubCategoria(descricao)}
                    >
                        <ListItemText primary={descricao} />
                    </ListItem>
                ))}
            </List>
        </>
    );
};

Componente.propType = {
    categoria: PropTypes.object,
    onClickFechar: PropTypes.func,
    onClickSubCategoria: PropTypes.func,
};

Componente.defaultProps = {
    categoria: {},
    onClickFechar: () => {},
    onClickSubCategoria: () => {},
};

export default Componente;