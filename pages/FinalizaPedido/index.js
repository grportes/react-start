import React from 'react';
import {useEffect} from 'react';
import {useContext} from 'react';
import Grid from '@material-ui/core/Grid';

import CarrinhoContext from 'Contexts/carrinho';
import {ParametroProvider} from 'Contexts/parametro';
import {FinalizaPedidoProvider} from 'Contexts/finalizaPedido';
import isEmpty from 'Util/isEmpty';
import ItensCarrinho from './components/ItensCarrinho';
import Checkout from './components/Checkout';
import SemItens from './components/SemItens';

export default () => {
    const {itens} = useContext(CarrinhoContext);
    useEffect(() => window.scrollTo(0,0),[]);
    return (
      <ParametroProvider>
        <FinalizaPedidoProvider>
            <div style={{display: isEmpty(itens) ? 'inherit': 'none'}}>
                <SemItens/>
            </div>
            <div style={{display: isEmpty(itens) ? 'none': 'inherit'}}>
                <Grid
                    container
                    spacing={3}
                    style={{marginTop:20}}
                >
                    <Grid item xs={12} md={7} >
                        <ItensCarrinho/>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Checkout />
                    </Grid>
                </Grid>
            </div>
          </FinalizaPedidoProvider>
      </ParametroProvider>
    );
};