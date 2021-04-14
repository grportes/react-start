import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import Contexto from 'Contexts/carrinho';
import isEmpty from 'Util/isEmpty';

const Componente = ({onClickCategoria}) => {

    const {categorias} = useContext(Contexto);

    if (isEmpty(categorias)) return (<></>);

    return (
        <List>
            {
                categorias.filter(c => c.id > 0).map((categoria, index) => (
                <ListItem
                    button
                    key={index}
                    onClick={_ => onClickCategoria(categoria)}
                >
                    <ListItemText primary={categoria['descricao']} />
                </ListItem>
            ))}
        </List>
    );
};

Componente.propType = {
    onClickCategoria: PropTypes.func,
};

Componente.defaultProps = {
    onClickCategoria: () => {},
};

export default Componente;