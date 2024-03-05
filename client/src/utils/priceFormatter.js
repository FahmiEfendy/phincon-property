const priceFormatter = (price) => {
  const idrPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'IDR',
  });

  const formattedPrice = idrPrice.format(price).replace(/(\.|,)00$/g, '');

  return formattedPrice;
};

export default priceFormatter;
