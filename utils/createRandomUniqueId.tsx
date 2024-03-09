type CreateUniqueId = {
  digits?: number;
};

const createUniqueId = ({ digits = 7 }: CreateUniqueId): string => {
  const characters =
    'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let result = '';
  for (let i = 0; i < digits; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

export default createUniqueId;
