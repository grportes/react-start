import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import {useContext} from 'react';
import {Link} from 'react-router-dom'
import queryString from 'query-string'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

import useStyles from './styles';
import MessageContext from 'Contexts/message';
import LoadingContext from 'Contexts/loading';
import ClienteContext from 'Contexts/cliente';
import formatBR from 'Util/BR/formatBR';
import isEmpty from 'Util/isEmpty';
import sleep from 'Util/Date/sleep';
import {Api} from 'Services/api';

const pedidoService = Api.Pedido;

export default ({ location: { search } }) => {
  const classes = useStyles();
  const {cliente} = useContext(ClienteContext) || {};
  const {setLoading} = useContext(LoadingContext);
  const {msgErro} = useContext(MessageContext);
  const [pedido, setPedido] = useState({});

  useEffect(() => {
    window.scrollTo(0,0);
    const {id:idPedido} = queryString.parse(search) || {};
    if (isEmpty(idPedido)) return;
    (async () => {
      try {
        setLoading(true);
        let resumo = await pedidoService.buscarResumo(idPedido);
        if (isEmpty(resumo)) {
          await sleep(4); // AsyncElasticSearch!
          resumo = await pedidoService.buscarResumo(idPedido);
        }
        if (!isEmpty(resumo)) setPedido({...resumo});
      } catch (e) {
        msgErro(e);
      } finally {
        setLoading(false);
      }
    })();
  },[search]);

  const getDescricaoPagto = ({formaPagamento, condicaoPagamento, antecipado}) => {
    const getDias = () => ` - ${condicaoPagamento} dia(s)`
    return `${formaPagamento} ${(antecipado ? '' : getDias())}`;
  };

  const pedidoValido = !isEmpty(pedido);

  return (
    <div className={classes.container}>

      {
        pedidoValido
        && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
          }}>
            <CheckCircleOutlineIcon className={classes.icone}/>
            <Typography className={classes.textConfirmacao}>
              Pedido Efetuado Com Sucesso
            </Typography>
          </div>
        )
      }

      <Paper
        elevation={1}
        className={classes.paperMain}
      >
        <Typography color="textSecondary">
          Obrigado por comprar com o Arcom!<br/>
          Em breve você receberá no e-mail <u>{cliente.email}</u> um resumo da sua compra.
        </Typography>

        {
          pedido.antecipado
          && (
            <Alert
              severity='warning'
              style={{
                marginTop: '10px',
              }}
            >
              Este pedido só será faturado após o pagamento da boleta enviada no email {cliente.email}
            </Alert>
          )
        }

        {
          pedidoValido
          && (
            <>
              <Typography style={{
                fontSize: '24pt',
                marginTop: '10px',
                marginBottom: '10px'
              }}>
                {formatBR(Number(pedido.vlrTotal + pedido.vlrBoleto))}
              </Typography>

              <Typography color="textSecondary">
                Forma de pagamento : {getDescricaoPagto(pedido)}
                <br/>
                Prazo de entrega : {pedido.qtdeDiasEntrega} dia(s) úteis
                <br/>
                Endereço de entrega : {cliente.logradouro} {cliente.endereco}, {cliente.nroEndereco}<br/>{cliente.bairro}
              </Typography>

              <Divider style={{
                marginTop: '10px',
                marginBottom: '10px'
              }}/>
            </>
          )
        }

        <Typography color="textSecondary">
          Em caso de dúvidas entre em contato conosco pelo <br/>telefone
          <a href='tel:+553432184008'
             style={{
               textDecoration: "none",
               color: "black"
             }}> (34) 3218-4008</a>
        </Typography>

      </Paper>

      <Button
        style={{ margin: '24px' }}
        variant='outlined'
        color='primary'
        component={Link}
        to='/pedido'
      >
        ← Voltar ao início
      </Button>

    </div>
  );
};