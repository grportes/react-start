export default (value) => {
  if (value) {
    if (typeof value === 'number') {
      return parseFloat(value);
    }
    const newValue = value.replace(/\D/g, '');
    return newValue ? parseFloat(newValue) : null;
  }
  return null;
};
