export const getCart = () => {
  return JSON.parse(localStorage?.getItem('localCart'));
};

export const addToCart = (course) => {
  const currentCart = JSON.parse(localStorage?.getItem('localCart')) || [];

  const arr = [...currentCart];
  arr.push(course);

  localStorage.setItem('localCart', JSON.stringify(arr));
};
