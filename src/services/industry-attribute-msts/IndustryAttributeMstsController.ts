import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const industryAttributeMstsAPIPrefix = `${API_URL}/industry-attribute-msts/`;

export async function getIndustryAttributeMsts(
  params?: IndustryAttributeMstsAPI.FilterAttributeMstsInput,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeMstsAPI.IndustryAttributeMsts>(industryAttributeMstsAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createIndustryAttributeMst(
  body?: IndustryAttributeMstsAPI.CreateIndustryAttributeMstInput,
  options?: { [key: string]: any },
) {
  return request<{ _id: string }>(industryAttributeMstsAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateIndustryAttributeMst(
  params: {
    industry_attribute_id?: string;
  },
  body?: IndustryAttributeMstsAPI.UpdateIndustryAttributeMstInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(industryAttributeMstsAPIPrefix + params?.industry_attribute_id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function deleteIndustryAttributeMst(
  params: {
    industry_attribute_id?: string;
  },
  options?: { [key: string]: any },
) {
  return request<number>(industryAttributeMstsAPIPrefix + params?.industry_attribute_id, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}