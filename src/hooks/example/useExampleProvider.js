import { useState } from 'react';

function useExampleProvider() {
  const [example, setExample] = useState([]);

  return {
    example,
    setExample
  }
}

export default useExampleProvider;
