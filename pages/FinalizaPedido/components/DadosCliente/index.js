import React from 'react';
import { useContext } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import ClienteContext from 'Contexts/cliente';
import formatCnpjCpf from 'Util/BR/formatCnpjCpf';

export default () => {
  const {cliente} = useContext(ClienteContext);
  return (
    <Grid
      container
      direction='column'
      style={{padding: 16}}
    >
      <Grid item xs>
        <Typography variant='body1' gutterBottom>
          {cliente.razaoSocial}
        </Typography>
        <Typography variant='body2' gutterBottom style={{fontWeight: 300}}>
          {formatCnpjCpf(cliente.cnpj)}
        </Typography>
        <Typography variant='body2' gutterBottom style={{fontWeight: 300}}>
          {cliente.endereco}, {cliente.nroEndereco}
        </Typography>
      </Grid>
    </Grid>
  );
};