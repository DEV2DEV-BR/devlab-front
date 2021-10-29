import { useLocalStorage } from 'react-use';

function useUsersProvider() {
  const [userData, setUserData, removeUserData] = useLocalStorage('user', '');

  function storageUserData(user) {
    setUserData(user);
  }

  return {
    userData,
    storageUserData
  }
}

export default useUsersProvider;
