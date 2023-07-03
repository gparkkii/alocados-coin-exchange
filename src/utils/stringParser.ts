export const formatWalletAsset = (value: number) => {
  const [integerPart, decimalPart] = value.toString().split('.');

  const formattedIntegerPart = integerPart.replace(
    /\B(?=(\d{3})+(?!\d))/g,
    ',',
  );

  if (decimalPart) {
    const slicedDecimalPart = decimalPart.slice(0, 10);
    return `${formattedIntegerPart}.${slicedDecimalPart}`;
  } else {
    return formattedIntegerPart;
  }
};

export const formatHistoryAsset = (value: number) => {
  const flooredNumber = Math.floor(value * 100) / 100;
  const numberWithCommas = flooredNumber
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  return numberWithCommas;
};

export const formatDate = (value: number) => {
  const date = new Date(value);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const ampm = date.getHours() < 12 ? 'AM' : 'PM';
  const hour = String(date.getHours() % 12 || 12).padStart(2, '0');
  const minute = String(date.getMinutes()).padStart(2, '0');

  const formattedDate = `${year}-${month}-${day} ${ampm} ${hour}:${minute}`;

  return formattedDate;
};
