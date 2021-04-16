export default (value = '') => {
  if (value) {
    let newValue = value.replace(/\D/g, '');
    newValue = newValue.replace(/^(\d{2})(\d)/g, '($1) $2');
    return newValue.replace(/(\d)(\d{4})$/, '$1-$2');
  }
  return value;
};
