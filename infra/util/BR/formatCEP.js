export default (value = '') => {
  if (value) {
    const newValue = value.replace(/\D/g, '');
    return newValue.replace(/^(\d{5})(\d)/, '$1-$2');
  }
  return value;
};
