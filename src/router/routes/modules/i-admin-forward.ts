import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/forward',
  name: 'forward',
  component: DEFAULT_LAYOUT,
  redirect: '/forward/a-forward', // 跳转到子路由
  meta: {
    locale: '订单转发',
    requiresAuth: true,
    icon: 'icon-swap',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-forward',
      name: 'AForward',
      component: () => import('@/views/forward/index.vue'),
      meta: {
        locale: '订单转发',
        requiresAuth: true,
        activeMenu: 'forward', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
