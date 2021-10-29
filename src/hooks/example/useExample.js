import { useContext } from 'react';
import ExampleContext from '../../contexts/example/ExampleContext';

function useExample() {
  return useContext(ExampleContext);
}

export default useExample;
