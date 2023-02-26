import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/user',
  name: 'user',
  component: DEFAULT_LAYOUT,
  redirect: '/user/a-user', // 跳转到子路由
  meta: {
    locale: '用户管理',
    requiresAuth: true,
    icon: 'icon-user',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-user',
      name: 'AUser',
      component: () => import('@/views/user/a-user/index.vue'),
      meta: {
        locale: '用户管理',
        requiresAuth: true,
        activeMenu: 'user', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
