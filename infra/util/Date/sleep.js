export default (segundos = 1) => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, segundos * 1000)
  });
};