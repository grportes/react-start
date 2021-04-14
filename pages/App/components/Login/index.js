import React, {
  useContext,
  useState,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';

import Dialog from 'Components/CustomDialogAviso';
import Texto from 'Components/CustomTexto';
import isEmpty from 'Util/isEmpty';
import BackgroundSedeArcom from '../BackgroundSedeArcom';
import LoginContext, {
  LoginProvider,
} from './contexts';
import FazLogin from './components/FazLogin';
import QueroSerCliente from './components/QueroSerCliente';
import RecuperarSenha from './components/RecuperarSenha';
import FormCadastroCliente from './components/FormCadastroCliente';

const Formulario = ({ onLoginSuccess }) => {
  const { view } = useContext(LoginContext) || {};
  const [exibirMsg, setExibirMsg] = useState(false);

  useEffect(() => {
    setExibirMsg(!isEmpty(view.mensagem));
  }, [view.mensagem]);

  if (view.recuperarSenha) {
    return (
      <BackgroundSedeArcom>
        <RecuperarSenha />
      </BackgroundSedeArcom>
    );
  }
  if (view.queroSerCliente) {
    return (
      <BackgroundSedeArcom>
        <QueroSerCliente />
      </BackgroundSedeArcom>
    );
  }
  if (view.cadastroCliente) {
    return (
      <BackgroundSedeArcom cabecalho="Cadastro">
        <FormCadastroCliente />
      </BackgroundSedeArcom>
    );
  }
  return (
    <BackgroundSedeArcom>
      <FazLogin onLoginSuccess={onLoginSuccess} />
      <Dialog
        open={exibirMsg}
        onClickOk={() => setExibirMsg(false)}
      >
        <Texto
          variant="h5"
          color="primary"
          align="center"
        >
          { view.mensagem }
        </Texto>
      </Dialog>
    </BackgroundSedeArcom>
  );
};

Formulario.propTypes = {
  onLoginSuccess: PropTypes.func,
};

Formulario.defaultProps = {
  onLoginSuccess: () => {},
};

const Componente = ({ onLoginSuccess }) => (
  <LoginProvider>
    <Formulario onLoginSuccess={onLoginSuccess} />
  </LoginProvider>
);

Componente.propTypes = {
  onLoginSuccess: PropTypes.func,
};

Componente.defaultProps = {
  onLoginSuccess: () => {},
};

export default Componente;
