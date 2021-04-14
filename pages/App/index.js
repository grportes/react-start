import React, { useEffect, useReducer } from 'react';
import { useHistory } from 'react-router-dom';

import Message from 'Components/CustomMsg2';
import { ClienteProvider } from 'Contexts/cliente';
import TokenRepository from 'Repository/TokenRepository';
import { isValidBrowser, getQueryString } from 'Util/Document';
import Login from './components/Login';
import TrocaSenha from './components/TrocaSenha';
import BackgroundSedeArcom from './components/BackgroundSedeArcom';
import AvisoBrowserIncompativel from './components/AvisoBrowserIncompativel';
import Home from './components/Home';

const initialState = {
  login: false,
  trocaSenha: false,
  home: false,
  navegadorInvalido: false,
  id: null,
  key: null,
};

export default () => {
  const history = useHistory();
  const [acao, setAcao] = useReducer((state, action) => {
    switch (action.type) {
      case 'NAVEGADOR_INVALIDO':
        return { ...initialState, navegadorInvalido: true };
      case 'LOGIN':
        return { ...initialState, login: true };
      case 'TROCA_SENHA':
        return { ...initialState, ...{ ...action.payload, trocaSenha: true } };
      case 'HOME':
        return { ...initialState, ...{ ...action.payload, home: true } };
      default:
        return state;
    }
  }, initialState);

  useEffect(() => {
    if (isValidBrowser()) {
      if (TokenRepository.isAuthenticated()) {
        setAcao({
          type: 'HOME',
          payload: { idClienteSession: `NULL-${String(Math.random())}` },
        });
      } else {
        const { id, key } = getQueryString() || {};
        if (id && key) {
          setAcao({
            type: 'TROCA_SENHA',
            payload: { idUsuario: parseInt(id, 10), key },
          });
        } else {
          setAcao({ type: 'LOGIN' });
        }
      }
    } else {
      setAcao({ type: 'NAVEGADOR_INVALIDO' });
    }
  }, []);

  return (
    <>
      {
        acao.login
        && (
        <Login
          onLoginSuccess={(idClienteSession) => {
            history.push('/');
            setAcao({ type: 'HOME', payload: { idClienteSession } });
          }}
        />
        )
      }

      {
        acao.trocaSenha
        && (
        <TrocaSenha
          idUsuario={acao.idUsuario}
          keyTrocaAcesso={acao.key}
          onExit={() => {
            history.push('/');
            setAcao({ type: 'LOGIN' });
          }}
        />
        )
      }

      {
        acao.home
        && (
        <ClienteProvider>
          <Home
            idClienteSession={acao.idClienteSession}
            onLogout={() => setAcao({ type: 'LOGIN' })}
          />
        </ClienteProvider>
        )
      }

      {
        acao.navegadorInvalido
        && (
        <BackgroundSedeArcom>
          <AvisoBrowserIncompativel />
        </BackgroundSedeArcom>
        )
      }

      <Message />
    </>
  );
};
