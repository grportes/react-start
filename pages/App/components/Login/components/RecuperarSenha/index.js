import React, {
  useState, useRef, useEffect, useContext,
} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Api } from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import isEmpty from 'Util/isEmpty';
import Link from 'Components/CustomLink';
import LoginContext from '../../contexts';

const segurancaService = Api.Seguranca;

export default () => {
  const { setLoading } = useContext(LoadingContext);
  const { msgSucesso, msgErro, msgAviso } = useContext(MessageContext);
  const { exibirLogin } = useContext(LoginContext);
  const iptCnpj = useRef(null);
  const [msgErroCNPJ, setMsgErroCNPJ] = useState('');

  const setarFoco = () => setTimeout(() => {
    if (iptCnpj && iptCnpj.current) iptCnpj.current.focus();
  }, 200);

  useEffect(() => {
    setarFoco();
  }, []);

  const solicitarCadastro = async () => {
    const cnpj = iptCnpj.current.value;
    if (isEmpty(cnpj)) {
      setMsgErroCNPJ('Obrigatório informar o CNPJ/CPF');
      setarFoco();
      return;
    }
    try {
      setLoading(true);
      iptCnpj.current.value = '';
      const {
        atendido,
        mensagem,
      } = await segurancaService.recuperarSenha(parseInt(cnpj)) || {};
      if (isEmpty(atendido)) {
        msgErro('Não foi possivel concluir solicitação! Tente mais tarde!');
        return;
      }
      const texto = atendido
        ? (mensagem || 'Solicitação concluída!')
        : (mensagem || 'Não foi possivel concluir solicitação! Tente mais tarde!');
      const setMsg = atendido ? msgSucesso : msgAviso;
      setMsg(texto);
      exibirLogin();
    } catch (error) {
      setarFoco();
      msgErro(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <TextField
        label="CNPJ ou CPF"
        variant="filled"
        type="number"
        inputRef={iptCnpj}
        defaultValue=""
        helperText={msgErroCNPJ}
        error={!isEmpty(msgErroCNPJ)}
        onInput={(e) => {
          e.target.value = Math.max(0, parseInt(e.target.value)).toString().slice(0, 14);
        }}
        onBlur={() => {
          if (!isEmpty(msgErroCNPJ) && !isEmpty(iptCnpj.current.value)) setMsgErroCNPJ('');
        }}
        fullWidth
      />
      <Button
        variant="contained"
        fullWidth
        size="large"
        style={{
          marginTop: 24, marginBottom: 24, color: 'white', backgroundColor: '#028743',
        }}
        onClick={solicitarCadastro}
      >
        SOLICITAR SENHA
      </Button>
      <Link onClick={exibirLogin}>
        <span style={{ fontWeight: 'bold' }}>{ '<<< Retornar' }</span>
      </Link>
    </>
  );
};
