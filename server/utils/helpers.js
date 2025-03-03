// Função para converter snake_case para camelCase
const convertToCamelCase = (str) => {
  return str.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
};

// Função para converter as chaves do objeto
const convertObjectKeysToCamelCase = (obj) => {
  const newObj = {};
  Object.keys(obj).forEach((key) => {
    newObj[convertToCamelCase(key)] = obj[key];
  });
  return newObj;
};
