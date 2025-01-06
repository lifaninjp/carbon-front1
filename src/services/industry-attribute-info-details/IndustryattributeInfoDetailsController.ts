import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const industryAttributeInfoDetailsAPIPrefix = `${API_URL}/industry-attribute-info-details/`;

export async function getIndustryAttributeInfoDetails(
  params?: IndustryAttributeInfoDetailsAPI.FilterAttributeInfoDetailsInput,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.IndustryAttributeInfoDetails>(industryAttributeInfoDetailsAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createIndustryAttributeInfoDetail(
  body?: IndustryAttributeInfoDetailsAPI.CreateAttributeInfoDetailsInput,
  options?: { [key: string]: any },
) {
  return request<{ target_id: string }>(industryAttributeInfoDetailsAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateIndustryAttributeInfoDetail(
  params: {
    _id?: string;
  },
  body?: IndustryAttributeInfoDetailsAPI.UpdateAttributeInfoDetailsInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(industryAttributeInfoDetailsAPIPrefix + params?._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function importIndustryAttributeInfoDetails(
  body?: IndustryAttributeInfoDetailsAPI.ImportIndustryAttributeInfoDetailsInput,
  options?: { [key: string]: any },
) {
  return request<{ successCount: number }>(industryAttributeInfoDetailsAPIPrefix + 'import', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function getGhgByScope(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByScope[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-scope', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByScope3(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByScope3[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-scope3', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByCat(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByCat[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-cat', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByMonth(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByMonth[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-month', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByOgn(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByOgn[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-ogn', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByOgnScope1(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByOgn[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-ogn-scope1', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByOgnScope2(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByOgn[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-ogn-scope2', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByOgnScope3(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByOgn[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-ogn-scope3', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByKindType(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByKindType[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-kind-type', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getGhgByParty(
  params?: IndustryAttributeInfoDetailsAPI.filterGghByScope,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfoDetailsAPI.GhgByParty[]>(industryAttributeInfoDetailsAPIPrefix + 'ghg-by-party', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}