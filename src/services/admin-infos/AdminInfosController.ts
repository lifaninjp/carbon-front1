import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const adminInfosAPIPrefix = `${API_URL}/admin-infos/`;

export async function getAdminInfos(
  params: {
    manager_full_nm?: string;
  },
  options?: { [key: string]: any },
) {
  return request<AdminInfosAPI.AdminInfos>(adminInfosAPIPrefix, {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function getAdminInfo(
  params: {
    adminInfoId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<AdminInfosAPI.AdminInfo>(adminInfosAPIPrefix + params?.adminInfoId, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    ...(options || {}),
  });
}

export async function signInAdminInfos(
  body?: AdminInfosAPI.SigninInput,
  options?: { [key: string]: any },
) {
  return request<AdminInfosAPI.AdminInfoToken>(adminInfosAPIPrefix + 'signin', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function verifyAdminInfoToken(
  body?: { token?: string },
  options?: { [key: string]: any },
) {
  return request<AdminInfosAPI.AdminInfoVerify>(adminInfosAPIPrefix + 'verify-token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function updateAdminInfo(
  params: {
    adminInfoId?: string;
  },
  body?: AdminInfosAPI.UpdateInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(adminInfosAPIPrefix + params?.adminInfoId, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

export async function resetPassword(
  body?: AdminInfosAPI.ResetPasswordInput,
  options?: { [key: string]: any },
) {
  return request<{ message: string }>(adminInfosAPIPrefix + 'reset-password', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}