import React from 'react';
import { useContext } from 'react';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import ListItemText from '@material-ui/core/ListItemText';

import size from 'Util/size';
import formatBR from 'Util/BR/formatBR';
import CarrinhoContext from 'Contexts/carrinho';
import FinalizaPedidoContext from 'Contexts/finalizaPedido';

const TotalItens = ({
  totalPedido,
  qtBrindes
}) => {
  if (qtBrindes === 0)
    return (
      <>
        {totalPedido.stGeral === 0 ? (
          <ListItem>
            <ListItemText secondary='SUBTOTAL'/>
            <ListItemText align='right'>
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.geral)}</span>
            </ListItemText>
          </ListItem>
        ) : (
          <>
            <ListItem>
              <ListItemText secondary='SUBTOTAL'/>
              <ListItemText align='right'>
                  <span style={{fontWeight: 600}}>{formatBR(totalPedido.geral - totalPedido.stGeral)}</span>
              </ListItemText>
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText secondary='IMPOSTO ST'/>
              <ListItemText align='right'>
                <span style={{fontWeight: 600}}>+ {formatBR(totalPedido.stGeral)}</span>
              </ListItemText>
            </ListItem>
            <Divider/>
            <ListItem>
              <ListItemText secondary='VALOR TOTAL'/>
              <ListItemText align='right'>
                <span style={{fontWeight: 600}}>{formatBR(totalPedido.geral)}</span>
              </ListItemText>
            </ListItem>
          </>
        )}
      </>
    );
  return (
    <>
      {totalPedido.stGeral === 0 ? (
        <>
          <ListItem>
            <ListItemText secondary='SUBTOTAL'/>
            <ListItemText align='right'>
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.normal)}</span>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText secondary='ITENS EM PROMOÇÃO'/>
            <ListItemText align="right">
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.mapex)}</span>
            </ListItemText>
          </ListItem>
        </>
      ) : (
        <>
          <ListItem>
            <ListItemText secondary='SUBTOTAL'/>
            <ListItemText align='right'>
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.normal - totalPedido.stNormal)}</span>
            </ListItemText>
          </ListItem>
          <Divider/>
          <ListItem>
            <ListItemText secondary='ITENS EM PROMOÇÃO'/>
            <ListItemText align="right">
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.mapex - totalPedido.stMapex)}</span>
            </ListItemText>
          </ListItem>
          {totalPedido.stGeral !== 0 && (
            <>
              <Divider/>
              <ListItem>
                <ListItemText secondary='IMPOSTO ST '/>
                <ListItemText align='right'>
                  <span style={{fontWeight: 600}}>{formatBR(totalPedido.stGeral)}</span>
                </ListItemText>
              </ListItem>
            </>
          )}
        </>
      )}
    </>
  );
};

export default () => {
  const {vlrBoleto, prazoEntrega, brindes} = useContext(FinalizaPedidoContext);
  const {totalPedido} = useContext(CarrinhoContext);

  return (
    <>
      <TotalItens
        totalPedido={totalPedido}
        qtBrindes={size(brindes)}
      />
      <Divider/>
      {
        vlrBoleto > 0 &&
        <>

          <ListItem>
            <ListItemText secondary='BOLETO:'/>
            <ListItemText align='right'>
              <span style={{fontWeight: 600}}>{formatBR(vlrBoleto)}</span>
            </ListItemText>
          </ListItem>

          <Divider/>

          <ListItem>
            <ListItemText secondary='VALOR TOTAL:'/>
            <ListItemText align='right'>
              <span style={{fontWeight: 600}}>{formatBR(totalPedido.geral + vlrBoleto)}</span>
            </ListItemText>
          </ListItem>

          <Divider/>
        </>
      }

      <ListItem>
        <ListItemText secondary="ENTREGA ARCOM (Frete Grátis)"/>
        <ListItemText align="right">
          <span style={{fontWeight: 600}}>{prazoEntrega} dias</span>
        </ListItemText>
      </ListItem>

    </>
  );
};