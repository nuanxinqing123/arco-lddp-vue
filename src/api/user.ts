import axios from 'axios';
import type { RouteRecordNormalized } from 'vue-router';

// 验证码
export interface VerificationCode {
  id: string;
  bs64: string;
}

export interface LoginData {
  email: string;
  user_key: string;
  id: string;
  capt: string;
}

export interface LoginRes {
  token: string;
}

export interface UserInfo {
  user_id: string;
  email: string;
  points: number;
  role: string;
}

export interface UserRecharge {
  recharge_tickets: string;
}

export interface UserDataList {
  ID: number;
  user_id: string;
  email: string;
  points: number;
  is_admin: boolean;
  is_state: boolean;
  login_ip: string;
  CreatedAt: string;
}

export function login(data: LoginData) {
  return axios.post<LoginRes>('/v1/api/user/signin', data);
}

export function getVerificationCode() {
  return axios.get<VerificationCode>('/v1/api/verification/code');
}

export function register(data: any) {
  return axios.post('/v1/api/user/signup', data);
}
export function sendEmailCode(data: any) {
  return axios.post('/v1/api/user/abnormal/code', data);
}

export function sendVFLogin(data: any) {
  return axios.post('/v1/api/user/abnormal/signin', data);
}

export function sendFindPwdCode(data: any) {
  return axios.post('/v1/api/findpwd/message', data);
}

export function sendUpPwd(data: any) {
  return axios.post('/v1/api/findpwd/repwd', data);
}

export function getUserInfo() {
  return axios.get<UserInfo>('/v2/api/user/data');
}

export function userRecharge(data: UserRecharge) {
  return axios.post('/v2/api/user/recharge/tickets', data);
}

export function getUserData(pageNum: number) {
  return axios.get<UserDataList>(`/v3/api/user/division/data?page=${pageNum}`);
}

export function userDataUpdate(data: any) {
  return axios.put('/v3/api/user/information/update', data);
}

export function userDataSearch(data: any) {
  return axios.get(`/v3/api/user/search?type=${data.fc}&s=${data.data}`);
}

export function logout() {
  return axios.post<LoginRes>('/v1/api/user/logout');
}

export function getMenuList() {
  return axios.post<RouteRecordNormalized[]>('/v1/api/user/menu');
}
