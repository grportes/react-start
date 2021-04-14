import React, {
  useEffect,
  useRef,
  useContext,
  useState,
} from 'react';

import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import Form from 'Components/CustomForm';
import RadioGroup from 'Components/CustomRadio';
import RadioGroupItem from 'Components/CustomRadioItem';
import Input from 'Components/CustomTxtField';
import Btn from 'Components/CustomBtn';
import Icone from 'Icons/CustomSetaDireita';
import { setFocus } from 'Util/Document';
import { parseFloat } from 'Util/Number';
import {
  formatCNPJ,
  formatCPF,
  validar,
} from 'Util/BR';
import { Api } from 'Services/api';
import LoginContext from '../../contexts';
import useStyles from './styles';
import isEmpty from '../../../../../../infra/util/isEmpty';

const getFormatador = (tipoCompra) => ({
  CNPJ: formatCNPJ,
  CPF: formatCPF,
})[tipoCompra] || (() => { });

const getMaxLength = (tipoCompra) => ({
  CNPJ: 14,
  CPF: 11,
})[tipoCompra] || 0;

const getTitulo = (tipoCompra) => ({
  CNPJ: 'Informe o CNPJ:',
  CPF: 'Informe o CPF:',
})[tipoCompra] || '?';

const INITIAL_STATE = {
  tipoCompra: 'CNPJ',
  nroInscricao: null,
  erroValidacao: null,
};

const Componente = () => {
  const {
    exibirLogin,
    exibirMensagem,
    exibirCadastroCliente,
  } = useContext(LoginContext);
  const { msgErro } = useContext(MessageContext);
  const { setLoading } = useContext(LoadingContext);

  const [cliente, setCliente] = useState(INITIAL_STATE);
  const iptNroInscricao = useRef(null);

  useEffect(() => setFocus(iptNroInscricao), [cliente.tipoCompra]);

  const classes = useStyles();

  const validarNroInscricao = () => {
    const { tipoCompra, nroInscricao } = cliente;
    const ok = validar({ value: nroInscricao, tipo: tipoCompra });
    if (!ok) {
      setCliente({ ...cliente, erroValidacao: `${tipoCompra} inválido!` });
    }
    return ok;
  };

  const enviarSolicitacao = async () => {
    if (!validarNroInscricao()) return;
    try {
      setLoading(true);
      const nroInscricao = parseFloat(cliente.nroInscricao);
      const pessoa = await Api.Seguranca.checkCliente(nroInscricao);
      if (isEmpty(pessoa)) {
        exibirCadastroCliente(cliente);
      } else {
        exibirMensagem({
          ...pessoa,
          ...cliente,
        });
      }
    } catch (e) {
      msgErro(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Form
        className={classes.container}
        onSubmit={enviarSolicitacao}
      >
        <RadioGroup
          value={cliente.tipoCompra}
          onChange={({ target }) => {
            setCliente({
              ...INITIAL_STATE,
              tipoCompra: target.value,
            });
          }}
        >
          <RadioGroupItem label="Comprar para revenda (CNPJ)" value="CNPJ" />
          <RadioGroupItem label="Comprar para consumo (CPF)" value="CPF" />
        </RadioGroup>
        <Input
          variant="outlined"
          titulo={getTitulo(cliente.tipoCompra)}
          value={cliente.nroInscricao}
          name="nroInscricao"
          onChange={({ target }) => {
            setCliente({
              ...cliente,
              nroInscricao: getFormatador(cliente.tipoCompra)(target.value),
              erroValidacao: null,
            });
          }}
          inputRef={iptNroInscricao}
          maxLength={getMaxLength(cliente.tipoCompra)}
          textoAjuda="Apenas números"
          textoErro={cliente.erroValidacao}
          required
        />
        <Btn
          type="submit"
          endIcon={<Icone />}
        >
          Avançar
        </Btn>
        <div>
          <Btn variant="text" onClick={exibirLogin}>
            <span style={{ fontWeight: 'bold' }}>{ '<<< Retornar' }</span>
          </Btn>
        </div>
      </Form>
    </>
  );
};

export default Componente;
