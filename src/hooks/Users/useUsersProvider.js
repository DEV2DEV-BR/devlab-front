import { useLocalStorage } from 'react-use';

function useUsersProvider() {
  const [userData, setUserData, removeUserData] = useLocalStorage('user', '');

  function storageUserData(user) {
    setUserData(user);
  }

  return {
    userData,
    storageUserData,
    removeUserData
  }
}

export default useUsersProvider;
