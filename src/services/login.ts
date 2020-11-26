import { request } from 'umi';

export interface LoginParamsType {
  userName?: string;
  userPassword?: string;
  phoneNumber?: string;
  phoneCaptcha?: string;
  type?: string;
  success:boolean;
}

export async function getFakeCaptcha(mobile: string) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function outLogin() {
  return request('/api/login/outLogin');
}
