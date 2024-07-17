import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const industryAttributeInfosAPIPrefix = `${API_URL}/industry-attribute-infos/`;

export async function getIndustryAttributeInfo(
  params?: IndustryAttributeInfosAPI.FilterAttributeInfoInput,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfosAPI.IndustryAttributeInfo>(industryAttributeInfosAPIPrefix + "filter_by", {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getIndustryAttributeInfos(
  params?: IndustryAttributeInfosAPI.FilterAttributeInfosInput,
  options?: { [key: string]: any },
) {
  return request<IndustryAttributeInfosAPI.IndustryAttributeInfos>(industryAttributeInfosAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createIndustryAttributeInfo(
  body?: IndustryAttributeInfosAPI.CreateIndustryAttributeInfoInput,
  options?: { [key: string]: any },
) {
  return request<{ target_id: string }>(industryAttributeInfosAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateIndustryAttributeInfo(
  params: {
    _id?: string;
  },
  body?: IndustryAttributeInfosAPI.UpdateIndustryAttributeInfoInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(industryAttributeInfosAPIPrefix + params?._id, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}