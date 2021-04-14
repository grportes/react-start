import React, {
  useEffect,
  useRef,
  useContext,
  useState,
  useCallback,
} from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import Estados from 'Commons/SelectEstados';
import Form from 'Components/CustomForm';
import Input from 'Components/CustomTxtField';
import Btn from 'Components/CustomBtn';
import { setFocus } from 'Util/Document';
import {
  formatCNPJ,
  formatCPF,
  formatCEP,
  formatDDDFone,
  validar,
} from 'Util/BR';
import isEmpty from 'Util/isEmpty';
import { Api } from 'Services/api';
import LoginContext from '../../contexts';
import useStyles from './styles';

const INITIAL_STATE = {
  tipoCompra: 'CNPJ',
  nroInscricao: null,
  razaoSocial: null,
  email: null,
  responsavelContato: null,
  fone: null,
  cep: null,
  endereco: null,
  numero: null,
  complemento: null,
  bairro: null,
  cidade: null,
  estado: null,
  ibge: null,
};

const getMaxLength = (tipoCompra) => ({
  CNPJ: 14,
  CPF: 11,
})[tipoCompra] || 0;

const getTitulo = (tipoCompra) => ({
  CNPJ: 'Razão Social:',
  CPF: 'Nome:',
})[tipoCompra] || '?';

const Componente = () => {
  const {
    view: { possivelCliente },
    exibirQueroSerCliente,
  } = useContext(LoginContext) || {};
  const { msgErro, msgAviso } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);
  const [cliente, setCliente] = useState({ ...INITIAL_STATE });
  const [erros, setErros] = useState({});

  useEffect(() => {
    if (isEmpty(possivelCliente)) return;
    setCliente(possivelCliente);
  }, [possivelCliente]);

  const iptRazaoSocial = useRef(null);

  useEffect(() => setFocus(iptRazaoSocial), []);

  const setValue = ({ target }) => setCliente({
    ...cliente,
    [target.name]: (() => {
      switch (target.name) {
        case 'nroInscricao':
          return cliente.compraCNPJ
            ? formatCNPJ(target.value)
            : formatCPF(target.value);
        case 'cep':
          return formatCEP(target.value);
        default:
          return target.value;
      }
    })(),
  });

  const onConsultaCep = useCallback(() => {
    const { cep } = cliente;
    if (isEmpty(cep)) return;
    if (validar({ tipo: 'cep', value: cep })) {
      Api.Cep.consultar(cep, (localidade) => {
        if (!isEmpty(localidade)) setCliente({ ...cliente, ...localidade });
        setErros({ ...erros, cep: null });
      });
    } else {
      setErros({ ...erros, cep: 'Obrigatório!! - Ex. 38400-000' });
    }
  }, [cliente.cep]);

  const onCheckEmail = useCallback(() => {
    const { email } = cliente;
    if (isEmpty(email) || validar({ tipo: 'email', value: email })) {
      setErros({ ...erros, email: null });
    } else {
      setErros({ ...erros, email: 'Inválido' });
    }
  }, [cliente.email]);

  const validarFormulario = () => {
    const {
      nroInscricao, tipoCompra, email, fone,
    } = cliente;
    let dadosInvalido = {};
    if (!validar({ tipo: tipoCompra, value: nroInscricao })) {
      dadosInvalido = { ...dadosInvalido, nroInscricao: 'Inválido' };
    }
    if (!validar({ tipo: 'email', value: email })) {
      dadosInvalido = { ...dadosInvalido, email: 'Email Inválido' };
    }
    if (!validar({ tipo: 'ddd-fone', value: fone })) {
      dadosInvalido = { ...dadosInvalido, fone: 'Fone Inválido' };
    }
    return dadosInvalido;
  };

  const enviarFormulario = async () => {
    const dadosInvalidos = validarFormulario();
    if (!isEmpty(dadosInvalidos)) {
      setErros({ ...erros, ...dadosInvalidos });
      msgAviso('Favor corrigir informações');
      return;
    }
    try {
      setLoading(true);
      console.log(cliente);
    } catch (e) {
      msgErro(e);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();
  const modo600px = useMediaQuery(theme.breakpoints.up('sm'));
  const classes = useStyles();

  return (
    <Form
      className={classes.container}
      onSubmit={enviarFormulario}
    >
      <div className={classes.item}>
        <Input
          titulo={`${cliente.tipoCompra}:`}
          value={cliente.nroInscricao}
          name="nroInscricao"
          onChange={setValue}
          maxLength={getMaxLength(cliente.tipoCompra)}
          textoAjuda="Apenas números"
          required
          textoErro={erros.nroInscricao}
        />
        <Input
          inputRef={iptRazaoSocial}
          titulo={getTitulo(cliente.tipoCompra)}
          value={cliente.razaoSocial}
          name="razaoSocial"
          onChange={setValue}
          maxLength={255}
          fullWidth
          required
        />
      </div>

      <div className={classes.item}>
        <Input
          titulo="Responsável / Contato:"
          value={cliente.responsavelContato}
          name="responsavelContato"
          onChange={setValue}
          maxLength={255}
          disabled={cliente.tipoCompra === 'CPF'}
          fullWidth
          required={cliente.tipoCompra === 'CNPJ'}
        />
        <Input
          titulo="E-mail:"
          value={cliente.email}
          name="email"
          onChange={setValue}
          required
          fullWidth
          onBlur={onCheckEmail}
          textoErro={erros.email}
        />
      </div>

      <div className={classes.itemFone}>
        <div>
          <Input
            titulo="CEP:"
            value={cliente.cep}
            name="cep"
            onBlur={onConsultaCep}
            onChange={({ target }) => {
              const { value } = target;
              setCliente({ ...cliente, cep: formatCEP(value) });
            }}
            maxLength={9}
            required
            textoErro={erros.cep}
            textoAjuda="Apenas números"
            fullWidth={!modo600px}
          />
        </div>
        <div>
          <Input
            titulo="Telefone:"
            value={cliente.fone}
            name="fone"
            onChange={({ target }) => {
              const { value } = target;
              setCliente({ ...cliente, fone: formatDDDFone(value) });
            }}
            maxLength={15}
            textoAjuda="Apenas números"
            required
            textoErro={erros.fone}
            fullWidth={!modo600px}
          />
        </div>
      </div>

      <div className={classes.itemEndereco}>
        <div>
          <Input
            titulo="Endereço:"
            value={cliente.endereco}
            name="endereco"
            onChange={setValue}
            required
            fullWidth
          />
        </div>
        <div>
          <Input
            titulo="Nro:"
            value={cliente.numero}
            name="numero"
            onChange={setValue}
            required
          />
          <Input
            titulo="Complemento:"
            value={cliente.complemento}
            name="complemento"
            onChange={setValue}
            fullWidth
          />
        </div>
      </div>

      <div className={classes.itemBairro}>
        <div>
          <Input
            titulo="Bairro:"
            value={cliente.bairro}
            name="bairro"
            onChange={setValue}
            required
            fullWidth
          />
        </div>
        <div>
          <Input
            titulo="Cidade:"
            value={cliente.cidade}
            name="cidade"
            onChange={setValue}
            required
            fullWidth
          />
          <Estados
            value={cliente.estado}
            onChange={(estado) => setCliente({ ...cliente, estado })}
            required
          />
        </div>
      </div>

      {
        modo600px && (
          <div className={classes.itemBtnAcoes}>
            <Btn
              variant="text"
              onClick={exibirQueroSerCliente}
            >
              <span style={{ fontWeight: 'bold' }}>{ '<<< Retornar' }</span>
            </Btn>
            <Btn type="submit">ENVIAR</Btn>
          </div>
        )
      }

      {
        !modo600px && (
          <div className={classes.itemBtnAcoesMobile}>
            <Btn
              onClick={exibirQueroSerCliente}
              flutuanteEsquerda
            />
            <Btn type="submit" flutuanteDireita />
          </div>
        )
      }

    </Form>
  );
};

export default Componente;
