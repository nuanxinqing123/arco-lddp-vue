import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/record',
  name: 'ARecord',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '数据记录',
    requiresAuth: true,
    icon: 'icon-select-all',
    order: 0,
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-records-of-consumption',
      name: 'a-records-of-consumption',
      component: () =>
        import('@/views/record/a-records-of-consumption/index.vue'),
      meta: {
        locale: '消费记录',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'a-recharge-record',
      name: 'a-recharge-record',
      component: () => import('@/views/record/a-recharge-record/index.vue'),
      meta: {
        locale: '充值记录',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
    {
      path: 'a-login-log',
      name: 'a-login-log',
      component: () => import('@/views/record/a-login-log/index.vue'),
      meta: {
        locale: '登录日志',
        requiresAuth: true,
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
