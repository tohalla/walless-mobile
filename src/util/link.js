export const isValid = url =>
  url.startsWith('walless://');

export const parse = url => {
  const [path, value] = url.replace('walless://', '').split('/');
  return isValid(url) ? {path, value} : {};
};
