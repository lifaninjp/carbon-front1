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