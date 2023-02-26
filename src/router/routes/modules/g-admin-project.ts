import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/project',
  name: 'project',
  component: DEFAULT_LAYOUT,
  redirect: '/project/a-project', // 跳转到子路由
  meta: {
    locale: '项目管理',
    requiresAuth: true,
    icon: 'icon-stamp',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-project',
      name: 'AProject',
      component: () => import('@/views/task/a-task/index.vue'),
      meta: {
        locale: '项目管理',
        requiresAuth: true,
        activeMenu: 'project', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
