
import { useContext } from 'react';
import UsersContext from '../../contexts/Users/UsersContext';

function useUsers() {
  return useContext(UsersContext);
}

export default useUsers;
