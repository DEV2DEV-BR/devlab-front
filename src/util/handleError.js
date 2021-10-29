import { notify } from './toast';

export function returnError(error){
  const { data } = error?.response;
  notify(data?.message || 'Ocorreu um erro inesperado!', 1000, 'error');
}
