import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import Analytics from 'react-router-ga';
import {
  createMuiTheme,
  responsiveFontSizes,
  ThemeProvider,
} from '@material-ui/core/styles';
import { ptBR } from '@material-ui/core/locale';
import 'fontsource-roboto';

import { LoadingProvider } from 'Contexts/loading';
import Loading from 'Components/CustomLoading';
import { MessageProvider } from 'Contexts/message';
import App from './pages/App';
import registrarSW from './serviceWorker';

registrarSW();

let theme = createMuiTheme({
  palette: {
    primary: {
      main: '#51A559',
    },
  },
  status: {
    danger: 'orange',
  },
}, ptBR);

theme = responsiveFontSizes(theme);

ReactDOM.render(
  <BrowserRouter>
    <Analytics id="UA-163624979-1">
      <ThemeProvider theme={theme}>
        <LoadingProvider>
          <Loading>
            <MessageProvider>
              <App />
            </MessageProvider>
          </Loading>
        </LoadingProvider>
      </ThemeProvider>
    </Analytics>
  </BrowserRouter>,
  document.getElementById('container'),
);
