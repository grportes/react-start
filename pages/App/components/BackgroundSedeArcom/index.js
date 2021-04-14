import React from 'react';
import PropTypes from 'prop-types';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import isEmpty from 'Util/isEmpty';
import useStyles from './styles';

// 100 VH
// 45 VH

const Componente = ({
  cabecalho,
  children,
}) => {
  const classes = useStyles();
  const paperClasse = isEmpty(cabecalho)
    ? classes.areaFormulario
    : classes.areaFormularioExtenso;
  const divClasse = isEmpty(cabecalho)
    ? classes.areaCabecalho
    : classes.areaCabecalhoExtenso;

  const Imagem = () => (
    <a href="http://www.arcom.com.br/">
      <img
        src="https://compre.arcom.com.br/imagens/produtos/logo.png"
        alt="logo arcom"
      />
    </a>
  );

  return (
    <div className={classes.fullPage}>
      <div className={classes.container}>
        <Paper className={paperClasse}>
          <div className={divClasse}>
            <Imagem />
            {
              !isEmpty(cabecalho)
              && <Typography variant="h4">{cabecalho}</Typography>
            }
          </div>
          {children}
        </Paper>
      </div>
    </div>
  );
};

Componente.propTypes = {
  cabecalho: PropTypes.string,
  children: PropTypes.node,
};

Componente.defaultProps = {
  cabecalho: null,
  children: undefined,
};

export default Componente;
