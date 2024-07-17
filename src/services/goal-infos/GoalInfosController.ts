import { API_URL } from '@/constants';
import { request } from '@umijs/max';

const goalInfosAPIPrefix = `${API_URL}/goal-infos/`;

export async function getGoalInfo(
  params: GoalInfosAPI.GetOneInput,
  options?: { [key: string]: any },
) {
  return request<GoalInfosAPI.GoalInfo>(goalInfosAPIPrefix + 'by-year', {
    method: 'GET',
    params: {
      ...params,
    },
    ...(options || {}),
  });
}

export async function createGoalInfo(
  body?: GoalInfosAPI.CreateGoalInfoInput,
  options?: { [key: string]: any },
) {
  return request<{ _id: string }>(goalInfosAPIPrefix, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

  export async function updateGoalInfo(
    params: {
      goalInfoId?: string;
    },
    body?: GoalInfosAPI.UpdateGoalInfoInput,
    options?: { [key: string]: any },
  ) {
    return request<{ message: string }>(goalInfosAPIPrefix + params?.goalInfoId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      data: body,
      ...(options || {}),
    });
  }