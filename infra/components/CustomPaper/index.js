import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';

const Componente = props => {

    const { classe } = props;

    let propriedades = {};

    if (classe)
        propriedades = { ...propriedades, ...{className: classe} };

    return (
        <Paper>
            <div
                {...propriedades}
            >
                {props.children}
            </div>
        </Paper>
    );
};

Componente.propType = {
    classe: PropTypes.string
};

Componente.defaultProps = {
    classe: ''
};

export default Componente;