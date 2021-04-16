const setFocus = (el = {}) => {
  const { current } = el;
  if (current) setTimeout(() => current.focus(), 200);
};

export default setFocus;
