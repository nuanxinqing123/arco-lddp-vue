import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/tickets',
  name: 'tickets',
  component: DEFAULT_LAYOUT,
  redirect: '/tickets/a-tickets', // 跳转到子路由
  meta: {
    locale: '卡密管理',
    requiresAuth: true,
    icon: 'icon-code-sandbox',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-tickets',
      name: 'ATickets',
      component: () => import('@/views/tickets/a-tickets/index.vue'),
      meta: {
        locale: '卡密管理',
        requiresAuth: true,
        activeMenu: 'tickets', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
