import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/order',
  name: 'order',
  component: DEFAULT_LAYOUT,
  redirect: '/order/a-order', // 跳转到子路由
  meta: {
    locale: '订单管理',
    requiresAuth: true,
    icon: 'icon-unordered-list',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-order',
      name: 'AOrder',
      component: () => import('@/views/record/a-order/index.vue'),
      meta: {
        locale: '订单管理',
        requiresAuth: true,
        activeMenu: 'order', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
