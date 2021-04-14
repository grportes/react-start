import React from 'react';
import MoodBadIcon from '@material-ui/icons/MoodBad';
import { Button } from '@material-ui/core';
import { Link } from 'react-router-dom'

import './index.css';
import Paper from 'Components/CustomPaper'

export default () =>
    <Paper classe='div-no-items'>
        <MoodBadIcon />
        <span style={{
            padding: 24,
            textAlign: 'center',
            fontFamily: 'Raleway'
        }}>
            Você ainda não tem nenhum item no seu carrinho. <br/>Para adicionar, clique no botão abaixo!
        </span>
        <Button
            variant='outlined'
            color='primary'
            component={Link}
            to='/pedido'>
            Selecionar itens
        </Button>
    </Paper>
