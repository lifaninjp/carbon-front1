import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const industryScopeInfosAPIPrefix = `${API_URL}/industry-scope-infos/`;

// export async function getIndustryScopeInfo(
//   params?: IndustryScopeInfosAPI.FilterScopeInfosInput,
//   options?: { [key: string]: any },
// ) {
//   return request<IndustryScopeInfosAPI.IndustryScopeInfo>(industryScopeInfosAPIPrefix + "filter_by", {
//     method: 'GET',
//     params: {
//       ...params,
//     },
//     ...(options || {}),
//   });
// }

export async function getIndustryScopeInfos(
  params?: IndustryScopeInfosAPI.FilterScopeInfosInput,
  options?: { [key: string]: any },
) {
  return request<IndustryScopeInfosAPI.IndustryScopeInfos>(industryScopeInfosAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createIndustryScopeInfo(
  body?: IndustryScopeInfosAPI.CreateScopeInfosInput,
  options?: { [key: string]: any },
) {
  return request<{ target_id: string }>(industryScopeInfosAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateIndustryScopeInfo(
  params: {
    _id?: string;
  },
  body?: IndustryScopeInfosAPI.UpdateScopeInfosInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(industryScopeInfosAPIPrefix + params?._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}