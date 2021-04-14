import React from 'react';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

export default () =>
    <Button
        style={{
            marginLeft: 'auto',
            backgroundColor: '#028743'
        }}
        variant='contained'
        color='primary'
        component={Link}
        to='/pedido'
    >
        ← Continuar comprando
    </Button>;