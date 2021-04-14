import React, {
  createContext,
  useReducer,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

const INITIAL_STATE = {
  fazLogin: false,
  recuperaSenha: false,
  queroSerCliente: false,
  cadastroCliente: false,
  possivelCliente: {},
  mensagem: null,
};

const Context = createContext({});
export default Context;

export const LoginProvider = ({ children }) => {
  const [view, setView] = useReducer((state, action) => {
    switch (action.type) {
      case 'LOGIN':
        return { ...INITIAL_STATE, fazLogin: true };
      case 'QUERO_SER_CLIENTE':
        return { ...INITIAL_STATE, queroSerCliente: true };
      case 'RECUPERAR_SENHA':
        return { ...INITIAL_STATE, recuperarSenha: true };
      case 'CADASTRO_CLIENTE':
        return {
          ...INITIAL_STATE,
          cadastroCliente: true,
          possivelCliente: { ...action.payload },
        };
      case 'MENSAGEM':
        return {
          ...INITIAL_STATE,
          fazLogin: true,
          mensagem: action.payload,
        };
      default:
        return state;
    }
  }, INITIAL_STATE);

  useEffect(() => setView({ type: 'LOGIN' }), []);

  const exibirLogin = () => setView({ type: 'LOGIN' });
  const exibirQueroSerCliente = () => setView({ type: 'QUERO_SER_CLIENTE' });
  const exibirRecuperarSenha = () => setView({ type: 'RECUPERAR_SENHA' });
  const exibirCadastroCliente = (cliente) => setView({
    type: 'CADASTRO_CLIENTE',
    payload: cliente,
  });

  const exibirMensagem = ({
    nroInscricao,
    temAcesso,
    email,
    tipoCompra,
  }) => {
    const payload = temAcesso
      ? `${tipoCompra} ${nroInscricao} já cadastrado! Em caso de perda de 
      senha, solicite nova senha através do link "Esqueci a senha"`
      : `Identificamos que o ${tipoCompra}: ${nroInscricao} é cliente Arcom, 
      portanto enviamos os procedimentos para o primeiro acesso 
      no email: ${email}`;
    setView({
      type: 'MENSAGEM',
      payload,
    });
  };

  return (
    <Context.Provider value={{
      view,
      exibirLogin,
      exibirQueroSerCliente,
      exibirRecuperarSenha,
      exibirCadastroCliente,
      exibirMensagem,
    }}
    >
      {children}
    </Context.Provider>
  );
};

LoginProvider.propTypes = {
  children: PropTypes.node,
};

LoginProvider.defaultProps = {
  children: undefined,
};
