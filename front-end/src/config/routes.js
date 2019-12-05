import { withAsync } from '../lib';

export const ROUTE_PATH = {
  HOME: {
    path: '/',
    url: '/',
    name: 'Upload',
  },
  SELECT: {
    path: '/select/:id',
    url: '/select',
    name: 'Select',
  },
  DETAIL: {
    path: '/detail/:id',
    url: '/detail',
    name: 'Detail'
  }
  // PROFILE: {
  //   path: '/profile/:id',
  //   url: '/profile',
  //   name: 'Profile',
  // },
};

export default function createRoutes(store) {
  return [
    {
      ...ROUTE_PATH.HOME,
      exact: true,
      component: withAsync({ getComponent: () => import('../pages/Home') }),
    },
    {
      ...ROUTE_PATH.DETAIL,
      exact: true,
      component: withAsync({ getComponent: () => import('../pages/Detail') }),
    }
  ];
}
