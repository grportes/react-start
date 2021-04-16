import React from 'react';
import PropTypes from 'prop-types';
import RadioGroup from '@material-ui/core/RadioGroup';

const Componente = ({
  value,
  onChange,
  name,
  children,
}) => (
  <RadioGroup
    aria-label={name}
    name={name}
    value={value}
    onChange={onChange}
  >
    {children}
  </RadioGroup>
);

Componente.propTypes = {
  value: PropTypes.string,
  name: PropTypes.string,
  onChange: PropTypes.func,
  children: PropTypes.node,
};

Componente.defaultProps = {
  value: null,
  name: '',
  onChange: () => {},
  children: undefined,
};

export default Componente;
