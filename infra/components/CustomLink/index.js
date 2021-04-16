import React from 'react';
import PropTypes from 'prop-types';
import Link from '@material-ui/core/Link';

const Componente = ({ onClick, children }) => (
  <Link
    component="button"
    variant="body2"
    style={{ textAlign: 'center' }}
    onClick={onClick}
  >
    { children }
  </Link>
);

Componente.propTypes = {
  onClick: PropTypes.func,
  children: PropTypes.node.isRequired,
};

Componente.defaultProps = {
  onClick: () => {},
};

export default Componente;
