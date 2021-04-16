import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';

const Componente = ({
  type,
  titulo,
  variant,
  value,
  onChange,
  onBlur,
  defaultValue,
  name,
  inputRef,
  maxLength,
  textoAjuda,
  required,
  fullWidth,
  iconeDireita,
  onClickIconeDireita,
  textoErro,
  disabled,
}) => {
  let propriedades = {
    variant,
    value: (value || ''),
    required,
  };
  if (type) propriedades = { ...propriedades, type };
  if (titulo) propriedades = { ...propriedades, label: titulo };
  if (inputRef) propriedades = { ...propriedades, inputRef };
  if (onChange) propriedades = { ...propriedades, onChange };
  if (onBlur) propriedades = { ...propriedades, onBlur };
  if (name) propriedades = { ...propriedades, name };
  if (defaultValue) propriedades = { ...propriedades, defaultValue };
  if (maxLength > 0) {
    const inputProps = {
      maxLength,
    };
    propriedades = { ...propriedades, inputProps };
  }
  if (textoAjuda) propriedades = { ...propriedades, helperText: textoAjuda };
  if (fullWidth) propriedades = { ...propriedades, fullWidth };
  if (disabled) propriedades = { ...propriedades, disabled };
  if (iconeDireita) {
    const Btn = () => (
      <IconButton
        style={{
          paddingTop: '5px',
          paddingBottom: '5px',
        }}
        onClick={onClickIconeDireita}
      >
        { iconeDireita }
      </IconButton>
    );
    let { InputProps = {} } = propriedades;
    InputProps = { ...InputProps, endAdornment: <Btn /> };
    propriedades = { ...propriedades, InputProps };
  }
  if (textoErro) {
    propriedades = {
      ...propriedades,
      error: true,
      helperText: textoErro,
    };
  }

  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <TextField {...propriedades} />
  );
};

Componente.propTypes = {
  type: PropTypes.string,
  variant: PropTypes.oneOf(['filled', 'outlined', 'standard']),
  titulo: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onBlur: PropTypes.func,
  name: PropTypes.string,
  defaultValue: PropTypes.string,
  inputRef: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.shape({ current: PropTypes.any }),
  ]),
  maxLength: PropTypes.number,
  textoAjuda: PropTypes.string,
  required: PropTypes.bool,
  fullWidth: PropTypes.bool,
  iconeDireita: PropTypes.node,
  onClickIconeDireita: PropTypes.func,
  textoErro: PropTypes.string,
  disabled: PropTypes.bool,
};

Componente.defaultProps = {
  type: 'text',
  variant: 'standard',
  titulo: null,
  value: '',
  onChange: () => {},
  onBlur: () => {},
  name: '',
  defaultValue: null,
  inputRef: null,
  maxLength: null,
  textoAjuda: null,
  required: false,
  fullWidth: false,
  iconeDireita: undefined,
  onClickIconeDireita: () => {},
  textoErro: null,
  disabled: false,
};

export default Componente;
