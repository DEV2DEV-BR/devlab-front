import { notify } from './toast';

export function returnError(error) {
  if (error?.response) {
    const { data } = error?.response;
    return notify(data?.message, 1000, 'error');
  }

  notify('Ocorreu um erro inesperado!', 1000, 'error');
}
