import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/setting',
  name: 'setting',
  component: DEFAULT_LAYOUT,
  redirect: '/setting/a-setting', // 跳转到子路由
  meta: {
    locale: '网站设置',
    requiresAuth: true,
    icon: 'icon-settings',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-setting',
      name: 'ASetting',
      component: () => import('@/views/settings/index.vue'),
      meta: {
        locale: '网站设置',
        requiresAuth: true,
        activeMenu: 'setting', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
