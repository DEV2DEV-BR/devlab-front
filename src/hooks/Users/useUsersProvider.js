import React, { useState } from 'react';
import { useLocalStorage } from 'react-use';

function useUsersProvider() {
  const [userData, setUserData, removeUserData] = useLocalStorage('user', '');

  function storageUserData(user) {
    console.log(user)
    // setUserData(user);
  }

  return {
    userData,
    storageUserData
  }
}

export default useUsersProvider;
