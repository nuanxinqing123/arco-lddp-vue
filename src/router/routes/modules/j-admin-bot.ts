import { DEFAULT_LAYOUT } from '../base';
import { AppRouteRecordRaw } from '../types';

const DASHBOARD: AppRouteRecordRaw = {
  path: '/bot',
  name: 'bot',
  component: DEFAULT_LAYOUT,
  redirect: '/bot/a-bot', // 跳转到子路由
  meta: {
    locale: 'BotAPI',
    requiresAuth: true,
    icon: 'icon-robot',
    order: 0,
    hideChildrenInMenu: true, // 隐藏子菜单
    roles: ['admin'],
  },
  children: [
    {
      path: 'a-bot',
      name: 'ABot',
      component: () => import('@/views/bot/index.vue'),
      meta: {
        locale: 'BotAPI',
        requiresAuth: true,
        activeMenu: 'bot', // 父菜单高亮
        roles: ['admin'],
      },
    },
  ],
};

export default DASHBOARD;
