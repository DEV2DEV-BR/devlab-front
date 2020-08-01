export const getCart = () => {
  return localStorage?.getItem('localCart');
};

export const addToCart = (id) => {
  const cart = [localStorage?.getItem('localCart')];
  console.log(cart);
  localStorage.setItem('localCart', [...cart, id]);
};
