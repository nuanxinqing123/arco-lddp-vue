import axios from 'axios';

export interface LoginPageData {
  page: number;
  // eslint-disable-next-line no-use-before-define
  page_data: LoginIpData[];
}

export interface LoginIpData {
  id: number;
  ip: string;
  ip_addr: string;
  login_function: string;
}

export interface RechargePage {
  page: number;
  // eslint-disable-next-line no-use-before-define
  page_data: Recharge[];
}

export interface Recharge {
  id: number;
  recharge_tickets: string;
  recharge_points: number;
  recharge_ip: string;
}

export interface ConsumptionPageData {
  page: number;
  // eslint-disable-next-line no-use-before-define
  page_data: UserRecordsOfConsumption[];
}

export interface UserRecordsOfConsumption {
  id: number;
  vote_order: string;
  vote_tickets: number;
  task_state: string;
}

export interface UserOrderData {
  order_today: number;
  order_seven: number;
  order_thirty: number;
  order_total: number;
}

export interface Order {
  order_task_type: string;
  order_id: string;
  order_tickets: number;
  order_number: number;
  order_variable: string;
  order_remarks: string;
  order_state: boolean;
  order_state_reason: string;
  order_status: string;
}

export function getLoginIpList(pageNum: number) {
  return axios.get<LoginPageData>(
    `/v2/api/user/login/division/data?page=${pageNum}`
  );
}

export function getRechargeList(pageNum: number) {
  return axios.get<RechargePage>(
    `/v2/api/user/recharge/division/data?page=${pageNum}`
  );
}

export function getConsumptionList(pageNum: number) {
  return axios.get<ConsumptionPageData>(
    `/v2/api/user/consumption/division/data?page=${pageNum}`
  );
}

export function getUserOrderData() {
  return axios.get<UserOrderData>('/v2/api/user/order/data');
}

export function getOrderList(pageNum: number) {
  return axios.get(`/v2/api/user/order/division/data?page=${pageNum}`);
}

export function refundOrder(orderId: string) {
  return axios.get(`/v2/api/user/order/refund?order=${orderId}`);
}

export function getOrderDataList(pageNum: number) {
  return axios.get(`/v3/api/order/division/data?page=${pageNum}`);
}

export function orderDataSearch(data: any) {
  return axios.get(
    `/v3/api/order/search?type=${data.fc}&state=${data.state}&s=${data.data}`
  );
}

export function getAdminConsumptionList(pageNum: number) {
  return axios.get(`/v3/api/consumption/division/data?page=${pageNum}`);
}

export function consumptionDataSearch(data: any) {
  return axios.get(`/v3/api/consumption/search?s=${data.data}`);
}

export function getAdminRechargeList(pageNum: number) {
  return axios.get(`/v3/api/recharge/division/data?page=${pageNum}`);
}

export function rechargeDataSearch(data: any) {
  return axios.get(`/v3/api/recharge/search?type=${data.fc}&s=${data.data}`);
}

export function getAdminLoginLogList(pageNum: number) {
  return axios.get(`/v3/api/login/division/data?page=${pageNum}`);
}

export function loginlogDataSearch(data: any) {
  return axios.get(`/v3/api/login/search?s=${data.data}`);
}
