export default (value = '') => {
  if (value) {
    const newValue = value.replace(/\D/g, '');
    return newValue.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,
      '$1.$2.$3/$4-$5',
    );
  }
  return value;
};
