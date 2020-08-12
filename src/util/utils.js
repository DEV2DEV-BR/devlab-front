import firebase from 'firebase';
import { notify } from './toast';

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

export const updateLocalStorageMyCourses = (props) => {
  async function fetchData() {
    const db = firebase.firestore();

    const userRef = db.collection('users').doc(localStorage.getItem('user'));

    await userRef
      .get()
      .then(function (doc) {
        if (doc.exists) {
          localStorage.setItem(
            'myCourses',
            JSON.stringify(doc.data().myCourses)
          );
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
        notify('Agora você já pode estudar!', 1000, 'success');
        localStorage.removeItem('localCart');
        props.history.push('/dashboard');
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }
  fetchData();
};
