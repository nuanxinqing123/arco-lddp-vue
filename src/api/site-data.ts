import axios from 'axios';

export interface SiteData {
  to_day_user_consume: number;
  to_day_order: number;
  all_order: number;
  all_user: number;
  to_day_recharge: number;
  to_day_register_user: number;
  active_user: number;
  effective_user: number;
}

export interface OrderChart {
  seven_days_order: any;
  seven_days_date: any;
}

export function getSiteData() {
  return axios.get<SiteData>('/v3/api/admin/panel/data');
}

export function getOrderChart() {
  return axios.get<OrderChart>('/v3/api/admin/panel/data/chart');
}
