import React from 'react';
import PropTypes from 'prop-types';
import Typography from '@material-ui/core/Typography';

const Componente = ({
  variant,
  children,
  color,
  align,
}) => (
  <Typography
    variant={variant}
    color={color}
    align={align}
    gutterBottom
  >
    {children}
  </Typography>
);

Componente.propTypes = {
  variant: PropTypes.string,
  children: PropTypes.node,
  color: PropTypes.string,
  align: PropTypes.string,
};

Componente.defaultProps = {
  variant: 'overline',
  children: undefined,
  color: 'inherit',
  align: 'inherit',
};

export default Componente;
