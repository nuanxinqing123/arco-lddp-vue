import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/management',
  name: 'management',
  component: DEFAULT_LAYOUT,
  redirect: '/management/a-workplace', // 跳转到子路由
  meta: {
    locale: '管理中心',
    requiresAuth: true,
    icon: 'icon-dashboard',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-workplace',
      name: 'AWorkplace',
      component: () => import('@/views/dashboard/a-workplace/index.vue'),
      meta: {
        locale: '工作台',
        requiresAuth: true,
        activeMenu: 'management', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
