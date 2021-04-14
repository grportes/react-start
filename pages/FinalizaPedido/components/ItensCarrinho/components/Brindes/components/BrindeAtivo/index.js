import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

import FotoMercadoria from "Components/CustomFotoMercadoria";
import toLocaleDateString from 'Util/BR/toLocaleDateString';
import isEmpty from 'Util/isEmpty';

const Componente = ({
    item,
    dataEncerramento
}) => {

    if (isEmpty(item)) return <></>;

    return (
        <>
            <FotoMercadoria
                codigoFoto={item.codigoFoto}
                style={{width: 110, marginTop: 12}}
            />
            <Typography variant='body2'>{item.descricaoCompleta}</Typography>
            <div style={{display: 'flex'}}>
                <Typography variant='body2'>QTDE: {item.qtdItem}</Typography>
                <Typography variant='body2' style={{marginLeft: '15px'}}>PROMOÇÃO VÁLIDA: {toLocaleDateString(dataEncerramento)}</Typography>
            </div>
        </>
    )
};

Componente.propType = {
    dataEncerramento: PropTypes.object,
    item: PropTypes.object
};

Componente.defaultProps = {
    dataEncerramento: null,
    itens: {}
};

export default Componente;