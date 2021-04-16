import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';

const Componente = ({
  label,
  checked,
  onChange,
  disabled,
}) => (label ? (
  <FormControlLabel
    label={label}
    control={(
      <Checkbox
        checked={checked}
        onChange={onChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
        disabled={disabled}
      />
    )}
  />
)
  : (
    <Checkbox
      checked={checked}
      onChange={onChange}
      inputProps={{ 'aria-label': 'primary checkbox' }}
      disabled={disabled}
    />
  ));

Componente.propTypes = {
  label: PropTypes.string,
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  disabled: PropTypes.bool,
};

Componente.defaultProps = {
  label: null,
  checked: false,
  onChange: () => {},
  disabled: false,
};

export default Componente;
