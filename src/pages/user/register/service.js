import { request } from 'umi';
export async function registerHandler(params) {
  return request('/users/register/', {
    method: 'POST',
    data: params,
  });
}
