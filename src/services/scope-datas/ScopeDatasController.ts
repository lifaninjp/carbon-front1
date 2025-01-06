import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const scopeDatasAPIPrefix = `${API_URL}/scope-datas/`;

export async function getScopeDatas(
  params?: ScopeDatasAPI.FilterScopeDatasInput,
  options?: { [key: string]: any },
) {
  return request<ScopeDatasAPI.ScopeDatas>(scopeDatasAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getScopeData(
  params: {
    scopeDataId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<ScopeDatasAPI.ScopeData>(scopeDatasAPIPrefix + params?.scopeDataId, {
    method: 'GET',
    ...(options || {}),
  });
}