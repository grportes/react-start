import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Fab from '@material-ui/core/Fab';
import DoneIcon from '@material-ui/icons/Done';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';

import isEmpty from 'Util/isEmpty';
import useStyles from './styles';

const Componente = ({
  type,
  variant,
  color,
  children,
  endIcon,
  flutuanteEsquerda,
  flutuanteDireita,
  onClick,
}) => {
  if (flutuanteEsquerda || flutuanteDireita) {
    const classes = useStyles();
    const classFab = flutuanteEsquerda ? classes.fabL : classes.fabR;
    const defaultIcon = flutuanteEsquerda
      ? <KeyboardArrowLeft />
      : <DoneIcon />;
    return isEmpty(children)
      ? (
        <Fab
          type={type}
          color="primary"
          className={classFab}
          onClick={onClick}
        >
          { defaultIcon }
        </Fab>
      )
      : (
        <Fab
          type={type}
          color="primary"
          className={classFab}
          onClick={onClick}
        >
          { children }
        </Fab>
      );
  }
  return (
    <Button
      type={type}
      variant={variant}
      color={color}
      endIcon={endIcon}
      onClick={onClick}
    >
      {children}
    </Button>
  );
};

Componente.propTypes = {
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['contained', 'outlined', 'text']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  children: PropTypes.node,
  endIcon: PropTypes.node,
  flutuanteEsquerda: PropTypes.bool,
  flutuanteDireita: PropTypes.bool,
  onClick: PropTypes.func,
};

Componente.defaultProps = {
  type: 'button',
  variant: 'contained',
  color: 'primary',
  children: undefined,
  endIcon: undefined,
  flutuanteEsquerda: false,
  flutuanteDireita: false,
  onClick: () => {},
};

export default Componente;
