import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/task',
  name: 'task',
  component: DEFAULT_LAYOUT,
  meta: {
    locale: '任务',
    requiresAuth: true,
    icon: 'icon-send',
    order: 0,
  },
  children: [
    {
      path: 'initiate-task',
      name: 'initiate-task',
      component: () => import('@/views/task/initiate-task/index.vue'),
      meta: {
        locale: '发起任务',
        requiresAuth: true,
        roles: ['*'],
      },
    },
  ],
};

export default DASHBOARD;
