import useExampleProvider from '../../hooks/example/useExampleProvider';
import ExampleContext from './ExampleContext';

export function ExampleProvider(props) {
  const valuesProvider = useExampleProvider();

  return (
    <ExampleContext.Provider value={valuesProvider}>
      {props.children}
    </ExampleContext.Provider>
  )
}