export const getCart = () => {
  return JSON.parse(localStorage?.getItem('localCart'));
};

export const addToCart = (course) => {
  const currentCart = JSON.parse(localStorage?.getItem('localCart')) || [];

  const arr = [...currentCart];

  if (!arr.some((c) => c?.id === course?.id)) {
    arr.push(course);
  }

  localStorage.setItem('localCart', JSON.stringify(arr));
};

export const removeItemToCart = (course) => {
  const currentCart = JSON.parse(localStorage?.getItem('localCart')) || [];

  const arr = [...currentCart];

  if (arr.some((c) => c?.id === course?.id)) {
    arr.pop(course);
  }

  localStorage.setItem('localCart', JSON.stringify(arr));
};

export const clearCart = () => {
  localStorage.removeItem('localCart');
};
