import React, {
  useState, useRef, useContext,
} from 'react';
import ReactGA from 'react-ga';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import { Api } from 'Services/api';
import LoadingContext from 'Contexts/loading';
import MessageContext from 'Contexts/message';
import TokenRepository from 'Repository/TokenRepository';
import SessionRepository from 'Repository/SessionRepository';
import isEmpty from 'Util/isEmpty';
import Link from 'Components/CustomLink';
import LoginContext from '../../contexts';

const segurancaService = Api.Seguranca;

const Componente = ({ onLoginSuccess }) => {
  const { setLoading } = useContext(LoadingContext);
  const { msgErro, msgAviso } = useContext(MessageContext);
  const {
    exibirRecuperarSenha,
    exibirQueroSerCliente,
  } = useContext(LoginContext);
  const iptCnpj = useRef(null);
  const iptSenha = useRef(null);
  const [msgErroCNPJ, setMsgErroCNPJ] = useState('');
  const [msgErroSenha, setMsgErroSenha] = useState('');

  const setarFoco = () => setTimeout(() => {
    if (iptCnpj && iptCnpj.current) iptCnpj.current.focus();
  }, 200);

  const autenticar = async () => {
    const cnpj = iptCnpj.current.value;
    if (isEmpty(cnpj)) {
      setMsgErroCNPJ('Obrigatório informar o CNPJ');
      setarFoco();
      return;
    }
    let registrarGA = {};
    try {
      setLoading(true);
      const senha = iptSenha.current.value;
      if (isEmpty(senha)) {
        setMsgErroSenha('Obrigatório informar a Senha');
        return;
      }
      const cliente = await segurancaService.login(parseInt(cnpj), senha);
      if (isEmpty(cliente)) {
        msgAviso('Não foi possivel concluir solicitação! Tente novamente!');
        return;
      }
      TokenRepository.set(cliente.token);
      const idClienteSession = SessionRepository.set(cliente);
      onLoginSuccess(idClienteSession);
      registrarGA = { action: 'login' };
    } catch (error) {
      msgErro(error);
    } finally {
      setLoading(false);
      if (!isEmpty(registrarGA)) {
        registrarGA = {
          ...registrarGA,
          ...{
            category: 'user',
            label: `CNPJ: ${cnpj}`,
          },
        };
        ReactGA.event(registrarGA);
      }
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

      <div style={{ height: 12 }} />

      <TextField
        label="Senha"
        variant="filled"
        type="password"
        defaultValue=""
        inputRef={iptSenha}
        helperText={msgErroSenha}
        error={!isEmpty(msgErroSenha)}
        onBlur={() => {
          if (!isEmpty(msgErroSenha) && !isEmpty(iptCnpj.current.value)) setMsgErroSenha('');
        }}
        fullWidth
      />

      <div style={{
        marginTop: '10px',
        float: 'right',
      }}
      >
        <Link onClick={exibirRecuperarSenha}>Esqueci a senha</Link>
      </div>

      <Button
        variant="contained"
        fullWidth
        size="large"
        style={{
          marginTop: 24,
          marginBottom: 24,
          color: 'white',
          backgroundColor: '#028743',
        }}
        onClick={autenticar}
      >
        ENTRAR
      </Button>

      <Link onClick={exibirQueroSerCliente}>
        <>
          <span>Não tem cadastro? </span>
          <span style={{ fontWeight: 'bold' }}>Clique aqui</span>
        </>
      </Link>
    </>
  );
};

Componente.propTypes = {
  onLoginSuccess: PropTypes.func,
};

Componente.defaultProps = {
  onLoginSuccess: () => {},
};

export default Componente;
