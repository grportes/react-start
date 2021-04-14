import React from 'react';
import {useContext} from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

import formatBR from 'Util/BR/formatBR';
import ClienteContexto from 'Contexts/cliente';
import CarrinhoContexto from 'Contexts/carrinho';
import MessageContext from 'Contexts/message';

const Componente = ({onClickConfirmar}) => {
  const {msgAviso} = useContext(MessageContext);
  const {cliente} = useContext(ClienteContexto);
  const {totalPedido} = useContext(CarrinhoContexto);

  const onClickHandle = () => {
    const {valorMinimoPedido = 300} = cliente || {};
    const {geral= 0, stGeral = 0} = totalPedido || {};
    const vlrTotalPedido = geral - stGeral;
    if (vlrTotalPedido < valorMinimoPedido) {
      msgAviso(`Você ainda não atingiu o valor do pedido minimo! Ainda faltam R$ 
        ${formatBR(valorMinimoPedido - vlrTotalPedido)} de R$ ${valorMinimoPedido} em produtos.`);
    } else {
      onClickConfirmar();
    }
  };

  return (
    <Button
      style={{marginTop: 24, backgroundColor: '#028743'}}
      variant='contained'
      fullWidth
      color='primary'
      onClick={onClickHandle}
    >
      Enviar Pedido
    </Button>
  );
};

Componente.propTypes = {
  onClickConfirmar: PropTypes.func,
};

Componente.defaultProps = {
  onClickConfirmar: () => { },
};

export default Componente;