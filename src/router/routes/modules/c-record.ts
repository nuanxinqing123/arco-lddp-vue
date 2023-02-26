import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/record',
  name: 'record',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '记录',
    requiresAuth: true,
    icon: 'icon-unordered-list',
    order: 0,
  },
  children: [
    {
      path: 'my-order',
      name: 'my-order',
      component: () => import('@/views/record/my-order/index.vue'),
      meta: {
        locale: '我的订单',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'records-of-consumption',
      name: 'records-of-consumption',
      component: () =>
        import('@/views/record/records-of-consumption/index.vue'),
      meta: {
        locale: '消费记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'recharge-record',
      name: 'recharge-record',
      component: () => import('@/views/record/recharge-record/index.vue'),
      meta: {
        locale: '充值记录',
        requiresAuth: true,
        roles: ['*'],
      },
    },
    {
      path: 'login-log',
      name: 'login-log',
      component: () => import('@/views/record/login-log/index.vue'),
      meta: {
        locale: '登录日志',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
