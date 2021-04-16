import React from 'react';
import PropTypes from 'prop-types';

import toJson from 'Util/Form/toJson';

const Componente = ({
  onSubmit,
  className,
  children,
}) => (
  <form
    onSubmit={(e) => {
      e.preventDefault();
      onSubmit(toJson(e.target));
    }}
    className={className}
    autoComplete="off"
  >
    {children}
  </form>
);

Componente.propTypes = {
  onSubmit: PropTypes.func,
  className: PropTypes.string,
  children: PropTypes.node,
};

Componente.defaultProps = {
  onSubmit: () => {},
  className: '',
  children: undefined,
};

export default Componente;
