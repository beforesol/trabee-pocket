import { withAsync } from '../lib';

export const ROUTE_PATH = {
  HOME: {
    path: '/',
    url: '/',
    name: 'Upload',
  },
  SELECT: {
    path: '/select',
    url: '/select/',
    name: 'Select',
  },
  PROFILE: {
    path: '/profile',
    url: '/profile/',
    name: 'Profile',
  },
};

export default function createRoutes(store) {
  return [
    {
      ...ROUTE_PATH.HOME,
      exact: true,
      component: withAsync({ getComponent: () => import('../pages/Home') }),
    },
    {
      ...ROUTE_PATH.SELECT,
      exact: true,
      component: withAsync({ getComponent: () => import('../pages/Select') }),
    },
    {
      ...ROUTE_PATH.PROFILE,
      exact: true,
      component: withAsync({ getComponent: () => import('../pages/Profile') }),
    }
  ];
}
