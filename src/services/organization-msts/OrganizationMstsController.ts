import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const organizationMstsAPIPrefix = `${API_URL}/organization-msts/`;

export async function getOrganizationMsts(
  params: OrganizationMstsAPI.FilterOrganizationMstsInput,
  options?: { [key: string]: any },
) {
  return request <OrganizationMstsAPI.OrganizationMsts >(organizationMstsAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createOrganizationMst(
  body?: OrganizationMstsAPI.CreateOrganizationMstInput,
  options?: { [key: string]: any },
) {
  return request<{ _id: string }>(organizationMstsAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateOrganizationMst(
  params: {
    organizationMstId?: string;
  },
  body?: OrganizationMstsAPI.UpdateOrganizationMstInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(organizationMstsAPIPrefix + params?.organizationMstId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteOrganizationMst(
  params: {
    organizationMstId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<number>(organizationMstsAPIPrefix + params?.organizationMstId, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}