import { withAsync } from '../lib';

export const ROUTE_PATH = {
  HOME: {
    path: '/',
    url: '/',
    name: 'Upload',
  },
  DETAIL: {
    path: '/detail/:id',
    url: '/detail',
    name: 'Detail'
  }
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
