const isValidCPF = (value = '') => {
  if (!value) return false;
  const cpf = value.toString().replace(/\.|\-/g, '');
  let soma1 = 0;
  let soma2 = 0;
  let vlr = 11;
  for (let i = 0; i < 9; i += 1) {
    soma1 += parseInt(cpf.charAt(i) * (vlr - 1), 10);
    soma2 += parseInt(cpf.charAt(i) * vlr, 10);
    vlr -= 1;
  }
  soma1 = (((soma1 * 10) % 11) === 10 ? 0 : ((soma1 * 10) % 11));
  soma2 = (((soma2 + (2 * soma1)) * 10) % 11);
  const digito = parseInt(cpf.charAt(9) + cpf.charAt(10), 10);
  return ((soma1 * 10) + soma2) === digito;
};

const isValidCNPJ = (value = '') => {
  if (!value) return false;
  const cnpj = value.toString().replace(/\.|\-|\//g, '');
  const valida = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  let dig1 = 0;
  let dig2 = 0;
  for (let i = 0; i < valida.length; i += 1) {
    dig1 += (i > 0 ? (cnpj.charAt(i - 1) * valida[i]) : 0);
    dig2 += cnpj.charAt(i) * valida[i];
  }
  dig1 = (((dig1 % 11) < 2) ? 0 : (11 - (dig1 % 11)));
  dig2 = (((dig2 % 11) < 2) ? 0 : (11 - (dig2 % 11)));
  const digito = parseInt(cnpj.charAt(12) + cnpj.charAt(13), 10);
  return (((dig1 * 10) + dig2) === digito);
};

const isValidCEP = (value = '') => {
  if (typeof value !== 'string') return false;
  const cep = value.trim();
  return cep.length > 0 && /^[0-9]{5}-[0-9]{3}$/.test(cep);
};

const isValidEmail = (value = '') => {
  if (typeof value !== 'string') return false;
  const exclude = /[^@\-\.\w]|^[_@\.\-]|[\._\-]{2}|[@\.]{2}|(@)[^@]*\1/;
  const check = /@[\w\-]+\./;
  const checkend = /\.[a-zA-Z]{2,3}$/;
  const invalid = value.search(exclude) !== -1
    || value.search(check) === -1
    || value.search(checkend) === -1;
  return !invalid;
};

const isValidDDDFone = (value = '') => {
  if (typeof value !== 'string') return false;
  const regex = /(\(?\d{2}\)?\s)(\d{4,5}\-\d{4})/;
  return regex.test(value);
};

export default ({ value = '', tipo = '' }) => {
  if (typeof tipo !== 'string') return false;
  switch (tipo.trim().toUpperCase()) {
    case 'CPF':
      return isValidCPF(value);
    case 'CNPJ':
      return isValidCNPJ(value);
    case 'CEP':
      return isValidCEP(value);
    case 'EMAIL':
      return isValidEmail(value);
    case 'DDD-FONE':
      return isValidDDDFone(value);
    default:
      return false;
  }
};
