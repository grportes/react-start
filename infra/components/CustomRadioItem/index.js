import React from 'react';
import PropTypes from 'prop-types';
import Radio from '@material-ui/core/Radio';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Componente = ({
  value,
  disabled,
  label,
}) => (
  <FormControlLabel
    value={value || ''}
    disabled={disabled}
    control={<Radio />}
    label={label}
  />
);

Componente.propTypes = {
  value: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.string,
};

Componente.defaultProps = {
  value: null,
  disabled: false,
  label: '',
};

export default Componente;
