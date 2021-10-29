import React from 'react';
import useUsersProvider from '../../hooks/Users/useUsersProvider';
import UsersContext from './UsersContext';

export default function UsersProvider(props) {
  const valuesProvider = useUsersProvider();

  return (
    <UsersContext.Provider value={valuesProvider}>
      {props.children}
    </UsersContext.Provider>
  )
}
